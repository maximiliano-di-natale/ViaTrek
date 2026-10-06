import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Polyline, Marker, UrlTile } from 'react-native-maps';
import { MENDOZA_ROUTES, MENDOZA_POIS, RouteItem, RouteType } from '../data/mendozaGeoData';

export const MendozaMap = () => {
  const [selectedType, setSelectedType] = useState<RouteType | 'all'>('all');
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [isSatellite, setIsSatellite] = useState<boolean>(true);

  // Filtrado reactivo por medio de transporte
  const filteredRoutes = selectedType === 'all' 
    ? MENDOZA_ROUTES 
    : MENDOZA_ROUTES.filter(r => r.type === selectedType);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -32.8895,
          longitude: -68.8458,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12,
        }}
      >
        {/* Capa Satelital Libre de Esri (Sin API Key) */}
        {isSatellite && (
          <UrlTile
            urlTemplate="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maximumZ={19}
            flipY={false}
            zIndex={1}
          />
        )}

        {/* RENDERIZADO DE ALTO CONTRASTE (DOBLE TRAZO) */}
        {filteredRoutes.map((route) => {
          const isSelected = selectedRoute?.id === route.id;
          return (
            <React.Fragment key={route.id}>
              {/* Línea 1: Delineado / Borde oscuro inferior */}
              <Polyline
                coordinates={route.coordinates}
                strokeColor="#0B0F19"
                strokeWidth={isSelected ? 10 : 7}
                zIndex={isSelected ? 15 : 5}
              />
              {/* Línea 2: Núcleo Neón superior visible sobre satélite */}
              <Polyline
                coordinates={route.coordinates}
                strokeColor={route.strokeColor}
                strokeWidth={isSelected ? 6 : 4}
                tappable={true}
                onPress={() => setSelectedRoute(route)}
                zIndex={isSelected ? 16 : 6}
              />
            </React.Fragment>
          );
        })}

        {/* Marcadores de Puntos de Interés */}
        {MENDOZA_POIS.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
            title={poi.name}
            description={poi.description}
            pinColor="#00E5FF"
            zIndex={20}
          />
        ))}
      </MapView>

      {/* Selector superior de Modo de Movilidad */}
      <View style={styles.topFilterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, selectedType === 'all' && styles.filterChipActive]}
            onPress={() => setSelectedType('all')}
          >
            <Text style={styles.chipText}>🌐 Todo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedType === 'ciclovia' && styles.filterChipActive]}
            onPress={() => setSelectedType('ciclovia')}
          >
            <Text style={styles.chipText}>🚴 Ciclovías</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedType === 'sendero_mtb' && styles.filterChipActive]}
            onPress={() => setSelectedType('sendero_mtb')}
          >
            <Text style={styles.chipText}>🥾 Senderos / MTB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedType === 'moto_trail' && styles.filterChipActive]}
            onPress={() => setSelectedType('moto_trail')}
          >
            <Text style={styles.chipText}>🏍️ Moto Trail</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Conmutador de Mapa (Satélite / Calles) */}
      <TouchableOpacity 
        style={styles.layerButton}
        onPress={() => setIsSatellite(!isSatellite)}
      >
        <Text style={styles.layerButtonText}>{isSatellite ? '🗺️ Calles' : '🛰️ Satélite'}</Text>
      </TouchableOpacity>

      {/* Tarjeta flotante de información de la ruta seleccionada */}
      {selectedRoute && (
        <View style={styles.routeDetailCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.indicatorDot, { backgroundColor: selectedRoute.strokeColor }]} />
            <Text style={styles.cardTitle}>{selectedRoute.name}</Text>
          </View>
          <Text style={styles.cardSubtitle}>{selectedRoute.zone} • {selectedRoute.surface}</Text>
          
          <View style={styles.statsRow}>
            <Text style={styles.statText}>📏 {selectedRoute.distanceKm} km</Text>
            <Text style={styles.statText}>⛰️ +{selectedRoute.elevationGainM} m</Text>
            <Text style={styles.statText}>⚡ {selectedRoute.difficulty}</Text>
          </View>

          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setSelectedRoute(null)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { flex: 1 },
  topFilterBar: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 30,
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: 'rgba(24, 28, 36, 0.88)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  filterChipActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },
  chipText: {
    color: '#F9FAFB',
    fontWeight: 'bold',
    fontSize: 13,
  },
  layerButton: {
    position: 'absolute',
    top: 110,
    right: 15,
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 30,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  layerButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  routeDetailCard: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
    zIndex: 40,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  indicatorDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  cardTitle: { color: '#F9FAFB', fontSize: 16, fontWeight: '700', flex: 1 },
  cardSubtitle: { color: '#9CA3AF', fontSize: 12, marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  statText: { color: '#E5E7EB', fontSize: 13, fontWeight: '500' },
  closeButton: {
    backgroundColor: '#374151',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: { color: '#F3F4F6', fontSize: 13, fontWeight: '600' },
});

export default MendozaMap;
