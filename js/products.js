// ============================================================
//  Finca PataPalo — Product Catalog Data
//  Prices are default values. Runtime prices come from localStorage.
//  variants: [{label, labelEs, labelEn, price}] — for size picker
//  featured: true — shown in "Fresh This Week" strip
// ============================================================

const WHATSAPP_NUMBER = "50688887777"; // ← Owner: change before launch

const CATEGORIES = {
  fresh:       { es: "Frutas & Tubérculos",   en: "Fresh Produce" },
  packed:      { es: "Empacados",              en: "Packaged" },
  chips:       { es: "Chips",                  en: "Chips" },
  spices:      { es: "Especias en Polvo",      en: "Powdered Spices" },
  flours:      { es: "Harinas",                en: "Flours" },
  supplements: { es: "Suplementos",            en: "Supplements" },
  tea:         { es: "Té",                     en: "Tea" },
};

// Helper: build 70g / 1kg variants from a base price
const kgVariants = (price70g) => [
  { label: "70g",  labelEs: "Bolsa 70g",  labelEn: "70g bag",  price: price70g },
  { label: "1 kg", labelEs: "1 kg",       labelEn: "1 kg",     price: price70g * 10 },
];

const PRODUCTS = [
  // ── Frutas & Tubérculos ───────────────────────────────────
  {
    id: "pitaya", category: "fresh", featured: true,
    es: "Pitaya", en: "Dragon Fruit",
    desc_es: "Fruta exótica llena de antioxidantes. Sabor suave y textura cremosa.",
    desc_en: "Exotic antioxidant-rich fruit. Mild flavour, creamy texture.",
    price: 1000,
  },
  {
    id: "acai", category: "fresh", featured: true,
    es: "Acaí", en: "Açaí",
    desc_es: "El superfruto del Amazonas. Energía y nutrición pura.",
    desc_en: "Amazonian superfruit. Pure energy and nutrition.",
    price: 1000,
  },
  {
    id: "cacao", category: "fresh", featured: true,
    es: "Cacao", en: "Cacao",
    desc_es: "Vainas frescas directamente de la finca. Chocolate sin procesar.",
    desc_en: "Fresh pods straight from the farm. Unprocessed chocolate.",
    price: 1000,
  },
  {
    id: "carambola", category: "fresh", featured: true,
    es: "Carambola", en: "Star Fruit",
    desc_es: "Refrescante y cítrica. Perfecta para jugos y ensaladas.",
    desc_en: "Refreshing and citrusy. Perfect for juices and salads.",
    price: 1000,
  },
  {
    id: "jackfruit", category: "fresh", featured: false,
    es: "Jackfruit", en: "Jackfruit",
    desc_es: "La fruta más grande del mundo. Versátil y nutritiva.",
    desc_en: "The world's largest fruit. Versatile and nutritious.",
    price: 1000,
  },
  {
    id: "limon-caviar", category: "fresh", featured: false,
    es: "Limón Caviar", en: "Caviar Lime",
    desc_es: "Cítrico premium con bolsitas de jugo que explotan en boca.",
    desc_en: "Premium citrus with juice pearls that burst in the mouth.",
    price: 1000,
  },
  {
    id: "caimito", category: "fresh", featured: false,
    es: "Caimito", en: "Star Apple",
    desc_es: "Fruta tropical dulce con pulpa cremosa de color violeta.",
    desc_en: "Sweet tropical fruit with creamy purple-white pulp.",
    price: 1000,
  },
  {
    id: "zapote", category: "fresh", featured: false,
    es: "Zapote", en: "Zapote",
    desc_es: "Dulce y aromático. Rico en vitamina A y minerales.",
    desc_en: "Sweet and aromatic. Rich in vitamin A and minerals.",
    price: 1000,
  },
  {
    id: "papaya", category: "fresh", featured: false,
    es: "Papaya", en: "Papaya",
    desc_es: "Cultivada en la finca, madura naturalmente bajo el sol de Arenal.",
    desc_en: "Farm-grown, naturally ripened under the Arenal sun.",
    price: 1000,
  },
  {
    id: "sacha-fresco", category: "fresh", featured: false,
    es: "Sacha-inchi Fresco", en: "Fresh Sacha-inchi",
    desc_es: "La semilla omega-3 más potente de la naturaleza.",
    desc_en: "Nature's most potent omega-3 seed.",
    price: 1000,
  },
  {
    id: "jamaica", category: "fresh", featured: false,
    es: "Rosa de Jamaica", en: "Hibiscus",
    desc_es: "Flor vibrante para infusiones, jugos y recetas gourmet.",
    desc_en: "Vibrant flower for infusions, juices and gourmet recipes.",
    price: 1000,
  },
  {
    id: "yuca", category: "fresh", featured: false,
    es: "Yuca", en: "Cassava",
    desc_es: "Tubérculo versátil sin gluten. Base de harinas y platillos.",
    desc_en: "Versatile gluten-free tuber. Base for flours and dishes.",
    price: 1000,
  },
  {
    id: "malanga", category: "fresh", featured: false,
    es: "Malanga", en: "Malanga (Taro)",
    desc_es: "Tubérculo de alto valor nutricional, fácil de digerir.",
    desc_en: "High nutritional value tuber, easy to digest.",
    price: 1000,
  },
  {
    id: "camote", category: "fresh", featured: false,
    es: "Camote Anaranjado", en: "Orange Sweet Potato",
    desc_es: "Rico en betacaroteno. Color vibrante y sabor dulce y cremoso.",
    desc_en: "Rich in beta-carotene. Vibrant color with a sweet and creamy flavor.",
    price: 1000,
  },
  {
    id: "platano", category: "fresh", featured: false,
    es: "Plátano", en: "Plantain",
    desc_es: "Plátano maduro de la finca. Dulce, ideal para cocinar.",
    desc_en: "Farm-fresh ripe plantain. Sweet, perfect for cooking.",
    price: 1000,
  },
  {
    id: "banano-manzana", category: "fresh", featured: false,
    es: "Banano Manzana", en: "Apple Banana",
    desc_es: "Mini banana con sabor a manzana. Favorito de los niños.",
    desc_en: "Mini apple-flavored banana. Kids' favorite.",
    price: 1000,
  },
  {
    id: "castanas", category: "fresh", featured: false,
    es: "Castañas", en: "Chestnuts",
    desc_es: "Nueces tropicales cremosas, ricas en carbohidratos saludables.",
    desc_en: "Creamy tropical nuts, rich in healthy carbohydrates.",
    price: 1000,
  },
  {
    id: "mimbro", category: "fresh", featured: false,
    es: "Mimbro", en: "Cucumber Tree Fruit (Bilimbi)",
    desc_es: "Fruta exótica muy ácida y crujiente, perfecta para encurtidos y salsas.",
    desc_en: "Very sour and crunchy exotic fruit, perfect for pickles and sauces.",
    price: 1000,
  },
  {
    id: "ackee", category: "fresh", featured: false,
    es: "Ackee", en: "Ackee",
    desc_es: "Fruta emblemática de Jamaica, suave como mantequilla al cocinarse.",
    desc_en: "Iconic Jamaican fruit, with a buttery texture when cooked.",
    price: 1000,
  },
  {
    id: "kumquat", category: "fresh", featured: false,
    es: "Kumquat", en: "Kumquat",
    desc_es: "Pequeños cítricos que se comen enteros. Piel dulce e interior ácido.",
    desc_en: "Small citrus fruits eaten whole. Sweet peel and sour inside.",
    price: 1000,
  },
  {
    id: "pipian", category: "fresh", featured: false,
    es: "Pipián", en: "Baby Squash (Pipian)",
    desc_es: "Calabacita tierna muy suave, ideal para guisos tradicionales y sopas.",
    desc_en: "Tender baby squash, ideal for traditional stews and soups.",
    price: 1000,
  },
  {
    id: "carolina-reaper", category: "fresh", featured: false,
    es: "Chile Carolina Reaper", en: "Carolina Reaper Pepper",
    desc_es: "Uno de los chiles más picantes del mundo. ¡Úsese con extrema precaución!",
    desc_en: "One of the absolute hottest peppers in the world. Use with extreme caution!",
    price: 1000,
  },
  {
    id: "cayena", category: "fresh", featured: false,
    es: "Chile Cayena", en: "Cayenne Pepper",
    desc_es: "Chile alargado con un picante moderado-alto, clásico en polvos picantes.",
    desc_en: "Long pepper with a moderate-to-high heat, a classic in spicy powders.",
    price: 1000,
  },
  {
    id: "jalapeno", category: "fresh", featured: false,
    es: "Chile Jalapeño", en: "Jalapeño Pepper",
    desc_es: "Picante suave y sabor fresco, excelente para salsas y pico de gallo.",
    desc_en: "Mild heat and fresh flavor, excellent for salsas and pico de gallo.",
    price: 1000,
  },
  {
    id: "okra", category: "fresh", featured: false,
    es: "Okra (Bamia)", en: "Okra",
    desc_es: "Vainas tiernas ideales para espesar guisos o para comer salteadas.",
    desc_en: "Tender pods ideal for thickening stews or eating pan-fried.",
    price: 1000,
  },
  {
    id: "katuk", category: "fresh", featured: false,
    es: "Katuk", en: "Katuk (Sweet Leaf)",
    desc_es: "Hojas nutritivas con sabor similar a guisantes dulces, excelentes para ensaladas o sopas.",
    desc_en: "Nutritious leaves with a sweet pea flavor, excellent for salads or soups.",
    price: 1000,
  },
  {
    id: "limon-kaffir", category: "fresh", featured: false,
    es: "Hoja de Limón Kaffir", en: "Kaffir Lime Leaf",
    desc_es: "Hojas súper aromáticas, clave en la gastronomía asiática y tailandesa.",
    desc_en: "Highly aromatic leaves, key to Asian and Thai gastronomy.",
    price: 1000,
  },
  {
    id: "sagu", category: "fresh", featured: false,
    es: "Sagú (Arrowroot)", en: "Sago (Arrowroot) Root",
    desc_es: "Raíz amilácea muy fácil de digerir, utilizada tradicionalmente como base nutritiva.",
    desc_en: "Easily digestible starchy root, traditionally used as a nutritious base.",
    price: 1000,
  },
  {
    id: "guanabana", category: "fresh", featured: false,
    es: "Guanábana", en: "Soursop",
    desc_es: "Fruta tropical de pulpa blanca aromática con un delicioso sabor agridulce.",
    desc_en: "Tropical fruit with aromatic white pulp and a delicious sweet-sour taste.",
    price: 1000,
  },
  {
    id: "cas", category: "fresh", featured: false,
    es: "Cas", en: "Costa Rican Guava",
    desc_es: "Clásico costarricense por excelencia, ideal para frescos y refrescos ácidos.",
    desc_en: "Costa Rican classic, ideal for sour fresh juices and beverages.",
    price: 1000,
  },
  {
    id: "bitter-melon", category: "fresh", featured: false,
    es: "Melón Amargo (Bitter Melon)", en: "Bitter Melon",
    desc_es: "Vegetal muy saludable con sabor fuertemente amargo, excelente para la sangre.",
    desc_en: "Very healthy vegetable with a distinct bitter flavor, excellent for the blood.",
    price: 1000,
  },
  {
    id: "galangal", category: "fresh", featured: false,
    es: "Galangal", en: "Galangal",
    desc_es: "Rizoma cítrico y pináceo pariente del jengibre, base esencial del picante tailandés.",
    desc_en: "Citrusy and piney ginger relative, essential base of Thai spiciness.",
    price: 1000,
  },

  // ── Empacados ─────────────────────────────────────────────
  {
    id: "jackfruit-emp", category: "packed", featured: false,
    es: "Jackfruit Empacado", en: "Packaged Jackfruit",
    desc_es: "Jackfruit listo para cocinar. Sin conservantes.",
    desc_en: "Cook-ready jackfruit. No preservatives.",
    price: 1000,
  },
  {
    id: "jackfruit-desh", category: "packed", featured: false,
    es: "Jackfruit Deshidratado", en: "Dehydrated Jackfruit",
    desc_es: "Snack seco con toda la fibra y el sabor concentrado.",
    desc_en: "Dried snack with all the fibre and concentrated flavour.",
    price: 1000,
  },

  // ── Chips ─────────────────────────────────────────────────
  {
    id: "chips-mixtos", category: "chips", featured: true,
    es: "Chips Mixtos de Temporada", en: "Seasonal Mixed Chips",
    desc_es: "Yuca · Malanga · Camote · Plátano. Crujientes y sin aceite industrial.",
    desc_en: "Cassava · Malanga · Sweet Potato · Plantain. Crunchy, no industrial oil.",
    price: 1000,
  },

  // ── Especias en Polvo ─────────────────────────────────────
  {
    id: "sacha-polvo", category: "spices", featured: false,
    es: "Polvo de Sacha-inchi", en: "Sacha-inchi Powder",
    desc_es: "Proteína vegetal completa en polvo fino. Superpoder nutricional.",
    desc_en: "Complete plant protein in fine powder. Nutritional superpower.",
    price: 1000,
  },
  {
    id: "curcuma", category: "spices", featured: true,
    es: "Cúrcuma en Polvo", en: "Turmeric Powder",
    desc_es: "Antiinflamatoria y antioxidante. Cultivada en Arenal.",
    desc_en: "Anti-inflammatory and antioxidant. Grown in Arenal.",
    price: 1000,
  },
  {
    id: "jengibre", category: "spices", featured: false,
    es: "Jengibre en Polvo", en: "Ginger Powder",
    desc_es: "Digestivo y energizante. Cosechado y deshidratado en la finca.",
    desc_en: "Digestive and energising. Harvested and dehydrated on the farm.",
    price: 1000,
  },
  {
    id: "pimienta-negra", category: "spices", featured: false,
    es: "Pimienta Negra", en: "Black Pepper",
    desc_es: "Piperina pura. Potencia la absorción de curcumina.",
    desc_en: "Pure piperine. Boosts curcumin absorption.",
    price: 1000,
  },
  {
    id: "pimienta-blanca", category: "spices", featured: false,
    es: "Pimienta Blanca", en: "White Pepper",
    desc_es: "Sabor delicado, ideal para salsas blancas y carnes.",
    desc_en: "Delicate flavour, ideal for white sauces and meats.",
    price: 1000,
  },
  {
    id: "canela", category: "spices", featured: false,
    es: "Canela en Polvo", en: "Cinnamon Powder",
    desc_es: "Regula el azúcar en sangre. Aroma cálido e irresistible.",
    desc_en: "Regulates blood sugar. Warm and irresistible aroma.",
    price: 1000,
  },

  // ── Harinas ───────────────────────────────────────────────
  {
    id: "harina-yuca", category: "flours", featured: false,
    es: "Harina de Yuca", en: "Cassava Flour",
    desc_es: "Sin gluten, sabor neutro. Perfecta para panadería.",
    desc_en: "Gluten-free, neutral flavour. Perfect for baking.",
    price: 1000,
  },
  {
    id: "harina-platano", category: "flours", featured: false,
    es: "Harina de Plátano", en: "Plantain Flour",
    desc_es: "Alta en resistente almidón. Prebiótico natural.",
    desc_en: "High in resistant starch. Natural prebiotic.",
    price: 1000,
  },
  {
    id: "harina-camote", category: "flours", featured: false,
    es: "Harina de Camote Morado", en: "Purple Sweet Potato Flour",
    desc_es: "Color violeta natural, rica en antocianinas.",
    desc_en: "Natural violet colour, rich in anthocyanins.",
    price: 1000,
  },

  // ── Suplementos ───────────────────────────────────────────
  {
    id: "caps-curcuma-pim", category: "supplements", featured: false,
    es: "Cápsulas Cúrcuma + Pimienta (60 cáps.)", en: "Turmeric + Pepper Capsules (60 caps.)",
    desc_es: "Máxima biodisponibilidad. Antiinflamatorio natural.",
    desc_en: "Maximum bioavailability. Natural anti-inflammatory.",
    price: 1000,
  },
  {
    id: "caps-3", category: "supplements", featured: false,
    es: "Cápsulas Cúrcuma + Pimienta + Jengibre (60 cáps.)", en: "Turmeric + Pepper + Ginger Capsules (60 caps.)",
    desc_es: "Trío dorado para la salud. Digestivo y antiinflamatorio.",
    desc_en: "Golden health trio. Digestive and anti-inflammatory.",
    price: 1000,
  },
  {
    id: "caps-guanabana", category: "supplements", featured: false,
    es: "Cápsulas de Hojas de Guanábana (60 cáps.)", en: "Soursop Leaf Capsules (60 caps.)",
    desc_es: "Tradición herbal costarricense en cápsula.",
    desc_en: "Costa Rican herbal tradition in a capsule.",
    price: 1000,
  },

  // ── Té ────────────────────────────────────────────────────
  {
    id: "dirty-dozen", category: "tea", featured: true,
    es: "DirtyDozen — Mix de Temporada (13 bolsas)", en: "DirtyDozen — Seasonal Mix (13 bags)",
    desc_es: "Jengibre · Kumquat · Canela · Zacate Limón · Cúrcuma. 13 bolsas piramidales artesanales.",
    desc_en: "Ginger · Kumquat · Cinnamon · Lemongrass · Turmeric. 13 artisan pyramid bags.",
    price: 1000,
  },
];
