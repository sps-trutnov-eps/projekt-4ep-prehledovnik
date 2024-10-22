# Dokumentace projektu

## Funkcionalita

Projekt je aplikace učitelského kalendáře navržená tak, aby učitelům pomohla spravovat jejich rozvrhy, události a další důležité informace. Aplikace zahrnuje funkce jako:

- Správa osnov
- Správa událostí
- Zobrazení kalendáře (měsíční a týdenní)
- Správa projektů
- Správa maturitních zkoušek

## Použití

Pro použití aplikace postupujte podle následujících kroků:

1. Naklonujte repozitář:
   ```
   git clone https://github.com/sps-trutnov-eps/projekt-4ep-prehledovnik.git
   ```

2. Přejděte do adresáře projektu:
   ```
   cd projekt-4ep-prehledovnik
   ```

3. Nainstalujte závislosti:
   ```
   npm install
   ```

4. Spusťte aplikaci:
   ```
   npm run dev
   ```

5. Otevřete prohlížeč a přejděte na `http://localhost:3000` (nebo port specifikovaný v souboru `.env`) pro přístup k aplikaci.

## Architektura

Projekt následuje architekturu Model-View-Controller (MVC). Hlavní komponenty jsou:

- **Modely**: Reprezentují data a obchodní logiku aplikace. Interagují s databází a provádějí CRUD operace.
- **Pohledy**: Reprezentují uživatelské rozhraní aplikace. Jsou zodpovědné za vykreslování dat poskytovaných kontrolery.
- **Kontrolery**: Zpracovávají uživatelský vstup a interakce. Zpracovávají vstup, interagují s modely a podle toho aktualizují pohledy.

### Struktura adresářů

Struktura adresářů projektu je následující:

```
projekt-4ep-prehledovnik/
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DEVELOPER_GUIDE.md
│   └── USER_GUIDE.md
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routers/
│   │   └── views/
│   ├── data/
│   ├── www/
│   ├── .env
│   ├── index.js
│   └── README.md
├── .gitignore
├── .prettierignore
├── AUTHORS.md
├── CREDITS.md
├── LICENSE.md
├── README.md
└── package.json
```

### Modely

Modely jsou umístěny v adresáři `src/app/models`. Interagují s databází a provádějí CRUD operace. Hlavní modely jsou:

- `databaseEngine.js`: Zpracovává databázové operace pro celou aplikaci.
- `exampleModel.js`: Příklad modelu pro demonstrační účely.

### Kontrolery

Kontrolery jsou umístěny v adresáři `src/app/controllers`. Zpracovávají uživatelský vstup a interakce. Hlavní kontrolery jsou:

- `exampleController.js`: Příklad kontroleru pro demonstrační účely.
- `kalendarController.js`: Zpracovává operace související s kalendářem.
- `maturityController.js`: Zpracovává operace související s maturitními zkouškami.
- `osnovyController.js`: Zpracovává operace související s osnovami.
- `projektyController.js`: Zpracovává operace související s projekty.
- `rozvrhyController.js`: Zpracovává operace související s rozvrhy.
- `udalostiController.js`: Zpracovává operace související s událostmi.

### Pohledy

Pohledy jsou umístěny v adresáři `src/app/views`. Reprezentují uživatelské rozhraní aplikace. Hlavní pohledy jsou:

- `example/`: Obsahuje příkladové pohledy pro demonstrační účely.
- `kalendar/`: Obsahuje pohledy související s kalendářem.
- `maturity/`: Obsahuje pohledy související s maturitními zkouškami.
- `osnovy/`: Obsahuje pohledy související s osnovami.
- `projekty/`: Obsahuje pohledy související s projekty.
- `rozvrhy/`: Obsahuje pohledy související s rozvrhy.
- `udalosti/`: Obsahuje pohledy související s událostmi.

### Routery

Routery jsou umístěny v adresáři `src/app/routers`. Definují trasy pro aplikaci. Hlavní routery jsou:

- `defaultRouter.js`: Definuje výchozí trasy pro aplikaci.
- `exampleRouter.js`: Definuje příkladové trasy pro demonstrační účely.
- `kalendarRouter.js`: Definuje trasy související s kalendářem.
- `maturityRouter.js`: Definuje trasy související s maturitními zkouškami.
- `osnovyRouter.js`: Definuje trasy související s osnovami.
- `projektyRouter.js`: Definuje trasy související s projekty.
- `rozvrhyRouter.js`: Definuje trasy související s rozvrhy.
- `udalostiRouter.js`: Definuje trasy související s událostmi.
