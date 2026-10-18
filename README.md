# Vaviorka – Publik webbplats

Detta repository innehåller koden för den publika webbplatsen till det fiktiva restaurangföretaget **Vaviorka** – en belarussisk fine dining-restaurang i Stockholm. Webbplatsen presenterar företaget, visar menyn dynamiskt från en REST-webbtjänst samt låter besökare boka bord och skicka kontaktmeddelanden.

Webbplatsen är en del av ett projektarbete i kursen Backend-baserad utveckling (DT207G) vid Mittuniversitetet.

## Länk

[Videodemonstration](https://www.youtube.com/watch?v=mE56IIlkSak)

## Tekniker

- **HTML5** – struktur och semantik
- **CSS3** – styling och responsiv design
- **JavaScript (Vanilla)** – dynamik och API-anrop
- **Fetch API** – kommunikation med backend
- **Google Fonts** – Inter och Cormorant Garamond

## Funktioner

Webbplatsen innehåller följande funktioner:

- **Startsida** med hero-sektion och dynamiskt laddad meny från API:et
- **Boka bord** – formulär som skickar bokningsförfrågan till backend
- **Kontakta oss** – formulär som skickar meddelande till backend
- **Om oss** – presentation av restaurangen
- **Responsiv design** – anpassad för desktop, tablet och mobil

## Installation och användning

1. Klona ner källkodsfilerna:
   ```bash
   git clone https://github.com/umavanmoriel/Projekt_Dt207G_vaviorka.git 
   ```

2. Se till att backend-servern körs på `http://localhost:3000`

3. Öppna `pages/index.html` i webbläsaren

## Sidor

| Fil | Beskrivning |
|-----|-------------|
| `index.html` | Startsida med hero-sektion och dynamisk meny |
| `about.html` | Presentation av restaurangen |
| `booking.html` | Formulär för att boka bord |
| `contact.html` | Formulär för att skicka meddelande |

## Dynamisk meny

Menyn på startsidan hämtas dynamiskt från backend när sidan laddas. Rätterna grupperas i kategorier och visas i en elegant meny med prickade linjer mellan namn och pris.

**Kategorier som visas:**

- Förrätter (`starters`)
- Varmrätter (`mainCourses`)
- Efterrätter (`desserts`)
- Drycker (`drinks`)

