// --- CONFIGURATION ---
const config = {
    name: "Sona",
    birthdayDate: "2026-01-12", // Update Year if needed
    instaLink: "https://www.instagram.com/noor_editx1/",
    // Flirty Lines instead of Technical ones
    flirtyLines: [
        "Scanning for the prettiest girl...",
        "Error: Smile is too bright! 😎",
        "Warning: High levels of Cutenss detected...",
        "System overheating due to Sona's charm...",
        "Are you a magician? Because everyone else disappeared."
    ]
};

// --- FLIRTY TYPING EFFECT ---
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
                typingArea.innerHTML = ""; // Clear for next line
                charIndex = 0;
                lineIndex++;
                typeFlirtyLines();
            }, 1500); // Wait before next line
        }
    } else {
        // Loop messages
        lineIndex = 0;
        typeFlirtyLines();
    }
}

// --- MOBILE SPOOF BUTTON LOGIC ---
const btn = document.getElementById("spoof-btn");
let touchCount = 0;

// Function to move button
function moveButton(e) {
    if (touchCount < 6) { // Run away 6 times
        e.preventDefault(); // Stop click from happening
        
        const maxWidth = window.innerWidth - 150;
        const maxHeight = window.innerHeight - 100;
        
        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight);
        
        btn.style.position = "absolute";
        btn.style.left = Math.max(10, randomX) + "px"; // Ensure it stays on screen
        btn.style.top = Math.max(10, randomY) + "px";
        
        const funnyTexts = ["NOPE! 😜", "TOO SLOW!", "TRY HARDER!", "CATCH ME!", "ALMOST...", "MISS ME?"];
        btn.innerText = funnyTexts[touchCount % funnyTexts.length];
        
        touchCount++;
    } else {
        // Let her click now
        btn.style.position = "static";
        btn.style.marginTop = "30px";
        btn.innerText = "OKAY, CLICK ME! 🎁";
        btn.style.background = "#ff0055";
        btn.style.color = "white";
        // Remove the run-away listener
        btn.removeEventListener('touchstart', moveButton);
        btn.removeEventListener('mouseover', moveButton);
        
        // Add click listener for reveal
        btn.onclick = revealSurprise;
    }
}

// Add Listeners for both Touch (Mobile) and Mouse (Laptop)
btn.addEventListener('touchstart', moveButton); 
btn.addEventListener('mouseover', moveButton);

// --- REVEAL SURPRISE ---
function revealSurprise() {
    document.getElementById("prank-screen").style.display = "none";
    document.getElementById("celebration-screen").style.display = "block";
    document.body.style.overflow = "auto";
    
    // Play Music
    const music = document.getElementById("bg-music");
    music.play().catch(e => console.log("User interaction needed for audio"));

    // Set Data
    document.getElementById("wish-msg").innerText = 
        `Hey ${config.name}, just wanted to remind you that you are amazing! Keep shining and making those awesome edits.`;
    document.getElementById("insta-link").href = config.instaLink;

    // Start Confetti
    launchConfetti();
}

// --- COUNTDOWN TIMER ---
function startCountdown() {
    const countDate = new Date(config.birthdayDate).getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        if (gap > 0) {
            document.getElementById("countdown").innerText = 
                `${d}d : ${h}h : ${m}m : ${s}s`;
        } else {
            document.getElementById("countdown").innerText = "IT'S PARTY TIME! 🎂";
        }
    }, 1000);
}

// --- CONFETTI ---
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

// Initialise
window.onload = function() {
    typeFlirtyLines();
    startCountdown();
};
