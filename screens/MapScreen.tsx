import React, { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MapView, {
  Polyline,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bike,
  Navigation,
  Compass,
  Layers,
  MapPin,
  ExternalLink,
  X,
  Droplet,
  Wrench,
  Mountain,
  Eye,
  TrendingUp,
  LocateFixed,
  Sparkles,
} from 'lucide-react-native';

import {
  RouteType,
  RouteItem,
  POIItem,
  POICategory,
  Coordinate,
  MapTypeOption,
} from '../types/map';
import {
  INITIAL_MENDOZA_REGION,
  MENDOZA_ROUTES,
  MENDOZA_POIS,
  HIGH_CONTRAST_MAP_STYLE,
} from '../data/routesAndPois';

type FilterTab = 'todas' | RouteType;

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);

  // Estados de interfaz y filtrado
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>('todas');
  const [mapStyleOption, setMapStyleOption] = useState<MapTypeOption>('high_contrast');
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Elementos activos seleccionados
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<POIItem | null>(null);

  // Rutas filtradas
  const visibleRoutes = useMemo(() => {
    if (selectedFilter === 'todas') return MENDOZA_ROUTES;
    return MENDOZA_ROUTES.filter((route) => route.type === selectedFilter);
  }, [selectedFilter]);

  // POIs filtrados (visibles según relevancia de la categoría o si están en 'todas')
  const visiblePois = useMemo(() => {
    if (selectedFilter === 'todas') return MENDOZA_POIS;
    if (selectedFilter === 'ciclovia') {
      return MENDOZA_POIS.filter(
        (p) => p.category === 'taller' || p.category === 'trailhead' || p.category === 'mirador'
      );
    }
    if (selectedFilter === 'sendero_mtb') {
      return MENDOZA_POIS.filter(
        (p) => p.category === 'trailhead' || p.category === 'mirador' || p.category === 'hidratacion'
      );
    }
    if (selectedFilter === 'moto_trail') {
      return MENDOZA_POIS.filter(
        (p) => p.category === 'trailhead' || p.category === 'mirador'
      );
    }
    return MENDOZA_POIS;
  }, [selectedFilter]);

  // Localización GPS en tiempo real
  const handleLocateUser = async () => {
    try {
      setIsLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Se necesita acceso a la ubicación GPS para mostrar tu posición actual en los senderos de Mendoza.'
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
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        900
      );
    } catch (error) {
      Alert.alert('Error GPS', 'No fue posible obtener la señal de ubicación actual.');
    } finally {
      setIsLocating(false);
    }
  };

  // Re-centrar vista general de Mendoza
  const handleResetCamera = () => {
    mapRef.current?.animateToRegion(INITIAL_MENDOZA_REGION, 800);
  };

  // Enfocar trazado de la ruta seleccionada
  const handleFocusRoute = (route: RouteItem) => {
    if (mapRef.current && route.coordinates.length > 0) {
      mapRef.current.fitToCoordinates(route.coordinates, {
        edgePadding: { top: 130, right: 45, bottom: 290, left: 45 },
        animated: true,
      });
    }
  };

  // Navegación directa con Google Maps
  const handleNavigateWithGoogleMaps = (
    latitude: number,
    longitude: number,
    type: 'bicycling' | 'driving' | 'walking' = 'bicycling'
  ) => {
    const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=${type}`;
    const appUrl = Platform.select({
      ios: `comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=${type}`,
      android: `google.navigation:q=${latitude},${longitude}&mode=${type === 'driving' ? 'd' : 'b'}`,
    });

    if (appUrl) {
      Linking.canOpenURL(appUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(appUrl);
          } else {
            Linking.openURL(webUrl);
          }
        })
        .catch(() => Linking.openURL(webUrl));
    } else {
      Linking.openURL(webUrl);
    }
  };

  // Paleta de colores e iconos para POIs de alto contraste
  const getPoiColor = (category: POICategory) => {
    switch (category) {
      case 'trailhead':
        return '#00E5FF'; // Cyan neón
      case 'hidratacion':
        return '#00B0FF'; // Azul celeste brillante
      case 'mirador':
        return '#E040FB'; // Magenta / Púrpura eléctrico
      case 'taller':
        return '#FFD600'; // Amarillo neón
      default:
        return '#FF5252';
    }
  };

  const renderPoiIcon = (category: POICategory) => {
    switch (category) {
      case 'trailhead':
        return <Compass size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'hidratacion':
        return <Droplet size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'mirador':
        return <Eye size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'taller':
        return <Wrench size={16} color="#0B0F17" strokeWidth={2.4} />;
      default:
        return <MapPin size={16} color="#0B0F17" strokeWidth={2.4} />;
    }
  };

  const getDifficultyColor = (difficulty: RouteItem['difficulty']) => {
    switch (difficulty) {
      case 'Fácil':
        return '#00E676';
      case 'Moderado':
        return '#FFB300';
      case 'Técnico':
        return '#FF3D00';
      default:
        return '#94A3B8';
    }
  };

  // Determinar propiedades de mapa según el modo seleccionado
  const mapTypeProp =
    mapStyleOption === 'high_contrast'
      ? 'standard'
      : mapStyleOption === 'terrain'
      ? 'terrain'
      : mapStyleOption === 'satellite'
      ? 'satellite'
      : 'standard';

  const customStyleProp =
    mapStyleOption === 'high_contrast' ? HIGH_CONTRAST_MAP_STYLE : undefined;

  return (
    <View style={styles.container}>
      {/* MAPA PRINCIPAL NATIVO */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_MENDOZA_REGION}
        mapType={mapTypeProp}
        customMapStyle={customStyleProp}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {/* Marcador GPS de usuario */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Mi Ubicación GPS"
            description="Explorando Mendoza"
          >
            <View style={styles.userMarkerPulse}>
              <View style={styles.userMarkerDot} />
            </View>
          </Marker>
        )}

        {/* POLYLINES CON RENDERIZADO DE ALTO CONTRASTE */}
        {visibleRoutes.map((route) => {
          const isSelected = selectedRoute?.id === route.id;
          return (
            <React.Fragment key={route.id}>
              {/* Capa 1: Borde exterior oscuro de contraste extremo (Casing) */}
              <Polyline
                coordinates={route.coordinates}
                strokeColor="#05080E"
                strokeWidth={isSelected ? 10 : 7}
                lineCap="round"
                lineJoin="round"
              />

              {/* Capa 2: Trazado Neón vibrante principal */}
              <Polyline
                coordinates={route.coordinates}
                strokeColor={route.strokeColor}
                strokeWidth={isSelected ? 6 : 4.5}
                lineCap="round"
                lineJoin="round"
                tappable={true}
                onPress={() => {
                  setSelectedPoi(null);
                  setSelectedRoute(route);
                  handleFocusRoute(route);
                }}
              />
            </React.Fragment>
          );
        })}

        {/* PUNTOS DE INTERÉS (POIs) DE ALTO CONTRASTE */}
        {visiblePois.map((poi) => {
          const isSelected = selectedPoi?.id === poi.id;
          const markerBg = getPoiColor(poi.category);

          return (
            <Marker
              key={poi.id}
              coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
              title={poi.name}
              description={poi.description}
              onPress={() => {
                setSelectedRoute(null);
                setSelectedPoi(poi);
              }}
            >
              <View
                style={[
                  styles.poiMarkerCasing,
                  isSelected && styles.poiMarkerSelectedCasing,
                ]}
              >
                <View
                  style={[
                    styles.poiMarkerInner,
                    { backgroundColor: markerBg },
                  ]}
                >
                  {renderPoiIcon(poi.category)}
                </View>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* HEADER SUPERIOR: FILTRO DE RUTAS */}
      <View style={[styles.headerContainer, { top: insets.top + 8 }]}>
        <View style={styles.filterPillsWrapper}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedFilter === 'todas' && styles.filterPillActive,
            ]}
            onPress={() => {
              setSelectedFilter('todas');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Sparkles
              size={15}
              color={selectedFilter === 'todas' ? '#FFFFFF' : '#94A3B8'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'todas' && styles.filterPillTextActive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedFilter === 'ciclovia' && styles.filterPillActiveCiclovia,
            ]}
            onPress={() => {
              setSelectedFilter('ciclovia');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Bike
              size={15}
              color={selectedFilter === 'ciclovia' ? '#00E676' : '#94A3B8'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'ciclovia' && { color: '#00E676', fontWeight: '700' },
              ]}
            >
              Ciclovías
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedFilter === 'sendero_mtb' && styles.filterPillActiveMtb,
            ]}
            onPress={() => {
              setSelectedFilter('sendero_mtb');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Mountain
              size={15}
              color={selectedFilter === 'sendero_mtb' ? '#FF6D00' : '#94A3B8'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'sendero_mtb' && { color: '#FF6D00', fontWeight: '700' },
              ]}
            >
              MTB / Cerro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedFilter === 'moto_trail' && styles.filterPillActiveMoto,
            ]}
            onPress={() => {
              setSelectedFilter('moto_trail');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Navigation
              size={15}
              color={selectedFilter === 'moto_trail' ? '#2979FF' : '#94A3B8'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'moto_trail' && { color: '#2979FF', fontWeight: '700' },
              ]}
            >
              Moto / Trail
            </Text>
          </TouchableOpacity>
        </View>

        {/* Badge contador de rutas activas */}
        <View style={styles.statsBadge}>
          <Text style={styles.statsBadgeText}>
            Mendoza • {visibleRoutes.length} rutas activas • {visiblePois.length} POIs
          </Text>
        </View>
      </View>

      {/* FABs: BOTONES LATERALES DE ACCIÓN */}
      <View style={[styles.fabContainer, { top: insets.top + 80 }]}>
        {/* Selector de capa de mapa */}
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => setShowLayerMenu(!showLayerMenu)}
          activeOpacity={0.85}
        >
          <Layers size={20} color="#F8FAFC" />
        </TouchableOpacity>

        {/* Menú flotante de capas */}
        {showLayerMenu && (
          <View style={styles.layerMenu}>
            <TouchableOpacity
              style={[
                styles.layerOption,
                mapStyleOption === 'high_contrast' && styles.layerOptionActive,
              ]}
              onPress={() => {
                setMapStyleOption('high_contrast');
                setShowLayerMenu(false);
              }}
            >
              <Sparkles size={14} color={mapStyleOption === 'high_contrast' ? '#00E676' : '#94A3B8'} />
              <Text
                style={[
                  styles.layerText,
                  mapStyleOption === 'high_contrast' && styles.layerTextActive,
                ]}
              >
                Alto Contraste
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.layerOption,
                mapStyleOption === 'terrain' && styles.layerOptionActive,
              ]}
              onPress={() => {
                setMapStyleOption('terrain');
                setShowLayerMenu(false);
              }}
            >
              <Mountain size={14} color={mapStyleOption === 'terrain' ? '#00E676' : '#94A3B8'} />
              <Text
                style={[
                  styles.layerText,
                  mapStyleOption === 'terrain' && styles.layerTextActive,
                ]}
              >
                Relieve / Terreno
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.layerOption,
                mapStyleOption === 'satellite' && styles.layerOptionActive,
              ]}
              onPress={() => {
                setMapStyleOption('satellite');
                setShowLayerMenu(false);
              }}
            >
              <Eye size={14} color={mapStyleOption === 'satellite' ? '#00E676' : '#94A3B8'} />
              <Text
                style={[
                  styles.layerText,
                  mapStyleOption === 'satellite' && styles.layerTextActive,
                ]}
              >
                Satélite
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.layerOption,
                mapStyleOption === 'standard' && styles.layerOptionActive,
              ]}
              onPress={() => {
                setMapStyleOption('standard');
                setShowLayerMenu(false);
              }}
            >
              <MapPin size={14} color={mapStyleOption === 'standard' ? '#00E676' : '#94A3B8'} />
              <Text
                style={[
                  styles.layerText,
                  mapStyleOption === 'standard' && styles.layerTextActive,
                ]}
              >
                Estándar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Resetear cámara a Mendoza */}
        <TouchableOpacity
          style={styles.fabButton}
          onPress={handleResetCamera}
          activeOpacity={0.85}
        >
          <Compass size={20} color="#F8FAFC" />
        </TouchableOpacity>

        {/* Localización GPS */}
        <TouchableOpacity
          style={[styles.fabButton, isLocating && styles.fabButtonActive]}
          onPress={handleLocateUser}
          disabled={isLocating}
          activeOpacity={0.85}
        >
          {isLocating ? (
            <ActivityIndicator size="small" color="#00E676" />
          ) : (
            <LocateFixed
              size={20}
              color={userLocation ? '#00E676' : '#F8FAFC'}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* TARJETA INFERIOR: DETALLES DE RUTA SELECCIONADA */}
      {selectedRoute && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.cardHeaderTopRow}>
                <View
                  style={[
                    styles.routeIndicatorPill,
                    { backgroundColor: selectedRoute.strokeColor },
                  ]}
                />
                <Text style={styles.zoneText}>{selectedRoute.zone}</Text>
                <View
                  style={[
                    styles.difficultyBadge,
                    { borderColor: getDifficultyColor(selectedRoute.difficulty) },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(selectedRoute.difficulty) },
                    ]}
                  >
                    {selectedRoute.difficulty}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardTitle} numberOfLines={2}>
                {selectedRoute.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedRoute(null)}
              style={styles.closeBtn}
            >
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Métricas clave de la ruta */}
          <View style={styles.metricsBox}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>DISTANCIA</Text>
              <Text style={styles.metricValue}>{selectedRoute.distanceKm} km</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>DESNIVEL</Text>
              <View style={styles.metricRow}>
                <TrendingUp size={13} color="#00E676" />
                <Text style={styles.metricValue}>+{selectedRoute.elevationGainM} m</Text>
              </View>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>SUPERFICIE</Text>
              <Text style={styles.metricValue}>{selectedRoute.surface}</Text>
            </View>
          </View>

          {/* Botones de acción de ruta */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.focusRouteButton}
              onPress={() => handleFocusRoute(selectedRoute)}
              activeOpacity={0.85}
            >
              <Compass size={16} color="#00E676" />
              <Text style={styles.focusRouteButtonText}>Enfocar Trazado</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => {
                const startPoint = selectedRoute.coordinates[0];
                const mode =
                  selectedRoute.type === 'moto_trail'
                    ? 'driving'
                    : selectedRoute.type === 'ciclovia'
                    ? 'bicycling'
                    : 'walking';
                handleNavigateWithGoogleMaps(
                  startPoint.latitude,
                  startPoint.longitude,
                  mode
                );
              }}
              activeOpacity={0.88}
            >
              <ExternalLink size={16} color="#05080E" />
              <Text style={styles.navigateButtonText}>Ir al Inicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* TARJETA INFERIOR: DETALLES DE POI SELECCIONADO */}
      {selectedPoi && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.cardHeaderTopRow}>
                <View
                  style={[
                    styles.poiDot,
                    { backgroundColor: getPoiColor(selectedPoi.category) },
                  ]}
                />
                <Text style={styles.poiCategoryText}>
                  {selectedPoi.category.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.cardTitle} numberOfLines={2}>
                {selectedPoi.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedPoi(null)}
              style={styles.closeBtn}
            >
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardDescription}>{selectedPoi.description}</Text>

          {/* Botón de navegación directa */}
          <TouchableOpacity
            style={styles.navigateFullButton}
            onPress={() =>
              handleNavigateWithGoogleMaps(
                selectedPoi.latitude,
                selectedPoi.longitude,
                'bicycling'
              )
            }
            activeOpacity={0.88}
          >
            <ExternalLink size={17} color="#05080E" />
            <Text style={styles.navigateFullButtonText}>
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
    backgroundColor: '#0B0F17',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  // Marcador de ubicación GPS del usuario
  userMarkerPulse: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 230, 118, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 230, 118, 0.5)',
  },
  userMarkerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00E676',
    borderWidth: 2,
    borderColor: '#05080E',
  },

  // Marcadores POI de alto contraste
  poiMarkerCasing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#05080E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  poiMarkerSelectedCasing: {
    transform: [{ scale: 1.25 }],
    borderColor: '#00E676',
    borderWidth: 2.5,
  },
  poiMarkerInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Header superior y filtros
  headerContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
    alignItems: 'center',
  },
  filterPillsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(11, 15, 23, 0.94)',
    borderRadius: 26,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
    maxWidth: 420,
    gap: 4,
  },
  filterPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 20,
    gap: 5,
  },
  filterPillActive: {
    backgroundColor: '#1E293B',
  },
  filterPillActiveCiclovia: {
    backgroundColor: 'rgba(0, 230, 118, 0.16)',
    borderWidth: 1,
    borderColor: '#00E676',
  },
  filterPillActiveMtb: {
    backgroundColor: 'rgba(255, 109, 0, 0.16)',
    borderWidth: 1,
    borderColor: '#FF6D00',
  },
  filterPillActiveMoto: {
    backgroundColor: 'rgba(41, 121, 255, 0.16)',
    borderWidth: 1,
    borderColor: '#2979FF',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statsBadge: {
    marginTop: 8,
    backgroundColor: 'rgba(11, 15, 23, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statsBadgeText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '500',
  },

  // Botones flotantes (FABs)
  fabContainer: {
    position: 'absolute',
    right: 14,
    alignItems: 'flex-end',
    gap: 10,
  },
  fabButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#131B2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 6,
  },
  fabButtonActive: {
    borderColor: '#00E676',
  },
  layerMenu: {
    position: 'absolute',
    right: 52,
    top: 0,
    backgroundColor: '#131B2E',
    borderRadius: 14,
    padding: 6,
    width: 160,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    gap: 4,
  },
  layerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 8,
  },
  layerOptionActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
  },
  layerText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  layerTextActive: {
    color: '#00E676',
    fontWeight: '700',
  },

  // Tarjetas inferiores (Bottom Card)
  bottomCard: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 0,
    backgroundColor: '#101726',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardHeaderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  routeIndicatorPill: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  zoneText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#F8FAFC',
    lineHeight: 22,
  },
  closeBtn: {
    padding: 4,
    marginLeft: 8,
  },

  // Métricas
  metricsBox: {
    flexDirection: 'row',
    backgroundColor: '#162033',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },

  // Botones de acción
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  focusRouteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)',
    gap: 6,
  },
  focusRouteButtonText: {
    color: '#00E676',
    fontSize: 13,
    fontWeight: '700',
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00E676',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  navigateButtonText: {
    color: '#05080E',
    fontSize: 13,
    fontWeight: '800',
  },

  // POI Card
  poiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  poiCategoryText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 19,
    marginBottom: 16,
  },
  navigateFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00E676',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  navigateFullButtonText: {
    color: '#05080E',
    fontSize: 14,
    fontWeight: '800',
  },
});
