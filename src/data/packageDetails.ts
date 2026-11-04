export interface PackageHighlight {
  title: string;
  description: string;
  details?: string[];
  imageIndex?: number;
  imageIndices?: number[];
  imageFit?: "cover" | "contain";
  videoSrc?: string;
  videoLabel?: string;
}

export interface PackageDetail {
  summary: string;
  highlights: PackageHighlight[];
  includes: string[];
  beforeBooking: string[];
  bring: string[];
  childPriceFactor?: number;
  scheduleNote?: string;
}

const confirmation = [
  "La fecha y la disponibilidad se confirman por WhatsApp.",
  "El punto y la hora exacta de recojo se coordinan antes de la salida.",
  "Consulta las entradas y consumos no indicados antes de realizar un pago.",
];

const standardTourIncludes = [
  "Movilidad cómoda durante el recorrido",
  "Guías totalmente especializados",
  "Botiquín de primeros auxilios",
];

const standardBring = [
  "Repelente",
  "Bloqueador solar",
  "Zapatillas cómodas",
  "Ropa de baño",
  "Toalla",
  "Dinero en efectivo",
  "Abrigo ligero",
];

export const packageDetails: Record<string, PackageDetail> = {
  pozuzo: {
    summary: "Salida de día completo desde Oxapampa hacia Pozuzo, la colonia austro-alemana donde la historia europea se encuentra con la naturaleza y las costumbres de la Selva Central.",
    highlights: [
      {
        title: "Ruta natural y cataratas",
        description: "El camino hacia Pozuzo incluye las paradas anunciadas en las cataratas Rayantambo y Yulitunqui.",
        details: [
          "La experiencia comienza entre montañas, bosque y caídas de agua que anticipan el paisaje de Pozuzo.",
          "Las condiciones de acceso y el tiempo disponible en cada parada se confirman antes de la salida.",
        ],
        imageIndex: 0,
        imageIndices: [0, 1],
      },
      {
        title: "Portal e identidad de Pozuzo",
        description: "Llegada a una comunidad considerada la única colonia austro-alemana del mundo en medio de la selva tropical.",
        details: [
          "El recorrido permite reconocer una identidad formada por el legado de los colonos tiroleses y renanos y su encuentro con la cultura de la Amazonía peruana.",
          "El portal es una de las primeras postales del destino y marca el ingreso a una experiencia de historia, arquitectura y tradición viva.",
        ],
        imageIndex: 4,
        imageIndices: [4, 0],
      },
      {
        title: "Pozas de agua y sal",
        description: "Aguas claras de tonalidad turquesa en un paraje natural ligado al origen del nombre de Pozuzo.",
        details: [
          "Estas pozas nacen de manantiales con presencia natural de sal y azufre y forman piscinas rodeadas por vegetación.",
          "Es una parada para contemplar el paisaje, tomar fotografías y, cuando las condiciones lo permiten, disfrutar del agua fresca.",
        ],
        imageIndex: 5,
        videoSrc: "/media/packages/pozuzo/experiencia-pozuzo.mp4",
        videoLabel: "Ver video de las aguas cristalinas",
      },
      {
        title: "Parque de Pozuzo y barrio Prusia",
        description: "Espacios urbanos que conservan relatos, símbolos y arquitectura de la historia pozucina.",
        details: [
          "En Prusia, el Parque de la Identidad Pozucina reúne referencias a la migración, la música, la danza y las costumbres que distinguen a la comunidad.",
          "Es un recorrido tranquilo para observar el entorno, conocer su historia y encontrar buenas oportunidades para fotografías.",
        ],
        imageIndex: 1,
        imageIndices: [1, 4],
      },
      {
        title: "Sabores y cervecería artesanal",
        description: "Una aproximación a la gastronomía que fusiona tradición austro-alemana e ingredientes de la selva.",
        details: [
          "La visita a la cervecería permite conocer una bebida representativa del destino y su elaboración artesanal.",
          "Durante el recorrido también podrás encontrar desayunos y productos típicos; los consumos se coordinan o pagan directamente según el establecimiento.",
        ],
        imageIndex: 2,
        imageIndices: [2, 3],
      },
    ],
    includes: [...standardTourIncludes, "Recorrido por las ocho paradas publicadas", "Acompañamiento durante el tour", "Coordinación directa con Tangarana"],
    beforeBooking: confirmation,
    bring: [...standardBring, "Ropa cómoda", "Agua"],
  },
  "villa-rica": {
    summary: "Día completo por Villa Rica entre aventura, laguna, miradores y experiencias que explican por qué este destino vive alrededor del café.",
    highlights: [
      {
        title: "Aventura y portal de bienvenida",
        description: "Inicio del recorrido con la actividad de aventura anunciada y una primera postal de Villa Rica.",
        details: [
          "La experiencia de deportes extremos está sujeta a condiciones de operación, edad, clima y tarifa del establecimiento.",
          "En el portal de bienvenida comienza el recorrido por un distrito reconocido por su paisaje y su cultura cafetalera.",
        ],
        imageIndex: 9,
        imageIndices: [9, 0],
      },
      {
        title: "Plaza principal y cafetera gigante",
        description: "Visita al centro de Villa Rica, donde se encuentra su emblemática cafetera gigante de 4,20 metros.",
        details: [
          "La cafetera de acero es uno de los símbolos más fotografiados de Villa Rica y tiene capacidad aproximada para un millar de tazas.",
          "La plaza también reúne jardines, esculturas y referencias a la historia de la llamada Tierra del Café más Fino del Mundo.",
        ],
        imageIndex: 4,
      },
      {
        title: "Laguna El Oconal",
        description: "Paseo en bote entre paisaje de humedal, aves y vegetación acuática como flores de loto.",
        details: [
          "El Oconal es el atractivo natural principal de Villa Rica y un espacio de conservación para aves residentes y migratorias.",
          "Desde sus embarcaderos se realizan paseos en bote para observar el paisaje, la flora y la vida que rodea la laguna.",
        ],
        imageIndex: 3,
        imageIndices: [3, 8],
      },
      {
        title: "Ictioterapia",
        description: "Una experiencia de exfoliación natural de los pies mediante el contacto controlado con pequeños peces.",
        details: [
          "Los peces ayudan a desprender células muertas superficiales mientras mantienes los pies dentro del agua.",
          "Es una actividad breve y relajante; si tienes heridas, sensibilidad o alguna condición en la piel, consulta antes de participar.",
        ],
        imageIndex: 6,
        imageIndices: [6, 0],
      },
      {
        title: "Mirador y Cascada El León",
        description: "Vistas panorámicas de Villa Rica y una parada natural entre bosque, agua y puentes del recorrido.",
        details: [
          "Desde el mirador se aprecia el relieve verde que rodea la ciudad y se obtiene una de las fotografías clásicas del destino.",
          "La Cascada El León presenta dos caídas de agua rodeadas de vegetación; el acceso y la posibilidad de ingresar al agua dependen de las condiciones del día.",
        ],
        imageIndex: 7,
        imageIndices: [7, 5],
      },
      {
        title: "Café y chocolate",
        description: "Conoce procesos, aromas y sabores de dos productos representativos de Villa Rica.",
        details: [
          "La experiencia cafetera permite acercarse al tostado, los métodos de preparación y la degustación de cafés producidos en la zona.",
          "La parada de chocolate muestra productos derivados del cacao y culmina con una degustación; las compras son opcionales.",
        ],
        imageIndex: 1,
        imageIndices: [1, 2],
      },
    ],
    includes: [...standardTourIncludes, "Recorrido por las nueve paradas publicadas", "Acompañamiento durante el tour", "Coordinación directa con Tangarana"],
    beforeBooking: confirmation,
    bring: [...standardBring, "Ropa cómoda", "Zapatillas con buen agarre"],
  },
  perene: {
    summary: "Día completo de naturaleza, cataratas y cultura en el Valle del Perené.",
    highlights: [
      {
        title: "Aventura y mariposario",
        description: "Actividades de aventura y observación cercana del ciclo de vida de mariposas tropicales.",
        details: [
          "La parada en el mariposario permite apreciar colores, formas y especies propias del entorno cálido de la Selva Central.",
          "Las actividades de aventura dependen del clima, la operación local y las condiciones de cada viajero.",
        ],
        imageIndex: 4,
        imageIndices: [4, 7],
      },
      {
        title: "Pepe Lucho y paseo en bote",
        description: "Una parada recreativa seguida de un recorrido tranquilo sobre el agua.",
        details: [
          "El paseo en bote permite disfrutar el paisaje del valle desde otra perspectiva y compartir la experiencia con el grupo.",
          "El tiempo de navegación y las condiciones de participación se coordinan con el operador local.",
        ],
        imageIndex: 3,
        imageIndices: [3, 0],
      },
      {
        title: "Catarata Bayoz",
        description: "Conjunto de caídas escalonadas entre roca y vegetación tropical.",
        details: [
          "Bayoz es uno de los paisajes naturales más conocidos del Perené y ofrece espacios para caminar, observar el agua y tomar fotografías.",
          "El ingreso al agua depende del caudal y de las indicaciones de seguridad disponibles durante la visita.",
        ],
        imageIndex: 5,
        imageIndices: [5, 6],
      },
      {
        title: "Catarata Velo de la Novia",
        description: "Una caída de aproximadamente 55 metros que desciende hacia el cañón de Yurinaki.",
        details: [
          "El sendero conduce a un entorno de paredes rocosas, vegetación y aguas de tonalidad verde esmeralda.",
          "Se recomienda avanzar con calzado de buen agarre y respetar las indicaciones del guía, especialmente cuando el terreno está húmedo.",
        ],
        imageIndex: 6,
        imageIndices: [6, 5],
      },
      {
        title: "Encuentro con la cultura asháninka",
        description: "Acercamiento respetuoso a expresiones, artesanías y tradiciones de una comunidad originaria del valle.",
        details: [
          "La visita permite conocer manifestaciones culturales presentadas por la propia comunidad, como música, danza, vestimenta o productos locales.",
          "Participar y comprar directamente contribuye a que el valor de la experiencia permanezca en la comunidad anfitriona.",
        ],
        imageIndex: 1,
        imageIndices: [1, 2],
      },
    ],
    includes: [...standardTourIncludes, "Recorrido por las siete paradas publicadas", "Acompañamiento durante el tour", "Coordinación directa con Tangarana"],
    beforeBooking: confirmation,
    bring: [...standardBring, "Ropa ligera y una muda", "Calzado para el agua"],
  },
  chontabamba: {
    summary: "Tour de medio día con aventura, artesanía y experiencias culturales cerca de Oxapampa.",
    highlights: [
      {
        title: "Plaza de Chontabamba y aventura",
        description: "Inicio del circuito local y actividad de tirolesa para quienes buscan una dosis de emoción.",
        details: [
          "La plaza y su entorno presentan la vida tranquila de Chontabamba antes de continuar hacia las experiencias del recorrido.",
          "La tirolesa está sujeta a clima, operación, condiciones físicas y tarifa del establecimiento.",
        ],
        imageIndex: 0,
        imageIndices: [0],
      },
      {
        title: "Casa al Revés",
        description: "Una vivienda completamente invertida, creada para jugar con la perspectiva y lograr fotografías sorprendentes.",
        details: [
          "Los ambientes, muebles y objetos están colocados al revés para producir una ilusión óptica divertida para adultos y niños.",
          "El personal del atractivo orienta el recorrido y ayuda a encontrar ángulos creativos para fotografías y videos.",
        ],
        imageIndex: 3,
        imageIndices: [3, 6],
      },
      {
        title: "Tunqui Cueva · opcional",
        description: "Exploración de una cueva húmeda de piedra caliza con estalactitas y formaciones naturales.",
        details: [
          "En el interior se distinguen figuras creadas por la roca y el paso del agua, incluida la formación conocida como La Bruja.",
          "Es importante usar calzado cerrado con buen agarre; el ingreso se realiza únicamente cuando las condiciones son adecuadas.",
        ],
        imageIndex: 1,
        imageIndices: [1, 2],
      },
      {
        title: "Apicultura y artesanías",
        description: "Conoce oficios locales, productos de las abejas y piezas inspiradas en hojas y plantas de la zona.",
        details: [
          "La experiencia acerca al visitante al trabajo artesanal y a la relación entre los productores, el bosque y sus recursos.",
          "Podrás observar procesos y adquirir productos directamente; la disponibilidad depende del espacio visitado ese día.",
        ],
        imageIndex: 5,
        imageIndices: [5],
      },
      {
        title: "El Wharapo · opcional",
        description: "Un antiguo trapiche que conserva el proceso tradicional de transformación de la caña de azúcar.",
        details: [
          "La fuerza del agua mueve el trapiche para extraer el jugo de caña, base del guarapo y otros productos locales.",
          "La degustación y compra son opcionales y están sujetas a la operación del establecimiento.",
        ],
        imageIndex: 7,
        imageIndices: [7],
      },
      {
        title: "Cultura yanesha",
        description: "Acercamiento respetuoso a la lengua, iconografía, relatos y saberes de uno de los pueblos originarios de Oxapampa.",
        details: [
          "Las experiencias culturales pueden incluir explicaciones sobre diseños, plantas, juegos, música, danza y la relación yanesha con el territorio.",
          "El contenido exacto depende de la comunidad o emprendimiento anfitrión confirmado para la salida.",
        ],
        imageIndex: 7,
        imageIndices: [4],
      },
    ],
    includes: [...standardTourIncludes, "Recorrido por las paradas publicadas", "Acompañamiento durante el tour", "Coordinación directa con Tangarana"],
    beforeBooking: [...confirmation, "Tunqui Cueva y Wharapo aparecen como actividades opcionales."],
    bring: [...standardBring, "Ropa cómoda", "Zapatillas cerradas para Tunqui Cueva"],
  },
  "catarata-rio-tigre": {
    summary: "Recorrido de aproximadamente cuatro horas desde Oxapampa, accesible para familias y sin caminatas exigentes.",
    scheduleNote: "Dos horarios: 10:00 a. m. a 2:00 p. m. y 2:30 p. m. a 6:30 p. m.",
    childPriceFactor: 0.5,
    highlights: [
      {
        title: "Catarata Río Tigre",
        description: "Una caída de aproximadamente 29 metros entre paredes rocosas, bosque y espacios para fotografías.",
        details: [
          "Desde la base se aprecia la fuerza del agua y la poza natural que se forma en el caserío La Cañera, cerca de Oxapampa.",
          "El recorrido no exige una caminata extensa, pero es importante respetar las zonas habilitadas y las indicaciones del guía.",
        ],
        imageIndex: 0,
        imageIndices: [0, 7],
      },
      {
        title: "Manantial de aguas cristalinas",
        description: "Pozas transparentes para refrescarse, observar el entorno y disfrutar del agua.",
        details: [
          "Es una parada recreativa donde podrás chapotear o nadar según el nivel del agua y las condiciones del día.",
          "Lleva ropa de baño, toalla, calzado para el agua y una bolsa para guardar prendas mojadas.",
        ],
        imageIndex: 1,
        imageIndices: [2, 3],
      },
      {
        title: "Gruta de la Virgen",
        description: "Visita al punto asociado al origen del manantial y a su fuente natural.",
        details: [
          "La gruta ofrece una pausa breve para conocer el nacimiento del agua y observar este espacio de significado local.",
          "Mantén el lugar limpio y sigue las indicaciones del equipo para proteger la fuente.",
        ],
        imageIndex: 1,
        imageIndices: [1],
      },
      {
        title: "Silla voladora · juego extremo",
        description: "Actividad recreativa al aire libre para elevarse, balancearse y contemplar el paisaje desde otra perspectiva.",
        details: [
          "La silla voladora forma parte de la zona de juegos extremos visitada durante el recorrido y ofrece una experiencia breve entre naturaleza y aventura.",
          "La participación se realiza siguiendo las indicaciones del personal responsable y puede depender del clima, el mantenimiento y las condiciones de seguridad del día.",
        ],
        imageIndex: 4,
        imageIndices: [4],
        imageFit: "contain",
        videoSrc: "/media/packages/rio-tigre/silla-voladora.mp4",
        videoLabel: "Ver video de la silla voladora",
      },
      {
        title: "Mirador El Abra",
        description: "Vista panorámica del valle y experiencia familiar con casa típica y animales de granja.",
        details: [
          "Además del paisaje, la visita puede incluir interacción supervisada con animales, ordeño y alimentación de becerros.",
          "Los espacios recreativos y columpios hacen de esta parada una opción especialmente entretenida para familias con niños.",
        ],
        imageIndex: 0,
        imageIndices: [5, 6],
      },
    ],
    includes: [...standardTourIncludes, "Recojo y retorno coordinado al alojamiento", "Visita a Catarata Río Tigre", "Parada en la zona de juegos extremos y silla voladora"],
    beforeBooking: ["Entradas: S/17 por persona.", "Niños de 5 a 10 años pagan el 50% de la tarifa.", "La reserva se confirma con el 50% del monto total.", "Feriados, grupos, mascotas y recojos alejados se cotizan por WhatsApp."],
    bring: [...standardBring, "Ropa cómoda", "Calzado para el agua", "Gorra o sombrero", "Bolsa para la ropa mojada"],
  },
  "selva-central-4-dias": {
    summary: "Cuatro días por Oxapampa, Pozuzo, Villa Rica y el Valle del Perené con alojamiento y acompañamiento.",
    highlights: [
      {
        title: "Día 1 · Oxapampa",
        description: "Bienvenida a la Selva Central y primeras experiencias entre paisaje, arquitectura y tradición oxapampina.",
        details: [
          "El primer día permite instalarse, conocer el entorno de Oxapampa y comenzar el circuito con el acompañamiento del equipo.",
          "Las paradas y horarios definitivos se confirman de acuerdo con la llegada del grupo y las condiciones de la fecha elegida.",
        ],
        imageIndex: 0,
        imageIndices: [0, 5],
      },
      {
        title: "Día 2 · Pozuzo",
        description: "Naturaleza e historia en la colonia austro-alemana, con arquitectura, costumbres y sabores propios.",
        details: [
          "El día combina el paisaje del camino con los espacios que narran la llegada de los colonos y la identidad multicultural de Pozuzo.",
          "También habrá oportunidades para conocer productos y gastronomía local; los consumos no indicados se pagan por separado.",
        ],
        imageIndex: 1,
        imageIndices: [1, 2],
      },
      {
        title: "Día 3 · Villa Rica",
        description: "Laguna El Oconal, vistas panorámicas y una inmersión en la cultura del café y el chocolate.",
        details: [
          "La jornada reúne naturaleza, paseo y experiencias de degustación vinculadas a los productos más representativos de Villa Rica.",
          "Las actividades complementarias se confirman antes de reservar para que el grupo conozca qué está incluido.",
        ],
        imageIndex: 3,
        imageIndices: [3, 4],
      },
      {
        title: "Día 4 · Valle del Perené",
        description: "Cataratas, recorrido sobre el agua y encuentro respetuoso con expresiones culturales asháninkas.",
        details: [
          "La última jornada combina los paisajes de Bayoz y Velo de la Novia con las experiencias recreativas anunciadas para el valle.",
          "El circuito finaliza con el retorno coordinado; la hora exacta depende del tránsito y del ritmo del grupo.",
        ],
        imageIndex: 6,
        imageIndices: [5, 6],
      },
    ],
    includes: [...standardTourIncludes, "Alojamiento por 4 días y 3 noches", "Desayunos", "Asistencia permanente"],
    beforeBooking: ["La fecha y la disponibilidad se confirman por WhatsApp.", "El hospedaje y el punto de salida se indican al coordinar.", "Consulta las entradas, almuerzos, cenas y actividades opcionales."],
    bring: [...standardBring, "Ropa cómoda para clima variable", "Zapatillas con buen agarre"],
  },
  "yanachaga-chemillen": {
    summary: "Caminata de naturaleza por el sector San Alberto del Parque Nacional Yanachaga Chemillén.",
    scheduleNote: "Salida: 7:00 a. m. · retorno por confirmar.",
    highlights: [
      {
        title: "Bosque de neblina y biodiversidad",
        description: "Ingreso al sector San Alberto, una zona de selva alta con miradores, cascadas y gran diversidad natural.",
        details: [
          "El Parque Nacional protege 122 000 hectáreas y reúne ecosistemas que cambian desde el bosque húmedo hasta zonas de mayor altitud.",
          "La visita se realiza con observación responsable: ver fauna silvestre es posible, pero nunca está garantizado.",
        ],
        imageIndex: 7,
        imageIndices: [7, 0],
      },
      {
        title: "Flora, orquídeas y bromelias",
        description: "Caminata entre helechos, plantas silvestres y especies que aprovechan la humedad del bosque.",
        details: [
          "San Alberto alberga orquídeas, bromelias, líquenes, helechos arbóreos y otras plantas propias del bosque montano.",
          "El guía ayuda a reconocer especies sin retirarlas ni alterar el entorno protegido.",
        ],
        imageIndex: 0,
        imageIndices: [0, 5],
      },
      {
        title: "Árboles gigantes",
        description: "Encuentro con cedros de altura, ficus y ejemplares conocidos como diablo fuerte.",
        details: [
          "Los senderos permiten apreciar árboles de grandes dimensiones y la enorme cantidad de plantas que viven sobre sus troncos y ramas.",
          "Esta etapa invita a caminar con calma, observar texturas y comprender la función del bosque en la regulación del agua.",
        ],
        imageIndex: 6,
        imageIndices: [6, 7],
      },
      {
        title: "Caminata de aproximadamente 14 km",
        description: "Recorrido de ida y vuelta por senderos naturales que requiere energía, buen calzado y preparación.",
        details: [
          "La ruta anunciada demanda varias horas de caminata sobre terreno húmedo y con desniveles; no es un paseo urbano.",
          "La condición del sendero, el acceso y el retorno se confirman con el equipo, especialmente durante la temporada de lluvias.",
        ],
        imageIndex: 6,
        imageIndices: [6, 0],
      },
      {
        title: "Observación de fauna y aves",
        description: "Posibilidad de reconocer aves multicolores y señales de mamíferos que habitan el área protegida.",
        details: [
          "En el parque se registran especies como tangaras, quetzales, colibríes, monos y oso de anteojos, siempre en estado silvestre.",
          "Hablar en voz baja y seguir al guía aumenta las posibilidades de observación y reduce el impacto sobre los animales.",
        ],
        imageIndex: 1,
        imageIndices: [1, 4],
      },
    ],
    includes: [...standardTourIncludes, "Ruta de caminata por el sector San Alberto", "Acompañamiento durante el recorrido", "Coordinación directa con Tangarana"],
    beforeBooking: ["Salida publicada: 7:00 a. m.", "La caminata es de aproximadamente 14 km entre ida y regreso.", "La fecha, disponibilidad y condiciones del sendero se confirman por WhatsApp."],
    bring: [...standardBring, "Zapatillas de trekking con buen agarre", "Agua y refrigerio", "Impermeable"],
  },
};
