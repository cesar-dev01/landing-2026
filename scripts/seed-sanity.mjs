import { createReadStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-08-13' });
const scriptDir = dirname(fileURLToPath(import.meta.url));

const categorySeed = [
  { title: 'Fiscalización', slug: 'fiscalizacion', description: 'Preparación, atención y estrategia ante procedimientos de fiscalización tributaria.' },
  { title: 'SUNAT', slug: 'sunat', description: 'Criterios, requerimientos y procedimientos relacionados con la Administración Tributaria.' },
  { title: 'Impuesto a la Renta', slug: 'impuesto-a-la-renta', description: 'Análisis de obligaciones, gastos deducibles y determinación del Impuesto a la Renta.' },
  { title: 'IGV', slug: 'igv', description: 'Crédito fiscal, operaciones gravadas y cumplimiento del Impuesto General a las Ventas.' },
  { title: 'No domiciliados', slug: 'no-domiciliados', description: 'Tratamiento tributario de operaciones y servicios prestados por sujetos no domiciliados.' },
  { title: 'Actualidad tributaria', slug: 'actualidad-tributaria', description: 'Novedades normativas y criterios relevantes para la gestión tributaria empresarial.' },
];

const authorSeed = {
  _type: 'author',
  name: 'Richard Agapito Custodio',
  bio: 'Asesor y consultor tributario con más de 14 años de experiencia acompañando a empresas nacionales y transnacionales. Exasociado de Tax & Legal en KPMG Perú, docente y autor de publicaciones especializadas. Cuenta con formación en Derecho Tributario, fiscalidad internacional y tributación de operaciones empresariales.',
};

function block(key, text, style = 'normal') {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
  };
}

const postSeed = [
  {
    title: 'Diagnóstico tributario: cómo detectar contingencias antes de una fiscalización',
    slug: 'diagnostico-tributario-preventivo',
    excerpt: 'Una revisión preventiva permite identificar riesgos, ordenar sustentos y tomar decisiones antes de recibir una comunicación de SUNAT.',
    publishedAt: '2026-08-12T14:00:00.000Z',
    categorySlugs: ['fiscalizacion', 'sunat', 'actualidad-tributaria'],
    imageFile: 'diagnostico-tributario.png',
    imageAlt: 'Documentos, gráficos y lista de verificación utilizados en un diagnóstico tributario preventivo',
    seo: {
      title: 'Diagnóstico tributario preventivo | Richard Agapito',
      description: 'Conoce qué revisar para detectar contingencias tributarias antes de una fiscalización de SUNAT y organizar un plan de acción.',
      noIndex: false,
    },
    body: [
      block('diag-h2-1', 'Prevenir cuesta menos que corregir', 'h2'),
      block('diag-p-1', 'Un diagnóstico tributario es una revisión ordenada de las obligaciones, procesos y evidencias de una empresa. Su finalidad es detectar diferencias antes de que se conviertan en reparos, multas, intereses o decisiones tomadas bajo la presión de un requerimiento.'),
      block('diag-p-2', 'La revisión no se limita a comparar declaraciones. También conecta la contabilidad con los comprobantes, contratos, medios de pago, entregables y documentos que demuestran cómo ocurrió cada operación. Cuando todas esas fuentes cuentan una misma historia, la posición de la empresa es más sólida.'),
      block('diag-h2-2', '¿Qué aspectos conviene revisar?', 'h2'),
      block('diag-p-3', 'Los puntos de mayor exposición suelen encontrarse en el crédito fiscal del IGV, la deducibilidad de gastos, las detracciones, retenciones, operaciones con no domiciliados y diferencias entre los registros contables y las declaraciones juradas. La importancia de cada punto dependerá del sector, el volumen de operaciones y los cambios que haya experimentado el negocio.'),
      block('diag-p-4', 'También es necesario revisar la trazabilidad. Una factura puede estar correctamente registrada y, aun así, requerir contratos, órdenes de servicio, conformidades, informes, correos o movimientos bancarios que acrediten la realidad y finalidad de la operación.'),
      block('diag-h2-3', 'Convertir hallazgos en decisiones', 'h2'),
      block('diag-p-5', 'El resultado útil de un diagnóstico no es una lista extensa de observaciones. Debe presentar riesgos priorizados, una estimación de su impacto, los documentos faltantes, las medidas correctivas y los responsables de cada acción. Así, la gerencia puede decidir qué atender primero y qué controles debe fortalecer.'),
      block('diag-p-6', 'Una revisión preventiva es especialmente recomendable antes del cierre anual, una reorganización empresarial, una auditoría financiera o un proceso de compra y venta. También resulta valiosa cuando la empresa ha crecido rápidamente o ha incorporado operaciones nuevas.'),
      block('diag-h2-4', 'El momento adecuado', 'h2'),
      block('diag-p-7', 'No es necesario esperar una carta de SUNAT. Cuanto antes se identifique una brecha, mayores serán las alternativas para documentarla, corregirla y evitar que vuelva a producirse. La prevención tributaria convierte la incertidumbre en un plan de trabajo verificable.'),
    ],
  },
  {
    title: 'Fiscalización SUNAT: cómo organizar una respuesta sólida y oportuna',
    slug: 'fiscalizacion-sunat-respuesta',
    excerpt: 'Claves para atender requerimientos de información con trazabilidad, sustento técnico y control de plazos.',
    publishedAt: '2026-08-05T14:00:00.000Z',
    categorySlugs: ['fiscalizacion', 'sunat'],
    imageFile: 'fiscalizacion-sunat.png',
    imageAlt: 'Expedientes ordenados, calendario y herramientas para atender una fiscalización tributaria',
    seo: {
      title: 'Fiscalización SUNAT: respuesta sólida y oportuna',
      description: 'Organiza requerimientos, sustentos y plazos para atender una fiscalización SUNAT con una estrategia clara y consistente.',
      noIndex: false,
    },
    body: [
      block('fis-h2-1', 'El requerimiento define el punto de partida', 'h2'),
      block('fis-p-1', 'Toda fiscalización comienza con una delimitación: tributo, periodo, operación e información solicitada. Antes de reunir documentos, conviene analizar exactamente qué pide el requerimiento, cuál es el plazo y qué aspectos podrían estar siendo evaluados.'),
      block('fis-p-2', 'Responder más información no siempre significa responder mejor. La documentación debe ser pertinente, coherente y fácil de revisar. Una entrega desordenada puede ocultar evidencia valiosa o generar nuevas preguntas que pudieron evitarse con una presentación clara.'),
      block('fis-h2-2', 'Control documental y responsabilidades', 'h2'),
      block('fis-p-3', 'Una matriz de atención permite registrar cada punto solicitado, su responsable interno, la fuente de información, la fecha límite y el estado de la evidencia. Este control reduce omisiones y ayuda a que las áreas contable, legal, financiera y operativa trabajen con una sola versión del caso.'),
      block('fis-p-4', 'Los escritos y anexos deben conservar una narrativa consistente con la contabilidad, los contratos y la operación real. Si existen diferencias de fechas, importes o conceptos, es preferible identificarlas y explicarlas antes de realizar la entrega.'),
      block('fis-h2-3', 'Sustento técnico y trazabilidad', 'h2'),
      block('fis-p-5', 'Cada posición relevante debe vincular hechos, evidencia y fundamento tributario. El objetivo es que el expediente permita seguir el recorrido completo de la operación: cómo se contrató, cómo se ejecutó, cómo se pagó y cómo se registró.'),
      block('fis-p-6', 'La estrategia también debe identificar qué documentos necesitan reconstrucción, qué asuntos requieren una explicación adicional y qué posiciones deben respaldarse con normas, informes o jurisprudencia aplicable.'),
      block('fis-h2-4', 'Anticipar los siguientes pasos', 'h2'),
      block('fis-p-7', 'Atender un requerimiento no termina con el cargo de recepción. Conviene conservar una copia exacta de lo presentado, registrar comunicaciones y preparar posibles aclaraciones. El seguimiento ordenado permite responder con mayor rapidez y mantener control sobre la evolución del procedimiento.'),
    ],
  },
  {
    title: 'Crédito fiscal del IGV: tres capas de sustento que la empresa debe cuidar',
    slug: 'credito-fiscal-igv-sustento',
    excerpt: 'El comprobante es solo el inicio: causalidad, fehaciencia y medios de pago deben contar una misma historia.',
    publishedAt: '2026-07-29T14:00:00.000Z',
    categorySlugs: ['igv', 'sunat', 'impuesto-a-la-renta'],
    imageFile: 'credito-fiscal-igv.png',
    imageAlt: 'Comprobante, evidencia digital y contrato relacionados con el sustento del crédito fiscal del IGV',
    seo: {
      title: 'Crédito fiscal del IGV: cómo sustentar correctamente',
      description: 'Revisa las evidencias necesarias para sustentar el crédito fiscal del IGV y mantener consistencia ante una fiscalización.',
      noIndex: false,
    },
    body: [
      block('igv-h2-1', 'El comprobante es el punto de partida', 'h2'),
      block('igv-p-1', 'Contar con una factura registrada es indispensable, pero no siempre suficiente. Para sostener el crédito fiscal del IGV, la empresa debe demostrar que la operación ocurrió, que se relaciona con su actividad y que cumple las condiciones formales y sustanciales aplicables.'),
      block('igv-p-2', 'La revisión debe considerar el comprobante, el registro de compras, la declaración, los medios de pago y la documentación comercial. Estos elementos no funcionan de manera aislada: deben ser consistentes entre sí.'),
      block('igv-h2-2', 'Primera capa: necesidad y relación con el negocio', 'h2'),
      block('igv-p-3', 'La empresa debe poder explicar por qué adquirió el bien o servicio y cómo se vincula con sus operaciones. Contratos, solicitudes internas, órdenes de compra y presupuestos ayudan a documentar la finalidad empresarial desde el inicio.'),
      block('igv-h2-3', 'Segunda capa: realidad de la operación', 'h2'),
      block('igv-p-4', 'La fehaciencia se construye con evidencia de ejecución. Informes, entregables, guías, actas de conformidad, correos, registros de acceso o documentación logística permiten acreditar que la prestación no existió únicamente en el comprobante.'),
      block('igv-h2-4', 'Tercera capa: pago y consistencia', 'h2'),
      block('igv-p-5', 'Los movimientos bancarios deben permitir relacionar al pagador, al proveedor, el importe y la obligación cancelada. Las fechas y montos deben guardar correspondencia con la factura y con cualquier acuerdo comercial que explique pagos parciales, compensaciones o retenciones.'),
      block('igv-p-6', 'Las inconsistencias no explicadas convierten un asunto documental en una contingencia. Por ello, resulta conveniente revisar el expediente antes de una fiscalización y completar la evidencia mientras las personas involucradas aún conocen el detalle de la operación.'),
      block('igv-h2-5', 'Un expediente preparado desde la operación', 'h2'),
      block('igv-p-7', 'El mejor sustento se construye durante la contratación y ejecución, no años después. Definir una lista mínima de documentos por tipo de operación reduce tiempos de respuesta y fortalece el control tributario de la empresa.'),
    ],
  },
];

async function findOrCreateAuthor() {
  const existing = await client.fetch('*[_type == "author" && name == $name][0]{_id}', { name: authorSeed.name });
  if (existing?._id) {
    await client.patch(existing._id).set({ bio: authorSeed.bio }).commit();
    console.log(`Autor actualizado: ${authorSeed.name}`);
    return existing._id;
  }
  const created = await client.create(authorSeed);
  console.log(`Autor creado: ${authorSeed.name}`);
  return created._id;
}

async function findOrCreateCategories() {
  const ids = new Map();
  for (const category of categorySeed) {
    const existing = await client.fetch('*[_type == "category" && slug.current == $slug][0]{_id}', { slug: category.slug });
    if (existing?._id) {
      await client.patch(existing._id).set({ title: category.title, description: category.description }).commit();
      ids.set(category.slug, existing._id);
      console.log(`Categoría actualizada: ${category.title}`);
      continue;
    }
    const created = await client.create({
      _type: 'category',
      title: category.title,
      slug: { _type: 'slug', current: category.slug },
      description: category.description,
    });
    ids.set(category.slug, created._id);
    console.log(`Categoría creada: ${category.title}`);
  }
  return ids;
}

async function uploadImage(filename) {
  const existing = await client.fetch('*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}', { filename });
  if (existing?._id) return existing._id;
  const filePath = resolve(scriptDir, 'seed-assets', filename);
  const asset = await client.assets.upload('image', createReadStream(filePath), { filename });
  console.log(`Imagen subida: ${filename}`);
  return asset._id;
}

async function createPosts(authorId, categoryIds) {
  for (const post of postSeed) {
    const existing = await client.fetch('*[_type == "post" && slug.current == $slug][0]{_id}', { slug: post.slug });
    if (existing?._id) {
      console.log(`Artículo omitido porque ya existe: ${post.title}`);
      continue;
    }

    const imageAssetId = await uploadImage(post.imageFile);
    const categories = post.categorySlugs.map((slug, index) => ({
      _type: 'reference',
      _key: `category-${index + 1}`,
      _ref: categoryIds.get(slug),
    }));

    await client.create({
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: { _type: 'reference', _ref: authorId },
      categories,
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
        alt: post.imageAlt,
      },
      body: post.body,
      seo: post.seo,
    });
    console.log(`Artículo creado: ${post.title}`);
  }
}

const authorId = await findOrCreateAuthor();
const categoryIds = await findOrCreateCategories();
await createPosts(authorId, categoryIds);

const summary = await client.fetch(`{
  "authors": count(*[_type == "author"]),
  "categories": count(*[_type == "category"]),
  "posts": count(*[_type == "post"])
}`);

console.log('Carga inicial completada:', summary);
