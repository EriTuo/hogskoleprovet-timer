# Högskoleprovet-timer

En webbbaserad tidtagningsapp för att träna på Högskoleprovet. Följ med tiden för varje uppgift och få detaljerad feedback om din prestation.

## Features

- ⏱️ **Liveräkning** - Se tiden för varje uppgift i realtid
- 📊 **Två testtyper** - Verbal och Kvantitativ med rätt antal uppgifter för varje
- 📈 **Resultatöversikt** - Se total tid per avsnitt och jämför med rekommenderad tid
- 💾 **Spara resultat** - Exportera din omgång som JPG-bild
- 🎯 **Automatisk avsnittsbyte** - Programmet byter automatiskt mellan avsnitt
- 🔄 **Expanderbara avsnitt** - Se tidigare avsnitt medan tiden går

## Installation

### Steg 1: Ladda ner projektet
```bash
git clone https://github.com/[ditt-användarnamn]/HP-timer.git
cd HP-timer
```

Eller ladda ner som ZIP-fil från GitHub och packa upp den.

### Steg 2: Öppna i webbläsaren

Det finns flera sätt att köra programmet:

**Alternativ A: Direkt från fil**
- Öppna `högskoleprovet.html` direkt i din webbläsare (dubbeltryck på filen eller högerklick → Öppna med)

**Alternativ B: Lokal server (rekommenderat)**
Om du har Python installerat:
```bash
# Python 3
python -m http.server 8000

# Eller Python 2
python -m SimpleHTTPServer 8000
```
Öppna då `http://localhost:8000/högskoleprovet.html` i din webbläsare.

**Alternativ C: VS Code (om du har Live Server installerat)**
- Installera "Live Server" extension i VS Code
- Högerklick på `högskoleprovet.html` → Open with Live Server

## Hur man använder appen

### 1. Välj testtyp
- Välj mellan **Verbal** eller **Kvantitativ** längst upp
- Klicka **Starta om** för att börja på nytt

### 2. Starta tiden
- Tryck på **mellanslag** för att starta
- Du börjar automatiskt på uppgift 1

### 3. Byt uppgift
- Tryck på **mellanslag** för att gå till nästa uppgift
- Tiden sparas automatiskt när du går vidare
- Du kan också klicka **Nästa uppgift** eller **Pausa**

### 4. Följ med i loggboken
- Under **Uppgiftslogg** ser du alla dina genomförda uppgifter
- Varje avsnitt visar total tid och rekommenderad tid
- Klicka på pilarna för att expandera/kollapsa tidigare avsnitt

### 5. Se provstruktur
- Kryssa i **Visa provstruktur** för att se all information om provet
- Visar antal uppgifter, uppgiftsnummer och rekommenderad tid per avsnitt

### 6. Spara ditt resultat
- Klicka **Spara som JPG** för att ladda ner en bild med alla dina resultat
- Bilden innehåller alla uppgifter med tider och kan delas eller sparas

## Kontroller

| Knapp | Funktion |
|-------|----------|
| **Mellanslag** | Starta timer / Gå till nästa uppgift |
| **Nästa uppgift** | Gå till nästa uppgift direkt |
| **Pausa** | Pausa/fortsätt tiden |
| **Starta om** | Börja om från början |
| **Spara som JPG** | Exportera resultaten som bildfil |

## Teststrukturer

### Verbal (40 uppgifter)
- **ORD** (uppgift 1-10) - 3 minuter
- **LÄS** (uppgift 11-20) - 22 minuter
- **MEK** (uppgift 21-30) - 8 minuter
- **ELF** (uppgift 31-40) - 22 minuter

**Total: 50 minuter**

### Kvantitativ (40 uppgifter)
- **XYZ** (uppgift 1-12) - 12 minuter
- **KVA** (uppgift 13-22) - 10 minuter
- **NOG** (uppgift 23-28) - 10 minuter
- **DTK** (uppgift 29-40) - 23 minuter

**Total: 50 minuter**

## Tips för träning

1. **Börja lugnt** - Fokusera på att förstå uppgifternas format innan du stressar med tiden
2. **Jämför med rekommenderad tid** - Se om du är snabbare eller långsammare än rekommenderat
3. **Träna regelbundet** - Kör flera omgångar och sparar resultaten för att följa din utveckling
4. **Expandera avsnitt** - Klicka på pilarna för att se detaljer om tidigare avsnitt även medan du tränar
5. **Skärmdumpar** - Spara JPG:erna för att kunna se din utveckling över tid

## Browserkompatibilitet

Appen fungerar i alla moderna webbläsare:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Systemkrav

- En webbläsare (ingen installation av program behövs)
- Internetåtkomst inte nödvändig (appen körs lokalt)

## Filstruktur

```
HP-timer/
├── högskoleprovet.html  # Huvudfil och struktur
├── högskoleprovet.css   # Styling
├── högskoleprovet.js    # Logik och funktionalitet
└── README.md            # Denna fil
```

## Felsökning

**Appen startar inte?**
- Kontrollera att du öppnar `högskoleprovet.html`
- Prova att öppna i en annan webbläsare
- Kontrollera att alla tre filer (HTML, CSS, JS) är i samma mapp

**Tiden nollställs?**
- Det är normalt - tiderna sparas bara när du går till nästa uppgift
- Din nuvarande uppgifts tid visas i statusrutan

**JPG-export fungerar inte?**
- Kontrollera att din webbläsare tillåter nedladdningar
- Prova en annan webbläsare

## Utveckling

Projektet är byggt med:
- HTML5
- CSS3
- Vanilla JavaScript (ingen beroenden!)

## Licens

Fritt att använda och modifiera för personlig träning.

## Kontakt & Feedback

Har du förslag på förbättringar? Du kan:
- Skapa ett GitHub issue
- Forka projektet och skicka en pull request
- Ge feedback direkt

---

**Lycka till med din Högskoleprovet-träning! 🎓**
