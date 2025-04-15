// Hjälpfunktion: sleep (för att vänta asynkront)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Enkel nedräknare – här sätts måldatumet till imorgon för exemplet
function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);
  const update = () => {
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
    setTimeout(update, 1000);
  };
  update();
}

// Huvudsekvensen som styr introflödet
async function startSequence() {
  // Dölj startknappen
  document.getElementById("start-button").style.display = "none";
  
  // Avmuta och starta bakgrundsmusiken (assets/intro.mp3)
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.muted = false;
  bgMusic.removeAttribute("muted");
  bgMusic.play().catch(err => console.error("Audio error:", err));
  
  // Visa introtexten (fade in/out via CSS-animation)
  const intro = document.getElementById("intro");
  intro.classList.remove("hidden");
  // Vänta ca 3 sekunder (animationens längd)
  await sleep(3000);
  
  // Visa logotypen "SPAR WARS" (CSS-animationen meddelay startar)
  const logo = document.getElementById("logo");
  logo.classList.remove("hidden");
  // Vänta 7.5 sekunder (ungefär logotypens animationslängd)
  await sleep(7500);
  
  // Visa crawl-texten (där scroll-animationen startar med 4 sekunders delay)
  const titles = document.getElementById("titles");
  titles.classList.remove("hidden");
  // Vänta tills crawl-animationen (20 sek + 4 sek delay = 24 s) är klar
  await sleep(24000);
  // Dölj crawl-texten permanent
  titles.style.display = "none";
  
  // Visa planetbilden – aktivera cinematic effekt
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  planet.classList.add("active-planet");
  // Vänta planetanimationens längd (exempelvis 8 sek)
  await sleep(8000);
  
  // Visa finala elementen: "RETURN OF THE JESP" samt ljudknapparna
  const finalElements = document.getElementById("final-elements");
  finalElements.classList.remove("hidden");
  finalElements.style.opacity = 1;
}

// Konfigurerar klick för ljudknapparna så att de spelar sina respektive ljud
function setupSoundButtons() {
  const buttons = document.querySelectorAll("#buttons .btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const soundFile = button.getAttribute("data-sound");
      if (soundFile) {
        const audio = new Audio(`static/sounds/${soundFile}`);
        audio.play().catch(err => console.error("Sound playback error:", err));
      }
    });
  });
}

// Starta hela flödet när startknappen klickas
document.getElementById("start-button").addEventListener("click", () => {
  updateCountdown();
  startSequence();
  setupSoundButtons();
});