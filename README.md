# Richard Agapito — Landing y blog tributario

Sitio profesional desarrollado con **Astro, TypeScript, Tailwind CSS, Sanity y Vercel**. La experiencia está planteada como una landing minimalista, rápida y orientada a conversión, con un blog administrable para construir autoridad y posicionamiento orgánico.

## Objetivo

- Presentar la experiencia y los servicios de Richard Agapito Custodio.
- Facilitar el contacto directo por WhatsApp al `+51 941 877 258`.
- Publicar contenido tributario útil desde Sanity Studio.
- Mantener una base técnica favorable para Core Web Vitals, SEO y accesibilidad.

## Contenido y fuentes

La redacción inicial se elaboró con información pública disponible en:

- LinkedIn: <https://www.linkedin.com/in/richardagapitotributarista/>
- Facebook: <https://www.facebook.com/TributarioRA>
- Referencias públicas de actividades académicas y publicaciones profesionales.

Antes de publicar, se recomienda que el titular valide la biografía, credenciales, correo, recomendación y alcance exacto de los servicios.

## Stack

- Astro con salida estática.
- TypeScript en modo estricto.
- Tailwind CSS 4 mediante el plugin oficial de Vite.
- Sanity como CMS del blog.
- Portable Text para el contenido editorial.
- Adaptador oficial de Vercel.
- Sitemap automático y `robots.txt`.

## Desarrollo local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar las variables de entorno:

   ```bash
   cp .env.example .env
   ```

3. Iniciar el sitio:

   ```bash
   npm run dev
   ```

4. Validar y compilar:

   ```bash
   npm run build
   ```

Si no se configura Sanity, el sitio utiliza tres artículos de demostración locales para que la landing y el blog puedan compilarse y revisarse de inmediato.

## Configuración de Sanity

1. Crear un proyecto y dataset en <https://www.sanity.io/manage>.
2. Completar `.env`:

   ```env
   PUBLIC_SANITY_PROJECT_ID=tu_project_id
   PUBLIC_SANITY_DATASET=production
   PUBLIC_SITE_URL=https://tu-dominio.com
   SANITY_STUDIO_PROJECT_ID=tu_project_id
   SANITY_STUDIO_DATASET=production
   ```

3. Iniciar Studio:

   ```bash
   npm run studio
   ```

4. Crear primero un autor y categorías; después publicar artículos.

El modelo separa autor, categoría y artículo mediante referencias. Cada artículo incluye slug, resumen, fecha, imagen con texto alternativo, Portable Text y metadatos SEO opcionales. Sanity genera los IDs de los documentos normales.

## Despliegue en Vercel

1. Importar este repositorio en Vercel.
2. Vercel detectará Astro y usará `npm run build`.
3. Agregar `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` y `PUBLIC_SITE_URL` en Project Settings → Environment Variables.
4. Configurar el dominio final y actualizar `PUBLIC_SITE_URL`.
5. En Sanity Manage, agregar el dominio de producción a **API → CORS Origins** con credenciales desactivadas para lecturas públicas.
6. Crear un deploy hook en Vercel y conectarlo a un webhook de Sanity para reconstruir el sitio cuando se publique contenido.

## SEO implementado

- Títulos y descripciones únicos por página.
- Canonical absoluto.
- Open Graph y Twitter Cards.
- Datos estructurados `ProfessionalService`, `Person` y `Article` en JSON-LD.
- Sitemap XML y `robots.txt`.
- Jerarquía semántica de encabezados.
- URLs limpias y slugs descriptivos.
- Metadatos editoriales de publicación y actualización.
- Opción `noIndex` por artículo desde Sanity.
- Enlaces internos entre landing, blog y artículos.
- Botones de compartir por artículo para Facebook, LinkedIn y WhatsApp. Los enlaces toman la URL real abierta en el navegador, por lo que se adaptan automáticamente al dominio de producción.

Para producción se debe reemplazar el dominio de ejemplo y verificar la propiedad en Google Search Console y Bing Webmaster Tools.

## Rendimiento y PageSpeed

- Salida HTML estática y JavaScript mínimo.
- La imagen principal usa `astro:assets` con variantes AVIF y WebP, tamaños responsivos y prioridad de carga por ser el LCP.
- Las imágenes del blog cargan de forma diferida.
- HTML comprimido.
- Caché inmutable para assets con hash en Vercel.
- Sin librerías de animación, sliders, analítica o fuentes externas bloqueantes.
- Respeto por `prefers-reduced-motion`.
- Dimensiones explícitas para reducir CLS.
- Colores y estados de foco con contraste accesible.

Al conectar analítica o marketing, sus scripts deben cargarse después del consentimiento y solo cuando sean imprescindibles: cualquier script adicional puede afectar INP, LCP y PageSpeed.

## Checklist previo a producción

- [ ] Validar credenciales, biografía, servicios y recomendación con Richard.
- [ ] Confirmar el correo público de contacto.
- [ ] Configurar Sanity y reemplazar los artículos de demostración por contenido revisado.
- [ ] Confirmar dominio final y `PUBLIC_SITE_URL`.
- [ ] Probar todos los enlaces de WhatsApp en móvil y escritorio.
- [ ] Ejecutar Lighthouse/PageSpeed sobre la URL desplegada.
- [ ] Verificar sitemap, datos estructurados y Search Console.

## Paleta

- Azul noche: `#01193F`
- Azul profundo: `#011435`
- Azul acento: `#0443AC`
- Dorado: `#D7A451`
- Fondo: `#FBFBFB`
- Blanco: `#FFFFFF`

## Imagen generada

La imagen editorial del hero fue generada para este proyecto con la herramienta integrada de ImageGen usando una composición corporativa en azul y dorado, sin logos ni texto. El archivo fuente se conserva en `src/assets/hero-consultoria.png`; Astro crea las versiones AVIF/WebP durante el build. No representa a una persona real específica y no debe presentarse como una fotografía de Richard.
