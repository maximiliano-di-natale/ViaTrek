import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import MapView, {
  Polyline,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bike,
  Navigation,
  Footprints,
  Compass,
  Layers,
  MapPin,
  ExternalLink,
  X,
  Droplet,
  Wrench,
  Mountain,
  Eye,
  ParkingCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  LocateFixed,
} from 'lucide-react-native';

import {
  TransportMode,
  MapTypeOption,
  RouteItem,
  PointOfInterest,
  LatLng,
} from '../types/map';
import {
  INITIAL_MENDOZA_REGION,
  MENDOZA_ROUTES,
  MENDOZA_POIS,
} from '../data/routesAndPois';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);

  // Estados de control
  const [selectedMode, setSelectedMode] = useState<TransportMode>('bike');
  const [mapType, setMapType] = useState<MapTypeOption>('terrain');
  const [showMapTypeSelector, setShowMapTypeSelector] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Elementos seleccionados para inspección
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);

  // Filtrado reactivo de rutas y POIs según el modo seleccionado
  const visibleRoutes = MENDOZA_ROUTES.filter((r) =>
    r.modes.includes(selectedMode)
  );

  const visiblePois = MENDOZA_POIS.filter((p) =>
    p.modes.includes(selectedMode)
  );

  // Función para solicitar permisos y rastrear ubicación actual
  const handleLocateUser = async () => {
    try {
      setIsLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Se requiere permiso de ubicación para que ViaTrek muestre tu posición actual en los senderos de Mendoza.'
        );
        setIsLocating(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;
      const coords = { latitude, longitude };
      setUserLocation(coords);

      mapRef.current?.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
        1000
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación GPS actual.');
    } finally {
      setIsLocating(false);
    }
  };

  // Re-centrar vista general de Mendoza
  const handleResetCamera = () => {
    mapRef.current?.animateToRegion(INITIAL_MENDOZA_REGION, 800);
  };

  // Centrar cámara en una ruta seleccionada
  const handleFocusRoute = (route: RouteItem) => {
    if (mapRef.current && route.coordinates.length > 0) {
      mapRef.current.fitToCoordinates(route.coordinates, {
        edgePadding: { top: 120, right: 50, bottom: 280, left: 50 },
        animated: true,
      });
    }
  };

  // Abrir Google Maps nativo mediante Deep Link para navegación directa
  const handleOpenGoogleMapsNavigation = (poi: PointOfInterest) => {
    const lat = poi.coordinate.latitude;
    const lng = poi.coordinate.longitude;
    const label = encodeURIComponent(poi.name);

    // Mapeo del travelmode según la modalidad
    let travelmode = 'bicycling';
    if (selectedMode === 'moto') travelmode = 'driving';
    if (selectedMode === 'trekking') travelmode = 'walking';

    const googleMapsWebUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${travelmode}`;
    const googleMapsAppUrl = Platform.select({
      ios: `comgooglemaps://?daddr=${lat},${lng}&directionsmode=${travelmode}`,
      android: `google.navigation:q=${lat},${lng}&mode=${travelmode === 'walking' ? 'w' : travelmode === 'bicycling' ? 'b' : 'd'}`,
    });

    // Intentar abrir la app nativa primero, con fallback al enlace web oficial de Google Maps
    if (googleMapsAppUrl) {
      Linking.canOpenURL(googleMapsAppUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(googleMapsAppUrl);
          } else {
            Linking.openURL(googleMapsWebUrl);
          }
        })
        .catch(() => {
          Linking.openURL(googleMapsWebUrl);
        });
    } else {
      Linking.openURL(googleMapsWebUrl);
    }
  };

  // Color e icono según categoría de POI
  const renderPoiMarkerIcon = (category: PointOfInterest['category']) => {
    switch (category) {
      case 'trailhead':
        return <Compass size={16} color="#FFFFFF" />;
      case 'viewpoint':
        return <Eye size={16} color="#FFFFFF" />;
      case 'water':
        return <Droplet size={16} color="#FFFFFF" />;
      case 'repair':
        return <Wrench size={16} color="#FFFFFF" />;
      default:
        return <MapPin size={16} color="#FFFFFF" />;
    }
  };

  const getPoiColor = (category: PointOfInterest['category']) => {
    switch (category) {
      case 'trailhead':
        return '#0284C7'; // Azul
      case 'viewpoint':
        return '#8B5CF6'; // Violeta
      case 'water':
        return '#06B6D4'; // Cian
      case 'repair':
        return '#EAB308'; // Amarillo
      default:
        return '#EF4444';
    }
  };

  return (
    <View style={styles.container}>
      {/* MAPA PRINCIPAL NATIVO DE GOOGLE */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_MENDOZA_REGION}
        mapType={mapType}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {/* Marcador de ubicación GPS del usuario si está calculada */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Mi Ubicación Actual"
            description="Estás aquí explorando Mendoza"
          >
            <View style={styles.userMarkerOuter}>
              <View style={styles.userMarkerInner} />
            </View>
          </Marker>
        )}

        {/* TRAZADOS DE SENDEROS Y CICLOVÍAS (POLYLINES) */}
        {visibleRoutes.map((route) => {
          const isSelected = selectedRoute?.id === route.id;
          return (
            <Polyline
              key={route.id}
              coordinates={route.coordinates}
              strokeColor={route.color}
              strokeWidth={isSelected ? route.strokeWidth + 3 : route.strokeWidth}
              tappable={true}
              onPress={() => {
                setSelectedPoi(null);
                setSelectedRoute(route);
                handleFocusRoute(route);
              }}
            />
          );
        })}

        {/* PUNTOS DE INTERÉS EN LA MONTAÑA (POIS / MARKERS) */}
        {visiblePois.map((poi) => {
          const isSelected = selectedPoi?.id === poi.id;
          const markerColor = getPoiColor(poi.category);

          return (
            <Marker
              key={poi.id}
              coordinate={poi.coordinate}
              title={poi.name}
              description={poi.addressOrReference}
              onPress={() => {
                setSelectedRoute(null);
                setSelectedPoi(poi);
              }}
            >
              <View
                style={[
                  styles.poiMarkerContainer,
                  { backgroundColor: markerColor },
                  isSelected && styles.poiMarkerSelected,
                ]}
              >
                {renderPoiMarkerIcon(poi.category)}
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* HEADER SUPERIOR: SELECTOR DE MODO DE TRANSPORTE */}
      <View style={[styles.headerContainer, { top: insets.top + 8 }]}>
        <View style={styles.modeTabsWrapper}>
          <TouchableOpacity
            style={[
              styles.modeTab,
              selectedMode === 'bike' && styles.modeTabActive,
            ]}
            onPress={() => {
              setSelectedMode('bike');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Bike
              size={18}
              color={selectedMode === 'bike' ? '#FFFFFF' : '#94A3B8'}
            />
            <Text
              style={[
                styles.modeTabText,
                selectedMode === 'bike' && styles.modeTabTextActive,
              ]}
            >
              Bici
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeTab,
              selectedMode === 'moto' && styles.modeTabActive,
            ]}
            onPress={() => {
              setSelectedMode('moto');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Navigation
              size={18}
              color={selectedMode === 'moto' ? '#FFFFFF' : '#94A3B8'}
            />
            <Text
              style={[
                styles.modeTabText,
                selectedMode === 'moto' && styles.modeTabTextActive,
              ]}
            >
              Moto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeTab,
              selectedMode === 'trekking' && styles.modeTabActive,
            ]}
            onPress={() => {
              setSelectedMode('trekking');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Footprints
              size={18}
              color={selectedMode === 'trekking' ? '#FFFFFF' : '#94A3B8'}
            />
            <Text
              style={[
                styles.modeTabText,
                selectedMode === 'trekking' && styles.modeTabTextActive,
              ]}
            >
              Trekking
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resumen badge de rutas activas */}
        <View style={styles.statsBadge}>
          <Text style={styles.statsBadgeText}>
            ViaTrek • {visibleRoutes.length} rutas • {visiblePois.length} POIs en Mendoza
          </Text>
        </View>
      </View>

      {/* BOTONES FLOTANTES LATERALES (FABs) */}
      <View style={[styles.fabContainer, { top: insets.top + 80 }]}>
        {/* Botón Selector de Capa de Mapa */}
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => setShowMapTypeSelector(!showMapTypeSelector)}
          activeOpacity={0.85}
        >
          <Layers size={22} color="#0F172A" />
        </TouchableOpacity>

        {/* Menú desplegable de tipo de mapa */}
        {showMapTypeSelector && (
          <View style={styles.mapTypeMenu}>
            <TouchableOpacity
              style={[
                styles.mapTypeOption,
                mapType === 'terrain' && styles.mapTypeOptionActive,
              ]}
              onPress={() => {
                setMapType('terrain');
                setShowMapTypeSelector(false);
              }}
            >
              <Mountain size={14} color={mapType === 'terrain' ? '#2563EB' : '#475569'} />
              <Text
                style={[
                  styles.mapTypeText,
                  mapType === 'terrain' && styles.mapTypeTextActive,
                ]}
              >
                Relieve / Curvas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.mapTypeOption,
                mapType === 'standard' && styles.mapTypeOptionActive,
              ]}
              onPress={() => {
                setMapType('standard');
                setShowMapTypeSelector(false);
              }}
            >
              <MapPin size={14} color={mapType === 'standard' ? '#2563EB' : '#475569'} />
              <Text
                style={[
                  styles.mapTypeText,
                  mapType === 'standard' && styles.mapTypeTextActive,
                ]}
              >
                Estándar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.mapTypeOption,
                mapType === 'satellite' && styles.mapTypeOptionActive,
              ]}
              onPress={() => {
                setMapType('satellite');
                setShowMapTypeSelector(false);
              }}
            >
              <Eye size={14} color={mapType === 'satellite' ? '#2563EB' : '#475569'} />
              <Text
                style={[
                  styles.mapTypeText,
                  mapType === 'satellite' && styles.mapTypeTextActive,
                ]}
              >
                Satélite
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Botón Reset Centrar Mendoza */}
        <TouchableOpacity
          style={styles.fabButton}
          onPress={handleResetCamera}
          activeOpacity={0.85}
        >
          <Compass size={22} color="#0F172A" />
        </TouchableOpacity>

        {/* Botón Mi Ubicación GPS */}
        <TouchableOpacity
          style={[styles.fabButton, isLocating && styles.fabButtonActive]}
          onPress={handleLocateUser}
          disabled={isLocating}
          activeOpacity={0.85}
        >
          {isLocating ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : (
            <LocateFixed size={22} color={userLocation ? '#2563EB' : '#0F172A'} />
          )}
        </TouchableOpacity>
      </View>

      {/* TARJETA INFERIOR: DETALLE DE RUTA SELECCIONADA */}
      {selectedRoute && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.routeHeaderRow}>
                <View
                  style={[
                    styles.routeColorIndicator,
                    { backgroundColor: selectedRoute.color },
                  ]}
                />
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {selectedRoute.name}
                </Text>
              </View>
              <Text style={styles.cardSubtitle}>{selectedRoute.subtitle}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedRoute(null)}
              style={styles.closeButton}
            >
              <X size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Métricas clave de la ruta */}
          <View style={styles.metricsContainer}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Distancia</Text>
              <Text style={styles.metricValue}>{selectedRoute.distanceKm} km</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Desnivel</Text>
              <View style={styles.metricInline}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={styles.metricValue}>+{selectedRoute.elevationGainM} m</Text>
              </View>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Tiempo Est.</Text>
              <View style={styles.metricInline}>
                <Clock size={14} color="#64748B" />
                <Text style={styles.metricValue}>{selectedRoute.estimatedTimeMin} min</Text>
              </View>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Dificultad</Text>
              <Text
                style={[
                  styles.metricValue,
                  selectedRoute.difficulty === 'Fácil' && { color: '#10B981' },
                  selectedRoute.difficulty === 'Moderado' && { color: '#F59E0B' },
                  selectedRoute.difficulty === 'Difícil' && { color: '#EF4444' },
                ]}
              >
                {selectedRoute.difficulty}
              </Text>
            </View>
          </View>

          <Text style={styles.cardDescription} numberOfLines={2}>
            {selectedRoute.description}
          </Text>

          <View style={styles.routeFooterRow}>
            <View style={styles.badgeSurface}>
              <Text style={styles.badgeSurfaceText}>
                Superficie: {selectedRoute.surfaceType}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.centerRouteBtn}
              onPress={() => handleFocusRoute(selectedRoute)}
            >
              <Text style={styles.centerRouteBtnText}>Enfocar Trazado</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* TARJETA INFERIOR: DETALLE DE POI & NAVEGACIÓN GOOGLE MAPS */}
      {selectedPoi && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.routeHeaderRow}>
                <View
                  style={[
                    styles.poiHeaderDot,
                    { backgroundColor: getPoiColor(selectedPoi.category) },
                  ]}
                />
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {selectedPoi.name}
                </Text>
              </View>
              <Text style={styles.cardSubtitle}>
                {selectedPoi.addressOrReference}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedPoi(null)}
              style={styles.closeButton}
            >
              <X size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Badges de servicios del POI */}
          <View style={styles.poiBadgesRow}>
            {selectedPoi.elevationM && (
              <View style={styles.poiBadge}>
                <Mountain size={14} color="#0284C7" />
                <Text style={styles.poiBadgeText}>{selectedPoi.elevationM} msnm</Text>
              </View>
            )}

            {selectedPoi.parkingAvailable && (
              <View style={styles.poiBadge}>
                <ParkingCircle size={14} color="#10B981" />
                <Text style={styles.poiBadgeText}>Estacionamiento seguro</Text>
              </View>
            )}

            {selectedPoi.waterAvailable && (
              <View style={styles.poiBadge}>
                <Droplet size={14} color="#06B6D4" />
                <Text style={styles.poiBadgeText}>Agua potable</Text>
              </View>
            )}
          </View>

          <Text style={styles.cardDescription}>{selectedPoi.description}</Text>

          {/* BOTÓN PRINCIPAL DE NAVEGACIÓN EN GOOGLE MAPS */}
          <TouchableOpacity
            style={styles.googleMapsNavButton}
            onPress={() => handleOpenGoogleMapsNavigation(selectedPoi)}
            activeOpacity={0.88}
          >
            <ExternalLink size={18} color="#FFFFFF" />
            <Text style={styles.googleMapsNavButtonText}>
              Cómo llegar con Google Maps
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  // Marcador de usuario
  userMarkerOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.4)',
  },
  userMarkerInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  // Marcadores de POI
  poiMarkerContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  poiMarkerSelected: {
    transform: [{ scale: 1.25 }],
    borderColor: '#0F172A',
    borderWidth: 3,
  },
  // Header superior
  headerContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  modeTabsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
    borderRadius: 24,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
    maxWidth: 380,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  modeTabActive: {
    backgroundColor: '#2563EB',
  },
  modeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statsBadge: {
    marginTop: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statsBadgeText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '500',
  },
  // FABs laterales
  fabContainer: {
    position: 'absolute',
    right: 16,
    alignItems: 'flex-end',
    gap: 12,
  },
  fabButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  fabButtonActive: {
    backgroundColor: '#EFF6FF',
  },
  mapTypeMenu: {
    position: 'absolute',
    right: 56,
    top: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 6,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
    gap: 4,
  },
  mapTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 8,
  },
  mapTypeOptionActive: {
    backgroundColor: '#EFF6FF',
  },
  mapTypeText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  mapTypeTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  // Tarjetas inferiores (Bottom Cards)
  bottomCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  routeColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  poiHeaderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metricLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: '#475569',
    marginBottom: 12,
  },
  routeFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  badgeSurface: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeSurfaceText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  centerRouteBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  centerRouteBtnText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '600',
  },
  poiBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  poiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  poiBadgeText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
  googleMapsNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  googleMapsNavButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
