const timelineContent = {
    home: [
      { content: 'Vytvořte osnovy pro vaše předměty v modulu "Osnovy". V tomto modulu můžete zadat předměty, počet hodin a probíraná témata.' },
      { content: 'Nakonfigurujte si svůj rozvrh v modulu "Rozvrh". Zde si můžete vybrat z předmětů zadaných v osnovách a zvolit čas, třídu a učebnu, kde se hodina koná.' },
      { content: 'Nyní máte nastaveno vše ke správnému používaní Přehledovníku. Teď už si jen stačí užívat pohodlí a přehledné zobrazení Vašeho denního rozvrhu.' }
    ],
    kalendar: [
      { content: 'Kalendář automaticky sjednocuje všechny prvky aplikace v jednom přehledném místě.' },
      { content: 'Do kalendáře se dynamicky promítají události, jako např. státní svátky, témata hodin zadaných v osnovách a obecně na jaké učebně a s jakou třídou se hodina odehrává.' },
      { content: 'Můžete ho přepínat mezi kalendářem měsíčním a týdenním. Pomocí tlačítka "Aktuální" se dostanete na aktuální týden. Výběrem měsíce a stistem tlačítka "Na měsíc" se zas dostanete na měsíc v kalendáři, který jste vybrali.' }
    ],
    rozvrh: [
      { content: 'V tomto modulu se nastavuje statický rozvrh. Pro to, aby aplikace správně fungovala, musíte si nejdříve vytvořit první rozvrh tlačítkem "Vytvořit Rozvrh". Zde zadáte jméno verze a volitelně i popis.' },
      { content: 'Verzi rozvrhu, který chcete upravit musíte nejdřív vybrat v políčku na pravé straně obrazovky. Potom se stiskem tlačíka "Změnit" dostanete do editačního módu, kde kliknutím do různých hodin můžete upravovat, co se v nich bude dít. Po kliknutí na hodinu se dostanete do okénka, kde musíte zadat informace o hodině. Třídy a předměty se promítají z modulu osnov. Pokud zde tedy žádné nemáte, vytvořte si nejdřív osnovu. Hodinu pak můžete potvrdit, nebo odstranit, čímž se hodina uvolní. Změny pak můžete uložit do aktuální verze tlačítkem "Uložit"' },
      { content: 'Jak bylo zmíněno, ačkoliv se rozvrhy moc nemění, mají možnost verzování. Verze, jak je již řečeno se vybírají v okénku na pravé straně obrazovky, kde je zapsáno jméno verze a datum jejího vytvoření. V editačním módu můžete mimo ukládání změn do aktuální verze zapsat změny do verze nové tlačítkem "Nová verze". V tomto módu můžete vybranou verzi také smazat tlačítkem "Smazat verzi".' }
    ],
    projekty: [
      { content: 'Projekty mají předpřipravené třídy pro dvě pololetí. Po kliknutí na třídu se vám zobrazí její přehled. Zde můžete nastavit datum pitche třídy, od kterého se budou odvijet data jednotlivých milestonů po dvou týdnech na milestone a šesti milestonech.' },
      { content: 'Na stejné stánce lze taky přidat jednotlivé týmy, do kterých lze zapsat lidi kliknutím na tlačítko ve sloupečku "Členové". Ke každému členovi pak lze zapsat jeho e-maily, které se používají na propojení se statistikami. Do sloupečku "Téma" pak lze zadat téma projektu daného týmu. Po zapsání těchto informací se data musí uložit tlačítkem v pravé horní části modulu. Po vytvoření týmu se budou zobrazovat v seznamu v lévé části modulu.' },
      { content: 'Překliknutím z přehledu na detaily přepínačem v pravém horním rohu se dostanete na statistiky. Zde se zobrazují statistiky jednotlivých týmů/žáků za veškeré milestony. Žáky lze i řadit do týmů, nebo dle jména abecedně. Statistiky se dají nahrát ze souboru tlačítkem "Upload". Po nahrání se opět musí uložit tlačítkem v pravém horním rohu modulu.' }
    ],
    udalosti: [
      { content: 'V modulu Události můžete evidovat jednorázové aktivity mimo běžný rozvrh. Ty se pak promítají do kalendáře a ovlivňují ho případným posouváním hodin.' },
      { content: 'V levé části modulu musíte zadat název události, vybrat její typ a doplnit dodatečné informace. Většinou to je buď jeden datum, případně čas od, do, kdy se událost koná. Dále se zadává typ události, který udává, na co se událost vztahuje. Lze připad i volitelná poznámka. Tlačítkem "Přidat" se pak událost vytvoří a vypíše do seznamu.' },
      { content: 'V seznamu událostí lze pak událost rozkliknout a v levém panelu informace o události upravit. Změny k dané události lze pak zapsat tlačítkem "Změnit".' }
    ],
    osnovy: [
      { content: 'Vytvořte si předmět zadáním jeho názvu a celkového počtu hodin.' },
      { content: 'Pro každé téma určete počet hodin a detailní popis probírané látky.' },
      { content: 'Osnovy slouží jako základ pro vaše plánování v rozvrhu.' }
    ],
    maturita: [
      { content: 'Modul Maturita vám pomůže s přípravou na závěrečné zkoušky.' },
      { content: 'Zadejte maturitní témata a přiřaďte k nim materiály z vašich osnov.' },
      { content: 'Využijte přehledné statistiky pro efektivní plánování přípravy.' }
    ]
  };
  
  // Helper function to render the page with appropriate timeline content
  function renderModulePage(req, res, module, moduleName) {
    const title = moduleName;
    res.render('index', { 
      title: title,
      activeModule: module,
      timelineItems: timelineContent[module]
    });
  }
  
  // Controller methods for each route
  exports.showModulesHome = (req, res) => {
    renderModulePage(req, res, 'home', 'Začněte s přehledovníkem');
  };
  
  exports.showKalendar = (req, res) => {
    renderModulePage(req, res, 'kalendar', 'Kalendář');
  };
  
  exports.showRozvrh = (req, res) => {
    renderModulePage(req, res, 'rozvrh', 'Rozvrh');
  };
  
  exports.showProjekty = (req, res) => {
    renderModulePage(req, res, 'projekty', 'Projekty');
  };
  
  exports.showUdalosti = (req, res) => {
    renderModulePage(req, res, 'udalosti', 'Události');
  };
  
  exports.showOsnovy = (req, res) => {
    renderModulePage(req, res, 'osnovy', 'Osnovy');
  };
  
  exports.showMaturita = (req, res) => {
    renderModulePage(req, res, 'maturita', 'Maturita');
  };