# 🏔️ ViaTrek - App Móvil de Rutas, Ciclovías & Senderos (Mendoza)

**ViaTrek** es una aplicación móvil de alto rendimiento estilo Google Maps / Wikiloc / Strava especializada en senderos de montaña, ciclovías urbanas y puntos de interés (POIs) en Gran Mendoza y Precordillera (Mendoza, Argentina).

Diseñada y desarrollada con **React Native**, **Expo SDK 52**, **TypeScript** y **Google Maps API Nativo** (`react-native-maps`).

---

## 🚀 Características Principales

1. **Google Maps Nativo (`PROVIDER_GOOGLE`):**
   - Centrado inicial automático en Gran Mendoza y Precordillera (`lat: -32.8895, lng: -68.8458`).
   - Selector dinámico de tipo de mapa: **Relieve / Curvas de nivel** (`terrain`), **Estándar** (`standard`) y **Satélite** (`satellite`).
   - Botón de geolocalización con **seguimiento GPS en tiempo real** (`expo-location`) y marcador animado.

2. **Filtro por Modalidad de Transporte (3 Modos):**
   - 🚴 **Bici:** Ciclovías urbanas pavimentadas (eje Metrotranvía Godoy Cruz - Capital) + senderos técnicos de MTB en Chacras de Coria.
   - 🏍️ **Moto:** Rutas autorizadas de ripio y enduro de montaña (subida al Cerro Arco y Precordillera).
   - 🥾 **Trekking:** Senderos pedestres, huellas de montaña y accesos peatonales.

3. **Capas de Senderos y Ciclovías (Polylines diferenciadas):**
   - **Verde Esmeralda (`#10B981`):** Ciclovías urbanas pavimentadas.
   - **Naranja Terracota (`#F97316`):** Senderos de montaña / singletracks MTB.
   - **Violeta Cobalto (`#6366F1`):** Rutas para motos enduro / ripio 4x4.
   - **Turquesa (`#06B6D4`):** Circuitos multimodales panorámicos (Parque San Martín / Cerro de la Gloria).
   - **Tarjeta interactiva al tocar trazados:** Distancia (km), Desnivel positivo acumulado (+m), Tiempo estimado y Nivel de dificultad.

4. **Puntos de Interés en la Montaña (POIs con Marcadores):**
   - 🏁 **Trailheads / Puntos de Inicio:** Estación Benegas, Base Cerro Arco (Puerta de la Quebrada).
   - 👁️ **Miradores Panorámicos:** Cima Monumento Cerro de la Gloria (vista 360° a los Andes).
   - 💧 **Puestos de Hidratación / Vertientes:** Portones del Parque, Vertiente natural La Crucesita.
   - 🔧 **Puntos de Auxilio / Gomerías:** Estación de autoservicio para bicicletas Parque Central.
   - **Deep Link con Google Maps:** Botón *"Cómo llegar con Google Maps"* que abre automáticamente la navegación nativa en tu dispositivo con el modo de viaje correspondiente (bicicleta, a pie o conducción).

---

## 📁 Estructura del Proyecto

```text
app de senderos/
├── assets/                  # Íconos y splash screen para Android / iOS
├── data/
│   └── routesAndPois.ts     # Coordenadas reales de trazados y POIs en Mendoza
├── screens/
│   └── MapScreen.tsx        # Pantalla principal con MapView, filtros y bottom cards
├── types/
│   └── map.ts               # Tipos TypeScript para rutas, POIs y mapas
├── App.tsx                  # Componente raíz con SafeAreaProvider
├── app.json                 # Configuración de Expo, package com.viatrek.app y API Key
├── eas.json                 # Configuración de EAS Build para generar APK directa
├── package.json             # Dependencias del proyecto
├── tsconfig.json            # Configuración de TypeScript
└── README.md                # Documentación completa
```

---

## 🛠️ Instalación y Ejecución Local

### 1. Clonar o abrir el proyecto
```bash
cd "c:\Users\PC\Documents\app de senderos"
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo de Expo
```bash
npx expo start
```
- Presiona **`a`** para abrir en emulador de Android conectado.
- O escanea el código QR desde tu teléfono con la app **Expo Go** o compila una versión de desarrollo.

---

## 🔑 Configurar la Google Maps API Key para Android

Para que el mapa nativo (`PROVIDER_GOOGLE`) cargue los mapas satelitales y vectoriales en Android:

1. Ingresa a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un proyecto o selecciona uno existente.
3. Dirígete a **APIs y servicios > Biblioteca** y habilita:
   - **Maps SDK for Android**
4. Dirígete a **Credenciales > Crear credenciales > Clave de API**.
5. Abre el archivo `app.json` de este proyecto y reemplaza:
   ```json
   "config": {
     "googleMaps": {
       "apiKey": "PEGA_AQUI_TU_GOOGLE_MAPS_API_KEY"
     }
   }
   ```
6. *(Recomendado para producción)* Restringe la clave de API con el nombre de paquete:
   - **Package name:** `com.viatrek.app`
   - Agrega la huella digital SHA-1 de tu certificado de desarrollo o EAS.

---

## 📱 Compilar y Descargar el APK para Android (EAS Build)

El archivo `eas.json` ya está configurado con `"buildType": "apk"` en el perfil `preview`. Esto permite compilar un archivo `.apk` instalable directamente en cualquier celular Android sin pasar por Google Play Store.

### Paso 1: Instalar EAS CLI (si no lo tienes)
```bash
npm install -g eas-cli
```

### Paso 2: Iniciar sesión en Expo
```bash
eas login
```
*(Si no tienes cuenta, crea una gratis en [expo.dev](https://expo.dev/signup))*

### Paso 3: Vincular el proyecto
```bash
eas build:configure
```

### Paso 4: Iniciar la compilación del APK
```bash
eas build -p android --profile preview
```

### Paso 5: Descargar el archivo APK
1. La consola te mostrará un enlace web del proceso de compilación en los servidores en la nube de Expo.
2. Al finalizar (aproximadamente 5 a 10 minutos), aparecerá en consola el enlace directo de descarga del archivo `.apk` y un código QR.
3. Escanéalo con tu teléfono Android o descarga el `.apk` e instálalo directamente.

---

## 🐙 Sincronización con GitHub (Repositorio ViaTrek)

Para mantener este repositorio sincronizado con tu cuenta de GitHub (`maximiliano-di-natale`):

1. Ve a [GitHub - Crear nuevo repositorio](https://github.com/new).
2. Ponle de nombre **`ViaTrek`** (o `viatrek`) y déjalo sin inicializar con README ni `.gitignore` (ya están creados aquí).
3. En la consola ejecuta:
```bash
git remote set-url origin https://github.com/maximiliano-di-natale/ViaTrek.git
git push -u origin main
```
*(Si creaste el repositorio con minúsculas como `viatrek`, usa `https://github.com/maximiliano-di-natale/viatrek.git`)*.
