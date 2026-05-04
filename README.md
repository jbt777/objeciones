# AbogadoDiablo PWA · Maverick Pulse Suite

Análisis adversarial de ideas con Claude AI. Instalable en iPhone/Android como app nativa.

---

## Estructura del proyecto

```
abogadodiablo-pwa/
├── index.html       ← App completa (HTML + CSS + JS)
├── manifest.json    ← Metadatos PWA
├── sw.js            ← Service Worker (caché offline)
├── icons/
│   ├── icon-192.png ← Icono app (192×192 px)
│   └── icon-512.png ← Icono splash (512×512 px)
└── README.md
```

---

## Deploy en GitHub Pages (5 pasos)

1. Crea un repo en GitHub: `abogadodiablo-pwa` (público)
2. Sube todos los archivos (incluyendo la carpeta `icons/`)
3. Ve a **Settings → Pages → Source: Deploy from branch → main / root**
4. URL resultante: `https://jbt777.github.io/abogadodiablo-pwa/`
5. Abre esa URL en Safari iOS → pulsa **Compartir → Añadir a pantalla de inicio**

---

## Iconos (PENDIENTE)

Necesitas crear dos PNG en `icons/`:
- `icon-192.png` — 192×192 px
- `icon-512.png` — 512×512 px

Sugerencia rápida: usa [favicon.io](https://favicon.io) o genera con el emoji ⚖️ sobre fondo `#0a0e17`.

---

## Configuración API Key en el iPhone

1. Abre la app → pulsa **⚙** (esquina superior derecha)
2. Pega tu Claude API Key (`sk-ant-api03-...`)
3. Pulsa **GUARDAR** — se almacena solo en `localStorage` de tu dispositivo
4. La clave nunca sale de tu iPhone salvo en las llamadas a `api.anthropic.com`

---

## Arquitectura

- **Frontend only** — sin servidor, sin backend
- **Claude API** directo desde el browser (`anthropic-dangerous-direct-browser-access: true`)
- **Model:** `claude-sonnet-4-20250514`
- **Offline:** el shell (HTML/CSS/JS) se cachea vía Service Worker; las llamadas a API requieren conexión
- **iOS Safari:** compatible desde iOS 11.3+

---

## Maverick Pulse Suite · Port map

| App | Puerto |
|---|---|
| NewsletterPulse | 5555 |
| AbogadoDiablo (local) | 5556 |
| StratThink | 5557 |
| El Espejo | 5558 |
| EmailPulse | 5559 |

AbogadoDiablo PWA reemplaza el cliente local del puerto 5556 para uso móvil.
