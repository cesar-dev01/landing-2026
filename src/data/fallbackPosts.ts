import type { PortableTextBlock } from '@portabletext/types';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; bio?: string };
  categories: Array<{ _key: string; title: string; slug: string }>;
  mainImage?: { asset?: { url?: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number; aspectRatio: number } } }; alt?: string };
  body: PortableTextBlock[];
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

const block = (key: string, text: string, style: 'normal' | 'h2' | 'h3' = 'normal'): PortableTextBlock => ({
  _type: 'block', _key: key, style, markDefs: [], children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
});

export const fallbackPosts: BlogPost[] = [
  {
    _id: 'local-diagnostico',
    title: 'Diagnóstico tributario: cómo detectar contingencias antes de una fiscalización',
    slug: 'diagnostico-tributario-preventivo',
    excerpt: 'Una revisión preventiva permite identificar riesgos, ordenar sustentos y tomar decisiones antes de recibir una comunicación de SUNAT.',
    publishedAt: '2026-08-04T14:00:00.000Z',
    author: { name: 'Richard Agapito Custodio', bio: 'Asesor y consultor tributario de empresas nacionales y transnacionales.' },
    categories: [{ _key: 'cat-1', title: 'Fiscalización', slug: 'fiscalizacion' }],
    body: [
      block('d1', 'Prevenir cuesta menos que corregir', 'h2'),
      block('d2', 'Un diagnóstico tributario revisa la consistencia entre declaraciones, registros, comprobantes, contratos y evidencia operativa. Su objetivo no es solo encontrar errores: también permite documentar correctamente aquello que la empresa ya viene haciendo bien.'),
      block('d3', '¿Qué conviene revisar?', 'h2'),
      block('d4', 'Los puntos de mayor exposición suelen estar en el crédito fiscal del IGV, la deducibilidad de gastos, operaciones con no domiciliados, medios de pago, detracciones, retenciones y diferencias entre la contabilidad y las declaraciones juradas.'),
      block('d5', 'Una revisión útil termina con prioridades claras: contingencias cuantificadas, documentos faltantes, acciones correctivas y responsables. Así, la gerencia puede decidir con información y no bajo la presión de un plazo de fiscalización.'),
      block('d6', 'El mejor momento para revisar', 'h2'),
      block('d7', 'Antes del cierre anual, de una reorganización, de una auditoría financiera o cuando la empresa ha crecido rápidamente. También es recomendable si existen operaciones inusuales o cambios importantes en procesos y proveedores.'),
    ],
    seo: { title: 'Diagnóstico tributario preventivo | Richard Agapito', description: 'Conoce qué revisar para detectar contingencias tributarias antes de una fiscalización de SUNAT.' },
  },
  {
    _id: 'local-fiscalizacion',
    title: 'Fiscalización SUNAT: cómo organizar una respuesta sólida y oportuna',
    slug: 'fiscalizacion-sunat-respuesta',
    excerpt: 'Claves para atender requerimientos de información con trazabilidad, sustento y control de plazos.',
    publishedAt: '2026-07-21T14:00:00.000Z',
    author: { name: 'Richard Agapito Custodio' },
    categories: [{ _key: 'cat-2', title: 'SUNAT', slug: 'sunat' }],
    body: [
      block('f1', 'El requerimiento marca la estrategia', 'h2'),
      block('f2', 'Cada solicitud debe analizarse por su alcance, periodo, tributo y fundamento. Responder más no siempre significa responder mejor: la información debe ser pertinente, coherente y estar ordenada para que su lectura sea inequívoca.'),
      block('f3', 'Control documental y cronología', 'h2'),
      block('f4', 'Conviene construir una matriz con cada punto solicitado, su responsable, fuente de información, fecha límite y evidencia de entrega. Los escritos deben conservar una narrativa consistente con la contabilidad, contratos y operaciones reales.'),
      block('f5', 'Una respuesta técnica también identifica a tiempo qué asuntos requieren aclaración adicional, qué evidencia debe reconstruirse y qué posiciones necesitan respaldo normativo o jurisprudencial.'),
    ],
    seo: { title: 'Cómo responder una fiscalización SUNAT', description: 'Organiza requerimientos, sustentos y plazos para atender una fiscalización SUNAT con una estrategia sólida.' },
  },
  {
    _id: 'local-credito',
    title: 'Crédito fiscal del IGV: tres capas de sustento que la empresa debe cuidar',
    slug: 'credito-fiscal-igv-sustento',
    excerpt: 'El comprobante es solo el inicio: causalidad, fehaciencia y medios de pago deben contar una misma historia.',
    publishedAt: '2026-07-08T14:00:00.000Z',
    author: { name: 'Richard Agapito Custodio' },
    categories: [{ _key: 'cat-3', title: 'IGV', slug: 'igv' }],
    body: [
      block('c1', 'Más allá del comprobante', 'h2'),
      block('c2', 'Para sostener el crédito fiscal es necesario conectar el comprobante con una operación real, necesaria para la actividad y correctamente registrada. Contratos, órdenes, entregables, correos y movimientos bancarios complementan esa trazabilidad.'),
      block('c3', 'Consistencia entre evidencias', 'h2'),
      block('c4', 'Las fechas, importes, conceptos y participantes deben ser coherentes entre sí. Las diferencias no explicadas suelen convertir un asunto documental en una contingencia tributaria.'),
      block('c5', 'Un expediente de sustento preparado desde la operación facilita la atención de auditorías y reduce el tiempo destinado a reconstruir evidencia años después.'),
    ],
    seo: { title: 'Crédito fiscal del IGV y sustento tributario', description: 'Revisa las evidencias necesarias para sustentar correctamente el crédito fiscal del IGV en una fiscalización.' },
  },
];
