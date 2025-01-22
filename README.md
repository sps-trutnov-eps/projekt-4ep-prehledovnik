# Přehledovník

Přehledovník jest aplikací pro učitele pro zprávu rozvrhů, maturit a projektů z programování.
Použijte na vlastní nebezpečí.

## Spuštění

Pro spuštění aplikace vlezte do `src` a spsťte následující příkazy

```
npm install # pouze jednou
npm run dev
```

Poté můžete alpikaci otevřít přez
[http://localhost:3000](http://localhost:3000).

Pro změnu portu lze použít dotenv soubor.
Vytvořte `src/.env` a zapište do něj:

```
PORT=<port-number>
```

## Databáze

Při prvním zpuštění aplikace se vytvoří `data/database.json`.
V tomto souboru jsou uložena veškerá data, tudíž doporučuji nemazat a zálohovat.