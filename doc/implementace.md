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

## Kalendář

## Události

## Projekty

## Maturity
