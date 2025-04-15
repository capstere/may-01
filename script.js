// Asynkron väntfunktion
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Nedräkning till 2025-05-01
function updateCountdown() {
  const countdownElem = document.getElementById("countdown");
  const targetDate = new Date("2025-05-01T00:00:00");
  function tick() {
    const now = new Date();
    const diff = targetDate - now;
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

// Huvudsekvens – startas vid klick på startknappen
async function startSequence() {
  // Dölj startknappen
  document.getElementById("start-button").style.display = "none";

  // 1. Visa intro-text (2 s)
  const introText = document.getElementById("start-text");
  introText.classList.remove("hidden");
  await sleep(2100);

  // 2. Visa "SPAR WARS" (h1) – animation med 2,5 s delay
  const logo = document.querySelector("h1");
  logo.classList.remove("hidden");

  // 3. Starta intro-musiken efter ~0.5 s
  await sleep(500);
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.muted = false;
  bgMusic.play().catch(err => console.error("Audio error:", err));

  // 4. Visa crawl-texten (30 s + 4 s delay)
  const titles = document.getElementById("titles");
  titles.classList.remove("hidden");
  await sleep(34000);
  titles.style.display = "none";

  // 5. Trigga stjärnornas "falling" effekt (lägg till klass "falling" på body)
  document.body.classList.add("falling");

  // 6. Visa planetbilden med cinematic in-fall
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  planet.classList.add("active-planet");
  await sleep(8000);

  // 7. Visa finala element med fade-in
  const finalElems = document.getElementById("final-elements");
  finalElems.classList.remove("hidden");
  finalElems.style.opacity = 1;
}

// Ljudknappar
function setupSoundButtons() {
  const buttons = document.querySelectorAll("#buttons .btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const soundFile = button.dataset.sound;
      if(soundFile) {
        const audio = new Audio(`assets/${soundFile}`);
        audio.play().catch(err => console.error("Sound playback error:", err));
      }
    });
  });
}

// Starta nedräkningen vid sidladdning
updateCountdown();

// Vid klick på start-knappen, starta hela sekvensen
document.getElementById("start-button").addEventListener("click", () => {
  setupSoundButtons();
  startSequence();
});
