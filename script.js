// --- CONFIGURATION ---
const bdayDate = "2026-01-12"; // Set correct year

// --- NAVIGATION LOGIC ---
function goToOptions() {
    // Current screen upar chala jayega
    document.getElementById('screen-1').classList.remove('active-screen');
    document.getElementById('screen-1').classList.add('past-screen');
    
    // Next screen niche se aayega
    document.getElementById('screen-2').classList.remove('next-screen');
    document.getElementById('screen-2').classList.add('active-screen');

    // Play Music on first interaction
    const audio = document.getElementById("bg-music");
    audio.play().catch(e => console.log("Audio waiting..."));
}

function goToFinal() {
    // Screen 2 upar jayega
    document.getElementById('screen-2').classList.remove('active-screen');
    document.getElementById('screen-2').classList.add('past-screen');

    // Screen 3 reveal hoga
    document.getElementById('screen-3').classList.remove('next-screen');
    document.getElementById('screen-3').classList.add('active-screen');

    // Confetti Blast
    launchConfetti();
}

// --- BUTTON SPOOF LOGIC (Screen 1) ---
let touchCount = 0;
const spoofBtn = document.getElementById("spoof-btn");

function runAway(e) {
    if (touchCount < 5) {
        e.preventDefault();
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;
        
        spoofBtn.style.position = "absolute";
        spoofBtn.style.left = Math.random() * maxX + "px";
        spoofBtn.style.top = Math.random() * maxY + "px";
        
        const texts = ["NOPE! 😜", "TOO SLOW!", "TRY HARDER!", "ALMOST..."];
        spoofBtn.innerText = texts[touchCount % texts.length];
        
        touchCount++;
    } else {
        // Stop & Allow Click
        spoofBtn.style.position = "static";
        spoofBtn.style.marginTop = "30px";
        spoofBtn.innerText = "OKAY, PROCEED ->";
        spoofBtn.style.background = "#0f0";
        spoofBtn.style.color = "black";
        
        // Remove old listeners
        spoofBtn.removeEventListener('touchstart', runAway);
        spoofBtn.removeEventListener('mouseover', runAway);
        
        // Add Slide Action
        spoofBtn.onclick = goToOptions;
    }
}

// Add listeners
spoofBtn.addEventListener('touchstart', runAway);
spoofBtn.addEventListener('mouseover', runAway);

// --- COUNTDOWN ---
setInterval(() => {
    const now = new Date().getTime();
    const gap = new Date(bdayDate).getTime() - now;
    
    if(gap > 0) {
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('timer').innerText = `${d}d : ${h}h : ${m}m`;
    } else {
        document.getElementById('timer').innerText = "PARTY TIME! 🎂";
    }
}, 1000);

// --- CONFETTI ---
function launchConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
