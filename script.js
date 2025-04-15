/*******************************
 * Konfigurationsparametrar
 *******************************/
const CONFIG = {
  countdownTargetDate: "2025-05-01T00:00:00", // Exempelmåldatum
  introDuration: 6000,           // 0–6 s: Intro-textens längd (ms)
  delayAfterIntro: 2000,         // 6–8 s: Extra väntetid innan "SPAR WARS" visas (ms)
  logoAnimationDuration: 12000,  // Från t=8 s till t=20 s: SPAR WARS-animation (ms)
  crawlDuration: 30000,          // Crawl-animationens varaktighet (ms)
  planetDuration: 8000,          // Planetanimationens varaktighet (ms)
  finalFadeDuration: 3000        // Final fade-in (ms)
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
  // Dölj startknappen
  document.getElementById("start-button").style.display = "none";

  // Visa intro-texten (0–6 s)
  const introText = document.getElementById("intro-text");
  introText.style.display = "block";
  await sleep(CONFIG.introDuration);
  introText.style.display = "none";

  // Vänta extra 2 s tills t=8 s
  await sleep(CONFIG.delayAfterIntro);

  // Vid t=8 s: Visa SPAR WARS (h1#logo); bgMusic startades vid klick
  const logo = document.getElementById("logo");
  logo.style.display = "block";

  // Vänta 8 s (t=8–16 s)
  await sleep(8000);

  // Vid t=16 s: Visa crawl-sektionen (div#titles)
  const titles = document.getElementById("titles");
  titles.style.display = "block";

  // Vänta 4 s (t=16–20 s) och dölj SPAR WARS-texten
  await sleep(4000);
  logo.style.display = "none";

  // Låt crawl-animationen pågå under sin varaktighet
  await sleep(CONFIG.crawlDuration);

  // Vid slutet av crawl-animationen: Visa planet-effekten
  const planetEffect = document.getElementById("planet-effect");
  planetEffect.style.display = "block";
  await sleep(CONFIG.planetDuration);

  // När planetanimationen är klar: Visa final text ("RETURN OF THE JESP") och knappar (fade-in via CSS)
  const mainTitle = document.getElementById("main-title");
  const buttons = document.getElementById("buttons");
  mainTitle.style.display = "block";
  buttons.style.display = "block";
  buttons.style.opacity = "1";
}

/*******************************
 * Ljudfunktioner – för knapparna
 *******************************/
function playSound(file) {
  // Skapa en ny Audio-instans för varje knapptryck för oberoende uppspelning
  const buttonAudio = new Audio(`static/sounds/${file}`);
  buttonAudio.play().catch(error => {
    console.error("Sound playback error:", error);
  });
}

/*******************************
 * Event Listeners & Initiering
 *******************************/
document.getElementById("start-button").addEventListener("click", async () => {
  // Säkerställ att bgMusic inte är muted
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.muted = false;
  bgMusic.removeAttribute("muted");
  try {
    await bgMusic.play();  // Starta bgMusic (assets/intro.mp3) direkt vid klick
  } catch (error) {
    console.error("Audio playback failed:", error);
  }
  
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