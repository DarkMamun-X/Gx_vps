// Matrix Rain Effect
(function() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff0030';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();

// Terminal Typing Effect
const text = 'ACCESS_GRANTED_WITHOUT_PASS';
const typingEl = document.getElementById('typingText');
let charIndex = 0;

function typeEffect() {
    if (typingEl && charIndex < text.length) {
        typingEl.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
    }
}
setTimeout(typeEffect, 400);

// Fetch Server Status via API
async function checkServerStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        document.getElementById('serverStatus').innerText = data.status;
        document.getElementById('activeBotsCount').innerText = data.active_bots;
    } catch (e) {
        console.error("API error:", e);
    }
}

// Call API every 5 seconds
setInterval(checkServerStatus, 5000);
checkServerStatus();
