# Příručka pro vývojáře

## Úvod

Vítejte v příručce pro vývojáře aplikace Učitelský kalendář. Tato příručka vám pomůže pochopit strukturu projektu, pracovní postup vývoje a osvědčené postupy pro přispívání do projektu.

## Struktura projektu

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

## Pracovní postup vývoje

### Nastavení vývojového prostředí

Pro nastavení vývojového prostředí postupujte podle následujících kroků:

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

### Standardy kódování

Dodržujte tyto standardy kódování, abyste udrželi konzistenci a čitelnost v kódu:

- Používejte smysluplné názvy proměnných a funkcí.
- Pište komentáře, které vysvětlují účel složitých bloků kódu.
- Dodržujte stávající styl a formátování kódu projektu.
- Používejte konzistentní odsazení a mezery.

### Verze řízení

Projekt používá Git pro řízení verzí. Dodržujte tyto pokyny při práci s Gitem:

- Vytvořte novou větev pro každou funkci nebo opravu chyby.
- Používejte popisné názvy větví (např. `feature/add-login`, `bugfix/fix-calendar-view`).
- Komitujte změny s jasnými a stručnými zprávami o komitu.
- Pushujte své změny do vzdáleného repozitáře a vytvořte pull request pro revizi.

### Testování

Ujistěte se, že váš kód je dobře otestován před odesláním pull requestu. Postupujte podle těchto kroků pro spuštění testů:

1. Spusťte testy:
   ```
   npm test
   ```

2. Zkontrolujte výsledky testů a ujistěte se, že všechny testy prošly.

3. Pokud nějaké testy selžou, opravte problémy a znovu spusťte testy.

## Přispívání

Vítáme příspěvky od komunity. Pro přispění do projektu postupujte podle těchto kroků:

1. Forkněte repozitář na GitHubu.

2. Naklonujte svůj fork:
   ```
   git clone https://github.com/your-username/projekt-4ep-prehledovnik.git
   ```

3. Vytvořte novou větev pro svou funkci nebo opravu chyby:
   ```
   git checkout -b feature/your-feature-name
   ```

4. Proveďte své změny a komitujte je s jasnými a stručnými zprávami o komitu.

5. Pushujte své změny do svého forku:
   ```
   git push origin feature/your-feature-name
   ```

6. Vytvořte pull request na původním repozitáři a poskytněte podrobný popis svých změn.

## Závěr

Doufáme, že vám tato příručka pro vývojáře pomůže začít s aplikací Učitelský kalendář. Pokud máte nějaké dotazy nebo potřebujete další pomoc, prosím, odkažte se na dokumentaci projektu nebo vytvořte issue na GitHub repozitáři.
