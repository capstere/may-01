// Funktion för asynkront väntande
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Nedräkning till 2025-05-01 (visas högst upp)
function updateCountdown() {
  const countdownElem = document.getElementById("countdown");
  const targetDate = new Date("2025-05-01T00:00:00");
  function tick() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
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

// Huvudsekvens – startas vid klick på startknappen
async function startSequence() {
  // Dölj startknappen
  document.getElementById("start-button").style.display = "none";

  // Visa intro-texten ("long time ago ...")
  const introText = document.getElementById("start-text");
  introText.classList.remove("hidden");
  await sleep(2100);  // Vänta tills introtextens animation är klar

  // Visa "SPAR WARS" (h1) – animation startar med 2,5 s delay
  const logo = document.querySelector("h1");
  logo.classList.remove("hidden");
  await sleep(500);   // Kort väntan innan musiken startar

  // Starta intro-musiken (med assets/intro.mp3)
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.muted = false;
  bgMusic.play().catch(err => console.error("Audio error:", err));

  // Visa crawl-texten ("titles")
  const titles = document.getElementById("titles");
  titles.classList.remove("hidden");
  // Vänta tills crawl-animationen är klar (30 s + 4 s delay = 34 s)
  await sleep(34000);
  // Dölj crawl-texten
  titles.style.display = "none";

  // Nu triggar vi stjärnhimmelns "falling" effekt – lägg till klassen "falling" på body
  document.body.classList.add("falling");

  // Visa planetbilden med cinematic in-fall
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  planet.classList.add("active-planet");
  // Vänta under planetanimationens varaktighet (exempelvis 8 sek)
  await sleep(8000);

  // Visa finala element ("RETURN OF THE JESP" och ljudknappar) med fade-in
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
      if (soundFile) {
        const audio = new Audio(`assets/${soundFile}`);
        audio.play().catch(err => console.error("Sound playback error:", err));
      }
    });
  });
}

// Starta nedräkningen vid sidladdning
updateCountdown();

// Vid klick på startknappen, starta hela sekvensen
document.getElementById("start-button").addEventListener("click", () => {
  setupSoundButtons();
  startSequence();
});