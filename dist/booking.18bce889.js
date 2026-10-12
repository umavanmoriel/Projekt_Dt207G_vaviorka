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
        // Samlar felmeddelanden i en array
        let errors = [];
        // Validerar namn
        if (!name) errors.push('Namn saknas');
        if (name && name.length < 2) errors.push("Namnet m\xe5ste vara minst 2 tecken");
        if (name && /[0-9]/.test(name)) errors.push("Namnet f\xe5r inte inneh\xe5lla siffror");
        // Validerar telefonnummer
        if (!phone) errors.push('Telefonnummer saknas');
        if (phone && !/^[0-9+\s-]{7,}$/.test(phone)) errors.push("Telefonnumret \xe4r ogiltigt");
        // Validerar datum
        if (!date) errors.push('Datum saknas');
        if (date && new Date(date) < new Date().setHours(0, 0, 0, 0)) errors.push("Datumet kan inte vara i det f\xf6rflutna");
        // Validerar tid
        if (!time) errors.push('Tid saknas');
        // Validerar antal gäster
        if (!guests || guests < 1) errors.push("Antal g\xe4ster m\xe5ste vara minst 1");
        if (guests > 20) errors.push("Antal g\xe4ster f\xe5r vara h\xf6gst 20");
        // Visar felmeddelanden om något är fel
        if (errors.length > 0) {
            message.innerHTML = '<div class="error">' + errors.join('<br>') + '</div>';
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
