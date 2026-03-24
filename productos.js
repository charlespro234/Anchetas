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
    id: "f2",
    seccion: "fria",
    category: "snacks",
    name: "Mini pizzas x6",
    description: "Agua mineral con sabores naturales de pepino-menta, frutos rojos o limón-jengibre.",
    price: 10000,
    unit: "2 unid.",
    emoji: "💧",
    image: "",
    badge: "",
    active: true
  },
  {
    id: "f2",
    seccion: "fria",
    category: "snacks",
    name: "Mini pizzas x12",
    description: "Agua mineral con sabores naturales de pepino-menta, frutos rojos o limón-jengibre.",
    price: 10000,
    unit: "2 unid.",
    emoji: "💧",
    image: "",
    badge: "",
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
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
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
