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
    name: "Cheescake",
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
    seccion: "postres",           // "postres" o "fria"
    category: "tortas",           // sub-categoría para filtros
    name: "Flan",
    description: "Bizcocho húmedo de cacao con ganache de chocolate negro y decoración artesanal.",
    price: 35000,
    unit: "porción",              // texto que aparece junto al precio
    emoji: "🎂",                  // se muestra si no hay imagen
    image: "",                    // ej: "imagenes/torta-chocolate.jpg"
    badge: "popular",             // "popular" | "nuevo" | "fresco" | ""
    active: true
  },
  {
    id: "p3",
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
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
   
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
