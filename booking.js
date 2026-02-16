/**
 * TECH FIXER - Booking & Estimation Logic
 * Authorized Dev: FAHAD UMAR MALIK
 * Integration: techfixerpk.github.io
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const serviceSelect = document.getElementById('serviceType');
    const prioritySelect = document.getElementById('priorityLevel');
    const estimateDisplay = document.getElementById('priceEstimate');

    // --- 1. BASE PRICE MATRIX (PKR) ---
    const pricing = {
        'diagnostic': 1500,
        'gpu_repair': 5000,
        'custom_build': 3000,
        'os_optimize': 2000,
        'data_recovery': 4000
    };

    // --- 2. DYNAMIC ESTIMATOR LOGIC ---
    function updateEstimate() {
        if (!serviceSelect || !estimateDisplay) return;

        let base = pricing[serviceSelect.value] || 0;
        let multiplier = 1;

        // Priority Multiplier
        if (prioritySelect && prioritySelect.value === 'urgent') {
            multiplier = 1.5; // 50% extra for urgent delivery
        }

        const total = base * multiplier;
        
        if (total > 0) {
            estimateDisplay.innerHTML = `ESTIMATED_STARTING_COST: <span class="text-cyan-400">PKR ${total.toLocaleString()}</span>`;
        } else {
            estimateDisplay.innerHTML = "AWAITING_SELECTION...";
        }
    }

    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateEstimate);
    }
    if (prioritySelect) {
        prioritySelect.addEventListener('change', updateEstimate);
    }

    // --- 3. WHATSAPP BOOKING GENERATOR ---
    // Direct link generation for users who prefer WhatsApp over Forms
    window.generateWhatsAppBooking = () => {
        const name = document.getElementById('name')?.value || "Client";
        const service = serviceSelect?.options[serviceSelect.selectedIndex]?.text || "General Inquiry";
        const device = document.getElementById('deviceModel')?.value || "Not Specified";
        
        const message = `*TECH FIXER UPLINK*%0A%0A` +
                        `*Name:* ${name}%0A` +
                        `*Service:* ${service}%0A` +
                        `*Device:* ${device}%0A` +
                        `*Status:* Requesting Diagnostics.`;

        const waUrl = `https://wa.me/923351696907?text=${message}`;
        window.open(waUrl, '_blank');
    };

    console.log("[ BOOKING_SYSTEM_CALIBRATED ]");
});
