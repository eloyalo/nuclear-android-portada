// Datos del repo y de la última release. Se consultan a GitHub al compilar, así que cada
// compilación recoge la versión nueva sin tocar la web. Si GitHub no responde, se usan
// los valores de respaldo de abajo (actualízalos de vez en cuando).

export const repo = {
  owner: 'eloyalo',
  name: 'nuclear-android',
  url: 'https://github.com/eloyalo/nuclear-android',
  releases: 'https://github.com/eloyalo/nuclear-android/releases',
  issues: 'https://github.com/eloyalo/nuclear-android/issues',
  writeup: 'https://github.com/eloyalo/nuclear-android/blob/feat/android-port/ANDROID_PORT.md',
  upstream: 'https://github.com/nukeop/nuclear',
  upstreamReleases: 'https://github.com/nukeop/nuclear/releases',
};

// Nombre fijo del APK en cada release: así el enlace /releases/latest/download/<nombre>
// siempre lleva a la última versión, aunque la web no se vuelva a desplegar
const apkName = 'nuclear-android.apk';
const latestApkUrl = `${repo.releases}/latest/download/${apkName}`;

export interface Release {
  tag: string;
  name: string; // p. ej. "Nuclear for Android 1.49.1"
  version: string; // versión de Nuclear en la que se basa, p. ej. "1.49.1"
  date: string; // ISO
  pageUrl: string;
  apkUrl: string;
  apkSizeMb: number;
}

const fallback: Release = {
  tag: 'android-v1.0.2',
  name: 'Nuclear for Android 1.49.1',
  version: '1.49.1',
  date: '2026-10-03T14:39:09Z',
  pageUrl: `${repo.releases}/tag/android-v1.0.2`,
  apkUrl: latestApkUrl,
  apkSizeMb: 23,
};

interface GhAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

async function fetchLatest(): Promise<Release> {
  const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'nuclear-android-portada' },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);
  const data = await res.json();

  // El APK para el público es nuclear-android.apk; si una release no lo trae con ese nombre,
  // el más pequeño que no sea de depuración (y entonces el enlace va a esa release concreta)
  const assets = (data.assets as GhAsset[]).filter((a) => a.name.endsWith('.apk'));
  const apk =
    assets.find((a) => a.name === apkName) ??
    assets.filter((a) => !/debug/i.test(a.name)).sort((a, b) => a.size - b.size)[0];
  if (!apk) throw new Error('la release no tiene APK');
  if (apk.name !== apkName) console.warn(`[release] no hay ${apkName}, se enlaza ${apk.name}`);

  const name: string = data.name || data.tag_name;
  return {
    tag: data.tag_name,
    name,
    version: name.match(/\d+\.\d+\.\d+/)?.[0] ?? data.tag_name.replace(/^android-v/, ''),
    date: data.published_at,
    pageUrl: data.html_url,
    apkUrl: apk.name === apkName ? latestApkUrl : apk.browser_download_url,
    apkSizeMb: Math.round(apk.size / 1024 / 1024), // MiB, como lo muestra Android
  };
}

export const release: Release = await fetchLatest().catch((err) => {
  console.warn(`[release] usando los datos de respaldo: ${err.message}`);
  return fallback;
});
