# API Dokumentace

## Kontrolery

### Example Controller

- **seenPage**: Zvyšuje a vrací počet zobrazení stránky.
- **randomImg**: Vrací náhodný obrázek.
- **writeIntoConsole**: Zaznamenává data z klienta do konzole.
- **getAmountOfWriteOut**: Vrací množství textu k vypsání.
- **writeIntoConsoleFORM**: Zaznamenává uživatelské jméno z klienta do konzole.

### Kalendar Controller

- **udalosti**: Vrací všechny události z databáze.
- **mesicni**: Zobrazuje měsíční kalendář s událostmi.
- **tydenni**: Zobrazuje týdenní kalendář s rozvrhem.

### Maturity Controller

- **pcmz**: Zobrazuje pohled PCMZ.
- **sloh**: Zobrazuje pohled SLOH.
- **scmz**: Zobrazuje pohled SCMZ.

### Osnovy Controller

- **create**: Vytváří nový osnov a vrací jeho ID.
- **remove**: Odstraňuje osnovu podle ID.
- **edit**: Upravuje osnovu podle ID s poskytnutými daty.
- **getCur**: Vrací všechny osnovy.
- **subjects**: Vrací všechny předměty.
- **classes**: Vrací všechny třídy.

### Projekty Controller

- Žádné metody nejsou zdokumentovány.

### Rozvrhy Controller

- Žádné metody nejsou zdokumentovány.

### Udalosti Controller

- **seznam**: Zobrazuje seznam událostí.
- **index**: Zobrazuje index událostí.
- **pridat**: Přidává novou událost do databáze.

## Modely

### Database Engine

- **osnovy**: Metody pro správu osnov.
- **rozvrhy**: Metody pro správu rozvrhů.
- **udalosti**: Metody pro správu událostí.
- **maturity**: Metody pro správu maturitních událostí.
- **projekty**: Metody pro správu projektů.
- **ziskatPredmety**: Vrací všechny předměty.
- **ziskatHodiny**: Vrací všechny hodiny.
- **ziskatUcebny**: Vrací všechny učebny.

### Example Model

- **getAmountOfWriteOut**: Vrací množství textu k vypsání.
- **seenPage**: Zvyšuje a vrací počet zobrazení stránky.
- **randomImg**: Vrací náhodný obrázek.
