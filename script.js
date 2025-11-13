// Sélection du bouton et de la zone d’animation
const bouton = document.getElementById("btnTelecharger");
const animationZone = document.getElementById("animationZone");

// URL du fichier APK ou du store
const lienTelechargement = "statique/TikeTa_v1.0.5.apk"; // à remplacer

bouton.addEventListener("click", () => {
  // 1️⃣ Téléchargement de l'application
  window.open(lienTelechargement, "_blank");

  // 2️⃣ Affiche une animation Lottie (succès ou téléchargement)
  animationZone.style.display = "block";

  const animation = lottie.loadAnimation({
    container: animationZone,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "https://res.cloudinary.com/diwsojrlc/raw/upload/v1762258118/Welcome_fdlhwr.json", // exemple: animation "succès"
  });

  // 3️⃣ Masquer l’animation après 5 secondes
  setTimeout(() => {
    animationZone.style.display = "none";
  }, 5000);
});
