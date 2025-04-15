/*******************************
 * Konfigurationsparametrar
 *******************************/
const CONFIG = {
  countdownTargetDate: "2025-05-01T00:00:00", // Exempelmåldatum
    planetDuration: 8000,          // Från t=26 s till t=34 s: Planetanimationens längd (ms)
  finalFadeDuration: 3000        // Från t=34 s och framåt: Final fade-in (ms)
};

/*******************************
 * Hjälpfunktioner
 *******************************/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*******************************
 * Nedräkningstimer
 *******************************/
function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  const targetDate = new Date(CONFIG.countdownTargetDate);
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    countdownElement.textContent = "The day has arrived!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  setTimeout(updateCountdown, 1000);
}

/*******************************
 * Huvudsekvens: startIntro
 *******************************/
async function startIntro() {
  // 1. Dölj startknappen
  document.getElementById("start-button").style.display = "none";

    // 9. Vid t= (16+crawlDuration) s: Visa planet-effekten
  const planetEffect = document.getElementById("planet-effect");
  planetEffect.style.display = "block";
  await sleep(CONFIG.planetDuration);

    // 10. Vid t= (16+crawlDuration+planetDuration) s: Visa final text och knappar (fade-in via CSS)
  const mainTitle = document.getElementById("main-title");
  const buttons = document.getElementById("buttons");
  mainTitle.style.display = "block";
  buttons.style.display = "block";
  buttons.style.opacity = "1";
}

/*******************************
 * Ljudfunktioner
 *******************************/
function playSound(file) {
  // Metod 1: Skapa en ny Audio-instans för varje knapptryck – detta säkerställer oberoende uppspelning
  const buttonAudio = new Audio(`static/sounds/${file}`);
  buttonAudio.play().catch(error => {
    console.error("Sound playback error:", error);
  });
  
  /* 
  Metod 2 (alternativ): Om du vill återanvända ett audio-element (soundPlayer),
  se till att den inte påverkas av bgMusic.
  
  const soundPlayer = document.getElementById("soundPlayer");
  soundPlayer.muted = false;
  soundPlayer.removeAttribute("muted");
  soundPlayer.pause();
  soundPlayer.currentTime = 0;
  soundPlayer.src = `static/sounds/${file}`;
  soundPlayer.play().catch(error => {
    console.error("Sound playback error:", error);
  });
  */
}

/*******************************
 * Event Listeners & Initiering
 *******************************/
document.getElementById("start-button").addEventListener("click", async () => {
  // Säkerställ att bakgrundsmusiken inte är muted:
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.muted = false;             // Använd booleskt false, inte strängen "false"
  bgMusic.removeAttribute("muted");  // Ta bort muted-attributet
  try {
    await bgMusic.play();            // Starta bakgrundsmusiken direkt vid klick
  } catch (error) {
    console.error("Audio playback failed:", error);
  }

  // Starta nedräkning och introsekvens
  updateCountdown();
  startIntro();
});

document.querySelectorAll("#buttons .btn").forEach(button => {
  button.addEventListener("click", () => {
    const soundFile = button.dataset.sound;
    if (soundFile) {
      playSound(soundFile);
    }
  });
});
