# GripFusion — Premium 2-in-1 Fitnessband

Landingspagina voor **GripFusion**, een 2-in-1 fitnessband die lifting straps en polswraps combineert in één product. Gebouwd als schoolopdracht Ondernemerschap (2TI) én als echte startup.

**Live sites:**
- GitHub Pages: https://marwanamakran.github.io/GripFusion/
- Netlify: https://zesty-licorice-7a2c92.netlify.app/

---

## Over het product

GripFusion lost een concreet probleem op voor krachtsporters: aparte lifting straps en polswraps vergeten of kwijtraken. De 2-in-1 band combineert beide functies.

| Variant | Prijs | Productie | Oplage |
|---|---|---|---|
| Golden Fusion | €39,99 | Belgisch atelier | 100 stuks |
| Silver Fusion | €34,99 | OEM (Pakistan) | 100 stuks |

---

## Tech stack

- Pure **HTML5 / CSS3 / JavaScript** — geen framework
- Google Fonts: Bebas Neue, Barlow Condensed, Barlow
- Deployment: GitHub Pages + Netlify

---

## Projectstructuur

```
GripFusion/
├── index.html          # Volledige landingspagina
├── css/
│   └── style.css       # Alle styling
├── js/
│   └── main.js         # Nav, hamburger, countdown, voorraad, bestelmodal
├── assets/
│   ├── logo.png
│   ├── product-banner.png
│   ├── golden-detail.png
│   ├── silver-detail.png
│   ├── golden-pack.png
│   └── silver-pack.png
└── netlify.toml        # Netlify configuratie
```

---

## Functies

- Aftelklok tot launch (1 januari 2027)
- Pre-order modal met gegevensformulier, leveringsadres en 10-minuten reserveringstimer
- Voorraadteller per product (opgeslagen in localStorage)
- 3D CSS product mockups met hover-effect
- Scroll-reveal animaties via IntersectionObserver
- Responsief design (mobiel, tablet, desktop)
- Hamburger menu voor mobiel

---

## Lokaal openen

Geen installatie nodig. Open `index.html` rechtstreeks in de browser of gebruik Live Server in VS Code.

---

## Deployen

```bash
git add .
git commit -m "beschrijving van de wijziging"
git push
```

GitHub Pages en Netlify updaten automatisch na elke push naar de `main` branch.

---

## Schoolopdracht

Vak: Ondernemerschap | Richting: 2TI  
Leerling: Marwan Amakran  
Vereisten: bedrijfsnaam, contactgegevens, wat ze doen, visie, USP, producten, niet-functioneel contactformulier, werkende sociale links — gedeployed via GitHub Pages + Netlify.
