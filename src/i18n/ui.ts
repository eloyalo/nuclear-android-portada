// Textos de la web en los dos idiomas. Inglés en la raíz (/), español en /es/.
// Algunos textos llevan HTML sencillo (<strong>, <a>, <code>) y se pintan con set:html.

export const langs = ['en', 'es'] as const;
export type Lang = (typeof langs)[number];

export const paths: Record<Lang, string> = { en: '/', es: '/es/' };
export const ogLocales: Record<Lang, string> = { en: 'en_US', es: 'es_ES' };

type Shot = 'queue' | 'notification' | 'album' | 'searchAlbums' | 'searchArtists' | 'menu' | 'sources' | 'settings' | 'settingsMenu';

export interface Text {
  title: string;
  description: (sizeMb: number) => string;
  nav: { features: string; screenshots: string; setup: string; faq: string };
  langName: string; // nombre del OTRO idioma, para el enlace de cambio
  skip: string;
  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    download: string;
    github: string;
    meta: (version: string, sizeMb: number) => string;
    unofficial: string;
  };
  facts: string[];
  features: { h2: string; intro: string; items: { title: string; body: string }[] };
  matching: { h2: string; body: string; example: string; before: string; after: string };
  shots: { h2: string; intro: string; alt: Record<Shot, string>; caption: Record<Shot, string> };
  setup: { h2: string; intro: string; steps: string[]; note: string };
  compat: { h2: string; intro: string; rows: [string, string][]; tip: string };
  limits: { h2: string; items: string[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  about: { h2: string; body: string; writeup: string; author: string };
  cta: { h2: string; body: string };
  footer: { credits: string; license: string; madeBy: string };
}

const en: Text = {
  title: 'Nuclear for Android — Free Open-Source Music Player (APK)',
  description: (mb) =>
    `Unofficial Android port of Nuclear, the free music player with no ads or tracking. Search any song, stream from YouTube, SoundCloud or Bandcamp and listen in the background. ${mb} MB APK.`,
  nav: { features: 'Features', screenshots: 'Screenshots', setup: 'Setup', faq: 'FAQ' },
  langName: 'Español',
  skip: 'Skip to content',
  hero: {
    eyebrow: 'Unofficial Android port',
    h1: 'Nuclear for Android',
    lead: 'The free, open-source music player with no ads or tracking, now on your phone. Search any artist, album or song, build a queue and keep listening with the screen off.',
    download: 'Download APK',
    github: 'Source on GitHub',
    meta: (v, mb) => `Based on Nuclear ${v} · ${mb} MB · Android 7.0+ · arm64`,
    unofficial:
      'An independent fork of <a href="https://github.com/nukeop/nuclear">nukeop/nuclear</a>, not affiliated with the original project.',
  },
  facts: ['Free', 'Open source (AGPL-3.0)', 'No ads', 'No tracking', 'No subscription'],
  features: {
    h2: 'Not just the desktop app on a small screen',
    intro:
      'Nuclear only shipped for Windows, macOS and Linux. Getting it onto a phone meant rewriting the parts Android can’t run, and fixing a few things the desktop app gets wrong along the way.',
    items: [
      {
        title: 'Background playback',
        body: 'Lock the screen and the music keeps going. Media notification, lock-screen controls and headset buttons all work.',
      },
      {
        title: 'Plays the right song',
        body: 'Uploads whose length doesn’t match the track (full EPs, compilations, documentaries) are thrown out instead of played.',
      },
      {
        title: 'Stream verification',
        body: 'If Nuclear still picks the wrong upload, mark the right one from the queue and it will play that one from then on.',
      },
      {
        title: 'YouTube without yt-dlp',
        body: 'Android can’t run downloaded binaries, so search goes through <a href="https://codeberg.org/ThetaDev/rustypipe">rustypipe</a> and streams come straight from YouTube’s player API.',
      },
      {
        title: 'Near-instant skips',
        body: 'The next track is resolved about 15 seconds before the current one ends. Tracks that fail are skipped, three at most in a row.',
      },
      {
        title: 'Built for a phone',
        body: 'Compact layout under 640 px, navigation and queue in drawers, readable track lists, the Android back button and system bars handled natively.',
      },
      {
        title: 'Small download',
        body: 'The release APK weighs about 23 MB. The first debug builds of the port were around 650 MB.',
      },
      {
        title: 'Same plugins as desktop',
        body: 'Spotify for metadata, NuclearTube (YouTube), SoundCloud, Bandcamp and KHInsider for streaming, all installed from the built-in plugin store.',
      },
    ],
  },
  matching: {
    h2: 'Smarter stream matching than the original',
    body: 'When you hit play, Nuclear asks the streaming plugin for candidates and plays the best one. On desktop that ranking only reorders results, so a long upload can win just because it’s the top hit. This port rejects candidates that are far too long for the track, estimates the length when the album page doesn’t provide it, and scales the tolerance with the track rather than with the candidate.',
    example: 'The case used to test it: “rare” by XXXTENTACION.',
    before: 'Original: plays a 9:20 full-EP upload',
    after: 'This port: plays the 1:35 track',
  },
  shots: {
    h2: 'Screenshots',
    intro: 'Taken on Android with Spotify as the metadata source and NuclearTube for streaming.',
    alt: {
      queue: 'Nuclear for Android playing an album with the queue open',
      notification: 'Nuclear media notification with playback controls on Android',
      album: 'Album page in Nuclear for Android',
      searchAlbums: 'Album search results in Nuclear for Android',
      searchArtists: 'Artist search results in Nuclear for Android',
      menu: 'Navigation drawer of Nuclear for Android',
      sources: 'Sources screen with Spotify metadata and NuclearTube streaming',
      settings: 'Settings screen of Nuclear for Android',
      settingsMenu: 'Settings sections of Nuclear for Android',
    },
    caption: {
      queue: 'Playing, queue open',
      notification: 'Background controls',
      album: 'Album page',
      searchAlbums: 'Album search',
      searchArtists: 'Artist search',
      menu: 'Navigation drawer',
      sources: 'Recommended sources',
      settings: 'Settings',
      settingsMenu: 'Settings sections',
    },
  },
  setup: {
    h2: 'Install and set up',
    intro:
      'Nuclear has no music sources built in: everything comes from plugins, so a fresh install shows an empty dashboard. This combination is the one tested most on Android.',
    steps: [
      'Download the APK, open it and allow installing from this source when Android asks. On first launch, grant the notification permission so the playback controls show up.',
      'Open <strong>☰ → Preferences → Plugins → Store</strong> and install <strong>Spotify</strong> and <strong>NuclearTube</strong>.',
      'Go to <strong>☰ → Sources</strong> and set <strong>Metadata = Spotify</strong> and <strong>Streaming = NuclearTube</strong>.',
      'Search for something and press play.',
    ],
    note: 'Spotify is only used for metadata: artist, album and track data, including durations, which the stream filter relies on to pick the right upload.',
  },
  compat: {
    h2: 'Will it run on my phone?',
    intro:
      'Almost certainly, if it was sold after 2017: nearly every phone since then is 64-bit ARM. Tested on an Android 16 emulator and a physical Android 13 phone.',
    rows: [
      ['Minimum Android', 'Android 7.0 Nougat (API 24)'],
      ['Target Android', 'Android 16 (API 36)'],
      ['CPU', '<code>arm64-v8a</code> only (64-bit ARM)'],
      ['Not supported', '32-bit ARM, x86 / x86_64 (most Chromebooks and Intel tablets)'],
      ['WebView', 'An up-to-date Android System WebView or Chrome'],
      ['Permissions', 'Internet and notifications'],
    ],
    tip: 'On Android 7–9, update <strong>Android System WebView</strong> from the Play Store before installing. An old WebView is the most likely cause of problems on older phones.',
  },
  limits: {
    h2: 'Known limitations',
    items: [
      'Cold starts can occasionally hang. A boot watchdog restarts the app on its own, and the latest release fixed the main cause.',
      'YouTube playlists can’t be imported (the <code>youtube-playlists</code> plugin doesn’t work on Android).',
      'Google may throttle YouTube after many skips in a short time. It clears up after a few minutes.',
      'Desktop-only features are left out: MCP server, MPD server, local HTTP API, Discord Rich Presence and auto-updates.',
    ],
  },
  faq: {
    h2: 'Frequently asked questions',
    items: [
      {
        q: 'Is this the official Nuclear app for Android?',
        a: 'No. Nuclear’s developers only publish desktop builds. This is an unofficial fork by <a href="https://eloyalonso.dev">Eloy Alonso</a> that ports the same app to Android. All credit for Nuclear itself goes to nukeop and its contributors.',
      },
      {
        q: 'Is it free?',
        a: 'Yes. It’s free and open source under the AGPL-3.0 license, like the original. No ads, no subscription and no in-app purchases.',
      },
      {
        q: 'Is it on Google Play?',
        a: 'No. For now it’s distributed as an APK on the <a href="https://github.com/eloyalo/nuclear-android/releases">GitHub releases page</a>, which is also where you get updates.',
      },
      {
        q: 'Where does the music come from?',
        a: 'Nuclear doesn’t host any music. It searches services such as YouTube, SoundCloud or Bandcamp through plugins and plays what they return, the same way the desktop version does.',
      },
      {
        q: 'Why does Android warn me when I install it?',
        a: 'Android warns about any app installed from outside the Play Store. Allow installs from your browser or file manager when asked. The APK is signed with a development key: if a future release changes the signature, you’ll have to uninstall the old version first, which erases the app’s data.',
      },
      {
        q: 'Does it work on Android TV, tablets or Chromebooks?',
        a: 'Android TV boxes and tablets with a 64-bit ARM chip can install it, but there’s no dedicated layout for them. Most Chromebooks and Intel tablets use x86 processors and won’t install it.',
      },
      {
        q: 'I use Windows, macOS or Linux. Is this for me?',
        a: 'No, use the <a href="https://github.com/nukeop/nuclear/releases">official Nuclear releases</a>. This fork only adds the Android build.',
      },
      {
        q: 'Where do I report a bug?',
        a: 'In <a href="https://github.com/eloyalo/nuclear-android/issues">this fork’s issues</a>, not in the original project: its developers don’t maintain the Android version.',
      },
    ],
  },
  about: {
    h2: 'About the port',
    body: 'Nuclear is a Tauri app: React and TypeScript for the interface, Rust underneath, with audio playing inside the WebView. The port keeps that architecture and swaps out what Android can’t run: yt-dlp, the default TLS verifier (it made every HTTPS request from Rust hang) and the desktop-only integrations. Background playback is a small Kotlin plugin with a MediaSession and a foreground service. The 691 desktop tests still pass.',
    writeup: 'Read the technical write-up',
    author: 'Made by',
  },
  cta: {
    h2: 'Give it a try',
    body: 'It’s free, it’s small, and if something breaks, the issues page is open.',
  },
  footer: {
    credits:
      'Nuclear is created by <a href="https://github.com/nukeop">nukeop</a> and the <a href="https://github.com/nukeop/nuclear/graphs/contributors">Nuclear contributors</a>. This site and the Android port are not affiliated with them.',
    license: 'AGPL-3.0, same as the original project.',
    madeBy: 'Android port by',
  },
};

const es: Text = {
  title: 'Nuclear para Android — Reproductor de música libre y gratis (APK)',
  description: (mb) =>
    `Port no oficial de Nuclear a Android: el reproductor de música gratis, sin anuncios ni rastreo. Busca cualquier canción en YouTube, SoundCloud o Bandcamp y escúchala en segundo plano. APK de ${mb} MB.`,
  nav: { features: 'Funciones', screenshots: 'Capturas', setup: 'Instalación', faq: 'Preguntas' },
  langName: 'English',
  skip: 'Saltar al contenido',
  hero: {
    eyebrow: 'Port no oficial para Android',
    h1: 'Nuclear para Android',
    lead: 'El reproductor de música libre, sin anuncios ni rastreo, ahora en el móvil. Busca cualquier artista, álbum o canción, arma tu cola y sigue escuchando con la pantalla apagada.',
    download: 'Descargar APK',
    github: 'Código en GitHub',
    meta: (v, mb) => `Basado en Nuclear ${v} · ${mb} MB · Android 7.0+ · arm64`,
    unofficial:
      'Fork independiente de <a href="https://github.com/nukeop/nuclear">nukeop/nuclear</a>, sin relación con el proyecto original.',
  },
  facts: ['Gratis', 'Código abierto (AGPL-3.0)', 'Sin anuncios', 'Sin rastreo', 'Sin suscripción'],
  features: {
    h2: 'No es la versión de escritorio metida en una pantalla pequeña',
    intro:
      'Nuclear solo existía para Windows, macOS y Linux. Para llevarlo al móvil hubo que reescribir lo que Android no puede ejecutar, y de paso arreglar algunas cosas que la versión de escritorio hace mal.',
    items: [
      {
        title: 'Música en segundo plano',
        body: 'Bloqueas la pantalla y la música sigue. Notificación multimedia, controles en la pantalla de bloqueo y botones de los auriculares.',
      },
      {
        title: 'Suena la canción correcta',
        body: 'Descarta los vídeos cuya duración no cuadra con el tema (EPs completos, recopilatorios, documentales) en vez de reproducirlos.',
      },
      {
        title: 'Verificación de streams',
        body: 'Si aun así elige mal, marcas el vídeo bueno desde la cola y a partir de ahí suena ese.',
      },
      {
        title: 'YouTube sin yt-dlp',
        body: 'Android no deja ejecutar binarios descargados. La búsqueda va por <a href="https://codeberg.org/ThetaDev/rustypipe">rustypipe</a> y el audio sale directamente de la API del reproductor de YouTube.',
      },
      {
        title: 'Saltos casi instantáneos',
        body: 'El siguiente tema se prepara unos 15 segundos antes de que acabe el actual. Si uno falla, salta al siguiente, con un máximo de tres seguidos.',
      },
      {
        title: 'Pensado para el móvil',
        body: 'Diseño compacto por debajo de 640 px, navegación y cola en paneles laterales, listas legibles, botón atrás de Android y márgenes del sistema.',
      },
      {
        title: 'Descarga ligera',
        body: 'El APK pesa unos 23 MB. Las primeras builds de depuración del port rondaban los 650 MB.',
      },
      {
        title: 'Los mismos plugins',
        body: 'Spotify para los datos, y NuclearTube (YouTube), SoundCloud, Bandcamp o KHInsider para el audio. Se instalan desde la tienda de plugins de la app.',
      },
    ],
  },
  matching: {
    h2: 'Elige mejor la canción que el original',
    body: 'Al darle a reproducir, Nuclear pide candidatos al plugin de streaming y pone el mejor. En escritorio esa clasificación solo reordena, así que un vídeo larguísimo puede ganar por salir el primero. Este port descarta los candidatos que se pasan de largo, estima la duración cuando la página del álbum no la trae, y ajusta el margen según el tema, no según el candidato.',
    example: 'El caso con el que se probó: «rare», de XXXTENTACION.',
    before: 'Original: pone un vídeo del EP completo de 9:20',
    after: 'Este port: pone el tema de 1:35',
  },
  shots: {
    h2: 'Capturas',
    intro: 'Hechas en Android con Spotify como fuente de datos y NuclearTube para el audio.',
    alt: {
      queue: 'Nuclear para Android reproduciendo un álbum con la cola abierta',
      notification: 'Notificación de Nuclear con controles de reproducción en Android',
      album: 'Página de un álbum en Nuclear para Android',
      searchAlbums: 'Resultados de búsqueda de álbumes en Nuclear para Android',
      searchArtists: 'Resultados de búsqueda de artistas en Nuclear para Android',
      menu: 'Menú de navegación de Nuclear para Android',
      sources: 'Pantalla de fuentes con Spotify para datos y NuclearTube para streaming',
      settings: 'Ajustes de Nuclear para Android',
      settingsMenu: 'Secciones de ajustes de Nuclear para Android',
    },
    caption: {
      queue: 'Reproduciendo, con la cola',
      notification: 'Controles en segundo plano',
      album: 'Página de álbum',
      searchAlbums: 'Búsqueda de álbumes',
      searchArtists: 'Búsqueda de artistas',
      menu: 'Menú lateral',
      sources: 'Fuentes recomendadas',
      settings: 'Ajustes',
      settingsMenu: 'Secciones de ajustes',
    },
  },
  setup: {
    h2: 'Instalación y primeros pasos',
    intro:
      'Nuclear no trae fuentes de música de serie: todo sale de plugins, así que recién instalado verás el inicio vacío. Esta combinación es la más probada en Android.',
    steps: [
      'Descarga el APK, ábrelo y permite instalar desde esa fuente cuando Android lo pida. Al abrir la app por primera vez, acepta el permiso de notificaciones para que salgan los controles.',
      'Abre <strong>☰ → Preferences → Plugins → Store</strong> e instala <strong>Spotify</strong> y <strong>NuclearTube</strong>.',
      'Ve a <strong>☰ → Sources</strong> y elige <strong>Metadata = Spotify</strong> y <strong>Streaming = NuclearTube</strong>.',
      'Busca algo y dale a reproducir.',
    ],
    note: 'Spotify solo aporta los datos: artista, álbum y canciones, con su duración, que es lo que usa el filtro para elegir el vídeo bueno.',
  },
  compat: {
    h2: '¿Funciona en mi móvil?',
    intro:
      'Casi seguro, si es de 2017 en adelante: prácticamente todos son ARM de 64 bits. Probado en un emulador con Android 16 y en un móvil real con Android 13.',
    rows: [
      ['Android mínimo', 'Android 7.0 Nougat (API 24)'],
      ['Android objetivo', 'Android 16 (API 36)'],
      ['Procesador', 'Solo <code>arm64-v8a</code> (ARM de 64 bits)'],
      ['No compatible', 'ARM de 32 bits, x86 / x86_64 (casi todos los Chromebooks y tablets Intel)'],
      ['WebView', 'Android System WebView o Chrome actualizados'],
      ['Permisos', 'Internet y notificaciones'],
    ],
    tip: 'En Android 7–9, actualiza <strong>Android System WebView</strong> desde Play Store antes de instalar. Un WebView viejo es la causa más probable de problemas en móviles antiguos.',
  },
  limits: {
    h2: 'Limitaciones conocidas',
    items: [
      'Algún arranque en frío puede quedarse colgado. Un vigilante reinicia la app solo, y la última versión corrigió la causa principal.',
      'No se pueden importar listas de YouTube (el plugin <code>youtube-playlists</code> no funciona en Android).',
      'Google puede frenar YouTube si saltas muchas canciones seguidas. Se pasa a los pocos minutos.',
      'Se quedan fuera las funciones solo de escritorio: servidor MCP, servidor MPD, API HTTP local, Discord Rich Presence y actualizaciones automáticas.',
    ],
  },
  faq: {
    h2: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Es la app oficial de Nuclear para Android?',
        a: 'No. Los desarrolladores de Nuclear solo publican versiones de escritorio. Esto es un fork no oficial de <a href="https://eloyalonso.dev">Eloy Alonso</a> que lleva la misma app a Android. El mérito de Nuclear es de nukeop y sus colaboradores.',
      },
      {
        q: '¿Es gratis?',
        a: 'Sí. Es gratis y de código abierto, con licencia AGPL-3.0 como el original. Sin anuncios, sin suscripción y sin compras dentro de la app.',
      },
      {
        q: '¿Está en Google Play?',
        a: 'No. De momento se distribuye como APK en la <a href="https://github.com/eloyalo/nuclear-android/releases">página de releases de GitHub</a>, que es también donde salen las actualizaciones.',
      },
      {
        q: '¿De dónde sale la música?',
        a: 'Nuclear no aloja música. Busca en servicios como YouTube, SoundCloud o Bandcamp a través de plugins y reproduce lo que encuentran, igual que la versión de escritorio.',
      },
      {
        q: '¿Por qué Android me avisa al instalarla?',
        a: 'Android avisa con cualquier app que no venga de Play Store. Permite la instalación desde el navegador o el gestor de archivos cuando lo pida. El APK va firmado con una clave de desarrollo: si una versión futura cambia la firma, habrá que desinstalar la anterior, y eso borra los datos de la app.',
      },
      {
        q: '¿Funciona en Android TV, tablets o Chromebooks?',
        a: 'Los Android TV y tablets con procesador ARM de 64 bits pueden instalarla, aunque no tienen un diseño propio. La mayoría de Chromebooks y tablets Intel usan x86 y no la instalan.',
      },
      {
        q: 'Uso Windows, macOS o Linux. ¿Me sirve?',
        a: 'No, para eso están las <a href="https://github.com/nukeop/nuclear/releases">versiones oficiales de Nuclear</a>. Este fork solo añade la de Android.',
      },
      {
        q: '¿Dónde aviso de un fallo?',
        a: 'En las <a href="https://github.com/eloyalo/nuclear-android/issues">issues de este fork</a>, no en el proyecto original: sus desarrolladores no mantienen la versión de Android.',
      },
    ],
  },
  about: {
    h2: 'Sobre el port',
    body: 'Nuclear es una app de Tauri: React y TypeScript en la interfaz, Rust por debajo y el audio sonando dentro del WebView. El port mantiene esa arquitectura y cambia lo que Android no puede ejecutar: yt-dlp, el verificador TLS por defecto (dejaba colgada cualquier petición HTTPS desde Rust) y las integraciones de escritorio. La reproducción en segundo plano es un plugin pequeño en Kotlin con MediaSession y un servicio en primer plano. Los 691 tests de escritorio siguen pasando.',
    writeup: 'Leer el detalle técnico (en inglés)',
    author: 'Hecho por',
  },
  cta: {
    h2: 'Pruébalo',
    body: 'Es gratis, pesa poco y, si algo falla, las issues están abiertas.',
  },
  footer: {
    credits:
      'Nuclear es obra de <a href="https://github.com/nukeop">nukeop</a> y los <a href="https://github.com/nukeop/nuclear/graphs/contributors">colaboradores de Nuclear</a>. Esta web y el port a Android no tienen relación con ellos.',
    license: 'AGPL-3.0, como el proyecto original.',
    madeBy: 'Port a Android de',
  },
};

export const ui: Record<Lang, Text> = { en, es };
