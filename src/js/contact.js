//Skickar bekräftelsemeddelande när användare trycker på Skicka-knapp
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("thanks-message").classList.add("show");
    e.target.reset();
});