// Asynkron väntfunktion
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 1) Nedräknare till 2025‑05‑01
function updateCountdown() {
  const el = document.getElementById("countdown");
  const target = new Date("2025-05-01T00:00:00");
  (function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      el.textContent = "The day has arrived!";
      return;
    }
    const d = Math.floor(diff / 864e5),
          h = Math.floor(diff / 36e5 % 24),
          m = Math.floor(diff / 6e4 % 60),
          s = Math.floor(diff / 1e3 % 60);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    setTimeout(tick, 1000);
  })();
}

// 2) Huvudsekvens – körs när man klickar på startknappen
async function startSequence() {
  // Dölj startknappen
  document.getElementById("start-button").style.display = "none";

  // Visa intro‑text (2 sek)
  const introText = document.getElementById("start-text");
  introText.classList.remove("hidden");
  await sleep(2100);

  // Visa "SPAR WARS" (delay inbyggd i CSS-animationen)
  const logo = document.querySelector("h1");
  logo.classList.remove("hidden");
  await sleep(500);

  // Starta bakgrundsmusiken
  const bg = document.getElementById("bgMusic");
  bg.muted = false;
  bg.play().catch(() => {});

  // Visa crawl‑texten (30 s + 4 s delay = 34 s)
  const titles = document.getElementById("titles");
  titles.classList.remove("hidden");
  await sleep(34000);
  titles.style.display = "none";

  // 3) Triggera stjärnorna och planeten samtidigt:
  // Lägg på .falling → bakgrunden börjar långsamt falla (kamera‑sänkning)
  document.body.classList.add("falling");

  // Visa planeten med långsam animation (använder CSS-animation)
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  planet.classList.add("active-planet");

  // Vänta ytterligare (t.ex. 8 s) innan du visar finala element
  await sleep(8000);

  // 4) Visa finala titeln och knapparna
  const finalElems = document.getElementById("final-elements");
  finalElems.classList.remove("hidden");
}

// 3) Sätt upp ljudknapparna för .hamburger-btn
function setupSoundButtons() {
  document.querySelectorAll(".hamburger-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const file = btn.dataset.sound;
      if (file) {
        new Audio(`assets/${file}`).play().catch(() => {});
      }
    });
  });
}

// Initiera nedräknare och bind startknappen
updateCountdown();
document.getElementById("start-button").addEventListener("click", () => {
  setupSoundButtons();
  startSequence();
});