// ============================================================
//  📦 ARCHIVO CENTRAL DE PRODUCTOS — Anchetas con Amor
// ============================================================
//
//  ✅ CÓMO AGREGAR UN PRODUCTO NUEVO:
//  1. Copia uno de los bloques { } de abajo
//  2. Pégalo al final de la lista (antes del ] )
//  3. Cambia id, name, description, price, category, badge
//  4. En "image" pon la ruta de tu foto: "imagenes/mi-foto.jpg"
//     Si no tienes foto aún, deja el emoji en "emoji" y borra "image"
//  5. Guarda el archivo — listo, aparece en todas las páginas.
//
//  ✅ CÓMO EDITAR UN PRODUCTO:
//  Busca su "id" y cambia lo que necesites.
//
//  ✅ CÓMO DESACTIVAR UN PRODUCTO SIN BORRARLO:
//  Cambia "active: true" a "active: false"
//
//  ✅ IMÁGENES:
//  - Crea una carpeta "imagenes/" junto a los archivos HTML
//  - Coloca tus fotos ahí (ej: "imagenes/torta-chocolate.jpg")
//  - Tamaño recomendado: 600x400px o similar proporción 3:2
//
//  ✅ CATEGORÍAS disponibles:
//  POSTRES:      "tortas" | "chocolates" | "galletas" | "frutas-dulces" | "especiales"
//  COMIDA FRÍA:  "bebidas" | "snacks" | "quesos" | "frutas-frescas" | "saludables"
//
// ============================================================

const CATALOGO = [

  // ──────────────────────────────────────────────
  //  🍰  POSTRES
  // ──────────────────────────────────────────────

  {
    id: "p1",
    seccion: "postres",           // "postres" o "fria"
    category: "tortas",           // sub-categoría para filtros
    name: "Torta de Chocolate",
    description: "Bizcocho húmedo de cacao con ganache de chocolate negro y decoración artesanal.",
    price: 35000,
    unit: "porción",              // texto que aparece junto al precio
    emoji: "🎂",                  // se muestra si no hay imagen
    image: "",                    // ej: "imagenes/torta-chocolate.jpg"
    badge: "popular",             // "popular" | "nuevo" | "fresco" | ""
    active: true
  },
  {
    id: "p2",
    seccion: "postres",
    category: "tortas",
    name: "Torta Red Velvet prueba",
    description: "Terciopelo rojo con crema de queso y frosting de mantequilla, perfecta para celebraciones.",
    price: 38000,
    unit: "porción",
    emoji: "🍰",
    image: "imagenes/descarga.jpg",
    badge: "nuevo",
    active: true
  },
  {
    id: "p3",
    seccion: "postres",
    category: "tortas",
    name: "Cupcakes x6",
    description: "Seis cupcakes esponjosos con buttercream en colores pastel, personalizables con mensaje.",
    price: 22000,
    unit: "caja x6",
    emoji: "🧁",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "p4",
    seccion: "postres",
    category: "chocolates",
    name: "Tableta Artesanal",
    description: "Chocolate de 70% cacao con relleno de maracuyá, frutos rojos o caramelo salado.",
    price: 18000,
    unit: "unidad",
    emoji: "🍫",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "p5",
    seccion: "postres",
    category: "chocolates",
    name: "Bombones x12",
    description: "Docena de bombones de chocolate belga con rellenos variados: ron, café, menta y frutas.",
    price: 25000,
    unit: "caja",
    emoji: "🫶",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "p6",
    seccion: "postres",
    category: "chocolates",
    name: "Fresas con Chocolate",
    description: "Fresas frescas bañadas en chocolate oscuro o blanco, decoradas con toppings especiales.",
    price: 20000,
    unit: "x6",
    emoji: "🍓",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "p7",
    seccion: "postres",
    category: "galletas",
    name: "Brownies x4",
    description: "Brownies de chocolate fondant con nueces o chips de chocolate, horneados al momento.",
    price: 16000,
    unit: "caja",
    emoji: "🟫",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "p8",
    seccion: "postres",
    category: "galletas",
    name: "Galletas Decoradas x6",
    description: "Galletas de mantequilla con glaseado real y diseños personalizados según la ocasión.",
    price: 19000,
    unit: "x6",
    emoji: "🍪",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "p9",
    seccion: "postres",
    category: "galletas",
    name: "Macarons x6",
    description: "Macarons parisinos en sabores de temporada: vainilla, fresa, pistacho, lavanda y café.",
    price: 28000,
    unit: "caja",
    emoji: "🫐",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "p10",
    seccion: "postres",
    category: "frutas-dulces",
    name: "Paletas de Gelatina",
    description: "Paletas artesanales de gelatina con frutas naturales, sin conservantes. Colores vibrantes.",
    price: 12000,
    unit: "x4",
    emoji: "🍭",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "p11",
    seccion: "postres",
    category: "frutas-dulces",
    name: "Caja de Frutas Bañadas",
    description: "Selección de frutas de temporada bañadas en chocolate blanco y oscuro con toppings.",
    price: 30000,
    unit: "caja",
    emoji: "🍇",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "p12",
    seccion: "postres",
    category: "frutas-dulces",
    name: "Algodón de Azúcar",
    description: "Algodón artesanal en sabores especiales: fresa, mora, mango y vainilla. Super esponjoso.",
    price: 10000,
    unit: "unidad",
    emoji: "☁️",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "p13",
    seccion: "postres",
    category: "especiales",
    name: "Cheesecake New York",
    description: "Cheesecake cremoso estilo Nueva York con coulis de frutos rojos o caramelo. Porción generosa.",
    price: 42000,
    unit: "porción",
    emoji: "🥮",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "p14",
    seccion: "postres",
    category: "especiales",
    name: "Tiramisú Artesanal",
    description: "Postre italiano clásico con mascarpone, café espresso y cacao en polvo. Receta tradicional.",
    price: 36000,
    unit: "porción",
    emoji: "☕",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "p15",
    seccion: "postres",
    category: "especiales",
    name: "Caja Sorpresa Postres",
    description: "Selección sorpresa de 5 postres artesanales del día, empacados con amor en caja decorada.",
    price: 55000,
    unit: "caja",
    emoji: "🎁",
    image: "",
    badge: "popular",
    active: true
  },

  // ──────────────────────────────────────────────
  //  🧃  COMIDA FRÍA
  // ──────────────────────────────────────────────

  {
    id: "f1",
    seccion: "fria",
    category: "bebidas",
    name: "Jugo Natural x2",
    description: "Dos jugos 100% naturales: maracuyá, mango, mora o lulo. Sin azúcar añadida.",
    price: 14000,
    unit: "2 unid.",
    emoji: "🥤",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "f2",
    seccion: "fria",
    category: "bebidas",
    name: "Agua Saborizada x2",
    description: "Agua mineral con sabores naturales de pepino-menta, frutos rojos o limón-jengibre.",
    price: 10000,
    unit: "2 unid.",
    emoji: "💧",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "f3",
    seccion: "fria",
    category: "bebidas",
    name: "Té Frío Artesanal",
    description: "Té helado con hierbas frescas: menta-limón, hibisco o durazno-canela. Botella decorativa.",
    price: 12000,
    unit: "unidad",
    emoji: "🍵",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "f4",
    seccion: "fria",
    category: "bebidas",
    name: "Limonada de Coco",
    description: "Limonada cremosa con leche de coco, menta fresca y hielo. La favorita para días calurosos.",
    price: 13000,
    unit: "unidad",
    emoji: "🥥",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "f5",
    seccion: "fria",
    category: "snacks",
    name: "Caja de Snacks Variados",
    description: "Chips de yuca, maíz pira, maní tostado y galletas integrales. Sin preservantes.",
    price: 25000,
    unit: "caja",
    emoji: "🍿",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "f6",
    seccion: "fria",
    category: "snacks",
    name: "Mix de Frutos Secos",
    description: "Almendras, nueces, pistachos, arándanos y mango deshidratado. Premium. 200g.",
    price: 22000,
    unit: "200g",
    emoji: "🥜",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "f7",
    seccion: "fria",
    category: "snacks",
    name: "Palitos de Zanahoria & Dip",
    description: "Palitos frescos de zanahoria y apio con dip de hummus casero o guacamole.",
    price: 12000,
    unit: "porción",
    emoji: "🥕",
    image: "",
    badge: "fresco",
    active: true
  },
  {
    id: "f8",
    seccion: "fria",
    category: "snacks",
    name: "Chips Artesanales x2",
    description: "Dos bolsas de chips de plátano verde, yuca o remolacha. Sin preservantes, hechos al momento.",
    price: 18000,
    unit: "2 bolsas",
    emoji: "🫙",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "f9",
    seccion: "fria",
    category: "quesos",
    name: "Tabla de Quesos",
    description: "Selección de 3 quesos artesanales (gouda, brie y campesino) con mermelada casera y galletas.",
    price: 45000,
    unit: "tabla",
    emoji: "🧀",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "f10",
    seccion: "fria",
    category: "quesos",
    name: "Tabla de Embutidos",
    description: "Jamón serrano, salami, pepperoni y prosciutto con pepinillos y mostaza Dijon.",
    price: 50000,
    unit: "tabla",
    emoji: "🥩",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "f11",
    seccion: "fria",
    category: "quesos",
    name: "Dúo Queso & Mermelada",
    description: "Queso crema artesanal con mermelada casera de frutos rojos o mango. Perfecto con tostadas.",
    price: 28000,
    unit: "dúo",
    emoji: "🍯",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "f12",
    seccion: "fria",
    category: "frutas-frescas",
    name: "Ensalada de Frutas",
    description: "Frutas frescas de temporada con miel de abeja, coco rallado y granola crujiente.",
    price: 20000,
    unit: "porción",
    emoji: "🥗",
    image: "",
    badge: "fresco",
    active: true
  },
  {
    id: "f13",
    seccion: "fria",
    category: "frutas-frescas",
    name: "Caja de Frutas Exóticas",
    description: "Mangostino, maracuyá, pitahaya, carambolo y uchuva. Frutas sorpresa de la región.",
    price: 35000,
    unit: "caja",
    emoji: "🥭",
    image: "",
    badge: "popular",
    active: true
  },
  {
    id: "f14",
    seccion: "fria",
    category: "frutas-frescas",
    name: "Brochetas de Frutas x4",
    description: "Cuatro brochetas de frutas frescas con cobertura de yogurt griego y granola.",
    price: 16000,
    unit: "x4",
    emoji: "🍡",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "f15",
    seccion: "fria",
    category: "saludables",
    name: "Yogurt con Granola",
    description: "Yogurt griego natural con granola artesanal, miel de abejas y frutos rojos frescos.",
    price: 18000,
    unit: "porción",
    emoji: "🥣",
    image: "",
    badge: "fresco",
    active: true
  },
  {
    id: "f16",
    seccion: "fria",
    category: "saludables",
    name: "Wrap Veggie",
    description: "Wrap integral con aguacate, lechuga, tomate, zanahoria rallada y hummus. Fresco y saciante.",
    price: 22000,
    unit: "unidad",
    emoji: "🌯",
    image: "",
    badge: "nuevo",
    active: true
  },
  {
    id: "f17",
    seccion: "fria",
    category: "saludables",
    name: "Bowl de Semillas",
    description: "Mix de semillas de chía, lino, girasol y calabaza. Ideal para jugos, yogurt o ensaladas. 150g.",
    price: 20000,
    unit: "150g",
    emoji: "🌻",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "f18",
    seccion: "fria",
    category: "saludables",
    name: "Caja Detox Completa",
    description: "Jugo verde, ensalada de frutas exóticas, mix de semillas, agua saborizada y snack de frutos secos.",
    price: 55000,
    unit: "combo",
    emoji: "🌿",
    image: "",
    badge: "popular",
    active: true
  }

  // ──────────────────────────────────────────────
  //  ➕ AGREGA TUS NUEVOS PRODUCTOS AQUÍ ABAJO
  //  Copia el bloque de ejemplo y rellena los campos
  // ──────────────────────────────────────────────

  /*
  ,{
    id: "p16",                          // ID único, no repetir
    seccion: "postres",                 // "postres" o "fria"
    category: "tortas",                 // sub-categoría
    name: "Nombre del producto",
    description: "Descripción corta y apetitosa del producto.",
    price: 25000,                       // precio en pesos colombianos
    unit: "unidad",                     // ej: porción, caja, unidad, x6...
    emoji: "🎂",                        // emoji de respaldo si no hay imagen
    image: "imagenes/mi-producto.jpg",  // ruta a tu foto (dejar "" si no tienes)
    badge: "nuevo",                     // "popular" | "nuevo" | "fresco" | ""
    active: true
  }
  */

];

// ── Configuración general del negocio ──────────────────────
const CONFIG = {
  whatsapp: "573001234567",   // ← CAMBIA ESTE NÚMERO por el real (con código de país, sin +)
  empaque: 0,              // ← Ya no se usa. El precio de decoración es dinámico (ver crea-tu-ancheta.html)
  nombre_negocio: "Anchetas con Amor"
};
