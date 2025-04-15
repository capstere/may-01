// Funktion för asynkront väntande
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Nedräknare till 2025-05-01
function updateCountdown() {
  const countdownElem = document.getElementById("countdown");
  const target = new Date("2025-05-01T00:00:00");
  function tick() {
    const now = new Date();
    const diff = target - now;
    if(diff <= 0) {
      countdownElem.textContent = "The day has arrived!";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownElem.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    setTimeout(tick, 1000);
  }
  tick();
}

// Huvudsekvensen som triggas vid startknapp-klick
async function startSequence() {
  // Dölj startknappen
  document.getElementById("start-button").style.display = "none";

  // Visa introtexten ("long time ago ...")
  const intro = document.getElementById("start");
  intro.classList.remove("hidden");

  // Vänta tills introtextens animation (2s) är klar
  await sleep(2100);

  // Visa "SPAR WARS" (h1) – dess animation (logo) startar med 2.5s delay
  const logo = document.querySelector("h1");
  logo.classList.remove("hidden");

  // Vänta något kort innan vi startar intro-musiken (för att tajma med SPAR WARS)
  await sleep(500);
  const bgMusic = document.getElementById("bgMusic");
  // Starta musiken med en fördröjning efter att SPAR WARS-animeringen bör ha börjat
  bgMusic.muted = false;
  bgMusic.play().catch(err => console.error("Audio error:", err));

  // Visa crawl-texten (titles) – den animeras automatiskt enligt CSS
  const titles = document.getElementById("titles");
  titles.classList.remove("hidden");

  // Vänta på att crawl-animationen ska vara färdig (100s + 4s delay = 104s)
  // (Du kan justera tiden om du vill ha en kortare version)
  await sleep(30000);
  // Dölj crawl-texten
  titles.style.display = "none";

  // Visa planetbilden med cinematiskt in-fall
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  planet.classList.add("active-planet");

  // Vänta planetanimationens längd (exempelvis 8 sek)
  await sleep(8000);

  // Visa finala element: "RETURN OF THE JESP" och ljudknappar (fade in)
  const finalElems = document.getElementById("final-elements");
  finalElems.classList.remove("hidden");
  finalElems.style.opacity = 1;
}

// Konfigurera ljudknapparna så att de spelar sina respektive ljud
function setupSoundButtons() {
  const buttons = document.querySelectorAll("#buttons .btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const soundFile = button.getAttribute("data-sound");
      if(soundFile) {
        const audio = new Audio(`assets/${soundFile}`);
        audio.play().catch(err => console.error("Sound playback error:", err));
      }
    });
  });
}

// Starta nedräkning vid sidladdning
updateCountdown();

// Vid klick på startknappen, starta hela sekvensen
document.getElementById("start-button").addEventListener("click", () => {
  setupSoundButtons();
  startSequence();
});