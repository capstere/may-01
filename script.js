// Asynkron väntfunktion
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

// 1) Nedräknare till 2025‑05‑01
function updateCountdown(){
  const el = document.getElementById("countdown");
  const tgt = new Date("2025-05-01T00:00:00");
  (function tick(){
    const diff = tgt - new Date();
    if(diff <= 0){ el.textContent = "The day has arrived!"; return; }
    const d = Math.floor(diff/864e5),
          h = Math.floor(diff/36e5%24),
          m = Math.floor(diff/6e4%60),
          s = Math.floor(diff/1e3%60);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    setTimeout(tick,1000);
  })();
}

// 2) Huvudsekvens
async function startSequence(){
  document.getElementById("start-button").style.display = "none";
  document.getElementById("start-text").classList.remove("hidden");
  await sleep(2100);
  document.querySelector("h1").classList.remove("hidden");
  await sleep(500);
  const bg = document.getElementById("bgMusic");
  bg.muted = false;
  bg.play().catch(()=>{});
  document.getElementById("titles").classList.remove("hidden");
  await sleep(34000);
  document.getElementById("titles").style.display = "none";
  document.body.classList.add("falling");
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  planet.classList.add("active-planet");
  await sleep(8000);
  document.getElementById("final-elements").classList.remove("hidden");
}

// 3) Sätt upp ljudknapparna
function setupSoundButtons(){
  document.querySelectorAll(".hamburger-btn")
    .forEach(btn=>{
      btn.addEventListener("click",()=>{
        const f = btn.dataset.sound;
        if(f) new Audio(`assets/${f}`).play().catch(()=>{});
      });
    });
}

// Initiera
updateCountdown();
document.getElementById("start-button")
  .addEventListener("click", ()=>{
    setupSoundButtons();
    startSequence();
  });