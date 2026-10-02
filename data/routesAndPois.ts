import { RouteItem, PointOfInterest, MapRegion } from '../types/map';

export const INITIAL_MENDOZA_REGION: MapRegion = {
  latitude: -32.8895,
  longitude: -68.8458,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

export const MENDOZA_ROUTES: RouteItem[] = [
  {
    id: 'route-ciclovia-gc-capital',
    name: 'Ciclovía Godoy Cruz - Mendoza Capital',
    subtitle: 'Corredor urbano verde pavimentado',
    description: 'Eje troncal ciclista que une el Parque Benegas en Godoy Cruz con el centro de la Ciudad de Mendoza a lo largo de las vías del Metrotranvía. Pavimentada, iluminada y con señalización exclusiva.',
    modes: ['bike', 'trekking'],
    distanceKm: 8.4,
    elevationGainM: 45,
    estimatedTimeMin: 28,
    difficulty: 'Fácil',
    surfaceType: 'Pavimento',
    color: '#10B981', // Verde esmeralda para ciclovía urbana
    strokeWidth: 5,
    coordinates: [
      { latitude: -32.9515, longitude: -68.8540 }, // Parque Benegas / Estación Benegas
      { latitude: -32.9430, longitude: -68.8515 }, // Ciclovía Godoy Cruz altura San Martín Sur
      { latitude: -32.9340, longitude: -68.8492 }, // Estación Godoy Cruz (Panamericana / Belgrano)
      { latitude: -32.9230, longitude: -68.8475 }, // Límite Godoy Cruz - Capital (Zanjón Frías)
      { latitude: -32.9120, longitude: -68.8465 }, // Av. Belgrano y Mariano Moreno
      { latitude: -32.9030, longitude: -68.8458 }, // Av. Belgrano y Pedro Molina
      { latitude: -32.8940, longitude: -68.8452 }, // Belgrano y Sarmiento (Plaza Italia)
      { latitude: -32.8860, longitude: -68.8447 }, // Estación Mendoza / Av. Las Heras y Belgrano
      { latitude: -32.8795, longitude: -68.8440 }, // Parque Central / Nave Cultural
    ],
  },
  {
    id: 'route-chacras-mtb-frias',
    name: 'Senderos de Chacras & Dique Frías',
    subtitle: 'Singletrack MTB & Trail Running',
    description: 'Circuito técnico de montaña en los cerros de Chacras de Coria. Huellas naturales de tierra suelta, curvas peraltadas, cañadones secos y subidas empinadas ideales para mountain bike y trekking precordillerano.',
    modes: ['bike', 'trekking'],
    distanceKm: 12.8,
    elevationGainM: 380,
    estimatedTimeMin: 75,
    difficulty: 'Moderado',
    surfaceType: 'Sendero Técnico',
    color: '#F97316', // Terracota / Naranja para senderos de montaña
    strokeWidth: 4,
    coordinates: [
      { latitude: -32.9980, longitude: -68.8920 }, // Acceso Chacras de Coria / Darragueira
      { latitude: -32.9950, longitude: -68.9010 }, // Inicio Huella Puesto del Cerro
      { latitude: -32.9910, longitude: -68.9085 }, // Cañadón seco precordillerano
      { latitude: -32.9840, longitude: -68.9130 }, // Cruce de filos y senderos MTB
      { latitude: -32.9770, longitude: -68.9185 }, // Mirador de las Lajas
      { latitude: -32.9690, longitude: -68.9220 }, // Bajada técnica hacia Dique Frías
      { latitude: -32.9580, longitude: -68.9150 }, // Quebrada del Frías
      { latitude: -32.9510, longitude: -68.9020 }, // Mirador Oeste Dique Frías
    ],
  },
  {
    id: 'route-cerro-arco-enduro',
    name: 'Ascenso Cerro Arco & Huella Precordillera',
    subtitle: 'Ripio 4x4, Enduro y Trail Aventura',
    description: 'Ruta de ripio consolidado y huella de montaña que asciende desde El Challao (Puerta de la Quebrada) hasta las antenas en la cima del Cerro Arco (1.680 msnm). Permite motos trail/enduro y vehículos todo terreno autorizados.',
    modes: ['moto'],
    distanceKm: 15.6,
    elevationGainM: 790,
    estimatedTimeMin: 55,
    difficulty: 'Difícil',
    surfaceType: 'Ripio / Grava',
    color: '#6366F1', // Violeta / Azul cobalto para motos y enduro
    strokeWidth: 5,
    coordinates: [
      { latitude: -32.8465, longitude: -68.9050 }, // Rotonda El Challao / Av. Champagnat
      { latitude: -32.8410, longitude: -68.9170 }, // Base Puesto Puerta de la Quebrada
      { latitude: -32.8385, longitude: -68.9260 }, // Primer caracol de montaña
      { latitude: -32.8360, longitude: -68.9340 }, // Curva del Mirador del Valle de Uspallata
      { latitude: -32.8345, longitude: -68.9415 }, // Filo norte Cerro Arco
      { latitude: -32.8335, longitude: -68.9485 }, // Cumbre y Antenas del Cerro Arco (1.680m)
      { latitude: -32.8270, longitude: -68.9550 }, // Desvío Huella hacia San Isidro
      { latitude: -32.8190, longitude: -68.9610 }, // Puesto serrano precordillerano
    ],
  },
  {
    id: 'route-cerro-de-la-gloria',
    name: 'Circuito Cerro de la Gloria & Parque San Martín',
    subtitle: 'Ruta multimodal panorámica',
    description: 'Recorrido emblemático que comienza en los históricos Portones del Parque San Martín, rodea el Lago del Parque y asciende por la ladera pavimentada hasta el imponente Monumento al Ejército de los Andes en el Cerro de la Gloria.',
    modes: ['bike', 'moto', 'trekking'],
    distanceKm: 6.2,
    elevationGainM: 140,
    estimatedTimeMin: 22,
    difficulty: 'Fácil',
    surfaceType: 'Pavimento',
    color: '#06B6D4', // Turquesa para circuito multimodal
    strokeWidth: 5,
    coordinates: [
      { latitude: -32.8875, longitude: -68.8605 }, // Portones del Parque General San Martín
      { latitude: -32.8885, longitude: -68.8685 }, // Paseo de los Plátanos / Fuente de los Continentes
      { latitude: -32.8930, longitude: -68.8740 }, // Prado Español / Club Regatas (Lago)
      { latitude: -32.8910, longitude: -68.8795 }, // Av. del Libertador / Acceso Ecoparque
      { latitude: -32.8890, longitude: -68.8840 }, // Base y ascenso al cerro
      { latitude: -32.8906, longitude: -68.8872 }, // Cumbre Cerro de la Gloria (Monumento a San Martín)
      { latitude: -32.8935, longitude: -68.8860 }, // Bajada por Teatro Griego Frank Romero Day
    ],
  },
];

export const MENDOZA_POIS: PointOfInterest[] = [
  {
    id: 'poi-benegas-trailhead',
    name: 'Estación Benegas (Trailhead & Parking)',
    category: 'trailhead',
    description: 'Punto de inicio seguro de la Ciclovía Godoy Cruz. Cuenta con amplio estacionamiento vigilado, bicicleteros, baños públicos y zona de calistenia.',
    coordinate: { latitude: -32.9515, longitude: -68.8540 },
    modes: ['bike', 'trekking'],
    elevationM: 860,
    parkingAvailable: true,
    waterAvailable: true,
    addressOrReference: 'Av. del Trabajo y Panamericana, Godoy Cruz, Mendoza',
  },
  {
    id: 'poi-monumento-gloria',
    name: 'Mirador Monumento al Ejército de los Andes',
    category: 'viewpoint',
    description: 'Punto panorámico más famoso de la ciudad sobre la cumbre del Cerro de la Gloria. Vista 360° al Gran Mendoza, los viñedos y la Cordillera de los Andes.',
    coordinate: { latitude: -32.8906, longitude: -68.8872 },
    modes: ['bike', 'moto', 'trekking'],
    elevationM: 990,
    parkingAvailable: true,
    waterAvailable: true,
    addressOrReference: 'Cima Cerro de la Gloria, Parque General San Martín',
  },
  {
    id: 'poi-cerro-arco-base',
    name: 'Base Cerro Arco (Puerta de la Quebrada)',
    category: 'trailhead',
    description: 'Punto de reunión principal para senderistas, pilotos de parapente y motociclistas de enduro. Restaurante de montaña, puestos de sombra y estacionamiento.',
    coordinate: { latitude: -32.8410, longitude: -68.9170 },
    modes: ['moto', 'trekking'],
    elevationM: 1120,
    parkingAvailable: true,
    waterAvailable: true,
    addressOrReference: 'Circuito El Challao s/n, Las Heras, Mendoza',
  },
  {
    id: 'poi-portones-agua',
    name: 'Puesto de Hidratación Portones del Parque',
    category: 'water',
    description: 'Bebederos públicos de agua potable fresca, estación de recarga de botellas y punto de encuentro habitual para deportistas y ciclistas.',
    coordinate: { latitude: -32.8878, longitude: -68.8612 },
    modes: ['bike', 'trekking'],
    elevationM: 820,
    parkingAvailable: false,
    waterAvailable: true,
    addressOrReference: 'Av. Emilio Civit y Boulogne Sur Mer, Ciudad de Mendoza',
  },
  {
    id: 'poi-taller-ciclovia',
    name: 'Punto Auxilio & Taller Ciclista Parque Central',
    category: 'repair',
    description: 'Estación de autoservicio con inflador de pie para neumáticos, kit de herramientas multiuso para bicicletas y gomería de asistencia rápida cercana.',
    coordinate: { latitude: -32.8810, longitude: -68.8445 },
    modes: ['bike'],
    elevationM: 775,
    parkingAvailable: false,
    waterAvailable: false,
    addressOrReference: 'Paseo Di Benedetto & Ciclovía Belgrano, Ciudad de Mendoza',
  },
  {
    id: 'poi-vertiente-crucesita',
    name: 'Vertiente Natural & Puesto La Crucesita',
    category: 'water',
    description: 'Agua natural de deshielo de vertiente precordillerana en la base de senderos hacia Cerro Arenales y Quebrada de la Manga. Esencial para recarga antes de internarse en la montaña.',
    coordinate: { latitude: -32.9650, longitude: -68.9800 },
    modes: ['trekking', 'moto'],
    elevationM: 1420,
    parkingAvailable: true,
    waterAvailable: true,
    addressOrReference: 'Camino a La Crucesita, Luján de Cuyo / Las Heras, Mendoza',
  },
];
