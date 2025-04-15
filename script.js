/*******************************
 * Konfiguration
 *******************************/
const CONFIG = {
  countdownTargetDate: "2025-05-01T00:00:00", // Anpassa måldatumet
  planetDuration: 8000,          // Planetanimationens längd (ms)
  finalFadeDuration: 3000        // Fade-in tid för finala elementen (ms)
};

/*******************************
 * Hjälpfunktion: sleep
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
  // Dölj startknappen
  const startButton = document.getElementById("start-button");
  startButton.style.display = "none";

  // Starta bakgrundsmusiken (assets/intro.mp3)
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.muted = false;
  bgMusic.removeAttribute("muted");
  try {
    await bgMusic.play();
  } catch (error) {
    console.error("Audio playback failed:", error);
  }

  // Visa intro-texten
  const introText = document.getElementById("intro-text");
  introText.classList.remove("hidden");
  // Låt CSS-transitionen göra sitt: sätt opacity till 1
  introText.style.opacity = 1;
  await sleep(1500);

  // Visa SPAR WARS-texten samtidigt
  const sparWars = document.getElementById("spar-wars");
  sparWars.classList.remove("hidden");
  sparWars.style.opacity = 1;

  // Visa crawl-texten (som animeras via CSS)
  const titles = document.getElementById("titles");
  titles.classList.remove("hidden");
  // Vänta på crawl-animationens slut (20s + 2s delay)
  await sleep(22000);
  titles.style.display = "none"; // Dölj crawl-texten permanent

  // Visa planetbilden med cinematic effekt
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  // Trigger transition: sätt opacity och transform
  planet.style.opacity = 1;
  planet.style.transform = "translateX(-50%) translateY(0)";
  await sleep(CONFIG.planetDuration);

  // Visa finala element (main title och knappar) med fade in
  const mainTitle = document.getElementById("main-title");
  const buttons = document.getElementById("buttons");
  mainTitle.classList.remove("hidden");
  buttons.classList.remove("hidden");
  mainTitle.style.opacity = 1;
  buttons.style.opacity = 1;
}

/*******************************
 * Ljuduppspelning
 *******************************/
function playSound(file) {
  // Skapa en ny Audio-instans så att flera ljud kan spelas samtidigt
  const audio = new Audio(`static/sounds/${file}`);
  audio.play().catch(error => {
    console.error("Sound playback error:", error);
  });
}

/*******************************
 * Event Listeners & Initiering
 *******************************/
document.getElementById("start-button").addEventListener("click", () => {
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