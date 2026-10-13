// Kör funktionen när sidan laddas
window.onload = init;

function init() {
    // Kopplar formulärets submit till en funktion
    setupFormSubmit();
}

// Hanterar formulärets submit
function setupFormSubmit() {
    // Hämtar formuläret och meddelande elementet från HTML
    const form = document.getElementById("contactForm");
    const message = document.getElementById("message");
    const thanks = document.getElementById("thanks-message");

    // Lyssnar när formuläret skickas
    form.addEventListener("submit", async (e) => {
        // Sidan ska inte laddas om
        e.preventDefault();

        // Hämtar vad användaren skrivit i fälten
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const text = document.getElementById("contactMessage").value.trim();

        // Samlar felmeddelanden i en array
        let errors = [];

        // Validerar att namn fältet är inte tomt
        if (!name) {
            errors.push('Namn saknas');
        }
        // Validerar att namnet är längre än 2 tecken
        if (name && name.length < 2) {
            errors.push('Namnet måste vara minst 2 tecken');
        }

        // Validerar att e-post fältet är inte tomt
        if (!email) {
            errors.push('E-post saknas');
        }
        // Validerar att e-post innehåller inte ogiltiga tecken
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('E-postadressen är ogiltig');
        }

        // Validerar att meddelande fältet är inte tomt
        if (!text) {
            errors.push('Meddelande saknas');
        }
        // Validerar att meddelandet är längre än 5 tecken
        if (text && text.length < 5) {
            errors.push('Meddelandet måste vara minst 5 tecken');
        }

        // Visar felmeddelanden om något är fel
        if (errors.length > 0) {
            message.innerHTML = '<div class="error">' + errors.join('<br>') + '</div>';
            message.className = "message error";
            return;
        }

        try {
            // Skickar en förfrågan till backend
            const res = await fetch("http://localhost:3000/api/messages", {
                // POST skickar data till servern
                method: "POST",
                // Skickar JSON
                headers: {
                    "Content-Type": "application/json"
                },
                // Skickar med data från formuläret
                body: JSON.stringify({ name, email, subject, message: text })
            });

            // Tolkar svaret från servern som JSON
            const data = await res.json();

            // Om servern svarade med ett fel
            if (!res.ok) {
                message.textContent = data.error || "Kunde inte skicka meddelandet";
                message.className = "message error";
                return;
            }

            // Visar ett lyckat meddelande
            message.textContent = "";
            message.className = "message";
            thanks.classList.add("show");

            // Tömmer formuläret
            form.reset();

            // Döljer tack-meddelandet efter 5 sekunder
            setTimeout(() => {
                thanks.classList.remove("show");
            }, 5000);
        } catch (error) {
            // Skriver ut felet i konsolen
            console.error("Fel vid meddelande:", error);
            // Visar ett felmeddelande för användaren
            message.textContent = "Kunde inte nå servern";
            message.className = "message error";
        }
    });
}