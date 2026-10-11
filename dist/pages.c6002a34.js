// Kör funktionen när sidan laddas
window.onload = init;
function init() {
    // Startar processen för att hämta och visa menyn
    processMenuData();
}
// Hämtar menyn från backend
async function getMenuData() {
    try {
        const response = await fetch("http://localhost:3000/api/dishes");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
// Bearbetar datan från backend
async function processMenuData() {
    try {
        const result = await getMenuData();
        // Skriver ut datan i konsolen för felsökning
        console.log("Received data:", result);
        // Visar menyn på sidan
        displayMenuData(result);
    } catch (error) {
        // Skriver ut felet i konsolen
        console.error("Error processing data:", error);
        // Visar ett felmeddelande för användaren
        const container = document.getElementById("menu-section");
        if (container) container.innerHTML = '<p class="menu-loading">Kunde inte h\xe4mta menyn.</p>';
    }
}
// Visar menyn på sidan
function displayMenuData(data) {
    // Hämtar elementet där menyn ska visas
    const container = document.getElementById("menu-section");
    container.innerHTML = "";
    // Skapar rubriken "Vår meny"
    const heading = document.createElement("h2");
    heading.className = "subtitle";
    heading.textContent = "V\xe5r meny";
    container.appendChild(heading);
    // Visar ett meddelande om inga rätter finns
    if (!data || data.length === 0) {
        const empty = document.createElement("p");
        empty.className = "menu-loading";
        empty.textContent = "Menyn \xe4r tom just nu.";
        container.appendChild(empty);
        return;
    }
    // Kategorier i önskad ordning
    const categories = [
        {
            key: "starters",
            label: "F\xf6rr\xe4tter"
        },
        {
            key: "soups",
            label: "Soppor"
        },
        {
            key: "mainCourses",
            label: "Varmr\xe4tter"
        },
        {
            key: "desserts",
            label: "Efterr\xe4tter"
        },
        {
            key: "drinks",
            label: "Drycker"
        }
    ];
    categories.forEach((cat)=>{
        // Filtrerar ut rätter i denna kategori
        const catDishes = data.filter((dish)=>dish.category === cat.key);
        // Hoppar över tomma kategorier
        if (catDishes.length === 0) return;
        // Skapar sektionen för kategorin
        const section = document.createElement("div");
        section.className = "menu-category";
        // Skapar rubriken för kategorin
        const catHeading = document.createElement("h3");
        catHeading.className = "menu-category-title";
        catHeading.textContent = cat.label;
        section.appendChild(catHeading);
        // Skapar listan för rätterna
        const list = document.createElement("ul");
        list.className = "menu-list";
        catDishes.forEach((dish)=>{
            // Skapar en menyrad för rätten
            const li = document.createElement("li");
            li.className = "menu-item";
            // Skapar wrapper för info
            const info = document.createElement("div");
            info.className = "menu-item-info";
            // Skapar header
            const header = document.createElement("div");
            header.className = "menu-item-header";
            // Rättens namn
            const name = document.createElement("span");
            name.className = "menu-item-name";
            name.textContent = dish.name;
            header.appendChild(name);
            // Prickade linjer mellan namn och pris
            const dots = document.createElement("span");
            dots.className = "menu-item-dots";
            header.appendChild(dots);
            // Pris
            const price = document.createElement("span");
            price.className = "menu-item-price";
            price.textContent = dish.price + " kr";
            header.appendChild(price);
            info.appendChild(header);
            // Beskrivning
            if (dish.description) {
                const desc = document.createElement("p");
                desc.className = "menu-item-description";
                desc.textContent = dish.description;
                info.appendChild(desc);
            }
            li.appendChild(info);
            list.appendChild(li);
        });
        section.appendChild(list);
        container.appendChild(section);
    });
}

//# sourceMappingURL=pages.c6002a34.js.map
