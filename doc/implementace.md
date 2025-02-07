# Implementace

Tento dokument neobsahuje detailní popis každého modulu,
pouze poskytuje základní informace o jejich struktuře.

## Celková struktura projektu

Zdroják projektu je uložen v `src/app/`.
Projekt se řídí MVC designem.
Stránky jsou generovány pomocí
[EJS](https://ejs.co/).
Většina Modulů generuje novou stránku pokaždé interakci, avšak projekt také
obsahuje
[htmx](https://htmx.org/)
a některé moduly ho používají k dosažení jisté formy single-page application.

Každý modul má vlastní vlastní router v `src/app/routers/`, controller v
`src/app/controllers/` a view v `src/app/views/<MODULE-NAME>/`.

Veškeré moduly sdílí jeden model v `src/app/models/databaseEngine.js`
Databáze jako takové je v `data/database.json`.

Některé moduly přenechávají všechnu logiku pro controllery, jiné ji dělají
v routerech. Toto bude u každého modulu specifikováno.

Views obsahují pouze \<main\> (a popřípadě \<style\> a \<script\>) část html.
Zbytek se pomocí EJS načte z `src/app/views/partials/`.
Modul má dark a light mód, který závisí na nastavení browseru.
(funguje v Firefoxu a Edgy ale ne v Chromu)
PROTO NEPOUŽÍVAT NAPEVNO DANÉ BARVY ZAMÝŠLENÉ PRO POUZE DARK, ČI LIGHT MÓD!

Při vývoji doporučuji spouštět program ve \"vývojářském módu\" pomocí příkazu
`npm run dev` vyvolaném v adresáři `src/`.
Tímto mimo aplikaci zapnete také
[nodemon](https://www.npmjs.com/package/nodemon),
který vám automaticky restartuje aplikaci při změně gitem sledovaného souboru.
Pakliže ho budete potřebovat restartovat manuálně, napište do něj `rs`.

## Osnovy

Tady žádné htmx nenajdete.
Zato tu je spousta JS v `src/www/osnovy/js/main.js`.

V ejs je pár zajímavých věcí.
Zda je předmět \"Cvičení\", \"Teorie\", či \"Ručně\" se zjišťuje dle jeho názvu.

JavaScript možná vypadá komplexně, ale vlastně není, jen je tam hodně interakcí
s dokumentem.

`threeWaySwitch` sice má obskurní if, ale vlastně jen zajišťuje, že se omylem
nespustí kód pro změnu stavu na tlačítko, které už je vybrané, což by nic
nerozbilo, ale stejně to někdo nechtěl.

Zde dokonce i něco je v routeru, ale jen se tam připravují data pro controller.
V controlleru je hodně funkcí, které jsou pouze interface k databázi.
Jediná výjimka je `exports.edit`.
Zde se přidá koncovka předmětu a odstraní se extra \'-\', jelikož to rozbíjelo
pár věcí.
Také tu je neoptimální blok kódu, pokud je tu někdo, kdo rád optimalizuje.

## Rozvrh

Rozvrhy na frontendu nepoužívají htmx.
Změny v rozvrhu jsou uloženy lokálně a server je kontaktován jen při ukládání
a verzování.

Aktivní verze kalendáře se posílá v URL jako \"verze\".

V controlleru vlastně nic není.
Vše se dělá přímo v routerech.

Rozvrh jako takový je uložen jako Objekt.

```
{
    lichy: {
        "Po": {
            "0": {
            "predmet": "a",
            "mistnost": "b",
            "skupina": "c",
            "trida": "d"

            },

            "1": {
                ...
            },

            ...
        },
        "Ut": {...},
        "St": {...},
        "Ct": {...},
        "Pa": {...}
    },

    sudy: {
        ...
    }
}
```

## Kalendář

Kalendář používá htmx pro přepínání mezi módy.

Zase tak moc se tam na něm toho neděje, povětšinou pouze generace tabulek.
(Čeho taky jiného, že ano)

Veškerá logika je v controlleru.

Nejzajímavější je objekt, jenž vrací `exports.tydenni` pod kolonkou `osnovy`.
Jedná se o objekt, ve kterém se klíže jmenují `<přednět><třída>`, například
`VYSv3IT`.
Přiřazen k němu je array tématických plánů pro každou hodinu v roce (takže se
opakují).

## Události

Události mají ve views dva soubory: `index.ejs` a `seznamUdalosti.ejs`.
`seznamUdalosti.ejs` je zde pouze z historických důvodů a k ničemu se nepoužívá.
Doporučuji ho ignorovat.

`index.ejs` používá htmx při uložení formu.
Z nějakého důvodu je tu styl uprostřed souboru, neřešte.
Poté jsou tu nějaké deklarace v EJS, které se následně používají v generování
tabulky.

Spousta věcí se zde řeší objektem `UdalstiManager`.
Většinu práce však vykoná již při svém vytvoření.
Poté jen updatuje datum.

Hodně JavaScriptu vypadá děsivě, ale to jen proto, že editovat DOM zabere hodně
kódu.
Zase nic tak šíleného se tam neděje.

V routeru toho moc není.

Controller je také celkem čistý.
`exports.index` a `exports.smazat` jsou jen pár řádků, tudíž zbývá jen
`exports.pridat`.
To sice zabírá více řádků, ale většina je jen čtení dat a formátování záznamu
v databázi.

Celkově celkem fajn modul.
Doporučuji.

## Projekty

## Maturity

Maturity nepoužívají htmx, pouze JS.
Každá část má vlastní EJS soubor pojmenovaný po své zkratce.
Výjimkou je tedy praktická, které se jmenuje `index.ejs`, protože prostě
musí být speciální.

Většina frontendu je jen skládání stránky a posílání dat na server, nic
světoborného.

V routeru nic moc není.

Tedy je, ale ani to nestojí za řeč.
Zato však, controllery...
Jó, to je jiná.

Každá část má getter, který je jen zkratka a setter, což je `ukladani<zkratka>`.

PZOP, PCMZ, SLOH a SCMZ vlastně jen načtou data z databáze a pošlou je do EJS.

`ukladanipzop` je celkem straight forward.

`ukladanipcmz` zabírá trochu místa, ale nakonec se snaží vytvořit dvě arraye.
První jen obsahuje data všech dní.
Druhá obsahuje array indexů vybraných hodin pro každý den.

Body vypadá asi nějak takhle:

```
{
   den1_datum: '2025-01-15',
   den1_hodina4: 'on',
   den1_hodina6: 'on',
   den1_hodina7: 'on',
   den2_datum: '2025-01-10',
   den2_hodina3: 'on'
}
```

`ukladaniscmz` vstup může vypadat asi takhle:

```
{
   den1_datum: '2025-01-11',
   den1_checkbox: 'on',
   den1_cas: '06:07',
   den1_ucebna: 'ano',
   den1_predmet: 'AJ',
   den2_datum: '2025-01-01',
   den2_cas: '05:04',
   den2_ucebna: 'ne',
   den2_predmet: 'MA',
   den3_datum: '2025-01-10'
}
```

Nakonec se z toho poskládají arraye na stejný způsob jako v `ukladanipcmz`.
Nevyplněné položky se ukládají jako `null`.
Z nějakého důvodu se časy (hodiny), ukládají jako arraye o jednom elementu a
chybějící záznam je značen prázdnou arraí.
Hold se s tím musí žít, no.

`ukladanisloh` je na stejný brdo, arraye arraí a tak...

## Databáze

Celá databáze je implementována v souboru `src/app/models/databaseEngine.js`.
Databáze je implementovaná pomocí
[Simple JSONdb](https://www.npmjs.com/package/simple-json-db).
Databázový soubor jako takový je uložen v `data/database.json`.
Nejprve proběhne před definicí jakékoli funkce případná inicializace, pokud by
náhodou databáze neexistovala.

Kód je organizován na moduly.
Nejprve se implementují funkce pro zápis a čtení celého záznamu z databáze.
Poté se vytvoří objekt pojmenován po modulu, který obsahuje všechny metody pro
interakci s danou částí databáze.

Většina metod má dostatečně popisný název a dělá jen tu jednu věc, kterou dělat
má.
Ano, jsou tu výjimky, jako `ziskatVsechnyMaturityJakoUdalosti`,
(to je také přístup ke jmenování funkcí)
což je o něco komplexnější funkce, ale pořád to je jen transformace dat, která
se hold provádí na 4 datové struktury.
Pokud však nevznikne nový druh maturitní zkoušky, v této částí kódu nejspíše
nebudete muset nic přepisovat.

## Pošli to dál

Pokud tohle čteš, tak jsi byl nejspíše pověřen modifikací této aplikace.

Hodně štěstí!

Vím, že tahle dokumentace nejspíš není až tak úžasná, jak by se dalo čekat.
Přesto tě prosím, aby jsi do ní sepsal všechny významné změny, které do aplikace
přidáš.
Jak do hackerské části, tak převážně do uživatelské.
Ač jsem jen tvůj teoretický předchůdce, který tu prý studoval o kdo ví kolik
let nazpět a jehož existenci nemůžeš ani potvrdit, ani vyvrátit a tudíž nevím
nic o současné situaci, troufám si hádat, že nejsi poslední, kdo zde hackuje.

