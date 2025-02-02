# Použití

Pakliže byl balanc zachován, po zapnutí aplikace by vás měla přivítat
přátelská číča.
Můžete jí sdělit své trable.
Sice vám to nepomůže, ale je to celkem fajn volnočasová aktivita.

Až se rozhodnete začít pracovtat, horní lišta vám umožní přepnout se na
jednotlivé modely.
Modely na sobě do jisté míry závisí tudíž je nutné vyplnit Osnovy před Rozvrhem
a rozvrh před Kalendářem.

Aplikace podporuje light a dark mód, který se automaticky detekuje dle módu
browseru. Chrome aktuálně nefunguje, ale Edge a Firefox fungují.

## Osnovy

Osnovy se zkládají z tématických plánů pro jednotlivé předměty.
Nejprve přidejte nový tématický plán tlačítkem \"Přidat tématický plán\".
Toto přidá prázdné tlačítko.
To je v pořádku.

Nyní vyplňte \"Ročník\", \"Obor\" a \"Předmět\".
Poté vyberte zda je váš předmět cvičení, či zda je praktický.
Dle toho se určí počet hodin a popřípadná přípona pro název, tudíž ji není
třeba psát ručně.
Pokud má váš předmět nestandartní počet hodin, vyberte kolonku \"Ručně\".

Nyní vás bude zajímat tabulka \"Témata\".
Zde budete přidávat témata v jejich chronologickém pořadí a připíšete jim, kolik
hodin mají trvat.
Automaticky se vám doplní ve kterých hodinách se tedy mají probírat.
Číslo \"Do\" bude černevé, dokud nebudou vaše počty hodin odpovídat.
Pokud máte zaškrtnuto \"Ručně\", tak se po uložení počet hodin přispůsobí
tématům.
Po uložení se také pojmenuje kolonka plánu.

## Rozvrh

Rozvrh nejprve nebude.
je ho proto nutné vytvořit velkým intuitivním oranžovým tlačítkem
\"Vytvořit rozvrh\".

Rozvrh je verzovaný z archivačních důvodů.
Verze obsahuje název a popis, který není povinný.

Rozvrh se zkládá ze sudého a lichého týdne.

Zpočáku je rozvrh prázdný.
Pro manipulaci s ním klikněte na \"Upravit Rozvrh\".
Nyní můžete kliknout na políčko a vyplnit ho.
Vyplňuje se třída, předmět, učebna a Skupina.
Předměty se vybírají z Osnov.
Také existuje speciální předmět \"Kroužek\", který nevyžaduje žádné další
informace.

Až budete s rozvrhem spokojeni, klikněte na \"Uložit\".
Krom uložení můžete v editačním módu vytvořit novou verzi, či tu současnou
smazat.
Při vytvoření nové verze se do ní zkopíruje současný rozvrh.
Na předchozí verze se můžete podívat, ale nelze je editovat.

## Kalendář

Kalendář je takový pasivní prvek.
Nic nemění, zato však zobrazuje data jak z rozvrhu, tak z událostí.

Užití je zřejmé (snad).
Po otevření modulu se vám zobrazí kalendář měsíční.
Tam vidíte dny seskupené do měsíců a události, které se v nich dějí.
Víkendy byly seskupeny do jednoho dne, jelikož vás nemusí zajímat.

Na aktuální datum se můžete podívat tlačítkem \"Aktuální\".
Pokud chcete jít na specifický měsíc, můžete kupodivu použít výběr měsícu a
tlačítko \"Na měsíc\".

Po kliknutí na událost se vám zobrazí její detail.

Po stisknutí tlačítka \"Na týdenní\" se jeho text změní na \"Na Měsíční\".
Také přepne na týdenní kalendář, kde se zobrazují vyučovací hodiny.

Tlačítko \"detail\" kupodivu zobrazí detaily.
Nečekané.

## Události

## Projekty

## Maturity

Maturity jsou vcelku intuitivní modul.

Maturity vám pomáhají plánovat maturíitní zkoušky vašich žáků.
Maturity se zkládají ze čtyř částí:
Praktické zkoušky z osborných předmětů (Praktická),
Profilové části maturitní zkoušky (Ústní),
Společná část maturitní zkoušky (Státní),
Slohová práce (Sloh)

Každá část maturit je zprvu zamknutá.
Chcete li jí upravit, musíte kliknout na velké oranžové tlačítko \"Edit\".
Poté můžete upravovat a až budete spokojení, klikněte na tlačítko \"Uložit\",
které zákeřně nahradilo tlačítko \"Edit\".

### Prakická

Praktická je fajn.
Zapnete edit mód, vyplníte dny konání, vyberete z předpřipravených učeben a
uložíte.

### Ústní

Ústní se skládá z několika dní.
Přátelské tlačítko \"Přidat datum\" vám umožní počet dní navíšit.
Dny se ďělí na hodiny (vyučovací).
Vyberte ve které hodiny se zkoušky konají a uložte.
Chcete li den smazat, odeberte všechny hodiny.

Jednoduché.

### Státní

Státní se také zkládají z mnoha dní.
Po zadání dne je nutné určit, zda zadáváte, či ne.
Pakliže zadáváte, musíte také zadat čas, učebnu a předmět z předpřipraveného
listu.

### Sloh

Zase, vše je založeno na dnech.
Den je opět založen na hodinách (opět vyučovacích) ale tentokrát pro každou
hodinu vybíráte učebnu.
Výchozí je T15, ale můžete sem napsat cokoliv chcete
(například \"Párek\" (dal bych si párek)).

## Databáze

Při prvním zpuštění aplikace se vytvoří `data/database.json`.
V tomto souboru jsou uložena veškerá data, tudíž doporučuji nemazat a zálohovat.
