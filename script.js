// --- CONFIGURATION ---
const config = {
    name: "Sona",
    // Birthday Year set to 2026 for next birthday (Update this year if needed)
    birthdayDate: "2026-01-12", 
    instaLink: "https://www.instagram.com/noor_editx1/",
    flirtyLines: [
        "Scanning for the prettiest girl...",
        "Error: Smile is too bright! 😎",
        "Warning: Cuteness Overload...",
        "System overheating due to charm...",
        "Are you a magician? Everyone else disappeared."
    ]
};

// --- FLIRTY TYPING ---
let lineIndex = 0;
let charIndex = 0;
const typingArea = document.getElementById("typing-text");

function typeFlirtyLines() {
    if (lineIndex < config.flirtyLines.length) {
        if (charIndex < config.flirtyLines[lineIndex].length) {
            typingArea.innerHTML += config.flirtyLines[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeFlirtyLines, 50);
        } else {
            setTimeout(() => {
                typingArea.innerHTML = "";
                charIndex = 0;
                lineIndex++;
                typeFlirtyLines();
            }, 1500);
        }
    } else {
        lineIndex = 0; // Loop messages
        typeFlirtyLines();
    }
}

// --- MOBILE RUNAWAY BUTTON ---
const btn = document.getElementById("spoof-btn");
let touchCount = 0;

function moveButton(e) {
    if (touchCount < 6) { // Run away 6 times
        e.preventDefault(); // Stop click
        
        const maxWidth = window.innerWidth - 150;
        const maxHeight = window.innerHeight - 100;
        const randomX = Math.max(10, Math.floor(Math.random() * maxWidth));
        const randomY = Math.max(10, Math.floor(Math.random() * maxHeight));
        
        btn.style.position = "absolute";
        btn.style.left = randomX + "px";
        btn.style.top = randomY + "px";
        
        const funnyTexts = ["NOPE! 😜", "TOO SLOW!", "TRY HARDER!", "CATCH ME!", "ALMOST...", "MISS ME?"];
        btn.innerText = funnyTexts[touchCount % funnyTexts.length];
        
        touchCount++;
    } else {
        // Stop moving
        btn.style.position = "static";
        btn.style.marginTop = "30px";
        btn.innerText = "OKAY, CLICK ME! 🎁";
        btn.style.background = "#ff0055";
        btn.style.color = "white";
        
        // Remove runaway listeners
        btn.removeEventListener('touchstart', moveButton);
        btn.removeEventListener('mouseover', moveButton);
        
        // Enable Click
        btn.onclick = revealSurprise;
    }
}

// Add listeners for both touch and mouse
btn.addEventListener('touchstart', moveButton, {passive: false}); 
btn.addEventListener('mouseover', moveButton);

// --- REVEAL SURPRISE ---
function revealSurprise() {
    document.getElementById("prank-screen").style.display = "none";
    document.getElementById("celebration-screen").style.display = "block";
    document.body.style.overflow = "auto"; // Enable scroll
    
    // Play Music
    const music = document.getElementById("bg-music");
    music.play().catch(e => console.log("User interaction needed for audio"));

    // Set Dynamic Text
    document.getElementById("wish-msg").innerText = 
        `Happy Birthday ${config.name}! From our random chats to this moment, you've been such a vibe. Keep shining! ✨`;
    document.getElementById("insta-link").href = config.instaLink;

    // Confetti
    launchConfetti();
}

// --- COUNTDOWN ---
function startCountdown() {
    const countDate = new Date(config.birthdayDate).getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        if (gap > 0) {
            const d = Math.floor(gap / day);
            const h = Math.floor((gap % day) / hour);
            const m = Math.floor((gap % hour) / minute);
            const s = Math.floor((gap % minute) / second);
            document.getElementById("countdown").innerText = `${d}d : ${h}h : ${m}m : ${s}s`;
        } else {
            document.getElementById("countdown").innerText = "IT'S PARTY TIME! 🎂";
        }
    }, 1000);
}

function launchConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
    }, 250);
}

// Init
window.onload = function() {
    typeFlirtyLines();
    startCountdown();
};
