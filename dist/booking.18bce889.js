// Väntar tills hela sidan har laddats klart
// Sedan körs funktionen init automatiskt
window.onload = init;
// Startfunktion som körs när sidan är färdigladdad
function init() {
    // Kopplar formulärets submit till en funktion
    setupFormSubmit();
}
// Hanterar formulärets submit
function setupFormSubmit() {
    // Hämtar formuläret och meddelande elementet från HTML
    const form = document.getElementById("bookingForm");
    const message = document.getElementById("message");
    // Lyssnar när formuläret skickas
    form.addEventListener("submit", async (e)=>{
        // Sidan ska inte laddas om
        e.preventDefault();
        // Hämtar vad användaren skrivit i fälten
        const name = document.getElementById("guestName").value.trim();
        const phone = document.getElementById("guestPhone").value.trim();
        const date = document.getElementById("bookingDate").value;
        const time = document.getElementById("bookingTime").value;
        const guests = parseInt(document.getElementById("guestCount").value);
        const text = document.getElementById("bookingMessage").value.trim();
        // Validerar att obligatoriska fält är ifyllda
        if (!name || !phone || !date || !time) {
            message.textContent = "Fyll i namn, telefon, datum och tid";
            message.className = "message error";
            return;
        }
        try {
            // Skickar en förfrågan till backend
            const res = await fetch("http://localhost:3000/api/bookings", {
                // POST skickar data till servern
                method: "POST",
                // POST skickar data till servern
                headers: {
                    "Content-Type": "application/json"
                },
                // Skickar med data från formuläret
                body: JSON.stringify({
                    name,
                    phone,
                    date,
                    time,
                    guests,
                    message: text
                })
            });
            // Tolkar svaret från servern som JSON
            const data = await res.json();
            // Om servern svarade med ett fel
            if (!res.ok) {
                message.textContent = data.error || "Kunde inte skicka f\xf6rfr\xe5gan";
                message.className = "message error";
                return;
            }
            // Visar ett lyckat meddelande
            message.textContent = "Tack! Vi \xe5terkommer med en bekr\xe4ftelse.";
            message.className = "message success";
            // Tömmer formuläret
            form.reset();
            // Sätter antal gäster default till 2
            document.getElementById("guestCount").value = 2;
        } catch (error) {
            // Skriver ut felet i konsolen
            console.error("Fel vid bokning:", error);
            // Visar ett felmeddelande för användaren
            message.textContent = "Kunde inte n\xe5 servern";
            message.className = "message error";
        }
    });
}

//# sourceMappingURL=booking.18bce889.js.map
