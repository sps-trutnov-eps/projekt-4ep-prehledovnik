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
PROTO NEPOUŽÍVAT NAPEVNO DANÉ BARVY ZAMÍŠLENÉ PRO POUZE DARK, ČI LIGHT MÓD!

## Osnovy

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

## Události

## Projekty

## Maturity

Maturity nepoužívají htmx, pouze JS.
Každá část má vlastní EJS soubor pojmenovaný po své zkratce.
Vyjímkou je tedy praktická, které se jemenuje `index.ejs`, protože prostě
musí být speciální.

Většina frontendu je jen skládání stránky a posílání dat na server, nic
světoborného.

V routeru nic moc není.

Tedy je, ale ani to nestojí za řeč.
Zato však, controllery...
Jó, to je jiná.

Každá část má getter, který je jen zkratka a setter, což je `ukladani<zkratka>`.

PZOP, PCMZ, SLOH a SCMZ vlastně jen načtou data z databáze a pošlou je do EJS.

ukladanipzop je celkem straight forward.

`ukladanipcmz` zabírá trochu místa, ale nakonec se snaží vytvožit dvě arraye.
První jen obsahuje datumy všec dní.
Druhá obsahuje array indexů vybranných hodin pro každý den.

body vypadá asi nějak takhle:

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



