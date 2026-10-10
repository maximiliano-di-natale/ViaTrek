import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import MapView, {
  Polyline,
  Marker,
  Polygon,
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
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  Plus,
  Clock,
  ShieldAlert,
  Shield,
  HeartPulse,
  PhoneCall,
  Send,
  Timer,
  Radio,
  Scale,
  ScrollText,
  Trees,
  BookOpen,
  ShieldCheck,
  AlertOctagon,
  Check,
  Wind,
  Wine,
  Thermometer,
  Flame,
  ChevronRight,
} from 'lucide-react-native';

import {
  RouteType,
  RouteItem,
  POIItem,
  POICategory,
  Coordinate,
  MapTypeOption,
  TrailIncident,
  IncidentType,
  IncidentSeverity,
  GuardianSession,
  MedicalProfile,
  ProtectedArea,
  ConvivenciaRuleItem,
  LegalityLevel,
  ZondaWeatherInfo,
  ZondaAlertLevel,
  WineRouteInfo,
} from '../types/map';
import {
  INITIAL_MENDOZA_REGION,
  MENDOZA_ROUTES,
  MENDOZA_POIS,
  INITIAL_INCIDENTS,
  HIGH_CONTRAST_MAP_STYLE,
  MENDOZA_EMERGENCY_NUMBERS,
  DEFAULT_MEDICAL_PROFILE,
  MENDOZA_PROTECTED_AREAS,
  MENDOZA_CONVIVENCIA_RULES,
  MENDOZA_RANGER_CONTACTS,
  INITIAL_ZONDA_WEATHER,
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

  // Estados Clima & Alerta Zonda (Fase 4: Identidad Mendocina)
  const [zondaWeather, setZondaWeather] = useState<ZondaWeatherInfo>(INITIAL_ZONDA_WEATHER);
  const [isZondaModalVisible, setIsZondaModalVisible] = useState<boolean>(false);

  // Elementos activos seleccionados
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<POIItem | null>(null);

  // Estados de incidentes comunitarios (Waze de la Montaña)
  const [incidents, setIncidents] = useState<TrailIncident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<TrailIncident | null>(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState<boolean>(false);

  // Estados del formulario para nuevo reporte
  const [newType, setNewType] = useState<IncidentType>('landslide');
  const [newSeverity, setNewSeverity] = useState<IncidentSeverity>('media');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  // Estados de Seguridad, Ángel Guardián y SOS (Fase 2)
  const [isSafetyModalVisible, setIsSafetyModalVisible] = useState<boolean>(false);
  const [safetyTab, setSafetyTab] = useState<'guardian' | 'sos' | 'medical'>('guardian');

  const [guardianSession, setGuardianSession] = useState<GuardianSession>({
    isActive: false,
    destination: 'Cerro Arco (1.680m)',
    startedAt: 0,
    expectedReturnAt: 0,
    contactName: 'Contacto de Confianza',
    contactPhone: '+5492615551234',
  });

  const [guardianRemainingSeconds, setGuardianRemainingSeconds] = useState<number>(0);
  const [guardianInputHours, setGuardianInputHours] = useState<number>(2.5);
  const [guardianInputDest, setGuardianInputDest] = useState<string>('Cerro Arco / Precordillera');
  const [guardianInputPhone, setGuardianInputPhone] = useState<string>('+5492615551234');
  const [guardianInputName, setGuardianInputName] = useState<string>('Contacto de Emergencia');

  // Ficha Médica Offline ICE
  const [medicalProfile, setMedicalProfile] = useState<MedicalProfile>(DEFAULT_MEDICAL_PROFILE);

  // Estados de Convivencia y Áreas Protegidas (Fase 3: Semáforo de Legalidad)
  const [showProtectedAreas, setShowProtectedAreas] = useState<boolean>(true);
  const [selectedProtectedArea, setSelectedProtectedArea] = useState<ProtectedArea | null>(null);
  const [isConvivenciaModalVisible, setIsConvivenciaModalVisible] = useState<boolean>(false);
  const [convivenciaTab, setConvivenciaTab] = useState<'manual' | 'reservas' | 'denuncia'>('manual');
  const [denunciaDescription, setDenunciaDescription] = useState<string>('');
  const [denunciaZone, setDenunciaZone] = useState<string>('Reserva Natural Divisadero Largo');
  const [denunciaType, setDenunciaType] = useState<string>('motos_en_reserva');

  const handleSendDenuncia = () => {
    if (!denunciaDescription.trim()) {
      Alert.alert('Faltan detalles', 'Por favor describe la infracción observada en la montaña.');
      return;
    }
    const gpsCoords = userLocation
      ? `${userLocation.latitude.toFixed(5)}, ${userLocation.longitude.toFixed(5)}`
      : '-32.88950, -68.86500 (Precordillera Gran Mendoza)';

    Alert.alert(
      '✅ Denuncia Registrada con GPS',
      `Se ha registrado tu reporte en ${denunciaZone}.\n\nCoordenadas: ${gpsCoords}\n\nPuedes notificar de inmediato a la Policía Rural o Guardaparques para intervención rápida.`,
      [
        {
          text: 'Llamar a Policía Rural',
          onPress: () => Linking.openURL('tel:2614815460'),
        },
        {
          text: 'Llamar a Guardaparques',
          onPress: () => Linking.openURL('tel:2614257065'),
        },
        { text: 'Listo', style: 'cancel' },
      ]
    );
    setDenunciaDescription('');
    setIsConvivenciaModalVisible(false);
  };

  // Efecto de cuenta regresiva en vivo del Ángel Guardián
  useEffect(() => {
    let interval: any = null;
    if (guardianSession.isActive) {
      interval = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((guardianSession.expectedReturnAt - Date.now()) / 1000)
        );
        setGuardianRemainingSeconds(remaining);
        if (remaining === 0) {
          Alert.alert(
            '⚠️ TIEMPO DE RETORNO CUMPLIDO',
            'Tu tiempo estimado en el sendero ha expirado. Si estás a salvo, confirma tu llegada. Si necesitas auxilio, activa el botón SOS.',
            [
              { text: 'Extender 30m', onPress: () => handleExtendGuardian(30) },
              { text: 'Llegué a salvo', onPress: handleFinishGuardian },
              {
                text: 'Abrir SOS',
                onPress: () => {
                  setIsSafetyModalVisible(true);
                  setSafetyTab('sos');
                },
              },
            ]
          );
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [guardianSession.isActive, guardianSession.expectedReturnAt]);

  const handleStartGuardian = () => {
    const now = Date.now();
    const returnAt = now + guardianInputHours * 60 * 60 * 1000;
    setGuardianSession({
      isActive: true,
      destination: guardianInputDest || 'Precordillera Mendoza',
      startedAt: now,
      expectedReturnAt: returnAt,
      contactName: guardianInputName || 'Contacto',
      contactPhone: guardianInputPhone || '+5492615551234',
    });
    setGuardianRemainingSeconds(Math.floor(guardianInputHours * 3600));
    setIsSafetyModalVisible(false);
    Alert.alert(
      '🛡️ Ángel Guardián Activado',
      `Monitoreando regreso para ${guardianInputDest} (${guardianInputHours} horas). Si no confirmas tu regreso, te recordaremos enviar tu alerta.`
    );
  };

  const handleExtendGuardian = (minutes: number = 30) => {
    setGuardianSession((prev) => ({
      ...prev,
      expectedReturnAt: prev.expectedReturnAt + minutes * 60 * 1000,
    }));
    Alert.alert('Tiempo extendido', `Se añadieron ${minutes} minutos a tu temporizador de seguridad.`);
  };

  const handleFinishGuardian = () => {
    setGuardianSession((prev) => ({ ...prev, isActive: false }));
    Alert.alert('¡Excelente!', 'Confirmaste tu regreso a salvo. Que descanses.');
  };

  const handleSendSOSWhatsApp = () => {
    const lat = userLocation?.latitude ?? INITIAL_MENDOZA_REGION.latitude;
    const lng = userLocation?.longitude ?? INITIAL_MENDOZA_REGION.longitude;
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
    const text = encodeURIComponent(
      `🚨 *EMERGENCIA SOS VIATREK MENDOZA* 🚨\n\n` +
      `Necesito auxilio en la montaña / sendero.\n` +
      `📍 Mi ubicación GPS exacta:\n${mapsLink}\n(Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)})\n\n` +
      `🏔️ Destino: ${guardianSession.destination}\n` +
      `👤 Ficha Médica: ${medicalProfile.fullName} | Grupo Sang: ${medicalProfile.bloodType}\n` +
      `⚠️ Alergias/Notas: ${medicalProfile.allergies} | ${medicalProfile.medicalNotes}`
    );

    const cleanPhone = guardianSession.contactPhone.replace(/[^0-9]/g, '');
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp.');
    });
  };

  const handleSendSOSSMS = () => {
    const lat = userLocation?.latitude ?? INITIAL_MENDOZA_REGION.latitude;
    const lng = userLocation?.longitude ?? INITIAL_MENDOZA_REGION.longitude;
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
    const body = encodeURIComponent(
      `EMERGENCIA SOS VIATREK: Auxilio en montana. Ubicacion GPS: ${mapsLink} (${lat.toFixed(5)},${lng.toFixed(5)}). Nombre: ${medicalProfile.fullName} (${medicalProfile.bloodType}).`
    );
    const cleanPhone = guardianSession.contactPhone.replace(/[^0-9]/g, '');
    const url = Platform.select({
      ios: `sms:${cleanPhone}&body=${body}`,
      android: `sms:${cleanPhone}?body=${body}`,
    }) || `sms:${cleanPhone}?body=${body}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir la app de SMS.');
    });
  };

  const handleCallEmergency = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert('Error', `No se pudo iniciar la llamada a ${phone}.`);
    });
  };

  const handleCallDefensaCivil = () => {
    handleCallEmergency('103');
  };

  const handleSimulateZonda = (level: ZondaAlertLevel) => {
    if (level === 'rojo_zonda_severo') {
      setZondaWeather({
        alertLevel: 'rojo_zonda_severo',
        windSpeedKmh: 58,
        gustSpeedKmh: 95,
        temperatureC: 34,
        humidityPercent: 6,
        fireRisk: 'Extremo',
        title: '🚨 ALERTA ROJA: Viento Zonda Severo en Gran Mendoza y Quebradas',
        summary: 'Ráfagas destructivas superiores a 90 km/h bajando en precordillera y el llano. Riesgo crítico de voladura de ramas y ramas caídas.',
        recommendations: [
          'SUSPENDER inmediatamente actividades en senderos y cerros.',
          'Buscar resguardo en zonas urbanas bajo techo seguro.',
          'Prohibición estricta de fuego y circulación vehicular en caminos de montaña.',
          'Extrema precaución por polvo en suspensión y visibilidad nula.',
        ],
        updatedAt: 'Simulación En Vivo • Alerta Roja Zonda',
      });
    } else if (level === 'naranja_alerta') {
      setZondaWeather({
        alertLevel: 'naranja_alerta',
        windSpeedKmh: 42,
        gustSpeedKmh: 75,
        temperatureC: 31,
        humidityPercent: 9,
        fireRisk: 'Extremo',
        title: '🌬️ ALERTA NARANJA: Zonda Fuerte en Precordillera',
        summary: 'Ráfagas intensas en El Challao, Potrerillos y Divisadero. Descenso de aire cálido y seco.',
        recommendations: [
          'No ascender a cumbres expuestas (Cerro Arco, Santo Tomás).',
          'Hidratación forzada por extrema sequedad del aire.',
          'Cuidado con ramas secas en zonas de alamedas y eucaliptos.',
        ],
        updatedAt: 'Simulación En Vivo • Alerta Naranja',
      });
    } else if (level === 'amarillo_precaucion') {
      setZondaWeather(INITIAL_ZONDA_WEATHER);
    } else {
      setZondaWeather({
        alertLevel: 'verde_optimo',
        windSpeedKmh: 12,
        gustSpeedKmh: 20,
        temperatureC: 22,
        humidityPercent: 48,
        fireRisk: 'Bajo',
        title: '🌤️ Condiciones Óptimas para Senderismo y Ciclismo',
        summary: 'Tiempo estable en precordillera y viñedos. Vientos calmos del este, temperatura agradable y excelente visibilidad.',
        recommendations: [
          'Condiciones ideales para todas las modalidades (MTB, Trekking, Moto, Wine & Trail).',
          'Llevar protección solar y agua habitual.',
        ],
        updatedAt: 'Tiempo Estable • Precordillera',
      });
    }
  };

  const formatSecondsToClock = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Rutas filtradas
  const visibleRoutes = useMemo(() => {
    if (selectedFilter === 'todas') return MENDOZA_ROUTES;
    return MENDOZA_ROUTES.filter((route) => route.type === selectedFilter);
  }, [selectedFilter]);

  // Incidentes filtrados según el modo seleccionado
  const visibleIncidents = useMemo(() => {
    if (selectedFilter === 'todas') return incidents;
    return incidents.filter((inc) => inc.affectedModes.includes(selectedFilter));
  }, [selectedFilter, incidents]);

  // Voto: Sigue ahí (+1)
  const handleUpvoteIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id) {
          const updated = { ...inc, upvotes: inc.upvotes + 1 };
          if (selectedIncident?.id === id) setSelectedIncident(updated);
          return updated;
        }
        return inc;
      })
    );
    Alert.alert('¡Gracias!', 'Confirmaste que esta alerta comunitaria sigue activa.');
  };

  // Voto: Ya se despejó (+1)
  const handleResolveIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id) {
          const updated = { ...inc, resolvedVotes: inc.resolvedVotes + 1 };
          if (selectedIncident?.id === id) setSelectedIncident(updated);
          return updated;
        }
        return inc;
      })
    );
    Alert.alert('¡Excelente noticia!', 'Reportaste que este obstáculo ya fue despejado.');
  };

  // Publicar nuevo reporte comunitario
  const handleSubmitIncident = () => {
    if (!newTitle.trim()) {
      Alert.alert('Falta título', 'Por favor ingresa un título o descripción breve para la alerta.');
      return;
    }

    const coordinate = userLocation || {
      latitude: INITIAL_MENDOZA_REGION.latitude + (Math.random() - 0.5) * 0.03,
      longitude: INITIAL_MENDOZA_REGION.longitude + (Math.random() - 0.5) * 0.03,
    };

    const newIncident: TrailIncident = {
      id: `inc-${Date.now()}`,
      type: newType,
      title: newTitle.trim(),
      description: newDescription.trim() || 'Reportado en tiempo real por la comunidad ViaTrek.',
      severity: newSeverity,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      reportedAt: 'Recién',
      affectedModes:
        selectedFilter === 'todas'
          ? ['ciclovia', 'sendero_mtb', 'moto_trail']
          : [selectedFilter],
      upvotes: 1,
      resolvedVotes: 0,
      author: 'Tú (Explorador ViaTrek)',
    };

    setIncidents((prev) => [newIncident, ...prev]);
    setSelectedRoute(null);
    setSelectedPoi(null);
    setSelectedIncident(newIncident);
    setIsReportModalVisible(false);
    setNewTitle('');
    setNewDescription('');

    mapRef.current?.animateToRegion(
      {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      700
    );

    Alert.alert('¡Alerta publicada!', 'Tu reporte ya está visible en el mapa para todos los usuarios.');
  };

  const getIncidentIcon = (type: IncidentType) => {
    switch (type) {
      case 'landslide':
        return '⚠️';
      case 'thorns':
        return '🌵';
      case 'water':
        return '💧';
      case 'animals':
        return '🐕';
      case 'blocked':
        return '🚧';
      case 'caution':
        return '⚡';
      default:
        return '⚠️';
    }
  };

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'alta':
        return '#FF1744';
      case 'media':
        return '#FF9100';
      case 'baja':
        return '#00E5FF';
      default:
        return '#FF9100';
    }
  };

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
    if (selectedFilter === 'wine_trail') {
      return MENDOZA_POIS.filter(
        (p) =>
          p.category === 'bodega_wine' ||
          p.category === 'refugio_almacen' ||
          p.category === 'trailhead' ||
          p.category === 'hidratacion'
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
      case 'bodega_wine':
        return '#E91E63'; // Rosa Malbec / Enoturismo
      case 'refugio_almacen':
        return '#FF9100'; // Naranja pulpería
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
      case 'bodega_wine':
        return <Wine size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'refugio_almacen':
        return <Sparkles size={16} color="#0B0F17" strokeWidth={2.4} />;
      default:
        return <MapPin size={16} color="#0B0F17" strokeWidth={2.4} />;
    }
  };

  const getZondaBadgeColor = (level: ZondaAlertLevel) => {
    switch (level) {
      case 'verde_optimo':
        return '#00E676';
      case 'amarillo_precaucion':
        return '#FFD600';
      case 'naranja_alerta':
        return '#FF6D00';
      case 'rojo_zonda_severo':
        return '#FF1744';
      default:
        return '#FFD600';
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

        {/* ÁREAS NATURALES PROTEGIDAS & ZONAS REGULADAS (SEMÁFORO DE LEGALIDAD) */}
        {showProtectedAreas &&
          MENDOZA_PROTECTED_AREAS.map((area) => (
            <Polygon
              key={area.id}
              coordinates={area.coordinates}
              fillColor={area.fillColor}
              strokeColor={area.strokeColor}
              strokeWidth={2}
              tappable={true}
              onPress={() => {
                setSelectedRoute(null);
                setSelectedPoi(null);
                setSelectedIncident(null);
                setSelectedProtectedArea(area);
              }}
            />
          ))}

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

        {/* REPORTES COMUNITARIOS EN TIEMPO REAL (WAZE DE LA MONTAÑA) */}
        {visibleIncidents.map((incident) => {
          const isSelected = selectedIncident?.id === incident.id;
          const severityColor = getSeverityColor(incident.severity);

          return (
            <Marker
              key={incident.id}
              coordinate={{ latitude: incident.latitude, longitude: incident.longitude }}
              title={incident.title}
              description={incident.description}
              onPress={() => {
                setSelectedRoute(null);
                setSelectedPoi(null);
                setSelectedIncident(incident);
              }}
            >
              <View
                style={[
                  styles.incidentMarkerCasing,
                  { borderColor: severityColor },
                  isSelected && styles.incidentMarkerSelected,
                ]}
              >
                <View
                  style={[
                    styles.incidentMarkerInner,
                    { backgroundColor: severityColor },
                  ]}
                >
                  <Text style={styles.incidentMarkerEmoji}>
                    {getIncidentIcon(incident.type)}
                  </Text>
                </View>
                {incident.severity === 'alta' && (
                  <View style={styles.incidentBadgeAlert}>
                    <Text style={styles.incidentBadgeAlertText}>!</Text>
                  </View>
                )}
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

          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedFilter === 'wine_trail' && styles.filterPillActiveWine,
            ]}
            onPress={() => {
              setSelectedFilter('wine_trail');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Wine
              size={15}
              color={selectedFilter === 'wine_trail' ? '#E91E63' : '#94A3B8'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'wine_trail' && { color: '#E91E63', fontWeight: '700' },
              ]}
            >
              Wine & Trail
            </Text>
          </TouchableOpacity>
        </View>

        {/* Badge contador de rutas activas e incidentes en vivo */}
        <View style={styles.statsBadge}>
          <Text style={styles.statsBadgeText}>
            Mendoza • {visibleRoutes.length} rutas • {visiblePois.length} POIs • ⚠️ {visibleIncidents.length} alertas en vivo
          </Text>
        </View>
      </View>

      {/* BARRA FLOTANTE: ÁNGEL GUARDIÁN ACTIVO (CUENTA REGRESIVA EN VIVO) */}
      {guardianSession.isActive && (
        <View style={[styles.guardianBanner, { top: insets.top + 78 }]}>
          <View style={styles.guardianBannerLeft}>
            <View style={styles.guardianPulseDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.guardianBannerTitle} numberOfLines={1}>
                GUARDIÁN ACTIVO • {guardianSession.destination}
              </Text>
              <Text style={styles.guardianBannerCountdown}>
                ⏱️ Regreso en: {formatSecondsToClock(guardianRemainingSeconds)}
              </Text>
            </View>
          </View>

          <View style={styles.guardianBannerActions}>
            <TouchableOpacity
              style={styles.guardianBannerExtendBtn}
              onPress={() => handleExtendGuardian(30)}
              activeOpacity={0.8}
            >
              <Text style={styles.guardianBannerExtendText}>+30m</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.guardianBannerSafeBtn}
              onPress={handleFinishGuardian}
              activeOpacity={0.85}
            >
              <CheckCircle2 size={13} color="#05080E" strokeWidth={3} />
              <Text style={styles.guardianBannerSafeText}>A salvo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* BANNER FLOTANTE: ALERTA VIENTO ZONDA EN VIVO (FASE 4: IDENTIDAD MENDOCINA) */}
      <TouchableOpacity
        style={[
          styles.zondaBanner,
          {
            top: insets.top + (guardianSession.isActive ? 132 : 78),
            borderColor: getZondaBadgeColor(zondaWeather.alertLevel),
          },
        ]}
        onPress={() => setIsZondaModalVisible(true)}
        activeOpacity={0.88}
      >
        <View style={styles.zondaBannerLeft}>
          <View
            style={[
              styles.zondaPulseDot,
              { backgroundColor: getZondaBadgeColor(zondaWeather.alertLevel) },
            ]}
          />
          <Wind size={15} color={getZondaBadgeColor(zondaWeather.alertLevel)} strokeWidth={2.5} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.zondaBannerTitle}>
                {zondaWeather.alertLevel === 'rojo_zonda_severo'
                  ? '🚨 ZONDA SEVERO EN PRECORDILLERA'
                  : zondaWeather.alertLevel === 'naranja_alerta'
                  ? '🌬️ ALERTA VIENTO ZONDA'
                  : '⚠️ PRECAUCIÓN ZONDA'}
              </Text>
              <View
                style={[
                  styles.zondaLevelBadge,
                  { backgroundColor: getZondaBadgeColor(zondaWeather.alertLevel) + '30' },
                ]}
              >
                <Text
                  style={[
                    styles.zondaLevelBadgeText,
                    { color: getZondaBadgeColor(zondaWeather.alertLevel) },
                  ]}
                >
                  {zondaWeather.gustSpeedKmh} km/h
                </Text>
              </View>
            </View>
            <Text style={styles.zondaBannerSubtitle} numberOfLines={1}>
              Humedad {zondaWeather.humidityPercent}% • {zondaWeather.temperatureC}°C • Fuego: {zondaWeather.fireRisk.toUpperCase()}
            </Text>
          </View>
        </View>
        <ChevronRight size={16} color="#94A3B8" />
      </TouchableOpacity>

      {/* FABs: BOTONES LATERALES DE ACCIÓN */}
      <View style={[styles.fabContainer, { top: insets.top + (guardianSession.isActive ? 190 : 136) }]}>
        {/* Botón Seguridad & SOS (Fase 2) */}
        <TouchableOpacity
          style={[
            styles.fabButton,
            styles.fabSafetyButton,
            guardianSession.isActive && styles.fabSafetyButtonActive,
          ]}
          onPress={() => setIsSafetyModalVisible(true)}
          activeOpacity={0.85}
        >
          <ShieldAlert
            size={21}
            color={guardianSession.isActive ? '#00E676' : '#FF1744'}
          />
        </TouchableOpacity>

        {/* Botón Waze de la Montaña: Reportar Alerta en tiempo real */}
        <TouchableOpacity
          style={[styles.fabButton, styles.fabReportButton]}
          onPress={() => setIsReportModalVisible(true)}
          activeOpacity={0.85}
        >
          <AlertTriangle size={20} color="#FFD600" />
          {visibleIncidents.length > 0 && (
            <View style={styles.fabReportBadge}>
              <Text style={styles.fabReportBadgeText}>{visibleIncidents.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Botón Semáforo de Legalidad & Manual de Convivencia (Fase 3) */}
        <TouchableOpacity
          style={[
            styles.fabButton,
            styles.fabConvivenciaButton,
            showProtectedAreas && styles.fabConvivenciaButtonActive,
          ]}
          onPress={() => setIsConvivenciaModalVisible(true)}
          activeOpacity={0.85}
        >
          <Scale size={20} color={showProtectedAreas ? '#00E676' : '#F8FAFC'} />
          <View style={styles.fabMiniBadge}>
            <Text style={styles.fabMiniBadgeText}>⚖️</Text>
          </View>
        </TouchableOpacity>

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

          {/* SEMÁFORO DE LEGALIDAD & CONVIVENCIA (FASE 3) */}
          <View style={styles.legalityContainer}>
            <View style={styles.legalityHeaderRow}>
              <View
                style={[
                  styles.legalityBadge,
                  {
                    backgroundColor: selectedRoute.legality.tagColor + '20',
                    borderColor: selectedRoute.legality.tagColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.legalityBadgeText,
                    { color: selectedRoute.legality.tagColor },
                  ]}
                >
                  {selectedRoute.legality.badgeText}
                </Text>
              </View>

              <View style={styles.allowedModesPillsRow}>
                <View
                  style={[
                    styles.modePill,
                    selectedRoute.legality.allowedModes.trekking
                      ? styles.modePillAllowed
                      : styles.modePillForbidden,
                  ]}
                >
                  <Text style={styles.modePillText}>
                    🥾 {selectedRoute.legality.allowedModes.trekking ? '✓' : '✕'}
                  </Text>
                </View>
                <View
                  style={[
                    styles.modePill,
                    selectedRoute.legality.allowedModes.bicycle
                      ? styles.modePillAllowed
                      : styles.modePillForbidden,
                  ]}
                >
                  <Text style={styles.modePillText}>
                    🚴 {selectedRoute.legality.allowedModes.bicycle ? '✓' : '✕'}
                  </Text>
                </View>
                <View
                  style={[
                    styles.modePill,
                    selectedRoute.legality.allowedModes.moto
                      ? styles.modePillAllowed
                      : styles.modePillForbidden,
                  ]}
                >
                  <Text style={styles.modePillText}>
                    🏍️ {selectedRoute.legality.allowedModes.moto ? '✓' : '✕'}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.priorityRuleText}>
              📌 <Text style={{ fontWeight: '700', color: '#F8FAFC' }}>Norma de Paso:</Text>{' '}
              {selectedRoute.legality.priorityRule}
            </Text>

            {/* Advertencia Legal si el usuario activó modo moto e intenta transitar en zona ecológica */}
            {selectedFilter === 'moto_trail' && !selectedRoute.legality.allowedModes.moto && (
              <View style={styles.motorWarningBox}>
                <AlertTriangle size={15} color="#FF1744" />
                <Text style={styles.motorWarningText}>
                  {selectedRoute.legality.legalWarning ||
                    'Zona protegida por Guardaparques. Prohibido circular con vehículos a motor.'}
                </Text>
              </View>
            )}
          </View>

          {/* EXPERIENCIA ENOTURÍSTICA: WINE & TRAIL (FASE 4) */}
          {selectedRoute.wineInfo && (
            <View style={styles.wineInfoContainer}>
              <View style={styles.wineInfoHeaderRow}>
                <Wine size={16} color="#E91E63" strokeWidth={2.4} />
                <Text style={styles.wineInfoTitle}>CIRCUITO WINE & TRAIL MENDOZA</Text>
              </View>
              <Text style={styles.wineInfoDesc}>
                🚲 Bici recomendada:{' '}
                <Text style={{ color: '#F8FAFC', fontWeight: '700' }}>
                  {selectedRoute.wineInfo.recommendedBike}
                </Text>{' '}
                • {selectedRoute.wineInfo.gravelType}
              </Text>
              <View style={styles.wineWineriesRow}>
                {selectedRoute.wineInfo.wineries.map((winery, idx) => (
                  <View key={idx} style={styles.wineWineryBadge}>
                    <Text style={styles.wineWineryBadgeText}>🍷 {winery}</Text>
                  </View>
                ))}
              </View>
              {selectedRoute.wineInfo.tastingPoints.length > 0 && (
                <Text style={styles.wineTastingPointsText}>
                  📍 Paradas sugeridas: {selectedRoute.wineInfo.tastingPoints.join(' • ')}
                </Text>
              )}
            </View>
          )}

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

      {/* TARJETA INFERIOR: DETALLES DE ÁREA NATURAL PROTEGIDA (FASE 3) */}
      {selectedProtectedArea && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.cardHeaderTopRow}>
                <View
                  style={[
                    styles.legalityBadge,
                    {
                      backgroundColor: selectedProtectedArea.strokeColor + '25',
                      borderColor: selectedProtectedArea.strokeColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.legalityBadgeText,
                      { color: selectedProtectedArea.strokeColor },
                    ]}
                  >
                    {selectedProtectedArea.category === 'reserva_natural'
                      ? '🛡️ RESERVA PROTEGIDA'
                      : selectedProtectedArea.category === 'circuito_enduro'
                      ? '🏍️ CIRCUITO HABILITADO'
                      : '🌳 ZONA RECREATIVA'}
                  </Text>
                </View>
                <Text style={styles.zoneText}>{selectedProtectedArea.authority}</Text>
              </View>

              <Text style={styles.cardTitle} numberOfLines={2}>
                {selectedProtectedArea.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedProtectedArea(null)}
              style={styles.closeBtn}
            >
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardDescription}>{selectedProtectedArea.description}</Text>

          <View style={styles.protectedRulesBox}>
            <Text style={styles.protectedRulesHeader}>Reglamento de Convivencia y Acceso:</Text>
            {selectedProtectedArea.rules.map((rule, idx) => (
              <Text key={idx} style={styles.protectedRuleText}>
                {rule}
              </Text>
            ))}
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.focusRouteButton}
              onPress={() => {
                setSelectedProtectedArea(null);
                setIsConvivenciaModalVisible(true);
              }}
              activeOpacity={0.85}
            >
              <ScrollText size={16} color="#00E676" />
              <Text style={styles.focusRouteButtonText}>Guía Completa</Text>
            </TouchableOpacity>

            {selectedProtectedArea.contactRanger && (
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => Linking.openURL(`tel:${selectedProtectedArea.contactRanger}`)}
                activeOpacity={0.88}
              >
                <PhoneCall size={16} color="#05080E" />
                <Text style={styles.navigateButtonText}>Guardaparques</Text>
              </TouchableOpacity>
            )}
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

      {/* TARJETA INFERIOR: DETALLES DE INCIDENTE COMUNITARIO (WAZE DE LA MONTAÑA) */}
      {selectedIncident && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.cardHeaderTopRow}>
                <View
                  style={[
                    styles.severityBadge,
                    { backgroundColor: getSeverityColor(selectedIncident.severity) },
                  ]}
                >
                  <Text style={styles.severityBadgeText}>
                    ALERTA {selectedIncident.severity.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.incidentTimeText}>
                  🕒 {selectedIncident.reportedAt} • {selectedIncident.author}
                </Text>
              </View>

              <View style={styles.incidentTitleRow}>
                <Text style={styles.incidentEmojiLarge}>
                  {getIncidentIcon(selectedIncident.type)}
                </Text>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {selectedIncident.title}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedIncident(null)}
              style={styles.closeBtn}
            >
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardDescription}>{selectedIncident.description}</Text>

          {/* Modos afectados */}
          <View style={styles.affectedModesRow}>
            <Text style={styles.affectedModesLabel}>Afecta a:</Text>
            {selectedIncident.affectedModes.map((m) => (
              <View key={m} style={styles.affectedModeBadge}>
                <Text style={styles.affectedModeBadgeText}>
                  {m === 'ciclovia' ? '🚴 Ciclovía' : m === 'sendero_mtb' ? '🚵 MTB' : '🏍️ Moto'}
                </Text>
              </View>
            ))}
          </View>

          {/* Botones de validación comunitaria */}
          <View style={styles.incidentVotesRow}>
            <TouchableOpacity
              style={styles.voteStayBtn}
              onPress={() => handleUpvoteIncident(selectedIncident.id)}
              activeOpacity={0.85}
            >
              <ThumbsUp size={16} color="#FFD600" />
              <Text style={styles.voteStayBtnText}>
                ¡Sigue ahí! ({selectedIncident.upvotes})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.voteResolvedBtn}
              onPress={() => handleResolveIncident(selectedIncident.id)}
              activeOpacity={0.85}
            >
              <CheckCircle2 size={16} color="#00E676" />
              <Text style={styles.voteResolvedBtnText}>
                Ya se despejó ({selectedIncident.resolvedVotes})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* MODAL: REPORTAR NUEVA ALERTA COMUNITARIA */}
      <Modal
        visible={isReportModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsReportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <AlertTriangle size={20} color="#FFD600" />
                <Text style={styles.modalTitle}>Reportar Alerta en Sendero</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsReportModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalSubtitle}>
                Advierte a la comunidad en tiempo real sobre obstáculos, agua o peligros en la montaña.
              </Text>

              {/* Selector de Tipo de Incidente */}
              <Text style={styles.inputSectionLabel}>TIPO DE ALERTA</Text>
              <View style={styles.typeGrid}>
                {[
                  { type: 'landslide' as IncidentType, label: 'Derrumbe', icon: '⚠️' },
                  { type: 'thorns' as IncidentType, label: 'Espinas', icon: '🌵' },
                  { type: 'water' as IncidentType, label: 'Agua/Vertiente', icon: '💧' },
                  { type: 'animals' as IncidentType, label: 'Animales', icon: '🐕' },
                  { type: 'blocked' as IncidentType, label: 'Paso Cerrado', icon: '🚧' },
                  { type: 'caution' as IncidentType, label: 'Precaución', icon: '⚡' },
                ].map((item) => {
                  const isChosen = newType === item.type;
                  return (
                    <TouchableOpacity
                      key={item.type}
                      style={[styles.typeOption, isChosen && styles.typeOptionActive]}
                      onPress={() => setNewType(item.type)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.typeOptionIcon}>{item.icon}</Text>
                      <Text
                        style={[
                          styles.typeOptionLabel,
                          isChosen && styles.typeOptionLabelActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Selector de Severidad */}
              <Text style={styles.inputSectionLabel}>NIVEL DE SEVERIDAD</Text>
              <View style={styles.severityRow}>
                {[
                  { sev: 'baja' as IncidentSeverity, label: 'Baja', color: '#00E5FF' },
                  { sev: 'media' as IncidentSeverity, label: 'Media', color: '#FF9100' },
                  { sev: 'alta' as IncidentSeverity, label: 'Alta', color: '#FF1744' },
                ].map((item) => {
                  const isChosen = newSeverity === item.sev;
                  return (
                    <TouchableOpacity
                      key={item.sev}
                      style={[
                        styles.severityOption,
                        isChosen && { borderColor: item.color, backgroundColor: `${item.color}22` },
                      ]}
                      onPress={() => setNewSeverity(item.sev)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.severityOptionLabel,
                          isChosen && { color: item.color, fontWeight: '700' },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Título de la alerta */}
              <Text style={styles.inputSectionLabel}>TÍTULO CORTO</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej: Piedras sueltas tras lluvia en curva 3"
                placeholderTextColor="#64748B"
                value={newTitle}
                onChangeText={setNewTitle}
              />

              {/* Descripción detallada */}
              <Text style={styles.inputSectionLabel}>DETALLES / RECOMENDACIÓN</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Ej: Bajar despacio en moto, llevar líquido tubeless..."
                placeholderTextColor="#64748B"
                value={newDescription}
                onChangeText={setNewDescription}
                multiline
                numberOfLines={3}
              />

              {/* Botón de Publicar */}
              <TouchableOpacity
                style={styles.submitIncidentButton}
                onPress={handleSubmitIncident}
                activeOpacity={0.88}
              >
                <Plus size={18} color="#05080E" strokeWidth={3} />
                <Text style={styles.submitIncidentButtonText}>
                  Publicar Alerta Comunitaria
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL: SUITE DE SEGURIDAD, ÁNGEL GUARDIÁN Y SOS INTELIGENTE (FASE 2) */}
      <Modal
        visible={isSafetyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSafetyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.safetyModalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <ShieldAlert size={22} color="#FF1744" />
                <Text style={styles.modalTitle}>Seguridad & SOS de Montaña</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsSafetyModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Pestañas de la suite de seguridad */}
            <View style={styles.safetyTabsWrapper}>
              <TouchableOpacity
                style={[styles.safetyTabBtn, safetyTab === 'guardian' && styles.safetyTabBtnActive]}
                onPress={() => setSafetyTab('guardian')}
              >
                <Timer size={14} color={safetyTab === 'guardian' ? '#05080E' : '#94A3B8'} />
                <Text style={[styles.safetyTabBtnText, safetyTab === 'guardian' && styles.safetyTabBtnTextActive]}>
                  Ángel Guardián
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.safetyTabBtn, safetyTab === 'sos' && styles.safetyTabBtnActiveSos]}
                onPress={() => setSafetyTab('sos')}
              >
                <Radio size={14} color={safetyTab === 'sos' ? '#FFFFFF' : '#FF1744'} />
                <Text style={[styles.safetyTabBtnText, safetyTab === 'sos' && styles.safetyTabBtnTextActiveSos]}>
                  Disparador SOS
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.safetyTabBtn, safetyTab === 'medical' && styles.safetyTabBtnActive]}
                onPress={() => setSafetyTab('medical')}
              >
                <HeartPulse size={14} color={safetyTab === 'medical' ? '#05080E' : '#94A3B8'} />
                <Text style={[styles.safetyTabBtnText, safetyTab === 'medical' && styles.safetyTabBtnTextActive]}>
                  Ficha Médica
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* TAB 1: ÁNGEL GUARDIÁN */}
              {safetyTab === 'guardian' && (
                <View>
                  <Text style={styles.modalSubtitle}>
                    Temporizador preventivo de regreso. Si no confirmas tu llegada al vencer el plazo, la app te asistirá con tu alerta SOS.
                  </Text>

                  {guardianSession.isActive ? (
                    <View style={styles.guardianActiveBox}>
                      <View style={styles.guardianActiveHeader}>
                        <View style={styles.guardianPulseDot} />
                        <Text style={styles.guardianActiveTitle}>MONITOREO EN CURSO</Text>
                      </View>
                      <Text style={styles.guardianActiveDest}>{guardianSession.destination}</Text>
                      <Text style={styles.guardianCountdownBig}>
                        {formatSecondsToClock(guardianRemainingSeconds)}
                      </Text>
                      <Text style={styles.guardianActiveSubtext}>
                        Contacto notificado: {guardianSession.contactName} ({guardianSession.contactPhone})
                      </Text>

                      <View style={styles.guardianActiveActions}>
                        <TouchableOpacity
                          style={styles.guardianExtendBigBtn}
                          onPress={() => handleExtendGuardian(30)}
                        >
                          <Text style={styles.guardianExtendBigBtnText}>+30 Minutos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.guardianFinishBigBtn}
                          onPress={() => {
                            handleFinishGuardian();
                            setIsSafetyModalVisible(false);
                          }}
                        >
                          <CheckCircle2 size={16} color="#05080E" strokeWidth={3} />
                          <Text style={styles.guardianFinishBigBtnText}>Llegué a Salvo ✅</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.inputSectionLabel}>DESTINO ESTIMADO</Text>
                      <TextInput
                        style={styles.textInput}
                        value={guardianInputDest}
                        onChangeText={setGuardianInputDest}
                        placeholder="Ej: Cerro Arco, Chacras MTB, Crucesita..."
                        placeholderTextColor="#64748B"
                      />

                      <Text style={styles.inputSectionLabel}>DURACIÓN ESTIMADA</Text>
                      <View style={styles.hoursChipRow}>
                        {[1, 2, 2.5, 3, 4, 5].map((h) => {
                          const isSel = guardianInputHours === h;
                          return (
                            <TouchableOpacity
                              key={h}
                              style={[styles.hourChip, isSel && styles.hourChipActive]}
                              onPress={() => setGuardianInputHours(h)}
                            >
                              <Text style={[styles.hourChipText, isSel && styles.hourChipTextActive]}>
                                {h}h
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      <Text style={styles.inputSectionLabel}>NOMBRE CONTACTO DE EMERGENCIA</Text>
                      <TextInput
                        style={styles.textInput}
                        value={guardianInputName}
                        onChangeText={setGuardianInputName}
                        placeholder="Nombre de familiar o amigo"
                        placeholderTextColor="#64748B"
                      />

                      <Text style={styles.inputSectionLabel}>TELÉFONO DE CONFIANZA (WHATSAPP/SMS)</Text>
                      <TextInput
                        style={styles.textInput}
                        value={guardianInputPhone}
                        onChangeText={setGuardianInputPhone}
                        placeholder="+54 9 261..."
                        keyboardType="phone-pad"
                        placeholderTextColor="#64748B"
                      />

                      <TouchableOpacity
                        style={styles.startGuardianButton}
                        onPress={handleStartGuardian}
                        activeOpacity={0.88}
                      >
                        <Shield size={18} color="#05080E" strokeWidth={2.8} />
                        <Text style={styles.startGuardianButtonText}>
                          Activar Ángel Guardián 🛡️
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              {/* TAB 2: DISPARADOR SOS */}
              {safetyTab === 'sos' && (
                <View>
                  <Text style={styles.modalSubtitle}>
                    Envía de inmediato tus coordenadas GPS y ficha médica sin requerir datos móviles pesados.
                  </Text>

                  {/* Coordenadas en tiempo real */}
                  <View style={styles.sosCoordsBox}>
                    <Text style={styles.sosCoordsLabel}>TU ÚLTIMA POSICIÓN GPS DETECTADA:</Text>
                    <Text style={styles.sosCoordsValue}>
                      Lat: {userLocation?.latitude?.toFixed(5) || INITIAL_MENDOZA_REGION.latitude.toFixed(5)} • Lng: {userLocation?.longitude?.toFixed(5) || INITIAL_MENDOZA_REGION.longitude.toFixed(5)}
                    </Text>
                  </View>

                  {/* Botón WhatsApp SOS */}
                  <TouchableOpacity
                    style={styles.sosWhatsAppBtn}
                    onPress={handleSendSOSWhatsApp}
                    activeOpacity={0.88}
                  >
                    <Send size={18} color="#FFFFFF" strokeWidth={2.6} />
                    <Text style={styles.sosWhatsAppBtnText}>
                      Enviar Alerta SOS por WhatsApp 📲
                    </Text>
                  </TouchableOpacity>

                  {/* Botón SMS SOS (Offline) */}
                  <TouchableOpacity
                    style={styles.sosSmsBtn}
                    onPress={handleSendSOSSMS}
                    activeOpacity={0.88}
                  >
                    <Radio size={18} color="#05080E" strokeWidth={2.6} />
                    <Text style={styles.sosSmsBtnText}>
                      Enviar SOS por SMS (Funciona con 1 Raya) 💬
                    </Text>
                  </TouchableOpacity>

                  {/* Números de rescate en Mendoza */}
                  <Text style={styles.emergencyNumbersHeader}>
                    Llamada de Rescate Directa (Mendoza):
                  </Text>
                  {MENDOZA_EMERGENCY_NUMBERS.map((em) => (
                    <TouchableOpacity
                      key={em.number}
                      style={styles.emergencyNumberCard}
                      onPress={() => handleCallEmergency(em.number)}
                      activeOpacity={0.8}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.emergencyCardName}>{em.name}</Text>
                        <Text style={styles.emergencyCardDesc}>{em.desc}</Text>
                      </View>
                      <View style={styles.emergencyCardCallBtn}>
                        <PhoneCall size={15} color="#05080E" strokeWidth={2.8} />
                        <Text style={styles.emergencyCardNumber}>{em.number}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* TAB 3: FICHA MÉDICA ICE */}
              {safetyTab === 'medical' && (
                <View>
                  <Text style={styles.modalSubtitle}>
                    Ficha médica guardada en el dispositivo. Permite a brigadas de auxilio y compañeros conocer datos vitales en caso de incidente.
                  </Text>

                  <Text style={styles.inputSectionLabel}>NOMBRE COMPLETO</Text>
                  <TextInput
                    style={styles.textInput}
                    value={medicalProfile.fullName}
                    onChangeText={(val) => setMedicalProfile({ ...medicalProfile, fullName: val })}
                  />

                  <Text style={styles.inputSectionLabel}>GRUPO SANGUÍNEO</Text>
                  <View style={styles.bloodGroupRow}>
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+'].map((bg) => {
                      const isBgSel = medicalProfile.bloodType === bg;
                      return (
                        <TouchableOpacity
                          key={bg}
                          style={[styles.bloodChip, isBgSel && styles.bloodChipActive]}
                          onPress={() => setMedicalProfile({ ...medicalProfile, bloodType: bg })}
                        >
                          <Text style={[styles.bloodChipText, isBgSel && styles.bloodChipTextActive]}>
                            {bg}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={styles.inputSectionLabel}>ALERGIAS O MEDICACIÓN CRÍTICA</Text>
                  <TextInput
                    style={styles.textInput}
                    value={medicalProfile.allergies}
                    onChangeText={(val) => setMedicalProfile({ ...medicalProfile, allergies: val })}
                    placeholder="Ej: Alérgico a penicilina, ibuprofeno..."
                    placeholderTextColor="#64748B"
                  />

                  <Text style={styles.inputSectionLabel}>TELÉFONO DE CONTACTO ICE</Text>
                  <TextInput
                    style={styles.textInput}
                    value={medicalProfile.emergencyContactPhone}
                    onChangeText={(val) => setMedicalProfile({ ...medicalProfile, emergencyContactPhone: val })}
                    placeholder="+549..."
                    keyboardType="phone-pad"
                    placeholderTextColor="#64748B"
                  />

                  <Text style={styles.inputSectionLabel}>OBRA SOCIAL / SEGURO MÉDICO</Text>
                  <TextInput
                    style={styles.textInput}
                    value={medicalProfile.healthInsurance}
                    onChangeText={(val) => setMedicalProfile({ ...medicalProfile, healthInsurance: val })}
                    placeholder="Ej: OSDE / OSEP / Particular"
                    placeholderTextColor="#64748B"
                  />

                  <Text style={styles.inputSectionLabel}>NOTAS ADICIONALES PARA RESCATISTAS</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={medicalProfile.medicalNotes}
                    onChangeText={(val) => setMedicalProfile({ ...medicalProfile, medicalNotes: val })}
                    multiline
                  />

                  <TouchableOpacity
                    style={styles.saveMedicalBtn}
                    onPress={() => {
                      Alert.alert('Ficha Guardada', 'Tus datos médicos de emergencia están actualizados y disponibles offline.');
                      setIsSafetyModalVisible(false);
                    }}
                    activeOpacity={0.88}
                  >
                    <CheckCircle2 size={18} color="#05080E" strokeWidth={3} />
                    <Text style={styles.saveMedicalBtnText}>Guardar Ficha Médica</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL: MANUAL DE CONVIVENCIA & ÁREAS PROTEGIDAS (FASE 3) */}
      <Modal
        visible={isConvivenciaModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsConvivenciaModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Scale size={22} color="#00E676" />
                <Text style={styles.modalTitle}>Convivencia & Áreas Protegidas</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsConvivenciaModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Pestañas del Modal */}
            <View style={styles.safetyTabsWrapper}>
              <TouchableOpacity
                style={[styles.safetyTabBtn, convivenciaTab === 'manual' && styles.safetyTabBtnActive]}
                onPress={() => setConvivenciaTab('manual')}
                activeOpacity={0.8}
              >
                <BookOpen
                  size={15}
                  color={convivenciaTab === 'manual' ? '#00E676' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.safetyTabBtnText,
                    convivenciaTab === 'manual' && styles.safetyTabBtnTextActive,
                  ]}
                >
                  Manual
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.safetyTabBtn, convivenciaTab === 'reservas' && styles.safetyTabBtnActive]}
                onPress={() => setConvivenciaTab('reservas')}
                activeOpacity={0.8}
              >
                <Trees
                  size={15}
                  color={convivenciaTab === 'reservas' ? '#00E676' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.safetyTabBtnText,
                    convivenciaTab === 'reservas' && styles.safetyTabBtnTextActive,
                  ]}
                >
                  Reservas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.safetyTabBtn, convivenciaTab === 'denuncia' && styles.safetyTabBtnActive]}
                onPress={() => setConvivenciaTab('denuncia')}
                activeOpacity={0.8}
              >
                <AlertOctagon
                  size={15}
                  color={convivenciaTab === 'denuncia' ? '#FF1744' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.safetyTabBtnText,
                    convivenciaTab === 'denuncia' && { color: '#FF1744', fontWeight: '800' },
                  ]}
                >
                  Denunciar
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* TAB 1: MANUAL DE CONVIVENCIA */}
              {convivenciaTab === 'manual' && (
                <View>
                  <Text style={styles.modalSubtitle}>
                    Los 5 mandamientos de la montaña mendocina para garantizar el disfrute compartido, la seguridad deportiva y la conservación ambiental.
                  </Text>

                  {MENDOZA_CONVIVENCIA_RULES.map((rule) => (
                    <View key={rule.id} style={styles.convivenciaCard}>
                      <View style={styles.convivenciaCardHeader}>
                        <Text style={styles.convivenciaIcon}>{rule.icon}</Text>
                        <Text style={styles.convivenciaTitle}>{rule.title}</Text>
                      </View>
                      <Text style={styles.convivenciaDesc}>{rule.description}</Text>
                      {rule.penaltyNote && (
                        <View style={styles.convivenciaPenaltyBox}>
                          <ShieldAlert size={14} color="#FFD600" />
                          <Text style={styles.convivenciaPenaltyText}>{rule.penaltyNote}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* TAB 2: MAPA DE RESERVAS & GUARDAPARQUES */}
              {convivenciaTab === 'reservas' && (
                <View>
                  <Text style={styles.modalSubtitle}>
                    Zonificación oficial de Mendoza. Pulsa para contactar destacamentos o ver normativas específicas.
                  </Text>

                  {MENDOZA_PROTECTED_AREAS.map((area) => (
                    <View
                      key={area.id}
                      style={[
                        styles.protectedAreaCard,
                        { borderLeftColor: area.strokeColor },
                      ]}
                    >
                      <View style={styles.protectedAreaHeader}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.protectedAreaName}>{area.name}</Text>
                          <Text style={styles.protectedAreaAuth}>{area.authority}</Text>
                        </View>
                        <View
                          style={[
                            styles.areaCategoryBadge,
                            { backgroundColor: area.strokeColor + '20', borderColor: area.strokeColor },
                          ]}
                        >
                          <Text style={[styles.areaCategoryText, { color: area.strokeColor }]}>
                            {area.category === 'reserva_natural'
                              ? 'Reserva'
                              : area.category === 'circuito_enduro'
                              ? 'Enduro'
                              : 'Parque'}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.protectedAreaDesc}>{area.description}</Text>

                      <View style={styles.allowedIconsRowSmall}>
                        <Text style={styles.allowedPillSmall}>
                          🥾 {area.allowedModes.trekking ? 'Permitido' : 'No apto'}
                        </Text>
                        <Text style={styles.allowedPillSmall}>
                          🚴 {area.allowedModes.bicycle ? 'Permitido' : 'No apto'}
                        </Text>
                        <Text
                          style={[
                            styles.allowedPillSmall,
                            !area.allowedModes.moto && { color: '#FF1744', borderColor: '#FF1744' },
                          ]}
                        >
                          🏍️ {area.allowedModes.moto ? 'Habilitado' : 'Prohibido'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.rangerCallBtn}
                        onPress={() => Linking.openURL(`tel:${area.contactRanger}`)}
                        activeOpacity={0.8}
                      >
                        <PhoneCall size={14} color="#00E676" />
                        <Text style={styles.rangerCallText}>
                          Llamar Destacamento ({area.contactRanger})
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                  <Text style={styles.emergencyNumbersHeader}>AUTORIDADES DE CONTROL MENDOZA</Text>
                  {MENDOZA_RANGER_CONTACTS.map((rc, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.emergencyNumberCard}
                      onPress={() => Linking.openURL(`tel:${rc.phone}`)}
                      activeOpacity={0.8}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.emergencyCardName}>{rc.title}</Text>
                        <Text style={styles.emergencyCardDesc}>{rc.note}</Text>
                      </View>
                      <View style={[styles.emergencyCardCallBtn, { backgroundColor: '#00E676' }]}>
                        <PhoneCall size={14} color="#05080E" strokeWidth={2.8} />
                        <Text style={[styles.emergencyCardNumber, { color: '#05080E' }]}>{rc.phone}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* TAB 3: DENUNCIAR HUELLA CLANDESTINA / DAÑO AMBIENTAL */}
              {convivenciaTab === 'denuncia' && (
                <View>
                  <Text style={styles.modalSubtitle}>
                    Reporta huellas clandestinas abiertas sin autorización, motos en reservas protegidas o vandalismo ambiental. Se geolocaliza automáticamente con tu posición actual.
                  </Text>

                  <Text style={styles.inputSectionLabel}>TIPO DE INFRACCIÓN</Text>
                  <View style={styles.bloodGroupRow}>
                    {[
                      { id: 'motos_en_reserva', label: '🏍️ Motos en Reserva' },
                      { id: 'huella_clandestina', label: '⛏️ Huella Clandestina' },
                      { id: 'basura', label: '🗑️ Basural / Residuos' },
                      { id: 'fuego', label: '🔥 Fuego no autorizado' },
                    ].map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.bloodChip,
                          denunciaType === item.id && { backgroundColor: '#FF1744', borderColor: '#FF1744' },
                        ]}
                        onPress={() => setDenunciaType(item.id)}
                      >
                        <Text
                          style={[
                            styles.bloodChipText,
                            denunciaType === item.id && { color: '#FFFFFF', fontWeight: '900' },
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.inputSectionLabel}>ZONA O RESERVA AFECTADA</Text>
                  <TextInput
                    style={styles.textInput}
                    value={denunciaZone}
                    onChangeText={setDenunciaZone}
                    placeholder="Ej: Divisadero Largo, Cañadón Frías, Cerro Arco..."
                    placeholderTextColor="#64748B"
                  />

                  <Text style={styles.inputSectionLabel}>DESCRIPCIÓN DE LA SITUACIÓN</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={denunciaDescription}
                    onChangeText={setDenunciaDescription}
                    placeholder="Describe qué observaste (ej: 3 motos de enduro cruzando el sendero peatonal de la reserva, apertura de atajo que corta la curva...)"
                    placeholderTextColor="#64748B"
                    multiline
                  />

                  <TouchableOpacity
                    style={[styles.saveMedicalBtn, { backgroundColor: '#FF1744', shadowColor: '#FF1744' }]}
                    onPress={handleSendDenuncia}
                    activeOpacity={0.88}
                  >
                    <Send size={18} color="#FFFFFF" strokeWidth={2.5} />
                    <Text style={[styles.saveMedicalBtnText, { color: '#FFFFFF' }]}>
                      Registrar Denuncia Ambiental
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL: ESTACIÓN METEOROLÓGICA & ALERTA VIENTO ZONDA (FASE 4) */}
      <Modal
        visible={isZondaModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsZondaModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Wind size={22} color={getZondaBadgeColor(zondaWeather.alertLevel)} strokeWidth={2.4} />
                <View>
                  <Text style={styles.modalTitle}>Estación Zonda Mendoza</Text>
                  <Text style={styles.zondaSubtitle}>{zondaWeather.updatedAt}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsZondaModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Tarjeta de Nivel de Alerta Principal */}
              <View
                style={[
                  styles.zondaHeroCard,
                  { borderColor: getZondaBadgeColor(zondaWeather.alertLevel) },
                ]}
              >
                <View style={styles.zondaHeroHeader}>
                  <View
                    style={[
                      styles.zondaHeroBadge,
                      { backgroundColor: getZondaBadgeColor(zondaWeather.alertLevel) },
                    ]}
                  >
                    <Text style={styles.zondaHeroBadgeText}>
                      {zondaWeather.alertLevel === 'rojo_zonda_severo'
                        ? '🚨 ALERTA ROJA'
                        : zondaWeather.alertLevel === 'naranja_alerta'
                        ? '🌬️ ALERTA NARANJA'
                        : zondaWeather.alertLevel === 'amarillo_precaucion'
                        ? '⚠️ ALERTA AMARILLA'
                        : '✅ CONDICIÓN ÓPTIMA'}
                    </Text>
                  </View>
                  <Text style={styles.zondaHeroFireRisk}>
                    Riesgo Fuego: <Text style={{ color: '#FF1744', fontWeight: '800' }}>{zondaWeather.fireRisk.toUpperCase()}</Text>
                  </Text>
                </View>

                <Text style={styles.zondaHeroTitle}>{zondaWeather.title}</Text>
                <Text style={styles.zondaHeroSummary}>{zondaWeather.summary}</Text>
              </View>

              {/* Grid de Métricas Meteorológicas en Tiempo Real */}
              <View style={styles.weatherMetricsGrid}>
                <View style={styles.weatherMetricCard}>
                  <Wind size={18} color="#00E676" />
                  <Text style={styles.weatherMetricLabel}>RÁFAGAS MÁX</Text>
                  <Text style={styles.weatherMetricValue}>{zondaWeather.gustSpeedKmh} km/h</Text>
                </View>

                <View style={styles.weatherMetricCard}>
                  <Compass size={18} color="#2979FF" />
                  <Text style={styles.weatherMetricLabel}>VIENTO SOST.</Text>
                  <Text style={styles.weatherMetricValue}>{zondaWeather.windSpeedKmh} km/h</Text>
                </View>

                <View style={styles.weatherMetricCard}>
                  <Thermometer size={18} color="#FF6D00" />
                  <Text style={styles.weatherMetricLabel}>TEMPERATURA</Text>
                  <Text style={styles.weatherMetricValue}>{zondaWeather.temperatureC}°C</Text>
                </View>

                <View style={styles.weatherMetricCard}>
                  <Droplet size={18} color="#FF1744" />
                  <Text style={styles.weatherMetricLabel}>HUMEDAD</Text>
                  <Text style={[styles.weatherMetricValue, { color: '#FF1744' }]}>
                    {zondaWeather.humidityPercent}%
                  </Text>
                </View>
              </View>

              {/* Protocolo de Seguridad al Aire Libre */}
              <View style={styles.zondaProtocolCard}>
                <View style={styles.zondaProtocolHeader}>
                  <ShieldCheck size={18} color="#FFD600" />
                  <Text style={styles.zondaProtocolTitle}>
                    Protocolo de Montaña ante Zonda
                  </Text>
                </View>
                {zondaWeather.recommendations.map((rec, idx) => (
                  <View key={idx} style={styles.zondaRecItem}>
                    <Text style={styles.zondaRecBullet}>•</Text>
                    <Text style={styles.zondaRecText}>{rec}</Text>
                  </View>
                ))}
              </View>

              {/* Selector de Simulación / Test en Vivo */}
              <View style={styles.zondaSimulateContainer}>
                <Text style={styles.zondaSimulateTitle}>SIMULADOR METEOROLÓGICO MENDOZA</Text>
                <View style={styles.zondaSimulateRow}>
                  <TouchableOpacity
                    style={[
                      styles.zondaSimBtn,
                      zondaWeather.alertLevel === 'verde_optimo' && styles.zondaSimBtnActive,
                    ]}
                    onPress={() => handleSimulateZonda('verde_optimo')}
                  >
                    <Text style={styles.zondaSimBtnText}>🟢 Calmo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.zondaSimBtn,
                      zondaWeather.alertLevel === 'amarillo_precaucion' && styles.zondaSimBtnActive,
                    ]}
                    onPress={() => handleSimulateZonda('amarillo_precaucion')}
                  >
                    <Text style={styles.zondaSimBtnText}>🟡 Amarillo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.zondaSimBtn,
                      zondaWeather.alertLevel === 'naranja_alerta' && styles.zondaSimBtnActive,
                    ]}
                    onPress={() => handleSimulateZonda('naranja_alerta')}
                  >
                    <Text style={styles.zondaSimBtnText}>🟠 Naranja</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.zondaSimBtn,
                      zondaWeather.alertLevel === 'rojo_zonda_severo' && styles.zondaSimBtnActive,
                    ]}
                    onPress={() => handleSimulateZonda('rojo_zonda_severo')}
                  >
                    <Text style={styles.zondaSimBtnText}>🔴 Severo</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Botón de Emergencia Defensa Civil 103 */}
              <TouchableOpacity
                style={styles.defensaCivilBtn}
                onPress={handleCallDefensaCivil}
                activeOpacity={0.88}
              >
                <PhoneCall size={18} color="#FFFFFF" strokeWidth={2.4} />
                <Text style={styles.defensaCivilBtnText}>
                  Llamar a Defensa Civil Mendoza (Línea 103)
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  filterPillActiveWine: {
    backgroundColor: 'rgba(233, 30, 99, 0.18)',
    borderWidth: 1,
    borderColor: '#E91E63',
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

  // FAB Report Button (Waze de la Montaña)
  fabReportButton: {
    borderColor: '#FFD600',
    backgroundColor: '#1E293B',
  },
  fabReportBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF1744',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#05080E',
  },
  fabReportBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },

  // Marcadores de incidentes en el mapa
  incidentMarkerCasing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2.5,
    backgroundColor: '#05080E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 5,
    elevation: 7,
  },
  incidentMarkerSelected: {
    transform: [{ scale: 1.25 }],
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  incidentMarkerInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incidentMarkerEmoji: {
    fontSize: 13,
  },
  incidentBadgeAlert: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#FF1744',
    width: 13,
    height: 13,
    borderRadius: 6.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  incidentBadgeAlertText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },

  // Tarjeta de Incidente
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  severityBadgeText: {
    color: '#05080E',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  incidentTimeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  incidentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  incidentEmojiLarge: {
    fontSize: 22,
  },
  affectedModesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  affectedModesLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  affectedModeBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  affectedModeBadgeText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '600',
  },
  incidentVotesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  voteStayBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD600',
    gap: 6,
  },
  voteStayBtnText: {
    color: '#FFD600',
    fontSize: 13,
    fontWeight: '800',
  },
  voteResolvedBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00E676',
    gap: 6,
  },
  voteResolvedBtnText: {
    color: '#00E676',
    fontSize: 13,
    fontWeight: '800',
  },

  // Modal de Reportar Alerta
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 14, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '90%',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  modalCloseBtn: {
    padding: 6,
  },
  modalSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  inputSectionLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 8,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 6,
  },
  typeOptionActive: {
    backgroundColor: '#334155',
    borderColor: '#FFD600',
  },
  typeOptionIcon: {
    fontSize: 16,
  },
  typeOptionLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  typeOptionLabelActive: {
    color: '#FFD600',
    fontWeight: '800',
  },
  severityRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  severityOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  severityOptionLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#F8FAFC',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 8,
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  submitIncidentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD600',
    paddingVertical: 15,
    borderRadius: 14,
    gap: 8,
    marginTop: 14,
    marginBottom: 10,
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  submitIncidentButtonText: {
    color: '#05080E',
    fontSize: 15,
    fontWeight: '900',
  },

  // Barra Flotante Ángel Guardián Activo
  guardianBanner: {
    position: 'absolute',
    left: 12,
    right: 12,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 999,
    borderWidth: 1.5,
    borderColor: '#00E676',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  guardianBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    marginRight: 6,
  },
  guardianPulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00E676',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  guardianBannerTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  guardianBannerCountdown: {
    color: '#00E676',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 1,
  },
  guardianBannerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guardianBannerExtendBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  guardianBannerExtendText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  guardianBannerSafeBtn: {
    backgroundColor: '#00E676',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  guardianBannerSafeText: {
    color: '#05080E',
    fontSize: 11,
    fontWeight: '900',
  },

  // FAB Safety Button
  fabSafetyButton: {
    borderColor: '#FF1744',
    backgroundColor: '#1E293B',
  },
  fabSafetyButtonActive: {
    borderColor: '#00E676',
    backgroundColor: '#052e16',
  },

  // Modal de Seguridad
  safetyModalContent: {
    borderTopColor: '#FF1744',
    maxHeight: '92%',
  },
  safetyTabsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 3,
    marginBottom: 14,
    gap: 4,
  },
  safetyTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 11,
    gap: 5,
  },
  safetyTabBtnActive: {
    backgroundColor: '#00E676',
  },
  safetyTabBtnActiveSos: {
    backgroundColor: '#FF1744',
  },
  safetyTabBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  safetyTabBtnTextActive: {
    color: '#05080E',
    fontWeight: '900',
  },
  safetyTabBtnTextActiveSos: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  // Guardián Activo en Modal
  guardianActiveBox: {
    backgroundColor: '#080C14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#00E676',
    alignItems: 'center',
    marginBottom: 12,
  },
  guardianActiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  guardianActiveTitle: {
    color: '#00E676',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  guardianActiveDest: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  guardianCountdownBig: {
    color: '#00E676',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginVertical: 4,
  },
  guardianActiveSubtext: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  guardianActiveActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  guardianExtendBigBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
  },
  guardianExtendBigBtnText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  guardianFinishBigBtn: {
    flex: 1,
    backgroundColor: '#00E676',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  guardianFinishBigBtnText: {
    color: '#05080E',
    fontSize: 13,
    fontWeight: '900',
  },

  // Configuración Ángel Guardián
  hoursChipRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  hourChip: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  hourChipActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },
  hourChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  hourChipTextActive: {
    color: '#05080E',
    fontWeight: '900',
  },
  startGuardianButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00E676',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 10,
    marginBottom: 8,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  startGuardianButtonText: {
    color: '#05080E',
    fontSize: 15,
    fontWeight: '900',
  },

  // Disparador SOS
  sosCoordsBox: {
    backgroundColor: '#080C14',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 23, 68, 0.3)',
    marginBottom: 14,
  },
  sosCoordsLabel: {
    color: '#FF1744',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sosCoordsValue: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  sosWhatsAppBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginBottom: 10,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  sosWhatsAppBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  sosSmsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD600',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginBottom: 16,
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sosSmsBtnText: {
    color: '#05080E',
    fontSize: 14,
    fontWeight: '900',
  },
  emergencyNumbersHeader: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 4,
  },
  emergencyNumberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  emergencyCardName: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '800',
  },
  emergencyCardDesc: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  emergencyCardCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF1744',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },
  emergencyCardNumber: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  // Ficha Médica ICE
  bloodGroupRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  bloodChip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  bloodChipActive: {
    backgroundColor: '#FF1744',
    borderColor: '#FF1744',
  },
  bloodChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  bloodChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  saveMedicalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00E676',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 12,
    marginBottom: 10,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  saveMedicalBtnText: {
    color: '#05080E',
    fontSize: 15,
    fontWeight: '900',
  },

  // FASE 3: SEMÁFORO DE LEGALIDAD Y CONVIVENCIA STYLES
  fabConvivenciaButton: {
    borderColor: '#00E676',
    position: 'relative',
  },
  fabConvivenciaButtonActive: {
    backgroundColor: '#052e16',
    borderColor: '#00E676',
  },
  fabMiniBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#00E676',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabMiniBadgeText: {
    color: '#05080E',
    fontSize: 9,
    fontWeight: '900',
  },

  // Tarjeta de Ruta: Semáforo y Reglas
  legalityContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  legalityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  legalityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  legalityBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  allowedModesPillsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  modePill: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  modePillAllowed: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    borderColor: '#00E676',
  },
  modePillForbidden: {
    backgroundColor: 'rgba(255, 23, 68, 0.15)',
    borderColor: '#FF1744',
  },
  modePillText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  priorityRuleText: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 17,
  },
  motorWarningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 23, 68, 0.16)',
    padding: 9,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FF1744',
  },
  motorWarningText: {
    color: '#FF8A80',
    fontSize: 11,
    fontWeight: '700',
    flex: 1,
    lineHeight: 15,
  },

  // Tarjeta de Área Natural Protegida
  protectedRulesBox: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  protectedRulesHeader: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
  },
  protectedRuleText: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },

  // Modal de Convivencia
  convivenciaCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  convivenciaCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  convivenciaIcon: {
    fontSize: 18,
  },
  convivenciaTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
  },
  convivenciaDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  convivenciaPenaltyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 214, 0, 0.1)',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.3)',
  },
  convivenciaPenaltyText: {
    color: '#FFD600',
    fontSize: 11,
    fontWeight: '700',
    flex: 1,
    lineHeight: 15,
  },

  // Tarjetas de Reservas en Modal
  protectedAreaCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderLeftWidth: 4,
  },
  protectedAreaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },
  protectedAreaName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '900',
  },
  protectedAreaAuth: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  areaCategoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  areaCategoryText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  protectedAreaDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  allowedIconsRowSmall: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  allowedPillSmall: {
    fontSize: 11,
    color: '#00E676',
    backgroundColor: '#0B0F17',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    fontWeight: '700',
  },
  rangerCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0F17',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 7,
    borderWidth: 1,
    borderColor: '#00E676',
  },
  rangerCallText: {
    color: '#00E676',
    fontSize: 12,
    fontWeight: '800',
  },

  // Banner Flotante Alerta Viento Zonda (Fase 4)
  zondaBanner: {
    position: 'absolute',
    left: 12,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 998,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  zondaBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },
  zondaPulseDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginRight: 6,
  },
  zondaBannerTitle: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  zondaLevelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  zondaLevelBadgeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  zondaBannerSubtitle: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },

  // Enoturismo Wine & Trail (Fase 4)
  wineInfoContainer: {
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
    borderColor: '#E91E63',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  wineInfoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  wineInfoTitle: {
    color: '#E91E63',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  wineInfoDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 6,
  },
  wineWineriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  wineWineryBadge: {
    backgroundColor: 'rgba(233, 30, 99, 0.22)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#E91E63',
  },
  wineWineryBadgeText: {
    color: '#FCE4EC',
    fontSize: 11,
    fontWeight: '700',
  },
  wineTastingPointsText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontStyle: 'italic',
  },

  // Estación Meteorológica Zonda Modal
  zondaSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 1,
  },
  zondaHeroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    marginBottom: 14,
  },
  zondaHeroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  zondaHeroBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  zondaHeroBadgeText: {
    color: '#05080E',
    fontSize: 11,
    fontWeight: '900',
  },
  zondaHeroFireRisk: {
    color: '#94A3B8',
    fontSize: 11,
  },
  zondaHeroTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  zondaHeroSummary: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
  },
  weatherMetricsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  weatherMetricCard: {
    flex: 1,
    backgroundColor: '#131B2E',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  weatherMetricLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'center',
  },
  weatherMetricValue: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '900',
  },
  zondaProtocolCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.3)',
    marginBottom: 14,
  },
  zondaProtocolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  zondaProtocolTitle: {
    color: '#FFD600',
    fontSize: 13,
    fontWeight: '800',
  },
  zondaRecItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 5,
  },
  zondaRecBullet: {
    color: '#FFD600',
    fontSize: 14,
    lineHeight: 18,
  },
  zondaRecText: {
    flex: 1,
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 17,
  },
  zondaSimulateContainer: {
    backgroundColor: '#131B2E',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 14,
  },
  zondaSimulateTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  zondaSimulateRow: {
    flexDirection: 'row',
    gap: 6,
  },
  zondaSimBtn: {
    flex: 1,
    backgroundColor: '#0B0F17',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  zondaSimBtnActive: {
    borderColor: '#00E676',
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
  },
  zondaSimBtnText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '800',
  },
  defensaCivilBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF1744',
    paddingVertical: 13,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 10,
  },
  defensaCivilBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
});
