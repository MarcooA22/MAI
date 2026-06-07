export type UseCase = {
  iconName: string
  titleEs: string
  titleEn: string
  descEs: string
  descEn: string
  howEs: string
  howEn: string
}

export const useCases: UseCase[] = [
  {
    iconName: 'BellRing',
    titleEs: 'Cobrar sin perseguir a nadie',
    titleEn: 'Get paid without chasing people',
    descEs: 'Cuando una factura vence, el sistema avisa solo. Tu cliente recibe el recordatorio y vos te enterás cuando cobrás.',
    descEn: "When an invoice is due, the system sends the reminder. Your client receives it and you find out when the payment comes in.",
    howEs: 'Alertas automáticas, seguimiento de pagos y registro actualizado.',
    howEn: 'Automatic alerts, payment tracking and updated records.',
  },
  {
    iconName: 'MessageCircle',
    titleEs: 'Alguien que responde por vos en WhatsApp',
    titleEn: 'Someone answering WhatsApp for you',
    descEs: 'Responde las preguntas de siempre, filtra lo urgente y te manda solo lo que necesita tu atención.',
    descEn: "It answers repeated questions, filters what is urgent and only sends you what needs your attention.",
    howEs: 'Asistente conectado a reglas, formularios y derivaciones.',
    howEn: 'Assistant connected to rules, forms and handoff logic.',
  },
  {
    iconName: 'Boxes',
    titleEs: 'Un registro de stock que se actualiza solo',
    titleEn: 'Stock records that update themselves',
    descEs: 'El equipo registra entradas y salidas desde una planilla simple. Vos ves qué tenés, qué falta y qué se mueve más.',
    descEn: "Your team logs entries and exits from a simple sheet. You see what you have, what is missing and what moves the most.",
    howEs: 'Planilla conectada, alertas y tablero actualizado.',
    howEn: 'Connected sheet, alerts and updated dashboard.',
  },
  {
    iconName: 'BarChart3',
    titleEs: 'Ver cómo va tu negocio sin armar reportes',
    titleEn: 'See how your business is doing without building reports',
    descEs: 'Un tablero se actualiza solo con ventas, pagos y datos clave. Sin que nadie lo arme cada semana.',
    descEn: "A dashboard updates itself with sales, payments and key data. No one has to build it every week.",
    howEs: 'Dashboard automático conectado a tus fuentes de datos.',
    howEn: 'Automatic dashboard connected to your data sources.',
  },
  {
    iconName: 'CalendarCheck',
    titleEs: 'Turnos que se confirman solos',
    titleEn: 'Appointments that confirm themselves',
    descEs: 'El cliente agenda, recibe confirmación y recordatorio automático. Vos no movés un dedo hasta que llega.',
    descEn: "The client books, receives confirmation and gets an automatic reminder. You don't move a finger until they arrive.",
    howEs: 'Agenda, confirmaciones, recordatorios y seguimiento.',
    howEn: 'Calendar, confirmations, reminders and follow-up.',
  },
  {
    iconName: 'ClipboardList',
    titleEs: 'Que cada consulta quede registrada',
    titleEn: 'Every inquiry gets registered',
    descEs: 'Cuando alguien te escribe o completa un formulario, los datos van solos donde tienen que estar. Sin copiar nada a mano.',
    descEn: "When someone messages you or fills out a form, the data goes where it needs to go. No manual copying.",
    howEs: 'Formularios, CRM simple y automatización de carga.',
    howEn: 'Forms, simple CRM and automated data entry.',
  },
  {
    iconName: 'GitBranch',
    titleEs: 'Saber en qué estado está cada cliente',
    titleEn: 'Know the status of every client',
    descEs: 'Siempre sabés quién espera respuesta, quién tiene que pagar y quién necesita seguimiento.',
    descEn: "You always know who is waiting for a reply, who has to pay and who needs follow-up.",
    howEs: 'Pipeline visual, alertas y tareas automáticas.',
    howEn: 'Visual pipeline, alerts and automatic tasks.',
  },
]
