export type Lang = 'es' | 'en'

export const t = {
  nav: {
    home: { es: 'Inicio', en: 'Home' },
    howItWorks: { es: 'Cómo funciona', en: 'How it works' },
    useCases: { es: 'Casos de uso', en: 'Use cases' },
    diagnosis: { es: 'Diagnóstico', en: 'Diagnosis' },
    cta: { es: 'Analicemos tu caso', en: 'Analyze my case' },
  },
  hero: {
    badge: {
      es: 'Automatización e IA aplicada a procesos reales',
      en: 'Automation and AI applied to real processes',
    },
    title: {
      es: 'Convertimos procesos repetitivos en sistemas inteligentes.',
      en: 'We turn repetitive processes into intelligent systems.',
    },
    subtitle: {
      es: 'Automatización, IA e integraciones para negocios que quieren operar mejor sin sumar más carga manual.',
      en: 'Automation, AI and integrations for businesses that want to operate better without adding more manual work.',
    },
    ctaPrimary: {
      es: 'Analicemos tu caso sin costo',
      en: 'Analyze my case for free',
    },
    ctaSecondary: {
      es: 'Ver casos de uso',
      en: 'View use cases',
    },
    microcopy: {
      es: 'Nos mostrás un proceso. Te decimos si tiene sentido automatizarlo.',
      en: "Show us a process. We'll tell you if it makes sense to automate it.",
    },
    pills: {
      es: ['Automatización', 'IA aplicada', 'Dashboards', 'WhatsApp', 'Excel', 'Procesos'],
      en: ['Automation', 'Applied AI', 'Dashboards', 'WhatsApp', 'Excel', 'Processes'],
    },
    systemCard: {
      title: { es: 'Sistema MAI', en: 'MAI System' },
      subtitle: { es: 'Ordena, conecta y automatiza', en: 'Organizes, connects and automates' },
    },
  },
  process: {
    title: {
      es: 'De proceso manual a sistema inteligente',
      en: 'From manual process to intelligent system',
    },
    subtitle: {
      es: 'Tocá el interruptor y mirá cómo una tarea repetitiva puede convertirse en un flujo claro, automático y fácil de seguir.',
      en: "Tap the switch and see how a repetitive task can become a clear, automated and easy-to-follow workflow.",
    },
    manual: { es: 'Manual', en: 'Manual' },
    automated: { es: 'Automatizado', en: 'Automated' },
    manualCards: {
      es: [
        { title: 'Factura / PDF recibido', label: 'pendiente' },
        { title: 'Copiar datos a mano', label: 'manual' },
        { title: 'Excel actualizado tarde', label: 'revisar' },
        { title: 'Recordatorio manual', label: 'avisar' },
        { title: 'Cliente sin seguimiento', label: 'buscar' },
      ],
      en: [
        { title: 'Invoice / PDF received', label: 'pending' },
        { title: 'Copy data by hand', label: 'manual' },
        { title: 'Excel updated late', label: 'review' },
        { title: 'Manual reminder', label: 'notify' },
        { title: 'Client without follow-up', label: 'search' },
      ],
    },
    automatedCards: {
      es: [
        { title: 'Documento recibido', label: 'detectado' },
        { title: 'Datos extraídos', label: 'extraído' },
        { title: 'Cliente identificado', label: 'registrado' },
        { title: 'Aviso enviado', label: 'avisado' },
        { title: 'Dashboard actualizado', label: 'listo' },
      ],
      en: [
        { title: 'Document received', label: 'detected' },
        { title: 'Data extracted', label: 'extracted' },
        { title: 'Client identified', label: 'registered' },
        { title: 'Reminder sent', label: 'notified' },
        { title: 'Dashboard updated', label: 'ready' },
      ],
    },
  },
  useCases: {
    title: { es: 'Problemas que resolvemos', en: 'Problems we solve' },
    subtitle: {
      es: 'No necesitás saber qué herramienta usar. Necesitás detectar qué parte de tu negocio se repite, se pierde o depende demasiado de una persona.',
      en: "You don't need to know which tool to use. You need to detect which part of your business repeats, gets lost or depends too much on one person.",
    },
    cta: { es: 'Consultar por este caso', en: 'Ask about this case' },
  },
  moreThan: {
    title: { es: 'Eso y mucho más.', en: 'That, and much more.' },
    text: {
      es: 'Cada negocio tiene procesos distintos. Mostranos uno que se repita, se pierda o te quite tiempo. Lo analizamos sin costo y te decimos si tiene sentido automatizarlo.',
      en: "Every business has different processes. Show us one that repeats, gets lost or takes too much time. We'll analyze it for free and tell you if it makes sense to automate it.",
    },
    cta: { es: 'Analicemos tu caso', en: 'Analyze my case' },
    nodes: {
      es: ['Tu proceso', 'MAI', 'Sistema funcionando'],
      en: ['Your process', 'MAI', 'Working system'],
    },
  },
  howWeWork: {
    title: { es: 'Cómo trabajamos', en: 'How we work' },
    subtitle: {
      es: 'No arrancamos por la herramienta. Arrancamos por entender el proceso.',
      en: "We don't start with the tool. We start by understanding the process.",
    },
    steps: {
      es: [
        {
          title: 'Entendemos el proceso',
          text: 'Nos contás qué tarea se repite, dónde se pierde tiempo y qué resultado esperás.',
        },
        {
          title: 'Diseñamos la solución',
          text: 'Definimos si conviene automatización simple, integración, dashboard, IA o un sistema a medida.',
        },
        {
          title: 'Implementamos',
          text: 'Construimos una solución clara, usable y conectada a tus herramientas.',
        },
        {
          title: 'Ajustamos y dejamos funcionando',
          text: 'Probamos, corregimos y te dejamos un sistema que puedas usar sin depender de lo técnico.',
        },
      ],
      en: [
        {
          title: 'Understand the process',
          text: "You show us which task repeats, where time is lost and what result you expect.",
        },
        {
          title: 'Design the solution',
          text: "We define whether it needs simple automation, an integration, a dashboard, AI or a custom system.",
        },
        {
          title: 'Implement',
          text: "We build a clear, usable solution connected to your tools.",
        },
        {
          title: 'Adjust and leave it running',
          text: "We test, correct and leave you with a system you can use without depending on technical knowledge.",
        },
      ],
    },
  },
  whyMAI: {
    title: { es: 'Tecnología clara para problemas reales.', en: 'Clear technology for real problems.' },
    text: {
      es: 'MAI no busca llenar tu negocio de herramientas. Buscamos entender dónde se repite el trabajo, dónde se pierde información y dónde un sistema puede hacer que todo funcione mejor.',
      en: "MAI doesn't try to fill your business with tools. We look for where work repeats, where information gets lost and where a system can make everything work better.",
    },
    bullets: {
      es: [
        'No vendemos humo.',
        'No usamos IA porque sí.',
        'No hace falta que sepas de tecnología.',
        'Diseñamos soluciones entendibles.',
        'Usamos automatización, IA o código cuando realmente suma.',
        'Priorizamos claridad, utilidad y mantenimiento.',
      ],
      en: [
        "We don't sell hype.",
        "We don't use AI just because.",
        "You don't need to know technology.",
        "We design understandable solutions.",
        "We use automation, AI or code when it truly helps.",
        "We prioritize clarity, usefulness and maintainability.",
      ],
    },
    dashboard: {
      es: [
        { label: 'Procesos', status: 'ordenado' },
        { label: 'Alertas', status: 'registrado' },
        { label: 'Clientes', status: 'pendiente' },
        { label: 'Tareas', status: 'listo' },
      ],
      en: [
        { label: 'Processes', status: 'organized' },
        { label: 'Alerts', status: 'registered' },
        { label: 'Clients', status: 'pending' },
        { label: 'Tasks', status: 'ready' },
      ],
    },
  },
  leadMagnet: {
    title: {
      es: 'Descubrí qué procesos podrías automatizar',
      en: 'Discover which processes you could automate',
    },
    text: {
      es: 'Te enviamos una checklist simple con ideas para detectar tareas repetitivas, errores comunes y oportunidades de automatización en tu negocio.',
      en: "We'll send you a simple checklist with ideas to detect repetitive tasks, common mistakes and automation opportunities in your business.",
    },
    resource: {
      es: 'Checklist gratuita: 12 procesos que podrías automatizar',
      en: 'Free checklist: 12 processes you could automate',
    },
    fields: {
      name: { es: 'Nombre', en: 'Name' },
      email: { es: 'Email', en: 'Email' },
      businessType: { es: 'Tipo de negocio', en: 'Business type' },
    },
    button: { es: 'Quiero la checklist', en: 'I want the checklist' },
    microcopy: {
      es: 'Sin spam. Solo recursos útiles y novedades de MAI.',
      en: 'No spam. Only useful resources and MAI updates.',
    },
  },
  contact: {
    title: {
      es: 'Mostranos un proceso repetitivo. Lo analizamos sin costo.',
      en: "Show us a repetitive process. We'll analyze it for free.",
    },
    text: {
      es: 'Puede ser una planilla, un WhatsApp, un PDF, una agenda, un cobro, un seguimiento o cualquier tarea que hoy dependa demasiado de una persona.',
      en: "It can be a spreadsheet, WhatsApp, a PDF, a calendar, a payment, a follow-up or any task that depends too much on one person.",
    },
    whatsapp: { es: 'Hablemos por WhatsApp', en: 'Talk on WhatsApp' },
    submit: { es: 'Enviar consulta', en: 'Send inquiry' },
    fields: {
      name: { es: 'Nombre', en: 'Name' },
      email: { es: 'Email', en: 'Email' },
      company: { es: 'Empresa o negocio', en: 'Company or business' },
      phone: { es: 'WhatsApp', en: 'WhatsApp' },
      process: { es: '¿Qué proceso te gustaría mejorar?', en: 'Which process would you like to improve?' },
    },
  },
  popup: {
    title: { es: 'Estamos lanzando MAI', en: 'MAI is launching' },
    text: {
      es: 'Los primeros negocios que trabajen con nosotros durante esta etapa acceden a diagnóstico inicial sin costo y condiciones preferenciales de lanzamiento durante el primer mes.',
      en: "The first businesses that work with us during this stage get a free initial diagnosis and preferential launch pricing during the first month.",
    },
    highlight: {
      es: 'Precio de lanzamiento para primeros proyectos + diagnóstico inicial 100% gratuito.',
      en: 'Launch pricing for first projects + 100% free initial diagnosis.',
    },
    clarification: {
      es: 'Si hoy tenés procesos repetitivos, tareas manuales o desorden operativo, mostranoslo y vemos juntos si tiene sentido automatizarlo.',
      en: "If you have repetitive processes, manual tasks or operational disorder, show us and we'll see together if it makes sense to automate it.",
    },
    ctaPrimary: { es: 'Quiero analizar mi caso', en: 'Analyze my case' },
    ctaSecondary: { es: 'Ver ejemplos primero', en: 'See examples first' },
    microcopy: {
      es: 'Cupos limitados para proyectos de lanzamiento.',
      en: 'Limited spots for launch projects.',
    },
    fields: {
      name: { es: 'Nombre', en: 'Name' },
      email: { es: 'Email', en: 'Email' },
      phone: { es: 'WhatsApp opcional', en: 'Optional WhatsApp' },
      process: { es: 'Proceso que querés mejorar', en: 'Process you want to improve' },
    },
    button: { es: 'Aplicar al lanzamiento', en: 'Apply for launch' },
  },
  footer: {
    tagline: {
      es: 'Procesos reales. Soluciones inteligentes.',
      en: 'Real processes. Intelligent solutions.',
    },
    links: {
      es: ['Inicio', 'Casos de uso', 'Cómo trabajamos', 'Diagnóstico'],
      en: ['Home', 'Use cases', 'How we work', 'Diagnosis'],
    },
    copyright: {
      es: '© 2026 MAI. Todos los derechos reservados.',
      en: '© 2026 MAI. All rights reserved.',
    },
  },
  forms: {
    success: {
      es: 'Listo. Recibimos tu consulta y te vamos a responder pronto.',
      en: "Done. We received your inquiry and will reply soon.",
    },
    error: {
      es: 'No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.',
      en: "We couldn't send the form. Try again or message us on WhatsApp.",
    },
    sending: { es: 'Enviando...', en: 'Sending...' },
  },
}

export type Translations = typeof t
