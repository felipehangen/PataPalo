/* js/analytics.js */

const AN_SESSION_KEY = 'fpg_session_id';
const AN_START_KEY = 'fpg_start_time';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function initAnalytics() {
    if (!window.db) return;

    let sessionId = sessionStorage.getItem(AN_SESSION_KEY);
    let isNewSession = false;

    if (!sessionId) {
        sessionId = generateUUID();
        sessionStorage.setItem(AN_SESSION_KEY, sessionId);
        sessionStorage.setItem(AN_START_KEY, Date.now().toString());
        isNewSession = true;
    }

    if (isNewSession) {
        // Log new visit
        window.db.from('fincapatapalo_visits').insert({
            session_id: sessionId,
            duration_seconds: 0
        }).then(({error}) => {
            if(error) console.error("Analytics visit log error:", error);
        });
    }

    window.addEventListener('beforeunload', () => {
        updateDuration(sessionId);
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === 'hidden') {
            updateDuration(sessionId);
        }
    });

    // Also update periodically in case the user closes browser abruptly without triggering unload
    setInterval(() => {
        updateDuration(sessionId);
    }, 60000); // 1 minute
}

function updateDuration(sessionId) {
    if (!window.db) return;
    const startObj = sessionStorage.getItem(AN_START_KEY);
    if(startObj) {
        const durationSecs = Math.floor((Date.now() - parseInt(startObj)) / 1000);
        window.db.from('fincapatapalo_visits')
            .update({ duration_seconds: durationSecs })
            .eq('session_id', sessionId)
            .then(() => {}); 
    }
}

// Global hook for cart
window.trackAddToCart = function(productId, presentation) {
    if (!window.db) return;
    let sessionId = sessionStorage.getItem(AN_SESSION_KEY) || 'unknown';
    
    window.db.from('fincapatapalo_cart_events').insert({
        session_id: sessionId,
        product_id: productId,
        presentation: presentation,
    }).then(({error}) => {
        if(error) console.error("Analytics add to cart error:", error);
    }); 
};

// Initialize after a slight delay to ensure window.db (Supabase) is loaded
window.addEventListener('DOMContentLoaded', () => {
   setTimeout(initAnalytics, 1500);
});
