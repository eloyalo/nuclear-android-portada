# Nuclear for Android · website

**English** · [Español](#nuclear-para-android--web)

Source of [nuclear.eloyalonso.dev](https://nuclear.eloyalonso.dev), the website of **Nuclear for Android**, an unofficial port of the free, open-source music player [Nuclear](https://github.com/nukeop/nuclear) to Android.

- 📱 The app, its source code and the APK: [eloyalo/nuclear-android](https://github.com/eloyalo/nuclear-android)
- 🌐 The site is available in English (`/`) and Spanish (`/es/`)

The site shows what the port does, screenshots, how to install it and set up the plugins, which phones it runs on, and a FAQ. The download button always points to the latest release on GitHub.

This is not the official Nuclear website and it isn't affiliated with the original project. All credit for Nuclear goes to [nukeop](https://github.com/nukeop) and its contributors.

### Built with

[Astro](https://astro.build), as a static site with no client-side JavaScript. Docker is used for development and builds:

```bash
docker compose up dev                           # development server on http://localhost:4322
docker compose --profile prod up --build web    # production build served by nginx on http://localhost:8081
```

---

# Nuclear para Android · web

[English](#nuclear-for-android--website) · **Español**

Código de [nuclear.eloyalonso.dev](https://nuclear.eloyalonso.dev), la web de **Nuclear para Android**, un port no oficial a Android del reproductor de música libre y gratuito [Nuclear](https://github.com/nukeop/nuclear).

- 📱 La app, su código y el APK: [eloyalo/nuclear-android](https://github.com/eloyalo/nuclear-android)
- 🌐 La web está en inglés (`/`) y en español (`/es/`)

En la web se explica qué hace el port y se ven capturas. También cuenta cómo instalarlo y configurar los plugins, en qué móviles funciona, y responde las preguntas frecuentes. El botón de descarga apunta siempre a la última versión publicada en GitHub.

No es la web oficial de Nuclear ni tiene relación con el proyecto original. El mérito de Nuclear es de [nukeop](https://github.com/nukeop) y sus colaboradores.

### Cómo está hecha

Con [Astro](https://astro.build), como web estática y sin JavaScript en el navegador. Para desarrollar y compilar se usa Docker (los comandos están en la sección en inglés).
