// js/supabase-config.js
// IMPORTANTE: REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO SUPABASE
const SUPABASE_URL = "REEMPLAZA_CON_TU_SUPABASE_URL";
const SUPABASE_ANON_KEY = "REEMPLAZA_CON_TU_ANON_KEY";

// Inicializa el cliente solo si las credenciales fueron proporcionadas
let supabaseClient = null;

if (SUPABASE_URL && SUPABASE_URL !== "REEMPLAZA_CON_TU_SUPABASE_URL") {
  // @supabase/supabase-js es insertado globalmente vía CDN en el index.html
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn("⚠️ Supabase NO configurado. La aplicación web buscará valores en localStorage (modo fallback local). Reemplaza las constantes en js/supabase-config.js");
}

// Global context para saber si estamos conectados a la nube
window.db = supabaseClient;
