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
  Image,
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
  Trophy,
  Award,
  Flag,
  Medal,
  Download,
  Footprints,
  Camera,
  Share2,
  Heart,
  Upload,
  Star,
  PlusCircle,
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
  SummitItem,
  SummitCheckIn,
  SummitBadge,
  TrailRegion,
  CrowdsourceType,
  CrowdsourceSubmission,
} from '../types/map';
import {
  INITIAL_MENDOZA_REGION,
  MENDOZA_ROUTES,
  MENDOZA_POIS,
  INITIAL_COMMUNITY_ROUTES,
  INITIAL_COMMUNITY_POIS,
  INITIAL_INCIDENTS,
  HIGH_CONTRAST_MAP_STYLE,
  MENDOZA_EMERGENCY_NUMBERS,
  DEFAULT_MEDICAL_PROFILE,
  MENDOZA_PROTECTED_AREAS,
  MENDOZA_CONVIVENCIA_RULES,
  MENDOZA_RANGER_CONTACTS,
  INITIAL_ZONDA_WEATHER,
  MENDOZA_SUMMITS,
  INITIAL_SUMMIT_CHECKINS,
  INITIAL_SUMMIT_BADGES,
  MENDOZA_REGIONS,
} from '../data/routesAndPois';

type FilterTab = 'todas' | RouteType | 'comunidad';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);

  // Estados de Rutas y POIs (con aportes dinámicos de Crowdsourcing)
  const [allRoutes, setAllRoutes] = useState<RouteItem[]>([
    ...MENDOZA_ROUTES,
    ...INITIAL_COMMUNITY_ROUTES,
  ]);
  const [allPois, setAllPois] = useState<POIItem[]>([
    ...MENDOZA_POIS,
    ...INITIAL_COMMUNITY_POIS,
  ]);

  // Estados de interfaz, regiones y filtrado
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>('todas');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('todas');
  const [mapStyleOption, setMapStyleOption] = useState<MapTypeOption>('high_contrast');
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Estados Clima & Alerta Zonda (Fase 4: Identidad Mendocina)
  const [zondaWeather, setZondaWeather] = useState<ZondaWeatherInfo>(INITIAL_ZONDA_WEATHER);
  const [isZondaModalVisible, setIsZondaModalVisible] = useState<boolean>(false);

  // Estados Pasaporte de Cumbres & Gamificación (Fase 5)
  const [summits, setSummits] = useState<SummitItem[]>(MENDOZA_SUMMITS);
  const [checkedSummits, setCheckedSummits] = useState<Record<string, SummitCheckIn>>(INITIAL_SUMMIT_CHECKINS);
  const [badges, setBadges] = useState<SummitBadge[]>(INITIAL_SUMMIT_BADGES);
  const [selectedSummit, setSelectedSummit] = useState<SummitItem | null>(null);
  const [isPassportModalVisible, setIsPassportModalVisible] = useState<boolean>(false);
  const [passportTab, setPassportTab] = useState<'cumbres' | 'insignias'>('cumbres');

  // Elementos activos seleccionados
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<POIItem | null>(null);
  const [applauseCount, setApplauseCount] = useState<number>(18);
  const [hasApplauded, setHasApplauded] = useState<boolean>(false);
  const [poiApplauded, setPoiApplauded] = useState<boolean>(false);

  // Estados de Crowdsourcing (Creación comunitaria estilo Wikiloc)
  const [isCrowdsourceModalVisible, setIsCrowdsourceModalVisible] = useState<boolean>(false);
  const [crowdType, setCrowdType] = useState<CrowdsourceType>('poi');
  const [crowdName, setCrowdName] = useState<string>('');
  const [crowdCategory, setCrowdCategory] = useState<POICategory>('mirador');
  const [crowdRouteType, setCrowdRouteType] = useState<RouteType>('trekking');
  const [crowdZone, setCrowdZone] = useState<string>('Potrerillos & El Salto');
  const [crowdRegionId, setCrowdRegionId] = useState<string>('potrerillos');
  const [crowdDifficulty, setCrowdDifficulty] = useState<'Fácil' | 'Moderado' | 'Técnico'>('Moderado');
  const [crowdDistanceKm, setCrowdDistanceKm] = useState<string>('5.2');
  const [crowdElevationGainM, setCrowdElevationGainM] = useState<string>('320');
  const [crowdIsCircular, setCrowdIsCircular] = useState<boolean>(true);
  const [crowdDescription, setCrowdDescription] = useState<string>('');
  const [crowdTips, setCrowdTips] = useState<string>('');
  const [crowdAuthorName, setCrowdAuthorName] = useState<string>('Senderista Mendoza');
  const [crowdAuthorRole, setCrowdAuthorRole] = useState<string>('Comunidad Wikiloc');
  const [crowdPhotos, setCrowdPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  ]);
  const [crowdPhotoInput, setCrowdPhotoInput] = useState<string>('');
  const [crowdLat, setCrowdLat] = useState<string>('-32.9650');
  const [crowdLng, setCrowdLng] = useState<string>('-69.2150');
  const [crowdAltitudeM, setCrowdAltitudeM] = useState<string>('1650');

  // Visor de fotos a pantalla completa (Lightbox)
  const [isPhotoViewerVisible, setIsPhotoViewerVisible] = useState<boolean>(false);
  const [activePhotoUrl, setActivePhotoUrl] = useState<string>('');
  const [activePhotoCaption, setActivePhotoCaption] = useState<string>('');

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

  // Métricas computadas de Gamificación y Pasaporte
  const conqueredCount = useMemo(() => Object.keys(checkedSummits).length, [checkedSummits]);
  const totalElevationM = useMemo(() => {
    return Object.values(checkedSummits).reduce((acc, curr) => acc + curr.elevationGainM, 0);
  }, [checkedSummits]);
  const unlockedBadgesCount = useMemo(() => badges.filter((b) => b.unlocked).length, [badges]);

  // Cálculo de distancia geográfica (Haversine)
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Check-in de Cumbre con geocerca GPS o simulación
  const handleSummitCheckIn = (summit: SummitItem, forceSimulation: boolean = false) => {
    const alreadyConquered = !!checkedSummits[summit.id];
    if (alreadyConquered) {
      Alert.alert(
        'Cumbre ya registrada',
        `Ya conquistaste ${summit.name} (${summit.elevationM} msnm) el ${checkedSummits[summit.id].unlockedAt}.`
      );
      return;
    }

    let distKm = 9999;
    if (userLocation) {
      distKm = calculateDistanceKm(
        userLocation.latitude,
        userLocation.longitude,
        summit.latitude,
        summit.longitude
      );
    }
    const distMeters = distKm * 1000;

    if (!forceSimulation && distMeters > summit.radiusMeters) {
      Alert.alert(
        'Fuera del radio de cumbre',
        `Estás a ${distKm.toFixed(1)} km de la cumbre de ${summit.name}.\nEl radio de check-in GPS es de ${summit.radiusMeters} metros.\n\n¿Deseas simular la llegada para validar tu pasaporte?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Simular Cumbre GPS',
            onPress: () => handleSummitCheckIn(summit, true),
          },
        ]
      );
      return;
    }

    const nowStr = 'Hoy ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newCheckIn: SummitCheckIn = {
      summitId: summit.id,
      unlockedAt: nowStr,
      elevationGainM: summit.elevationM,
    };

    const newChecked = { ...checkedSummits, [summit.id]: newCheckIn };
    setCheckedSummits(newChecked);

    // Evaluar y desbloquear insignias automáticamente
    const newConqueredCount = Object.keys(newChecked).length;
    const newTotalElev = Object.values(newChecked).reduce((acc, curr) => acc + curr.elevationGainM, 0);

    const updatedBadges = badges.map((b) => {
      if (b.id === 'badge-primera-cumbre' && newConqueredCount >= 1) {
        return { ...b, unlocked: true, unlockedAt: nowStr };
      }
      if (b.id === 'badge-centinela-arco' && summit.id === 'cerro-arco') {
        return { ...b, unlocked: true, unlockedAt: nowStr };
      }
      if (b.id === 'badge-gloria-urbana' && summit.id === 'cerro-de-la-gloria') {
        return { ...b, unlocked: true, unlockedAt: nowStr };
      }
      if (b.id === 'badge-maestro-precordillera' && newConqueredCount >= 3) {
        return { ...b, unlocked: true, unlockedAt: nowStr };
      }
      if (b.id === 'badge-desnivel-oro' && newTotalElev >= 1000) {
        return { ...b, unlocked: true, unlockedAt: nowStr };
      }
      return b;
    });
    setBadges(updatedBadges);

    Alert.alert(
      '🎉 ¡CUMBRE CONQUISTADA!',
      `¡Felicitaciones! Has coronado ${summit.name} (${summit.elevationM} msnm).\n\n🏔️ Desnivel acreditado: +${summit.elevationM} m\nInsignia: "${summit.badgeTitle}" (${summit.badgeIcon})\n\n¡Tu Pasaporte Mendocino ha sido actualizado!`,
      [
        { text: 'Ver Pasaporte', onPress: () => setIsPassportModalVisible(true) },
        { text: 'Continuar', style: 'default' },
      ]
    );
  };

  const formatSecondsToClock = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectRegion = (region: TrailRegion) => {
    setSelectedRegionId(region.id);
    setSelectedRoute(null);
    mapRef.current?.animateToRegion(
      {
        latitude: region.center.latitude,
        longitude: region.center.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
      800
    );
  };

  const handleExportGpx = (route: RouteItem) => {
    Alert.alert(
      '📥 Descarga de Track GPX (Wikiloc)',
      `Archivo: ${route.gpxFileName || route.id + '.gpx'}\n\nListo para exportar y sincronizar con relojes Garmin, Suunto, Wahoo y apps de navegación GPS outdoor.`,
      [{ text: 'Listo', style: 'default' }]
    );
  };

  // Abrir visor de fotos ampliado
  const handleOpenPhotoViewer = (url: string, caption: string = '') => {
    setActivePhotoUrl(url);
    setActivePhotoCaption(caption);
    setIsPhotoViewerVisible(true);
  };

  // Aplaudir / Recomendar ruta comunitaria (+1)
  const handleApplaudRoute = (route: RouteItem) => {
    if (hasApplauded) return;
    setHasApplauded(true);
    setApplauseCount((prev) => prev + 1);
    setAllRoutes((prev) =>
      prev.map((r) =>
        r.id === route.id
          ? {
              ...r,
              author: {
                ...r.author,
                name: r.author?.name || 'Comunidad ViaTrek',
                applauseCount: (r.author?.applauseCount || 18) + 1,
              },
            }
          : r
      )
    );
    Alert.alert('👏 ¡Aporte agradecido!', 'Tu aplauso apoya a los miembros de la comunidad que comparten y mantienen los senderos.');
  };

  // Aplaudir / Dar like a lugar / POI comunitario (+1)
  const handleApplaudPoi = (poi: POIItem) => {
    if (poiApplauded) return;
    setPoiApplauded(true);
    setAllPois((prev) =>
      prev.map((p) =>
        p.id === poi.id
          ? {
              ...p,
              author: p.author
                ? { ...p.author, applauseCount: (p.author.applauseCount || 10) + 1 }
                : { name: 'Comunidad ViaTrek', applauseCount: 11 },
            }
          : p
      )
    );
    Alert.alert('❤️ ¡Lugar valorado!', 'Has indicado que este punto de interés es útil para la comunidad.');
  };

  // Obtener GPS actual para formulario de Crowdsourcing
  const handleUseCurrentLocationForCrowd = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Habilita el acceso a la ubicación para usar tu posición actual.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setCrowdLat(loc.coords.latitude.toFixed(5));
      setCrowdLng(loc.coords.longitude.toFixed(5));
      Alert.alert('📍 Ubicación capturada', `Coordenadas: ${loc.coords.latitude.toFixed(5)}, ${loc.coords.longitude.toFixed(5)}`);
    } catch {
      Alert.alert('Error GPS', 'No se pudo obtener la posición actual.');
    }
  };

  // Agregar foto rápida preestablecida de alta calidad
  const handleQuickAddPhoto = (url: string) => {
    if (crowdPhotos.includes(url)) return;
    setCrowdPhotos((prev) => [...prev, url]);
  };

  // Agregar foto por URL personalizada
  const handleAddCustomPhoto = () => {
    if (!crowdPhotoInput.trim()) return;
    setCrowdPhotos((prev) => [...prev, crowdPhotoInput.trim()]);
    setCrowdPhotoInput('');
  };

  // Quitar foto del aporte
  const handleRemovePhoto = (index: number) => {
    setCrowdPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Publicar nuevo aporte comunitario (Wikiloc Crowdsourcing)
  const handlePublishCrowdsource = () => {
    if (!crowdName.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa un nombre para el lugar o sendero.');
      return;
    }

    if (crowdType === 'poi') {
      const lat = parseFloat(crowdLat) || -32.8895;
      const lng = parseFloat(crowdLng) || -68.8650;
      const alt = parseInt(crowdAltitudeM, 10) || 1200;

      const newPoi: POIItem = {
        id: `poi-crowd-${Date.now()}`,
        name: crowdName.trim(),
        category: crowdCategory,
        latitude: lat,
        longitude: lng,
        altitudeM: alt,
        description: crowdDescription.trim() || 'Punto aportado y relevado por la comunidad senderista de Mendoza.',
        tips: crowdTips.trim() || 'Verificado por usuarios de la comunidad ViaTrek.',
        photos: crowdPhotos.length > 0 ? [...crowdPhotos] : [
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        ],
        author: {
          name: crowdAuthorName.trim() || 'Montañista ViaTrek',
          role: crowdAuthorRole.trim() || 'Comunidad Mendoza',
          applauseCount: 1,
          avatar: (crowdAuthorName.trim() || 'MV').slice(0, 2).toUpperCase(),
        },
        isCommunityCreated: true,
        createdAt: 'Recién',
      };

      setAllPois((prev) => [newPoi, ...prev]);
      setSelectedPoi(newPoi);
      setSelectedRoute(null);
      setIsCrowdsourceModalVisible(false);

      mapRef.current?.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }, 900);

      Alert.alert(
        '🌟 ¡Lugar publicado con éxito!',
        `"${newPoi.name}" ya está visible en el mapa para que toda la comunidad pueda visitarlo e informarse.`
      );
    } else {
      // Sendero / Ruta
      const dist = parseFloat(crowdDistanceKm) || 4.8;
      const elev = parseInt(crowdElevationGainM, 10) || 310;
      const baseLat = parseFloat(crowdLat) || -32.9650;
      const baseLng = parseFloat(crowdLng) || -69.2150;

      const generatedCoords: Coordinate[] = [
        { latitude: baseLat, longitude: baseLng },
        { latitude: baseLat + 0.003, longitude: baseLng - 0.004 },
        { latitude: baseLat + 0.007, longitude: baseLng - 0.009 },
        { latitude: baseLat + 0.012, longitude: baseLng - 0.013 },
        { latitude: baseLat + 0.016, longitude: baseLng - 0.018 },
        ...(crowdIsCircular
          ? [
              { latitude: baseLat + 0.011, longitude: baseLng - 0.022 },
              { latitude: baseLat + 0.005, longitude: baseLng - 0.014 },
              { latitude: baseLat, longitude: baseLng },
            ]
          : [
              { latitude: baseLat + 0.020, longitude: baseLng - 0.022 },
              { latitude: baseLat + 0.024, longitude: baseLng - 0.027 },
            ]),
      ];

      const stroke = crowdRouteType === 'trekking' ? '#00E676' : crowdRouteType === 'sendero_mtb' ? '#FF6D00' : crowdRouteType === 'ciclovia' ? '#00E5FF' : '#2979FF';

      const newRoute: RouteItem = {
        id: `route-crowd-${Date.now()}`,
        name: crowdName.trim(),
        zone: crowdZone || 'Potrerillos & Precordillera',
        regionId: crowdRegionId,
        type: crowdRouteType,
        distanceKm: dist,
        elevationGainM: elev,
        difficulty: crowdDifficulty,
        surface: 'Ripio/Tierra',
        strokeColor: stroke,
        coordinates: generatedCoords,
        isCircular: crowdIsCircular,
        isCommunityCreated: true,
        createdAt: 'Recién',
        description: crowdDescription.trim() || 'Sendero relevado y compartido por la comunidad Wikiloc.',
        equipmentTips: crowdTips.trim() || 'Llevar hidratación adecuada, calzado de montaña y protección solar.',
        recommendedSeason: 'Todo el año',
        photos: crowdPhotos.length > 0 ? [...crowdPhotos] : [
          'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
        ],
        author: {
          name: crowdAuthorName.trim() || 'Explorador Mendocino',
          role: crowdAuthorRole.trim() || 'Comunidad Wikiloc',
          applauseCount: 1,
          commentsCount: 0,
          avatar: (crowdAuthorName.trim() || 'EM').slice(0, 2).toUpperCase(),
        },
        legality: {
          status: 'libre',
          badgeText: '🟢 Sendero Libre Comunitario',
          tagColor: '#00E676',
          allowedModes: {
            trekking: crowdRouteType === 'trekking' || crowdRouteType === 'sendero_mtb',
            bicycle: crowdRouteType === 'sendero_mtb' || crowdRouteType === 'ciclovia',
            moto: crowdRouteType === 'moto_trail',
          },
          priorityRule: 'Peatón prioritario',
          authority: 'Comunidad ViaTrek',
        },
        elevationProfile: {
          minElevM: 1200,
          maxElevM: 1200 + elev,
          elevationGainM: elev,
          points: [1200, 1200 + Math.round(elev * 0.3), 1200 + Math.round(elev * 0.7), 1200 + elev, 1200 + Math.round(elev * 0.5), crowdIsCircular ? 1200 : 1200 + elev],
        },
      };

      setAllRoutes((prev) => [newRoute, ...prev]);
      setSelectedRoute(newRoute);
      setSelectedPoi(null);
      setIsCrowdsourceModalVisible(false);

      mapRef.current?.animateToRegion({
        latitude: generatedCoords[0].latitude,
        longitude: generatedCoords[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 900);

      Alert.alert(
        '🌟 ¡Sendero publicado con éxito!',
        `"${newRoute.name}" ya está visible y trazado en el mapa para que todas las personas puedan recorrerlo.`
      );
    }
  };

  // Rutas filtradas por región geográfica y modalidad (soporte inteligente para rutas multimodales y comunidad)
  const visibleRoutes = useMemo(() => {
    let routes = allRoutes;
    if (selectedRegionId !== 'todas') {
      routes = routes.filter((r) => r.regionId === selectedRegionId);
    }
    if (selectedFilter !== 'todas') {
      if (selectedFilter === 'comunidad') {
        return routes.filter((r) => r.isCommunityCreated);
      }
      routes = routes.filter((route) => {
        if (selectedFilter === 'trekking') {
          return route.type === 'trekking' || route.legality?.allowedModes?.trekking;
        }
        if (selectedFilter === 'sendero_mtb') {
          return route.type === 'sendero_mtb' || route.legality?.allowedModes?.bicycle;
        }
        if (selectedFilter === 'moto_trail') {
          return route.type === 'moto_trail' || route.legality?.allowedModes?.moto;
        }
        return route.type === selectedFilter;
      });
    }
    return routes;
  }, [selectedFilter, selectedRegionId, allRoutes]);

  // Incidentes filtrados según el modo seleccionado
  const visibleIncidents = useMemo(() => {
    if (selectedFilter === 'todas' || selectedFilter === 'comunidad') return incidents;
    return incidents.filter((inc) => inc.affectedModes.includes(selectedFilter as RouteType));
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
        selectedFilter === 'todas' || selectedFilter === 'comunidad'
          ? ['ciclovia', 'sendero_mtb', 'moto_trail']
          : [selectedFilter as RouteType],
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

  // POIs filtrados (visibles según relevancia de la categoría o si están en 'todas' o 'comunidad')
  const visiblePois = useMemo(() => {
    if (selectedFilter === 'todas') return allPois;
    if (selectedFilter === 'comunidad') {
      return allPois.filter((p) => p.isCommunityCreated);
    }
    if (selectedFilter === 'trekking') {
      return allPois.filter(
        (p) =>
          p.category === 'trailhead' ||
          p.category === 'mirador' ||
          p.category === 'cumbre' ||
          p.category === 'vertiente' ||
          p.category === 'cascada' ||
          p.category === 'refugio_almacen'
      );
    }
    if (selectedFilter === 'ciclovia') {
      return allPois.filter(
        (p) => p.category === 'taller' || p.category === 'trailhead' || p.category === 'mirador'
      );
    }
    if (selectedFilter === 'sendero_mtb') {
      return allPois.filter(
        (p) =>
          p.category === 'trailhead' ||
          p.category === 'mirador' ||
          p.category === 'hidratacion' ||
          p.category === 'taller' ||
          p.category === 'refugio_almacen' ||
          p.category === 'vertiente'
      );
    }
    if (selectedFilter === 'moto_trail') {
      return allPois.filter(
        (p) =>
          p.category === 'trailhead' ||
          p.category === 'mirador' ||
          p.category === 'refugio_almacen'
      );
    }
    if (selectedFilter === 'wine_trail') {
      return allPois.filter(
        (p) =>
          p.category === 'bodega_wine' ||
          p.category === 'refugio_almacen' ||
          p.category === 'trailhead' ||
          p.category === 'hidratacion'
      );
    }
    return allPois;
  }, [selectedFilter, allPois]);

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
      case 'cumbre':
        return '#FFD700'; // Dorado cumbre
      case 'parapente':
        return '#00E5FF'; // Celeste cielo
      case 'vertiente':
        return '#00E676'; // Verde agua pura
      case 'cascada':
        return '#00E5FF'; // Celeste agua cascada
      case 'camping':
        return '#76FF03'; // Verde lima camping
      case 'foto_spot':
        return '#FF4081'; // Rosa punto fotográfico
      case 'precaucion_lugar':
        return '#FF9100'; // Naranja precaución
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
      case 'cumbre':
        return <Mountain size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'parapente':
        return <Wind size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'vertiente':
        return <Droplet size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'cascada':
        return <Droplet size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'camping':
        return <Trees size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'foto_spot':
        return <Camera size={16} color="#0B0F17" strokeWidth={2.4} />;
      case 'precaucion_lugar':
        return <AlertTriangle size={16} color="#0B0F17" strokeWidth={2.4} />;
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

        {/* POLYLINES CON RENDERIZADO DE ALTO CONTRASTE (DESTACADO WIKILOC) */}
        {visibleRoutes.map((route) => {
          const isSelected = selectedRoute?.id === route.id;
          const isDimmed = selectedRoute !== null && !isSelected;

          return (
            <React.Fragment key={route.id}>
              {/* Capa 1: Borde exterior oscuro de contraste extremo (Casing) */}
              <Polyline
                coordinates={route.coordinates}
                strokeColor="#05080E"
                strokeWidth={isSelected ? 12 : (isDimmed ? 3 : 7)}
                lineCap="round"
                lineJoin="round"
              />

              {/* Capa 2: Trazado vibrante principal */}
              <Polyline
                coordinates={route.coordinates}
                strokeColor={isDimmed ? 'rgba(148, 163, 184, 0.18)' : (isSelected ? '#FF6D00' : route.strokeColor)}
                strokeWidth={isSelected ? 7.5 : (isDimmed ? 2.5 : 4.5)}
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

        {/* HITOS Y WAYPOINTS DE LA RUTA SELECCIONADA (ESTILO WIKILOC) */}
        {selectedRoute && selectedRoute.coordinates.length > 0 && (
          <React.Fragment key="wikiloc-active-trail-markers">
            {/* Marcador de Salida / Inicio (Verde Wikiloc) */}
            <Marker
              key="route-start-pin"
              coordinate={selectedRoute.coordinates[0]}
              title={`🟢 Salida: ${selectedRoute.name}`}
              description="Punto de partida oficial del recorrido"
            >
              <View style={styles.wikilocStartMarker}>
                <View style={styles.wikilocStartInner}>
                  <Text style={{ fontSize: 13 }}>🟢</Text>
                </View>
                <View style={styles.wikilocStartBadge}>
                  <Text style={styles.wikilocStartBadgeText}>SALIDA</Text>
                </View>
              </View>
            </Marker>

            {/* Waypoints intermedios a lo largo de la traza (Iconos Amarillos Wikiloc) */}
            {selectedRoute.waypoints?.map((wp, wIdx) => (
              <Marker
                key={`route-wp-${wIdx}`}
                coordinate={{ latitude: wp.latitude, longitude: wp.longitude }}
                title={wp.title}
                description={wp.description}
              >
                <View style={styles.wikilocWaypointMarker}>
                  <View style={styles.wikilocWaypointInner}>
                    <Text style={{ fontSize: 13 }}>{wp.icon}</Text>
                  </View>
                </View>
              </Marker>
            ))}

            {/* Marcador de Llegada si la ruta no es circular */}
            {!selectedRoute.isCircular && selectedRoute.coordinates.length > 1 && (
              <Marker
                key="route-finish-pin"
                coordinate={selectedRoute.coordinates[selectedRoute.coordinates.length - 1]}
                title={`🏁 Meta: ${selectedRoute.name}`}
                description="Finalización del recorrido"
              >
                <View style={styles.wikilocStartMarker}>
                  <View style={[styles.wikilocStartInner, { backgroundColor: '#FFD700' }]}>
                    <Text style={{ fontSize: 13 }}>🏁</Text>
                  </View>
                  <View style={[styles.wikilocStartBadge, { backgroundColor: '#FFD700' }]}>
                    <Text style={[styles.wikilocStartBadgeText, { color: '#05080E' }]}>LLEGADA</Text>
                  </View>
                </View>
              </Marker>
            )}
          </React.Fragment>
        )}

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

        {/* CUMBRES DEL PASAPORTE MENDOCINO (FASE 5) */}
        {summits.map((summit) => {
          const isConquered = !!checkedSummits[summit.id];
          const isSelected = selectedSummit?.id === summit.id;

          return (
            <Marker
              key={summit.id}
              coordinate={{ latitude: summit.latitude, longitude: summit.longitude }}
              title={`${summit.name} (${summit.elevationM} msnm)`}
              description={isConquered ? '✅ Cumbre conquistada' : `Pendiente • ${summit.difficulty}`}
              onPress={() => {
                setSelectedRoute(null);
                setSelectedPoi(null);
                setSelectedIncident(null);
                setSelectedProtectedArea(null);
                setSelectedSummit(summit);
              }}
            >
              <View
                style={[
                  styles.summitMarkerCasing,
                  isSelected && styles.summitMarkerSelected,
                  isConquered && styles.summitMarkerConquered,
                ]}
              >
                <View
                  style={[
                    styles.summitMarkerInner,
                    isConquered && { backgroundColor: '#FFD600' },
                  ]}
                >
                  <Text style={styles.summitMarkerIcon}>
                    {isConquered ? '👑' : '⛰️'}
                  </Text>
                </View>
                <View
                  style={[
                    styles.summitElevationBadge,
                    isConquered && styles.summitElevationBadgeConquered,
                  ]}
                >
                  <Text
                    style={[
                      styles.summitElevationText,
                      isConquered && { color: '#05080E' },
                    ]}
                  >
                    {summit.elevationM}m
                  </Text>
                </View>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* BANNER FLOTANTE DE RECORRIDO ENFOCADO (ESTILO WIKILOC) */}
      {selectedRoute && (
        <View style={[styles.routeFocusBanner, { top: insets.top + 8 }]}>
          <View style={styles.routeFocusBannerLeft}>
            <View style={styles.routeFocusDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.routeFocusTitle} numberOfLines={1}>
                📍 Recorrido: {selectedRoute.name}
              </Text>
              <Text style={styles.routeFocusSub}>
                {selectedRoute.distanceKm} km • +{selectedRoute.elevationGainM}m • {selectedRoute.isCircular ? 'Circular 🔄' : 'Solo ida ➡️'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.routeFocusCloseBtn}
            onPress={() => setSelectedRoute(null)}
            activeOpacity={0.8}
          >
            <Text style={styles.routeFocusCloseText}>✕ Ver todas</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* HEADER SUPERIOR: FILTRO DE RUTAS */}
      <View style={[styles.headerContainer, { top: insets.top + 8, display: selectedRoute ? 'none' : 'flex' }]}>
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
              selectedFilter === 'trekking' && styles.filterPillActiveTrekking,
            ]}
            onPress={() => {
              setSelectedFilter('trekking');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Footprints
              size={15}
              color={selectedFilter === 'trekking' ? '#00E676' : '#94A3B8'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'trekking' && { color: '#00E676', fontWeight: '700' },
              ]}
            >
              Trekking
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

          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedFilter === 'comunidad' && styles.filterPillActiveComunidad,
            ]}
            onPress={() => {
              setSelectedFilter('comunidad');
              setSelectedRoute(null);
              setSelectedPoi(null);
            }}
            activeOpacity={0.8}
          >
            <Star
              size={15}
              color={selectedFilter === 'comunidad' ? '#FFD700' : '#94A3B8'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'comunidad' && { color: '#FFD700', fontWeight: '800' },
              ]}
            >
              Comunidad
            </Text>
          </TouchableOpacity>
        </View>

        {/* SELECTOR DE REGIONES / ZONAS ESTILO WIKILOC */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionSelectorScroll}
          style={styles.regionSelectorWrapper}
        >
          {MENDOZA_REGIONS.map((region) => {
            const isSelected = selectedRegionId === region.id;
            return (
              <TouchableOpacity
                key={region.id}
                style={[styles.regionChip, isSelected && styles.regionChipActive]}
                onPress={() => handleSelectRegion(region)}
                activeOpacity={0.8}
              >
                <Text style={styles.regionChipIcon}>{region.icon}</Text>
                <Text
                  style={[
                    styles.regionChipText,
                    isSelected && styles.regionChipTextActive,
                  ]}
                >
                  {region.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

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

        {/* Botón Crowdsourcing: Añadir Ruta o Lugar a la Comunidad (Wikiloc) */}
        <TouchableOpacity
          style={[styles.fabButton, styles.fabCrowdsourceButton]}
          onPress={() => setIsCrowdsourceModalVisible(true)}
          activeOpacity={0.85}
        >
          <Plus size={22} color="#05080E" strokeWidth={2.8} />
          <View style={styles.fabCrowdsourceBadge}>
            <Text style={styles.fabCrowdsourceBadgeText}>★</Text>
          </View>
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

        {/* Botón Pasaporte de Cumbres & Gamificación (Fase 5) */}
        <TouchableOpacity
          style={[
            styles.fabButton,
            styles.fabTrophyButton,
            conqueredCount > 0 && styles.fabTrophyButtonActive,
          ]}
          onPress={() => setIsPassportModalVisible(true)}
          activeOpacity={0.85}
        >
          <Trophy size={20} color={conqueredCount > 0 ? '#FFD600' : '#F8FAFC'} />
          <View style={styles.fabTrophyBadge}>
            <Text style={styles.fabTrophyBadgeText}>{conqueredCount}/{summits.length}</Text>
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
                {selectedRoute.isCommunityCreated && (
                  <View style={styles.crowdCommunityBanner}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.crowdCommunityBannerText}>COMUNIDAD</Text>
                  </View>
                )}
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

          {/* GALERÍA DE FOTOS COMUNITARIAS DE LA RUTA */}
          {selectedRoute.photos && selectedRoute.photos.length > 0 && (
            <View style={styles.routePhotosContainer}>
              <View style={styles.routePhotosHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Camera size={14} color="#00E5FF" />
                  <Text style={styles.routePhotosTitle}>FOTOS DE LA AVENTURA</Text>
                </View>
                <Text style={styles.routePhotosCount}>{selectedRoute.photos.length} fotos</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.routePhotosScroll}
              >
                {selectedRoute.photos.map((photoUrl, pIdx) => (
                  <TouchableOpacity
                    key={pIdx}
                    style={styles.routePhotoThumbWrapper}
                    onPress={() => handleOpenPhotoViewer(photoUrl, `${selectedRoute.name} (Foto ${pIdx + 1})`)}
                    activeOpacity={0.85}
                  >
                    <Image
                      source={{ uri: photoUrl }}
                      style={styles.routePhotoThumb}
                      resizeMode="cover"
                    />
                    <View style={styles.routePhotoZoomBadge}>
                      <Eye size={11} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* DESCRIPCIÓN DEL RECORRIDO */}
          {selectedRoute.description && (
            <View style={styles.routeDescriptionCard}>
              <Text style={styles.routeDescriptionTitle}>📖 DESCRIPCIÓN & HUELLA</Text>
              <Text style={styles.routeDescriptionText}>{selectedRoute.description}</Text>
            </View>
          )}

          {/* CONSEJOS Y EQUIPAMIENTO RECOMENDADO */}
          {(selectedRoute.equipmentTips || selectedRoute.recommendedSeason) && (
            <View style={styles.routeTipsCard}>
              <Text style={styles.routeTipsTitle}>💡 CONSEJOS DE MONTAÑA</Text>
              {selectedRoute.recommendedSeason && (
                <Text style={styles.routeTipItem}>
                  🗓️ <Text style={{ color: '#F8FAFC', fontWeight: '700' }}>Época:</Text>{' '}
                  {selectedRoute.recommendedSeason}
                </Text>
              )}
              {selectedRoute.equipmentTips && (
                <Text style={styles.routeTipItem}>
                  🎒 <Text style={{ color: '#F8FAFC', fontWeight: '700' }}>Equipo:</Text>{' '}
                  {selectedRoute.equipmentTips}
                </Text>
              )}
            </View>
          )}

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

          {/* BOTÓN PROMINENTE WIKILOC: ENVÍA RUTA AL GPS (GPX) */}
          <TouchableOpacity
            style={styles.wikilocGpsButton}
            onPress={() => handleExportGpx(selectedRoute)}
            activeOpacity={0.85}
          >
            <Download size={18} color="#05080E" strokeWidth={2.8} />
            <Text style={styles.wikilocGpsButtonText}>Envía ruta al GPS (Descargar GPX)</Text>
          </TouchableOpacity>

          {/* AUTOR & SOCIAL WIKILOC */}
          <View style={styles.wikilocAuthorCard}>
            <View style={styles.wikilocAuthorAvatar}>
              <Text style={styles.wikilocAuthorAvatarText}>
                {selectedRoute.author?.avatar || 'MD'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.wikilocAuthorName}>
                {selectedRoute.author?.name || 'Maxi Di Natale'}
              </Text>
              <Text style={styles.wikilocAuthorRole}>
                {selectedRoute.author?.role || 'Comunidad ViaTrek'} • {selectedRoute.isCommunityCreated ? 'Aporte Comunitario' : 'Verificado'}
              </Text>
            </View>
            <View style={styles.wikilocAuthorActions}>
              <TouchableOpacity
                style={[styles.wikilocSocialPill, hasApplauded && styles.wikilocSocialPillActive]}
                onPress={() => handleApplaudRoute(selectedRoute)}
                activeOpacity={0.8}
              >
                <Text style={styles.wikilocSocialText}>
                  👏 {selectedRoute.author?.applauseCount || applauseCount}
                </Text>
              </TouchableOpacity>
              <View style={styles.wikilocSocialPill}>
                <Text style={styles.wikilocSocialText}>💬 {selectedRoute.author?.commentsCount || 6}</Text>
              </View>
            </View>
          </View>

          {/* TABLA DE ESTADÍSTICAS TÉCNICAS (ESTILO WIKILOC) */}
          <View style={styles.wikilocStatsCard}>
            <Text style={styles.wikilocStatsTitle}>ESTADÍSTICAS DE LA RUTA</Text>
            <View style={styles.wikilocStatsRow}>
              <View style={styles.wikilocStatsItem}>
                <Text style={styles.wikilocStatsLabel}>Distancia</Text>
                <Text style={styles.wikilocStatsValue}>{selectedRoute.distanceKm} km</Text>
              </View>
              <View style={styles.wikilocStatsItem}>
                <Text style={styles.wikilocStatsLabel}>Tipo de ruta</Text>
                <Text style={styles.wikilocStatsValue}>
                  {selectedRoute.isCircular ? 'Circular 🔄' : 'Solo ida ➡️'}
                </Text>
              </View>
            </View>
            <View style={styles.wikilocStatsRow}>
              <View style={styles.wikilocStatsItem}>
                <Text style={styles.wikilocStatsLabel}>Desnivel positivo</Text>
                <Text style={[styles.wikilocStatsValue, { color: '#00E676' }]}>
                  +{selectedRoute.elevationGainM} m
                </Text>
              </View>
              <View style={styles.wikilocStatsItem}>
                <Text style={styles.wikilocStatsLabel}>Desnivel negativo</Text>
                <Text style={[styles.wikilocStatsValue, { color: '#FFB300' }]}>
                  -{selectedRoute.elevationGainM} m
                </Text>
              </View>
            </View>
            <View style={styles.wikilocStatsRow}>
              <View style={styles.wikilocStatsItem}>
                <Text style={styles.wikilocStatsLabel}>Altitud máxima</Text>
                <Text style={styles.wikilocStatsValue}>
                  {selectedRoute.elevationProfile?.maxElevM || '--'} m
                </Text>
              </View>
              <View style={styles.wikilocStatsItem}>
                <Text style={styles.wikilocStatsLabel}>Altitud mínima</Text>
                <Text style={styles.wikilocStatsValue}>
                  {selectedRoute.elevationProfile?.minElevM || '--'} m
                </Text>
              </View>
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

          {/* PERFIL ALTIMÉTRICO ESTILO WIKILOC */}
          {selectedRoute.elevationProfile && (
            <View style={styles.elevationProfileCard}>
              <View style={styles.elevationProfileHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <TrendingUp size={14} color="#00E676" />
                  <Text style={styles.elevationProfileTitle}>PERFIL ALTIMÉTRICO WIKILOC</Text>
                </View>
                <Text style={styles.elevationProfileRangeText}>
                  {selectedRoute.elevationProfile.minElevM}m ➔ {selectedRoute.elevationProfile.maxElevM}m
                </Text>
              </View>

              <View style={styles.elevationBarsContainer}>
                {selectedRoute.elevationProfile.points.map((elev, idx) => {
                  const minE = selectedRoute.elevationProfile!.minElevM;
                  const maxE = selectedRoute.elevationProfile!.maxElevM;
                  const heightPct = Math.max(18, Math.min(100, ((elev - minE) / (maxE - minE || 1)) * 100));
                  const isMax = elev === maxE;
                  return (
                    <View key={idx} style={styles.elevationBarColumn}>
                      <View
                        style={[
                          styles.elevationBarFill,
                          {
                            height: `${heightPct}%`,
                            backgroundColor: isMax ? '#FFD600' : '#00E676',
                          },
                        ]}
                      />
                      <Text style={styles.elevationBarValue}>{elev}</Text>
                    </View>
                  );
                })}
              </View>
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
              <Text style={styles.focusRouteButtonText}>Enfocar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gpxDownloadButton}
              onPress={() => handleExportGpx(selectedRoute)}
              activeOpacity={0.85}
            >
              <Download size={15} color="#00E5FF" />
              <Text style={styles.gpxDownloadButtonText}>GPX</Text>
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

      {/* TARJETA INFERIOR: DETALLES DE CUMBRE SELECCIONADA (FASE 5) */}
      {selectedSummit && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.cardHeaderTopRow}>
                <View style={styles.summitCrownBadge}>
                  <Text style={styles.summitCrownText}>
                    {checkedSummits[selectedSummit.id] ? '🎖️ CONQUISTADA' : '⛰️ CUMBRE PENDIENTE'}
                  </Text>
                </View>
                <Text style={styles.zoneText}>{selectedSummit.zone}</Text>
                <View
                  style={[
                    styles.difficultyBadge,
                    { borderColor: getDifficultyColor(selectedSummit.difficulty === 'Exigente' ? 'Técnico' : selectedSummit.difficulty as any) },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(selectedSummit.difficulty === 'Exigente' ? 'Técnico' : selectedSummit.difficulty as any) },
                    ]}
                  >
                    {selectedSummit.difficulty}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardTitle} numberOfLines={2}>
                {selectedSummit.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedSummit(null)}
              style={styles.closeBtn}
            >
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Métricas de cumbre */}
          <View style={styles.metricsBox}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>ALTITUD</Text>
              <Text style={styles.metricValue}>{selectedSummit.elevationM} msnm</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>DISTANCIA GPS</Text>
              <Text style={styles.metricValue}>
                {userLocation
                  ? `${calculateDistanceKm(userLocation.latitude, userLocation.longitude, selectedSummit.latitude, selectedSummit.longitude).toFixed(1)} km`
                  : 'Aprox. 8 km'}
              </Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>INSIGNIA</Text>
              <Text style={styles.metricValue}>{selectedSummit.badgeIcon} {selectedSummit.badgeTitle}</Text>
            </View>
          </View>

          <Text style={styles.summitDescText}>{selectedSummit.description}</Text>

          {/* Botones de acción */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={[
                styles.focusRouteButton,
                { backgroundColor: checkedSummits[selectedSummit.id] ? 'rgba(0, 230, 118, 0.15)' : '#FFD600' },
              ]}
              onPress={() => handleSummitCheckIn(selectedSummit)}
              activeOpacity={0.85}
            >
              <Medal size={16} color={checkedSummits[selectedSummit.id] ? '#00E676' : '#05080E'} />
              <Text
                style={[
                  styles.focusRouteButtonText,
                  { color: checkedSummits[selectedSummit.id] ? '#00E676' : '#05080E', fontWeight: '900' },
                ]}
              >
                {checkedSummits[selectedSummit.id] ? 'Cumbre Ya Registrada ✓' : 'Hacer Cumbre (Check-in GPS)'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedSummit.latitude},${selectedSummit.longitude}`;
                Linking.openURL(url);
              }}
              activeOpacity={0.85}
            >
              <ExternalLink size={16} color="#05080E" />
              <Text style={styles.navigateButtonText}>Cómo Llegar</Text>
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
                {selectedPoi.isCommunityCreated && (
                  <View style={styles.crowdCommunityBanner}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.crowdCommunityBannerText}>COMUNIDAD</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.poiDot,
                    { backgroundColor: getPoiColor(selectedPoi.category) },
                  ]}
                />
                <Text style={styles.poiCategoryText}>
                  {selectedPoi.category.toUpperCase()}
                  {selectedPoi.altitudeM ? ` • ${selectedPoi.altitudeM} msnm` : ''}
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

          {/* GALERÍA DE FOTOS DEL LUGAR */}
          {selectedPoi.photos && selectedPoi.photos.length > 0 && (
            <View style={styles.routePhotosContainer}>
              <View style={styles.routePhotosHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Camera size={14} color="#00E5FF" />
                  <Text style={styles.routePhotosTitle}>FOTOS DEL LUGAR</Text>
                </View>
                <Text style={styles.routePhotosCount}>{selectedPoi.photos.length} fotos</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.routePhotosScroll}
              >
                {selectedPoi.photos.map((photoUrl, pIdx) => (
                  <TouchableOpacity
                    key={pIdx}
                    style={styles.routePhotoThumbWrapper}
                    onPress={() => handleOpenPhotoViewer(photoUrl, `${selectedPoi.name} (Foto ${pIdx + 1})`)}
                    activeOpacity={0.85}
                  >
                    <Image
                      source={{ uri: photoUrl }}
                      style={styles.routePhotoThumb}
                      resizeMode="cover"
                    />
                    <View style={styles.routePhotoZoomBadge}>
                      <Eye size={11} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <Text style={styles.cardDescription}>{selectedPoi.description}</Text>

          {/* TIPS O CONSEJOS DEL LUGAR */}
          {selectedPoi.tips && (
            <View style={styles.poiTipsBox}>
              <Text style={styles.poiTipsText}>
                💡 <Text style={{ fontWeight: '700', color: '#F8FAFC' }}>Recomendación:</Text>{' '}
                {selectedPoi.tips}
              </Text>
            </View>
          )}

          {/* AUTOR & SOCIAL DEL LUGAR */}
          {selectedPoi.author && (
            <View style={styles.wikilocAuthorCard}>
              <View style={styles.wikilocAuthorAvatar}>
                <Text style={styles.wikilocAuthorAvatarText}>
                  {selectedPoi.author.avatar || 'VT'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.wikilocAuthorName}>{selectedPoi.author.name}</Text>
                <Text style={styles.wikilocAuthorRole}>
                  {selectedPoi.author.role || 'Comunidad ViaTrek'} • {selectedPoi.createdAt || 'Aporte'}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.wikilocSocialPill, poiApplauded && styles.wikilocSocialPillActive]}
                onPress={() => handleApplaudPoi(selectedPoi)}
                activeOpacity={0.8}
              >
                <Text style={styles.wikilocSocialText}>
                  ❤️ {selectedPoi.author.applauseCount || 12}
                </Text>
              </TouchableOpacity>
            </View>
          )}

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

      {/* MODAL: CROWDSOURCING - APORTAR RUTA O LUGAR A LA COMUNIDAD (WIKILOC) */}
      <Modal
        visible={isCrowdsourceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCrowdsourceModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Sparkles size={20} color="#FFD700" />
                <Text style={styles.modalTitle}>Añadir a la Comunidad (Wikiloc)</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsCrowdsourceModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalSubtitle}>
                Comparte senderos, miradores, cascadas o puestos para que miles de personas puedan descubrirlos.
              </Text>

              {/* Selector de Pestaña: POI vs RUTA */}
              <View style={styles.crowdTabsRow}>
                <TouchableOpacity
                  style={[styles.crowdTabBtn, crowdType === 'poi' && styles.crowdTabBtnActive]}
                  onPress={() => setCrowdType('poi')}
                  activeOpacity={0.8}
                >
                  <MapPin size={16} color={crowdType === 'poi' ? '#05080E' : '#94A3B8'} />
                  <Text style={[styles.crowdTabBtnText, crowdType === 'poi' && styles.crowdTabBtnTextActive]}>
                    📍 Lugar / POI
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.crowdTabBtn, crowdType === 'route' && styles.crowdTabBtnActive]}
                  onPress={() => setCrowdType('route')}
                  activeOpacity={0.8}
                >
                  <Mountain size={16} color={crowdType === 'route' ? '#05080E' : '#94A3B8'} />
                  <Text style={[styles.crowdTabBtnText, crowdType === 'route' && styles.crowdTabBtnTextActive]}>
                    🗺️ Sendero / Ruta
                  </Text>
                </TouchableOpacity>
              </View>

              {/* TÍTULO / NOMBRE */}
              <Text style={styles.inputSectionLabel}>NOMBRE DEL APORTE *</Text>
              <TextInput
                style={styles.textInput}
                placeholder={crowdType === 'poi' ? 'Ej. Cascada Secreta de El Salto' : 'Ej. Sendero del Filo y Mirador Potrerillos'}
                placeholderTextColor="#64748B"
                value={crowdName}
                onChangeText={setCrowdName}
              />

              {/* CAMPOS ESPECÍFICOS DE POI */}
              {crowdType === 'poi' && (
                <>
                  <Text style={styles.inputSectionLabel}>CATEGORÍA DEL LUGAR</Text>
                  <View style={styles.typeGrid}>
                    {[
                      { cat: 'mirador' as POICategory, label: 'Mirador', icon: '👁️' },
                      { cat: 'cascada' as POICategory, label: 'Cascada', icon: '🌊' },
                      { cat: 'vertiente' as POICategory, label: 'Vertiente', icon: '💧' },
                      { cat: 'refugio_almacen' as POICategory, label: 'Refugio', icon: '🏡' },
                      { cat: 'cumbre' as POICategory, label: 'Cumbre', icon: '⛰️' },
                      { cat: 'trailhead' as POICategory, label: 'Inicio', icon: '🏁' },
                      { cat: 'camping' as POICategory, label: 'Camping', icon: '⛺' },
                      { cat: 'foto_spot' as POICategory, label: 'Foto Spot', icon: '📸' },
                    ].map((item) => {
                      const isChosen = crowdCategory === item.cat;
                      return (
                        <TouchableOpacity
                          key={item.cat}
                          style={[styles.typeOption, isChosen && styles.typeOptionActive]}
                          onPress={() => setCrowdCategory(item.cat)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.typeOptionIcon}>{item.icon}</Text>
                          <Text style={[styles.typeOptionLabel, isChosen && styles.typeOptionLabelActive]}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={styles.inputSectionLabel}>ALTITUD ESTIMADA (msnm)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ej. 1650"
                    placeholderTextColor="#64748B"
                    keyboardType="numeric"
                    value={crowdAltitudeM}
                    onChangeText={setCrowdAltitudeM}
                  />
                </>
              )}

              {/* CAMPOS ESPECÍFICOS DE RUTA */}
              {crowdType === 'route' && (
                <>
                  <Text style={styles.inputSectionLabel}>MODALIDAD DEPORTIVA</Text>
                  <View style={styles.typeGrid}>
                    {[
                      { type: 'trekking' as RouteType, label: 'Trekking', icon: '🥾' },
                      { type: 'sendero_mtb' as RouteType, label: 'MTB / Cerro', icon: '🚵' },
                      { type: 'ciclovia' as RouteType, label: 'Ciclovía', icon: '🚴' },
                      { type: 'moto_trail' as RouteType, label: 'Moto Trail', icon: '🏍️' },
                    ].map((item) => {
                      const isChosen = crowdRouteType === item.type;
                      return (
                        <TouchableOpacity
                          key={item.type}
                          style={[styles.typeOption, isChosen && styles.typeOptionActive]}
                          onPress={() => setCrowdRouteType(item.type)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.typeOptionIcon}>{item.icon}</Text>
                          <Text style={[styles.typeOptionLabel, isChosen && styles.typeOptionLabelActive]}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={styles.crowdRowInputs}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={styles.inputSectionLabel}>DISTANCIA (km)</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Ej. 6.2"
                        placeholderTextColor="#64748B"
                        keyboardType="decimal-pad"
                        value={crowdDistanceKm}
                        onChangeText={setCrowdDistanceKm}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputSectionLabel}>DESNIVEL (+m)</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Ej. 350"
                        placeholderTextColor="#64748B"
                        keyboardType="numeric"
                        value={crowdElevationGainM}
                        onChangeText={setCrowdElevationGainM}
                      />
                    </View>
                  </View>

                  <Text style={styles.inputSectionLabel}>DIFICULTAD TÉCNICA</Text>
                  <View style={styles.severityRow}>
                    {(['Fácil', 'Moderado', 'Técnico'] as const).map((diff) => {
                      const isChosen = crowdDifficulty === diff;
                      return (
                        <TouchableOpacity
                          key={diff}
                          style={[
                            styles.severityOption,
                            isChosen && {
                              borderColor: diff === 'Fácil' ? '#00E676' : diff === 'Moderado' ? '#FFB300' : '#FF1744',
                              backgroundColor: (diff === 'Fácil' ? '#00E676' : diff === 'Moderado' ? '#FFB300' : '#FF1744') + '20',
                            },
                          ]}
                          onPress={() => setCrowdDifficulty(diff)}
                          activeOpacity={0.8}
                        >
                          <Text
                            style={[
                              styles.severityOptionLabel,
                              isChosen && {
                                color: diff === 'Fácil' ? '#00E676' : diff === 'Moderado' ? '#FFB300' : '#FF1744',
                                fontWeight: '700',
                              },
                            ]}
                          >
                            {diff}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={styles.inputSectionLabel}>TIPO DE TRAYECTO</Text>
                  <View style={styles.severityRow}>
                    <TouchableOpacity
                      style={[
                        styles.severityOption,
                        crowdIsCircular && { borderColor: '#FFD600', backgroundColor: '#FFD60020' },
                      ]}
                      onPress={() => setCrowdIsCircular(true)}
                    >
                      <Text style={[styles.severityOptionLabel, crowdIsCircular && { color: '#FFD600', fontWeight: '700' }]}>
                        Circular 🔄
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.severityOption,
                        !crowdIsCircular && { borderColor: '#00E676', backgroundColor: '#00E67620' },
                      ]}
                      onPress={() => setCrowdIsCircular(false)}
                    >
                      <Text style={[styles.severityOptionLabel, !crowdIsCircular && { color: '#00E676', fontWeight: '700' }]}>
                        Solo ida ➡️
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* ZONA / REGIÓN */}
              <Text style={styles.inputSectionLabel}>ZONA EN MENDOZA</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej. Potrerillos / El Salto / Quebrada de San Isidro"
                placeholderTextColor="#64748B"
                value={crowdZone}
                onChangeText={setCrowdZone}
              />

              {/* COORDENADAS GPS */}
              <View style={styles.crowdCoordsHeaderRow}>
                <Text style={styles.inputSectionLabel}>COORDENADAS (LAT / LNG)</Text>
                <TouchableOpacity
                  style={styles.crowdGpsBtn}
                  onPress={handleUseCurrentLocationForCrowd}
                  activeOpacity={0.8}
                >
                  <LocateFixed size={13} color="#00E676" />
                  <Text style={styles.crowdGpsBtnText}>Capturar GPS Actual</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.crowdRowInputs}>
                <TextInput
                  style={[styles.textInput, { flex: 1, marginRight: 8 }]}
                  placeholder="Latitud"
                  placeholderTextColor="#64748B"
                  value={crowdLat}
                  onChangeText={setCrowdLat}
                />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="Longitud"
                  placeholderTextColor="#64748B"
                  value={crowdLng}
                  onChangeText={setCrowdLng}
                />
              </View>

              {/* DESCRIPCIÓN */}
              <Text style={styles.inputSectionLabel}>DESCRIPCIÓN DETALLADA *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Describe la ruta o lugar: vistas, estado del camino, bifurcaciones clave, sombras o qué hace especial a este sitio..."
                placeholderTextColor="#64748B"
                multiline={true}
                numberOfLines={3}
                value={crowdDescription}
                onChangeText={setCrowdDescription}
              />

              {/* CONSEJOS / TIPS */}
              <Text style={styles.inputSectionLabel}>CONSEJOS & RECOMENDACIONES</Text>
              <TextInput
                style={[styles.textInput, { minHeight: 46 }]}
                placeholder="Ej. Llevar 2L de agua, bastones de trekking, evitar en días de Zonda, calzado con agarre..."
                placeholderTextColor="#64748B"
                value={crowdTips}
                onChangeText={setCrowdTips}
              />

              {/* FOTOS DE LA AVENTURA */}
              <Text style={styles.inputSectionLabel}>FOTOS DE LA AVENTURA ({crowdPhotos.length})</Text>
              <Text style={styles.crowdPhotoSub}>
                Selecciona fotos rápidas de montaña o pega un enlace de imagen:
              </Text>
              
              {/* Presets rápidos de fotos */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.crowdPhotoPresetsScroll}>
                {[
                  { label: '🏔️ Cordón del Plata', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80' },
                  { label: '🌊 Cascada Montaña', url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80' },
                  { label: '🥾 Sendero Andes', url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80' },
                  { label: '🌅 Dique Potrerillos', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' },
                  { label: '🚵 Flow Biker', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80' },
                  { label: '🏡 Refugio Andino', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80' },
                ].map((preset, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.crowdPhotoPresetChip}
                    onPress={() => handleQuickAddPhoto(preset.url)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.crowdPhotoPresetText}>{preset.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Input URL de foto */}
              <View style={styles.crowdPhotoInputRow}>
                <TextInput
                  style={[styles.textInput, { flex: 1, marginRight: 8, marginBottom: 0 }]}
                  placeholder="Pegar URL de foto https://..."
                  placeholderTextColor="#64748B"
                  value={crowdPhotoInput}
                  onChangeText={setCrowdPhotoInput}
                />
                <TouchableOpacity
                  style={styles.crowdAddPhotoBtn}
                  onPress={handleAddCustomPhoto}
                  activeOpacity={0.8}
                >
                  <Plus size={16} color="#05080E" strokeWidth={2.8} />
                  <Text style={styles.crowdAddPhotoBtnText}>Añadir</Text>
                </TouchableOpacity>
              </View>

              {/* Lista de miniaturas añadidas */}
              {crowdPhotos.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.crowdThumbnailsRow}>
                  {crowdPhotos.map((url, idx) => (
                    <View key={idx} style={styles.crowdThumbItem}>
                      <Image source={{ uri: url }} style={styles.crowdThumbImg} resizeMode="cover" />
                      <TouchableOpacity
                        style={styles.crowdThumbDeleteBtn}
                        onPress={() => handleRemovePhoto(idx)}
                      >
                        <X size={12} color="#FFFFFF" strokeWidth={2.8} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )}

              {/* DATOS DEL AUTOR */}
              <Text style={styles.inputSectionLabel}>TU NOMBRE / ALIAS</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej. Valentina Rossi (Andinista)"
                placeholderTextColor="#64748B"
                value={crowdAuthorName}
                onChangeText={setCrowdAuthorName}
              />

              {/* BOTÓN DE PUBLICACIÓN */}
              <TouchableOpacity
                style={styles.crowdSubmitButton}
                onPress={handlePublishCrowdsource}
                activeOpacity={0.88}
              >
                <Sparkles size={18} color="#05080E" strokeWidth={2.8} />
                <Text style={styles.crowdSubmitButtonText}>
                  Publicar en la Comunidad (Wikiloc)
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL: VISOR DE FOTOS LIGHTBOX A PANTALLA COMPLETA */}
      <Modal
        visible={isPhotoViewerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPhotoViewerVisible(false)}
      >
        <View style={styles.photoLightboxOverlay}>
          <TouchableOpacity
            style={[styles.photoLightboxCloseBtn, { top: insets.top + 16 }]}
            onPress={() => setIsPhotoViewerVisible(false)}
            activeOpacity={0.8}
          >
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {activePhotoUrl ? (
            <Image
              source={{ uri: activePhotoUrl }}
              style={styles.photoLightboxImage}
              resizeMode="contain"
            />
          ) : null}

          {activePhotoCaption ? (
            <View style={[styles.photoLightboxCaptionBox, { bottom: insets.bottom + 20 }]}>
              <Text style={styles.photoLightboxCaptionText}>{activePhotoCaption}</Text>
            </View>
          ) : null}
        </View>
      </Modal>

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

      {/* MODAL: PASAPORTE DE CUMBRES & GAMIFICACIÓN (FASE 5) */}
      <Modal
        visible={isPassportModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsPassportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.passportModalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Trophy size={22} color="#FFD600" strokeWidth={2.4} />
                <View>
                  <Text style={styles.modalTitle}>Pasaporte de Cumbres</Text>
                  <Text style={styles.passportSubtitle}>Desafíos de Montaña • Gran Mendoza</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsPassportModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Pestañas del Modal: Cumbres vs Insignias */}
            <View style={styles.passportTabsRow}>
              <TouchableOpacity
                style={[styles.passportTabBtn, passportTab === 'cumbres' && styles.passportTabBtnActive]}
                onPress={() => setPassportTab('cumbres')}
              >
                <Text style={[styles.passportTabBtnText, passportTab === 'cumbres' && styles.passportTabBtnTextActive]}>
                  ⛰️ Cumbres ({conqueredCount}/{summits.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.passportTabBtn, passportTab === 'insignias' && styles.passportTabBtnActive]}
                onPress={() => setPassportTab('insignias')}
              >
                <Text style={[styles.passportTabBtnText, passportTab === 'insignias' && styles.passportTabBtnTextActive]}>
                  🏆 Insignias ({unlockedBadgesCount}/{badges.length})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tablero Resumen de Logros */}
            <View style={styles.passportHeroBox}>
              <View style={styles.passportHeroItem}>
                <Text style={styles.passportHeroNum}>{conqueredCount}/{summits.length}</Text>
                <Text style={styles.passportHeroLabel}>CUMBRES</Text>
              </View>
              <View style={styles.passportHeroDivider} />
              <View style={styles.passportHeroItem}>
                <Text style={[styles.passportHeroNum, { color: '#00E676' }]}>+{totalElevationM}m</Text>
                <Text style={styles.passportHeroLabel}>DESNIVEL</Text>
              </View>
              <View style={styles.passportHeroDivider} />
              <View style={styles.passportHeroItem}>
                <Text style={[styles.passportHeroNum, { color: '#FFD600' }]}>{unlockedBadgesCount}/{badges.length}</Text>
                <Text style={styles.passportHeroLabel}>INSIGNIAS</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {passportTab === 'cumbres' ? (
                <View>
                  <Text style={styles.sectionHeading}>
                    CUMBRES CLÁSICAS DE PRECORDILLERA
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Acércate a menos de 200m de la cumbre para validar tu check-in GPS.
                  </Text>

                  {summits.map((summit) => {
                    const isConquered = !!checkedSummits[summit.id];
                    const distKm = userLocation
                      ? calculateDistanceKm(userLocation.latitude, userLocation.longitude, summit.latitude, summit.longitude)
                      : null;

                    return (
                      <View
                        key={summit.id}
                        style={[
                          styles.summitCardItem,
                          isConquered && styles.summitCardItemConquered,
                        ]}
                      >
                        <View style={styles.summitCardTop}>
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              <Text style={styles.summitCardName}>{summit.name}</Text>
                              <View style={[styles.summitCardBadge, isConquered && styles.summitCardBadgeConquered]}>
                                <Text style={[styles.summitCardBadgeText, isConquered && { color: '#05080E' }]}>
                                  {summit.elevationM}m
                                </Text>
                              </View>
                            </View>
                            <Text style={styles.summitCardZone}>{summit.zone}</Text>
                          </View>

                          {isConquered ? (
                            <View style={styles.conqueredStamp}>
                              <Text style={styles.conqueredStampText}>CORONADA 🎖️</Text>
                              <Text style={styles.conqueredStampDate}>{checkedSummits[summit.id].unlockedAt}</Text>
                            </View>
                          ) : (
                            <TouchableOpacity
                              style={styles.summitCheckInBtn}
                              onPress={() => handleSummitCheckIn(summit)}
                            >
                              <Text style={styles.summitCheckInBtnText}>Check-in GPS</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <Text style={styles.summitCardDesc}>{summit.description}</Text>

                        <View style={styles.summitCardFooter}>
                          <View style={styles.summitCardDistRow}>
                            <MapPin size={13} color="#94A3B8" />
                            <Text style={styles.summitCardDistText}>
                              {distKm !== null ? `A ${distKm.toFixed(1)} km de ti` : 'Distancia: Precordillera'}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.summitFocusBtn}
                            onPress={() => {
                              setIsPassportModalVisible(false);
                              setSelectedSummit(summit);
                              mapRef.current?.animateToRegion({
                                latitude: summit.latitude,
                                longitude: summit.longitude,
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.04,
                              }, 700);
                            }}
                          >
                            <Text style={styles.summitFocusBtnText}>Ver en Mapa ›</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text style={styles.sectionHeading}>
                    GALERÍA DE INSIGNIAS Y LOGROS
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Desbloquea insignias exclusivas explorando los cerros de Mendoza.
                  </Text>

                  {badges.map((badge) => (
                    <View
                      key={badge.id}
                      style={[
                        styles.badgeCardItem,
                        badge.unlocked && styles.badgeCardItemUnlocked,
                      ]}
                    >
                      <View style={[styles.badgeIconCircle, badge.unlocked && styles.badgeIconCircleUnlocked]}>
                        <Text style={styles.badgeIconText}>{badge.icon}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Text style={[styles.badgeTitle, badge.unlocked && styles.badgeTitleUnlocked]}>
                            {badge.title}
                          </Text>
                          {badge.unlocked && (
                            <View style={styles.badgeUnlockedPill}>
                              <Text style={styles.badgeUnlockedPillText}>Desbloqueada ✓</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.badgeDesc}>{badge.description}</Text>
                        <Text style={styles.badgeReq}>Requisito: {badge.requirement}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Compartir Logro en Redes / WhatsApp */}
              <TouchableOpacity
                style={styles.sharePassportBtn}
                onPress={() => {
                  const text = `🏔️ ¡Mi progreso en el Pasaporte de Cumbres ViaTrek Mendoza!\n\n👑 Cumbres coronadas: ${conqueredCount}/${summits.length}\n📈 Desnivel vertical acumulado: +${totalElevationM} m\n🏆 Insignias ganadas: ${unlockedBadgesCount}/${badges.length}\n\n¡Explorá los senderos de Mendoza conmigo en ViaTrek!`;
                  Linking.openURL(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`).catch(() => {
                    Alert.alert('Pasaporte ViaTrek', text);
                  });
                }}
                activeOpacity={0.88}
              >
                <Award size={18} color="#05080E" strokeWidth={2.5} />
                <Text style={styles.sharePassportBtnText}>Compartir mi Progreso 📲</Text>
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
  filterPillActiveTrekking: {
    backgroundColor: 'rgba(0, 230, 118, 0.16)',
    borderWidth: 1,
    borderColor: '#00E676',
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

  // Marcadores de Cumbre (Fase 5)
  summitMarkerCasing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  summitMarkerSelected: {
    transform: [{ scale: 1.15 }],
  },
  summitMarkerConquered: {},
  summitMarkerInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    borderWidth: 2.5,
    borderColor: '#FFD600',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  summitMarkerIcon: {
    fontSize: 16,
  },
  summitElevationBadge: {
    backgroundColor: '#0F172A',
    borderColor: '#FFD600',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginTop: -4,
  },
  summitElevationBadgeConquered: {
    backgroundColor: '#FFD600',
  },
  summitElevationText: {
    color: '#FFD600',
    fontSize: 9,
    fontWeight: '900',
  },

  // FAB Trophy
  fabTrophyButton: {
    borderColor: '#FFD600',
    backgroundColor: '#1E293B',
  },
  fabTrophyButtonActive: {
    borderColor: '#FFD600',
    backgroundColor: '#262010',
  },
  fabTrophyBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFD600',
    borderRadius: 9,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#0B0F17',
  },
  fabTrophyBadgeText: {
    color: '#05080E',
    fontSize: 9,
    fontWeight: '900',
  },

  // Tarjeta de Cumbre
  summitCrownBadge: {
    backgroundColor: 'rgba(255, 214, 0, 0.15)',
    borderColor: '#FFD600',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  summitCrownText: {
    color: '#FFD600',
    fontSize: 10,
    fontWeight: '900',
  },
  summitDescText: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 6,
  },

  // Modal Pasaporte
  passportModalContent: {
    maxHeight: '92%',
  },
  passportSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 1,
  },
  passportTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#080C14',
    borderRadius: 12,
    padding: 3,
    marginBottom: 12,
  },
  passportTabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 9,
  },
  passportTabBtnActive: {
    backgroundColor: '#1E293B',
  },
  passportTabBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  passportTabBtnTextActive: {
    color: '#FFD600',
    fontWeight: '900',
  },
  passportHeroBox: {
    flexDirection: 'row',
    backgroundColor: '#131B2E',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.2)',
    marginBottom: 14,
  },
  passportHeroItem: {
    alignItems: 'center',
    flex: 1,
  },
  passportHeroNum: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '900',
  },
  passportHeroLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.4,
  },
  passportHeroDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionHeading: {
    color: '#FFD600',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sectionSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 12,
  },
  summitCardItem: {
    backgroundColor: '#101624',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 10,
  },
  summitCardItemConquered: {
    borderColor: 'rgba(255, 214, 0, 0.4)',
    backgroundColor: '#161924',
  },
  summitCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summitCardName: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '800',
  },
  summitCardBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  summitCardBadgeConquered: {
    backgroundColor: '#FFD600',
  },
  summitCardBadgeText: {
    color: '#FFD600',
    fontSize: 10,
    fontWeight: '900',
  },
  summitCardZone: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  conqueredStamp: {
    backgroundColor: 'rgba(255, 214, 0, 0.15)',
    borderColor: '#FFD600',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  conqueredStampText: {
    color: '#FFD600',
    fontSize: 10,
    fontWeight: '900',
  },
  conqueredStampDate: {
    color: '#CBD5E1',
    fontSize: 8.5,
    marginTop: 1,
  },
  summitCheckInBtn: {
    backgroundColor: '#FFD600',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  summitCheckInBtnText: {
    color: '#05080E',
    fontSize: 11,
    fontWeight: '900',
  },
  summitCardDesc: {
    color: '#94A3B8',
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 8,
  },
  summitCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 8,
  },
  summitCardDistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summitCardDistText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  summitFocusBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  summitFocusBtnText: {
    color: '#00E676',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101624',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 10,
    gap: 12,
    opacity: 0.65,
  },
  badgeCardItemUnlocked: {
    borderColor: 'rgba(255, 214, 0, 0.4)',
    backgroundColor: '#181C26',
    opacity: 1,
  },
  badgeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeIconCircleUnlocked: {
    backgroundColor: '#262010',
    borderColor: '#FFD600',
  },
  badgeIconText: {
    fontSize: 20,
  },
  badgeTitle: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '800',
  },
  badgeTitleUnlocked: {
    color: '#F8FAFC',
  },
  badgeUnlockedPill: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  badgeUnlockedPillText: {
    color: '#00E676',
    fontSize: 9.5,
    fontWeight: '900',
  },
  badgeDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  },
  badgeReq: {
    color: '#64748B',
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 3,
  },
  sharePassportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD600',
    paddingVertical: 13,
    borderRadius: 12,
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  sharePassportBtnText: {
    color: '#05080E',
    fontSize: 13,
    fontWeight: '900',
  },

  // REGION SELECTOR BAR (ESTILO WIKILOC)
  regionSelectorWrapper: {
    width: '100%',
    maxWidth: 480,
    marginTop: 6,
  },
  regionSelectorScroll: {
    gap: 6,
    paddingHorizontal: 4,
  },
  regionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  regionChipActive: {
    backgroundColor: '#1E293B',
    borderColor: '#00E676',
  },
  regionChipIcon: {
    fontSize: 13,
  },
  regionChipText: {
    color: '#94A3B8',
    fontSize: 11.5,
    fontWeight: '600',
  },
  regionChipTextActive: {
    color: '#00E676',
    fontWeight: '800',
  },

  // PERFIL ALTIMÉTRICO WIKILOC
  elevationProfileCard: {
    backgroundColor: '#080C14',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  elevationProfileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  elevationProfileTitle: {
    color: '#00E676',
    fontSize: 10.5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  elevationProfileRangeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  elevationBarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 48,
    gap: 4,
    paddingTop: 4,
  },
  elevationBarColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  elevationBarFill: {
    width: '100%',
    borderRadius: 3,
    minHeight: 6,
  },
  elevationBarValue: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '600',
    marginTop: 2,
  },
  gpxDownloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderWidth: 1,
    borderColor: '#00E5FF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 5,
  },
  gpxDownloadButtonText: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: '800',
  },

  // ESTILOS WIKILOC ROUTE DISPLAY
  wikilocStartMarker: {
    alignItems: 'center',
  },
  wikilocStartInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00E676',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  wikilocStartText: {
    fontSize: 12,
  },
  wikilocStartBadge: {
    backgroundColor: '#00E676',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  wikilocStartBadgeText: {
    color: '#05080E',
    fontSize: 9,
    fontWeight: '900',
  },
  wikilocWaypointMarker: {
    alignItems: 'center',
  },
  wikilocWaypointInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFD600',
    borderWidth: 2,
    borderColor: '#05080E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },

  // TOP ROUTE FOCUS BANNER
  routeFocusBanner: {
    position: 'absolute',
    left: 12,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
    borderWidth: 1.5,
    borderColor: '#FF6D00',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 999,
    shadowColor: '#FF6D00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  routeFocusBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  routeFocusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6D00',
  },
  routeFocusTitle: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
  },
  routeFocusSub: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  routeFocusCloseBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginLeft: 8,
  },
  routeFocusCloseText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },

  // BOTÓN PROMINENTE ENVÍA RUTA AL GPS
  wikilocGpsButton: {
    backgroundColor: '#00E676',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 8,
    marginTop: 12,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  wikilocGpsButtonText: {
    color: '#05080E',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  // AUTOR & SOCIAL WIKILOC
  wikilocAuthorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 10,
    marginTop: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  wikilocAuthorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6D00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wikilocAuthorAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  wikilocAuthorName: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
  },
  wikilocAuthorRole: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  wikilocAuthorActions: {
    flexDirection: 'row',
    gap: 6,
  },
  wikilocSocialPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  wikilocSocialPillActive: {
    borderColor: '#00E676',
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
  },
  wikilocSocialText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },

  // TABLA ESTADÍSTICAS TÉCNICAS WIKILOC
  wikilocStatsCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  wikilocStatsTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  wikilocStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  wikilocStatsItem: {
    flex: 1,
  },
  wikilocStatsLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  wikilocStatsValue: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 1,
  },

  // ESTILOS CROWDSOURCING & FOTOS WIKILOC
  filterPillActiveComunidad: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  fabCrowdsourceButton: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
    borderWidth: 2,
    position: 'relative',
    shadowColor: '#00E676',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  fabCrowdsourceBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFD700',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#0B0F17',
  },
  fabCrowdsourceBadgeText: {
    color: '#0B0F17',
    fontSize: 9,
    fontWeight: '900',
  },
  crowdCommunityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginRight: 6,
  },
  crowdCommunityBannerText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  routePhotosContainer: {
    marginTop: 12,
    marginBottom: 6,
  },
  routePhotosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routePhotosTitle: {
    color: '#00E5FF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  routePhotosCount: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  routePhotosScroll: {
    gap: 10,
    paddingVertical: 2,
  },
  routePhotoThumbWrapper: {
    width: 120,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  routePhotoThumb: {
    width: '100%',
    height: '100%',
  },
  routePhotoZoomBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: 3,
    borderRadius: 6,
  },
  routeDescriptionCard: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  routeDescriptionTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  routeDescriptionText: {
    color: '#F8FAFC',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  routeTipsCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  routeTipsTitle: {
    color: '#00E676',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  routeTipItem: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  poiTipsBox: {
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  poiTipsText: {
    color: '#E2E8F0',
    fontSize: 12,
    lineHeight: 16,
  },
  crowdTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  crowdTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  crowdTabBtnActive: {
    backgroundColor: '#00E676',
  },
  crowdTabBtnText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '700',
  },
  crowdTabBtnTextActive: {
    color: '#05080E',
    fontWeight: '900',
  },
  crowdRowInputs: {
    flexDirection: 'row',
  },
  crowdCoordsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  crowdGpsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.4)',
  },
  crowdGpsBtnText: {
    color: '#00E676',
    fontSize: 11,
    fontWeight: '700',
  },
  crowdPhotoSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 8,
    marginTop: -4,
  },
  crowdPhotoPresetsScroll: {
    marginBottom: 10,
  },
  crowdPhotoPresetChip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  crowdPhotoPresetText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
  },
  crowdPhotoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  crowdAddPhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#00E5FF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
  },
  crowdAddPhotoBtnText: {
    color: '#05080E',
    fontSize: 12,
    fontWeight: '800',
  },
  crowdThumbnailsRow: {
    marginBottom: 14,
  },
  crowdThumbItem: {
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  crowdThumbImg: {
    width: '100%',
    height: '100%',
  },
  crowdThumbDeleteBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF1744',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crowdSubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#00E676',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 18,
    shadowColor: '#00E676',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  crowdSubmitButtonText: {
    color: '#05080E',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  photoLightboxOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 14, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLightboxCloseBtn: {
    position: 'absolute',
    right: 18,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoLightboxImage: {
    width: '94%',
    height: '75%',
    borderRadius: 12,
  },
  photoLightboxCaptionBox: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  photoLightboxCaptionText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
