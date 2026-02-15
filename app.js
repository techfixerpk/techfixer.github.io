/**
 * TECH FIXER - ULTRA-MAX ENGINE (BLUE SLING EDITION)
 * Features: Kinetic Smooth Scroll, Blue Magnetic Sling, 3D Parallax
 */

// 1. INITIALIZE ENGINE
document.addEventListener('DOMContentLoaded', () => {
    initSlingCursor();
    initSmoothScroll();
    initMagneticElements();
    systemBootLog();
});

// 2. BLUE SLING CURSOR (Follower with elastic "Sling" physics)
function initSlingCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0; // Target position
    let ballX = 0, ballY = 0;   // Current position
    let speed = 0.15;           // "Sling" elasticity (Lower = more sling)

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Linear Interpolation (LERP) for the "Sling" effect
        let distX = mouseX - ballX;
        let distY = mouseY - ballY;
        
        ballX += distX * speed;
        ballY += distY * speed;

        cursor.style.left = ballX + 'px';
        cursor.style.top = ballY + 'px';
        
        // Dynamic "Stretch" effect based on speed
        const velocity = Math.sqrt(distX*distX + distY*distY);
        const scale = Math.min(1.5, 1 + velocity / 500);
        cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        // High-intensity Blue Glow
        cursor.style.boxShadow = `0 0 ${10 + velocity/10}px #00f2ff`;

        requestAnimationFrame(animate);
    }
    animate();
}

// 3. KINETIC SMOOTH SCROLL (Sling Scroll Logic)
function initSmoothScroll() {
    // Custom easing function for that "Heavy/Fast" feel
    const ease = 0.075; 
    let current = 0;
    let target = 0;

    document.body.style.height = document.getElementById('main-container').getBoundingClientRect().height + 'px';

    window.addEventListener('scroll', () => {
        target = window.scrollY;
    });

    function smoothScroll() {
        current = current + (target - current) * ease;
        const main = document.getElementById('main-container');
        if(main) {
            main.style.transform = `translate3d(0, -${current}px, 0)`;
        }
        requestAnimationFrame(smoothScroll);
    }
    // Only enable if the device is high-performance/desktop
    if(window.innerWidth > 1024) smoothScroll();
}

// 4. MAGNETIC UI (Elements attract to cursor)
function initMagneticElements() {
    const magnets = document.querySelectorAll('.max-ui-card, .nav-tag, button');
    
    magnets.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const pos = el.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            
            // Pull element 20px towards mouse
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            el.style.borderColor = '#00f2ff';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
            el.style.borderColor = '';
        });
    });
}

// 5. SYSTEM DIAGNOSTICS (Console UI)
function systemBootLog() {
    const style = 'color: #00f2ff; font-weight: bold; font-family: monospace; font-size: 12px;';
    console.log('%c[SYSTEM] TECH_FIXER_V3_ONLINE', style);
    console.log('%c[STATUS] KINETIC_SLING_ENABLED', style);
    console.log('%c[GFX] BLUE_REACTIVE_GLOW_ACTIVE', style);
}