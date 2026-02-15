/**
 * TECH FIXER - MULTI-CHANNEL UPLINK ENGINE (UPDATED)
 * Logic for WhatsApp & Gmail Integration
 */

document.addEventListener('DOMContentLoaded', () => {
    initMultiChannelEngine();
});

function initMultiChannelEngine() {
    const bookingForm = document.getElementById('booking-form');
    
    // 1. DYNAMIC SYSTEM STATUS (Real-time)
    const statusBox = document.querySelector('.system-status');
    if (statusBox) {
        const updateStatus = () => {
            const time = new Date().toLocaleTimeString();
            statusBox.innerHTML = `[${time}] <span class="text-cyan-400">ENCRYPTED_SIGNAL_STABLE</span>`;
        };
        updateStatus();
        setInterval(updateStatus, 1000);
    }

    // 2. FORM TRANSMISSION LOGIC
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Data Collection (IDs must match your HTML)
            const data = {
                name: document.getElementById('client-name').value,
                service: document.getElementById('service-type').value,
                priority: document.getElementById('priority-level').value,
                logs: document.getElementById('project-details').value,
                email: "techfixerpk@gmail.com" // Aapka destination email
            };

            const btn = document.querySelector('.transmit-btn');
            btn.innerHTML = "SELECTING_PROTOCOL...";
            btn.style.borderColor = "#00f2ff";

            // Yahan hum user se poch sakte hain ya direct ek trigger kar sakte hain
            // Main yahan direct Gmail wala logic add kar raha hoon jo aapne manga tha
            
            setTimeout(() => {
                sendTacticalEmail(data); // Gmail Logic
                // Agar WhatsApp chahiye ho toh: sendWhatsAppUplink(data);
                
                btn.innerHTML = "TRANSMITTED";
                setTimeout(() => { btn.innerHTML = "TRANSMIT_DATA"; }, 3000);
            }, 1000);
        });
    }

    // 3. SOCIAL CHANNEL LOGIC
    const socialNodes = document.querySelectorAll('.glass-node');
    socialNodes.forEach(node => {
        node.addEventListener('click', () => {
            node.style.transform = "scale(0.95) translateY(5px)";
            setTimeout(() => { node.style.transform = ""; }, 200);
        });
    });
}

/**
 * Custom Gmail Uplink (Structured Email)
 * Direct mailto trigger without third-party servers
 */
function sendTacticalEmail(data) {
    const subject = `[${data.priority}] SERVICE_REQUEST: ${data.service}`;
    const body = `
--- TECH_FIXER_UPLINK_REPORT ---
SENDER_NAME: ${data.name}
SERVICE_NODE: ${data.service}
PRIORITY_LEVEL: ${data.priority}
--------------------------------
LOGS / MESSAGE_PAYLOAD:
${data.logs}
--------------------------------
[END_OF_TRANSMISSION]
    `.trim();

    // Browser ka direct Gmail/Mail app khul jayega
    window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * WhatsApp Uplink Logic (Back-up)
 */
function sendWhatsAppUplink(data) {
    const message = `*--- TECH_FIXER_BOOKING ---*%0A*CLIENT:* ${data.name}%0A*NODE:* ${data.service}%0A*PRIORITY:* ${data.priority}%0A*LOGS:* ${data.logs}%0A*STATUS:* Awaiting_Diagnostic`;
    window.open(`https://wa.me/923351696907?text=${message}`, '_blank');
}