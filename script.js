document.addEventListener('DOMContentLoaded', function() {
  // Lyssna på h1:s animationstart för att starta intro-musiken när "SPAR WARS" dyker upp.
  const logo = document.querySelector('h1');
  logo.addEventListener('animationstart', function(e) {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.muted = false;
    bgMusic.play().catch(err => console.error("Audio error:", err));
  });

  // Lyssna på när crawl-animationen är färdig.
  const titleContent = document.getElementById('titlecontent');
  titleContent.addEventListener('animationend', function(e) {
    console.log("Crawl-animationen är klar.");
    // Observera: Inget DOM-element på #titlecontent ändras här för att undvika onödiga repaints.
    // Eventuella eftereffekter (t.ex. finala övergångar) kan triggas här utan att ändra #titlecontent.
  });
});