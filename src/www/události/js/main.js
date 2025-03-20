function handleUdalostClick(udalostData) {
    const udalost = JSON.parse(udalostData);

  // Pokud je vyberZadani = směruje podle názvu
  if (udalost.vyberZadani === 'maturita') {
    switch (udalost.nazev) {
      case 'PČMZ':
        window.location.href = `/maturity/pcmz`;
        break;
      case 'SČMZ':
        window.location.href = `/maturity/scmz`;
        break;
      case 'SLOH':
        window.location.href = `/maturity/sloh`;
        break;
      case 'PZOP':
      case 'PZOP - dodatečný termín':
        window.location.href = `/maturity/`;
        break;
      default:
        alert('Neznámá maturita: ' + udalost.nazev);
    }
  } else {
    // Pokud není maturita, otevře formulář 
    editUdalost(udalostData);
  }
}
class UdalostiManager {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.setInitialState();
  }

  initializeElements() {
    this.form = document.querySelector('.event-form');
    this.radioButtons = document.querySelectorAll('input[name="variantaDni"]');
    this.jineInputs = document.getElementById('jineInputs');
    this.vicedenniInputs = document.getElementById('vicedenniInputs');
    this.datumLabel = document.getElementById('datumLabel');
    this.typAkceSelect = document.getElementById('typAkce');
    this.tridySelect = document.getElementById('tridySelect');
    this.budovySelect = document.getElementById('budovySelect');
    this.ucebnaInput = document.getElementById('ucebnaInput');
    this.datumInput = document.getElementById('datum');
    this.datumDoInput = document.getElementById('datumDo');
    this.casOdSelect = document.getElementById('casOd');
    this.casDoSelect = document.getElementById('casDo');
  }

  setInitialState() {
    // Ensure initial visibility states
    if (this.jineInputs) this.jineInputs.style.display = 'none';
    if (this.vicedenniInputs) this.vicedenniInputs.style.display = 'none';
    if (this.tridySelect) this.tridySelect.style.display = 'none';
    if (this.budovySelect) this.budovySelect.style.display = 'none';

    // Set initial radio button
    const celodenniRadio = document.getElementById('celodenni');
    if (celodenniRadio) {
      celodenniRadio.checked = true;
    }

    // Update date inputs and time selects
    this.updateMinDatum();
    this.updateCasDoOptions();
    
    // Handle initial type selection
    this.handleTypAkceChange();
  }

  attachEventListeners() {
    // Radio button events
    this.radioButtons.forEach(input => {
      input.addEventListener('change', () => {
        this.updateVisibility();
        this.updateRequiredFields();
      });
    });

    // Select events
    if (this.typAkceSelect) {
      this.typAkceSelect.addEventListener('change', () => this.handleTypAkceChange());
    }

    // Date input events
    if (this.datumInput) {
      this.datumInput.addEventListener('change', () => this.updateMinDatum());
    }
    
    if (this.datumDoInput) {
      this.datumDoInput.addEventListener('change', () => this.updateMinDatum());
    }

    // Time select events
    if (this.casOdSelect) {
      this.casOdSelect.addEventListener('change', () => this.updateCasDoOptions());
    }
  }

  updateVisibility() {
    if (this.jineInputs) this.jineInputs.style.display = 'none';
    if (this.vicedenniInputs) this.vicedenniInputs.style.display = 'none';
    this.datumLabel.innerHTML = 'Datum';

    if (document.getElementById('vicedenni').checked) {
      this.datumLabel.innerHTML = 'Od';
      if (this.vicedenniInputs) this.vicedenniInputs.style.display = 'block';
    } else if (document.getElementById('jine').checked) {
      if (this.jineInputs) this.jineInputs.style.display = 'block';
    }
  }

  updateRequiredFields() {
    if (this.datumDoInput) this.datumDoInput.required = false;
    if (this.casOdSelect) this.casOdSelect.required = false;
    if (this.casDoSelect) this.casDoSelect.required = false;

    if (document.getElementById('vicedenni').checked) {
      if (this.datumDoInput) this.datumDoInput.required = true;
    } else if (document.getElementById('jine').checked) {
      if (this.casDoSelect) this.casDoSelect.required = true;
    }
  }

  handleTypAkceChange() {
    if (this.tridySelect) this.tridySelect.style.display = 'none';
    if (this.budovySelect) this.budovySelect.style.display = 'none';
    if (this.ucebnaInput) this.ucebnaInput.style.display = 'none'; 

    if (this.typAkceSelect.value === 'celotridni') {
      if (this.tridySelect) this.tridySelect.style.display = 'block';
    } else if (this.typAkceSelect.value === 'budovy') {
      if (this.budovySelect) this.budovySelect.style.display = 'block';
    } else if (this.typAkceSelect.value === 'ucebna') {
      if (this.ucebnaInput) this.ucebnaInput.style.display = 'block';
    }
  }

  updateMinDatum() {
    if (this.datumInput && this.datumInput.value) {
      const nextDay = new Date(this.datumInput.value);
      nextDay.setDate(nextDay.getDate() + 1);
      
      if (this.datumDoInput) {
        this.datumDoInput.min = nextDay.toISOString().split('T')[0];
        
        if (this.datumDoInput.value && new Date(this.datumDoInput.value) <= new Date(this.datumInput.value)) {
          this.datumDoInput.value = '';
        }
      }
    }
  }

  updateCasDoOptions() {
    if (!this.casOdSelect || !this.casDoSelect) return;
    
    const casOdIndex = this.casOdSelect.selectedIndex;
    
    Array.from(this.casDoSelect.options).forEach((option, index) => {
      option.style.display = index + 1 <= casOdIndex ? 'none' : 'block';
    });

    if (this.casDoSelect.selectedIndex + 1 <= casOdIndex) {
      this.casDoSelect.selectedIndex = -1;
    }
  }
}

// Instance management
let manager = null;

function initManager() {
  // Clean up old instance
  if (manager) {
    // Cleanup code if needed
  }
  // Create new instance
  manager = new UdalostiManager();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initManager);

// Initialize after HTMX updates
document.addEventListener('htmx:afterSwap', () => {
  // Short timeout to ensure DOM is fully updated
  setTimeout(initManager, 0);
});
function editUdalost(udalostData) {
  // Parsování JSON objektu události
  const udalost = JSON.parse(udalostData);

  //přepsání přidat na uložit
  document.getElementById('SaveButton').value = 'Změnit';

  // Vyplnění polí ve formuláři
  document.querySelector('[name="jmeno_udalosti"]').value = udalost.nazev;
  document.querySelector('[name="datum"]').value = udalost.datum;
  document.querySelector('[name="datum"]').min = udalost.datum;

  manager.updateMinDatum();

  // Nastavení správného radio buttonu a zobrazení příslušných polí
  const radioButtons = document.querySelectorAll('input[name="variantaDni"]');
  const jineInputs = document.getElementById('jineInputs');
  const vicedenniInputs = document.getElementById('vicedenniInputs');

  // Skrytí všech dodatečných inputů
  jineInputs.style.display = 'none';
  vicedenniInputs.style.display = 'none';

  // Nastavení správného radio buttonu a zobrazení příslušných polí
  switch(udalost.vyberZadani) {
    case "celodenni":
      document.getElementById('celodenni').checked = true;
      break;
    case "vicedenni":
      document.getElementById('vicedenni').checked = true;
      document.getElementById('datumDo').value = udalost.datumDo;
      vicedenniInputs.style.display = 'block';
      break;
    case "casIDatum":
      document.getElementById('jine').checked = true;
      document.getElementById('casOd').value = udalost.casOd;
      document.getElementById('casDo').value = udalost.casDo;
      jineInputs.style.display = 'block';
      break;
  }

  // Nastavení typu akce
  const typAkceSelect = document.querySelector('[name="typAkce"]');
  typAkceSelect.value = udalost.typ;

  // Specifické nastavení pro budovy nebo třídy
  const tridySelect = document.querySelector('[name="tridy"]');
  const budovySelect = document.querySelector('[name="budovy"]');
  
  // Skrytí obou selectů
  document.getElementById('tridySelect').style.display = 'none';
  document.getElementById('budovySelect').style.display = 'none';

  if (udalost.typ === "celotridni") {
    tridySelect.value = udalost.tykaSe;
    document.getElementById('tridySelect').style.display = 'block';
  } else if (udalost.typ === "budovy") {
    budovySelect.value = udalost.tykaSe;
    document.getElementById('budovySelect').style.display = 'block';
  } else if (udalost.typ === "ucebna") {
    document.getElementById('ucebna').value = udalost.tykaSe || '';
    document.getElementById('ucebnaInput').style.display = 'block';
}

  // Poznámka
  document.querySelector('[name="poznamka_udalosti"]').value = udalost.poznamka || '';
  
  // Pro načtení původních dat
  document.querySelector('[name="PuvodniData"]').value = udalostData || '';
}