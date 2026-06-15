// Datos de la sección "Automatizaciones concretas para problemas reales".
// Todo el contenido es ficticio y editable. Para ajustar textos o casos,
// modificá únicamente este archivo: el componente AutomationDemo se adapta solo.

export type Bi = { es: string; en: string }

/** Chip de entrada/salida simple: un texto + un estado. */
export type FlowItem = { label: Bi; status: Bi }

/** Salida en formato lista de tarjetas con chip de estado. */
export type OutputCards = {
  kind: 'cards'
  items: FlowItem[]
}

/** Salida en formato mini tabla (datos ficticios). */
export type OutputTable = {
  kind: 'table'
  columns: Bi[]
  rows: { cells: Bi[]; tone: Tone }[]
}

/** Salida agrupada por prioridad. */
export type OutputGroups = {
  kind: 'groups'
  groups: { name: Bi; tone: Tone; items: Bi[] }[]
}

export type Output = OutputCards | OutputTable | OutputGroups

/** Tono de color para chips de estado. */
export type Tone = 'blue' | 'green' | 'violet' | 'orange' | 'cyan' | 'muted'

export type AutomationCase = {
  id: string
  /** Nombre de ícono de lucide-react. */
  iconName: string
  /** Color de acento (hex) para tabs, líneas y detalles. */
  accent: string
  title: Bi
  problem: Bi
  solution: Bi
  result: Bi
  /** Entrada desordenada. */
  inputs: FlowItem[]
  /** Pasos de procesamiento. */
  steps: Bi[]
  /** Salida ordenada. */
  output: Output
}

export const sectionCopy = {
  title: {
    es: 'Automatizaciones concretas para problemas reales',
    en: 'Concrete automations for real problems',
  },
  subtitle: {
    es: 'Cada ejemplo muestra cómo un proceso manual, repetitivo o desordenado puede convertirse en un sistema más claro, medible y fácil de operar.',
    en: 'Each example shows how a manual, repetitive or messy process can become a clearer, measurable and easier-to-operate system.',
  },
  // Etiquetas de las tres columnas del flujo.
  stages: {
    input: { es: 'Entrada', en: 'Input' },
    processing: { es: 'Procesamiento', en: 'Processing' },
    output: { es: 'Salida', en: 'Output' },
  },
  inputHint: {
    es: 'Desordenado · sin formato',
    en: 'Messy · unformatted',
  },
  outputHint: {
    es: 'Ordenado · accionable',
    en: 'Ordered · actionable',
  },
  labels: {
    problem: { es: 'Problema', en: 'Problem' },
    solution: { es: 'Solución', en: 'Solution' },
    result: { es: 'Resultado', en: 'Result' },
  },
} as const

export const automationCases: AutomationCase[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    id: 'agente-consultas',
    iconName: 'MessageCircle',
    accent: '#2F80FF',
    title: { es: 'Agente de consultas controlado', en: 'Controlled inquiry agent' },
    problem: {
      es: 'El negocio recibe preguntas repetidas por WhatsApp, mail o formulario.',
      en: 'The business receives repeated questions via WhatsApp, email or forms.',
    },
    solution: {
      es: 'Un agente responde usando una base de respuestas aprobadas, pide datos faltantes y deriva a una persona cuando corresponde.',
      en: 'An agent replies using a base of approved answers, asks for missing data and hands off to a person when needed.',
    },
    result: {
      es: 'Menos interrupciones, respuestas consistentes y mejor registro de consultas.',
      en: 'Fewer interruptions, consistent answers and better inquiry records.',
    },
    inputs: [
      { label: { es: '«¿Cuánto cuesta?»', en: '“How much is it?”' }, status: { es: 'sin leer', en: 'unread' } },
      { label: { es: '«¿Dónde están?»', en: '“Where are you?”' }, status: { es: 'sin leer', en: 'unread' } },
      { label: { es: '«¿Qué necesito llevar?»', en: '“What do I need to bring?”' }, status: { es: 'sin leer', en: 'unread' } },
      { label: { es: '«¿Tienen turno esta semana?»', en: '“Any slot this week?”' }, status: { es: 'sin leer', en: 'unread' } },
    ],
    steps: [
      { es: 'Detectar intención', en: 'Detect intent' },
      { es: 'Buscar respuesta aprobada', en: 'Find approved answer' },
      { es: 'Pedir dato faltante', en: 'Request missing data' },
      { es: 'Derivar si hace falta', en: 'Hand off if needed' },
    ],
    output: {
      kind: 'cards',
      items: [
        { label: { es: 'Respondido automáticamente', en: 'Answered automatically' }, status: { es: 'resuelto', en: 'resolved' } },
        { label: { es: 'Datos guardados', en: 'Data saved' }, status: { es: 'registrado', en: 'saved' } },
        { label: { es: 'Caso especial derivado', en: 'Special case handed off' }, status: { es: 'derivado', en: 'handed off' } },
        { label: { es: 'Consulta registrada', en: 'Inquiry logged' }, status: { es: 'en registro', en: 'logged' } },
      ],
    },
  },
  // 2 ─────────────────────────────────────────────────────────────────────
  {
    id: 'gastos-ingresos',
    iconName: 'Receipt',
    accent: '#16A34A',
    title: { es: 'Registro automático de gastos e ingresos', en: 'Automatic expense & income logging' },
    problem: {
      es: 'La empresa carga movimientos, comprobantes o extractos manualmente en planillas.',
      en: 'The company enters transactions, receipts or statements into spreadsheets by hand.',
    },
    solution: {
      es: 'Un sistema extrae datos, clasifica movimientos y arma una planilla ordenada para revisar.',
      en: 'A system extracts data, classifies transactions and builds a tidy sheet to review.',
    },
    result: {
      es: 'Menos carga manual, menos errores y mejor control administrativo.',
      en: 'Less manual work, fewer errors and better administrative control.',
    },
    inputs: [
      { label: { es: 'Extracto bancario', en: 'Bank statement' }, status: { es: 'sin procesar', en: 'unprocessed' } },
      { label: { es: 'Comprobantes', en: 'Receipts' }, status: { es: 'sin procesar', en: 'unprocessed' } },
      { label: { es: 'Transferencias', en: 'Transfers' }, status: { es: 'sin procesar', en: 'unprocessed' } },
      { label: { es: 'Notas manuales', en: 'Manual notes' }, status: { es: 'sin procesar', en: 'unprocessed' } },
    ],
    steps: [
      { es: 'Extraer fecha', en: 'Extract date' },
      { es: 'Extraer monto', en: 'Extract amount' },
      { es: 'Clasificar movimiento', en: 'Classify transaction' },
      { es: 'Marcar pendientes', en: 'Flag pending items' },
    ],
    output: {
      kind: 'table',
      columns: [
        { es: 'Fecha', en: 'Date' },
        { es: 'Tipo', en: 'Type' },
        { es: 'Concepto', en: 'Concept' },
        { es: 'Categoría', en: 'Category' },
        { es: 'Estado', en: 'Status' },
      ],
      rows: [
        {
          tone: 'green',
          cells: [
            { es: '03/06', en: '06/03' },
            { es: 'Ingreso', en: 'Income' },
            { es: 'Cobro cliente', en: 'Client payment' },
            { es: 'Ventas', en: 'Sales' },
            { es: 'Conciliado', en: 'Reconciled' },
          ],
        },
        {
          tone: 'orange',
          cells: [
            { es: '05/06', en: '06/05' },
            { es: 'Gasto', en: 'Expense' },
            { es: 'Proveedor insumos', en: 'Supplier' },
            { es: 'Compras', en: 'Purchases' },
            { es: 'Pendiente', en: 'Pending' },
          ],
        },
        {
          tone: 'blue',
          cells: [
            { es: '08/06', en: '06/08' },
            { es: 'Gasto', en: 'Expense' },
            { es: 'Servicios', en: 'Utilities' },
            { es: 'Fijos', en: 'Fixed' },
            { es: 'Clasificado', en: 'Classified' },
          ],
        },
        {
          tone: 'green',
          cells: [
            { es: '11/06', en: '06/11' },
            { es: 'Ingreso', en: 'Income' },
            { es: 'Transferencia', en: 'Transfer' },
            { es: 'Ventas', en: 'Sales' },
            { es: 'Conciliado', en: 'Reconciled' },
          ],
        },
      ],
    },
  },
  // 3 ─────────────────────────────────────────────────────────────────────
  {
    id: 'documentos',
    iconName: 'FileText',
    accent: '#7C3AED',
    title: { es: 'Generador de documentos repetitivos', en: 'Repetitive document generator' },
    problem: {
      es: 'La empresa arma una y otra vez documentos similares: constancias, informes, órdenes, contratos simples, remitos, certificados o documentos administrativos.',
      en: 'The company builds similar documents over and over: certificates, reports, orders, simple contracts, delivery notes or administrative paperwork.',
    },
    solution: {
      es: 'Un formulario carga los datos una vez y el sistema genera el documento con el formato correcto.',
      en: 'A form captures the data once and the system generates the document with the right format.',
    },
    result: {
      es: 'Documentos más rápidos, consistentes y con menor margen de error.',
      en: 'Faster, consistent documents with a lower margin of error.',
    },
    inputs: [
      { label: { es: 'Nombre del cliente', en: 'Client name' }, status: { es: 'a cargar', en: 'to fill' } },
      { label: { es: 'Servicio', en: 'Service' }, status: { es: 'a cargar', en: 'to fill' } },
      { label: { es: 'Fecha', en: 'Date' }, status: { es: 'a cargar', en: 'to fill' } },
      { label: { es: 'Condiciones', en: 'Terms' }, status: { es: 'a cargar', en: 'to fill' } },
      { label: { es: 'Observaciones', en: 'Notes' }, status: { es: 'a cargar', en: 'to fill' } },
    ],
    steps: [
      { es: 'Validar datos', en: 'Validate data' },
      { es: 'Completar plantilla', en: 'Fill template' },
      { es: 'Aplicar formato', en: 'Apply format' },
      { es: 'Guardar registro', en: 'Save record' },
    ],
    output: {
      kind: 'cards',
      items: [
        { label: { es: 'Documento generado', en: 'Document generated' }, status: { es: 'listo', en: 'done' } },
        { label: { es: 'PDF listo', en: 'PDF ready' }, status: { es: 'exportado', en: 'exported' } },
        { label: { es: 'Registro guardado', en: 'Record saved' }, status: { es: 'archivado', en: 'archived' } },
        { label: { es: 'Listo para enviar', en: 'Ready to send' }, status: { es: 'en cola', en: 'queued' } },
      ],
    },
  },
  // 4 ─────────────────────────────────────────────────────────────────────
  {
    id: 'pendientes-alertas',
    iconName: 'BellRing',
    accent: '#F97316',
    title: { es: 'Centro de pendientes y alertas', en: 'Pending items & alerts hub' },
    problem: {
      es: 'Facturas, tareas, documentos, clientes, pagos, mails o vencimientos quedan pendientes hasta que alguien se acuerda.',
      en: 'Invoices, tasks, documents, clients, payments, emails or due dates stay pending until someone remembers.',
    },
    solution: {
      es: 'Un sistema conectado a fuentes existentes detecta pendientes, vencimientos o inconsistencias y genera alertas accionables.',
      en: 'A system connected to existing sources detects pending items, due dates or inconsistencies and generates actionable alerts.',
    },
    result: {
      es: 'Menos olvidos, más control y problemas detectados antes de que escalen.',
      en: 'Fewer oversights, more control and problems caught before they escalate.',
    },
    inputs: [
      { label: { es: 'Factura vencida', en: 'Overdue invoice' }, status: { es: 'disperso', en: 'scattered' } },
      { label: { es: 'Cliente sin respuesta', en: 'Client without reply' }, status: { es: 'disperso', en: 'scattered' } },
      { label: { es: 'Documento por vencer', en: 'Document about to expire' }, status: { es: 'disperso', en: 'scattered' } },
      { label: { es: 'Mail sin procesar', en: 'Unprocessed email' }, status: { es: 'disperso', en: 'scattered' } },
      { label: { es: 'Pago pendiente', en: 'Pending payment' }, status: { es: 'disperso', en: 'scattered' } },
    ],
    steps: [
      { es: 'Revisar fuentes', en: 'Scan sources' },
      { es: 'Detectar vencimientos', en: 'Detect due dates' },
      { es: 'Priorizar pendientes', en: 'Prioritize items' },
      { es: 'Asignar acción', en: 'Assign action' },
    ],
    output: {
      kind: 'groups',
      groups: [
        {
          name: { es: 'Urgente', en: 'Urgent' },
          tone: 'orange',
          items: [
            { es: 'Factura vencida hace 5 días', en: 'Invoice 5 days overdue' },
            { es: 'Pago pendiente del proveedor', en: 'Pending supplier payment' },
          ],
        },
        {
          name: { es: 'Esta semana', en: 'This week' },
          tone: 'blue',
          items: [
            { es: 'Documento por vencer', en: 'Document about to expire' },
            { es: 'Cliente esperando respuesta', en: 'Client awaiting reply' },
          ],
        },
        {
          name: { es: 'Pendiente de revisión', en: 'Pending review' },
          tone: 'violet',
          items: [
            { es: 'Mail sin procesar', en: 'Unprocessed email' },
            { es: 'Movimiento sin clasificar', en: 'Unclassified transaction' },
          ],
        },
      ],
    },
  },
]
