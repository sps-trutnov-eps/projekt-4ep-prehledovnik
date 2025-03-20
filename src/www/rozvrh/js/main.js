const emptyTimetable = {
    "lichy": {
        "Po": {}, "Út": {}, "St": {}, "Čt": {}, "Pá": {}
    },
    "sudy": {
        "Po": {}, "Út": {}, "St": {}, "Čt": {}, "Pá": {}
    }
};

let rozvrh = null;

function initializeTimetable() {
    const timetableData = document.getElementById('timetableData');
    if (timetableData && timetableData.dataset.rozvrh) {
        try {
            const parsedData = JSON.parse(timetableData.dataset.rozvrh);
            rozvrh = parsedData.hodiny || emptyTimetable;

            if (rozvrh.lichy) {
                Object.entries(rozvrh.lichy).forEach(([den, hodiny]) => {
                    Object.entries(hodiny).forEach(([cas, hodina]) => {
                        if (hodina) {
                            updateTileDisplay('L', den, cas, hodina);
                        }
                    });
                });
            }

            if (rozvrh.sudy) {
                Object.entries(rozvrh.sudy).forEach(([den, hodiny]) => {
                    Object.entries(hodiny).forEach(([cas, hodina]) => {
                        if (hodina) {
                            updateTileDisplay('S', den, cas, hodina);
                        }
                    });
                });
            }
        } catch (e) {
            rozvrh = emptyTimetable;
        }
    } else {
        rozvrh = emptyTimetable;
    }
}

const timetableData = document.getElementById('timetableData');
if (timetableData && timetableData.dataset.rozvrh) {
    try {
        const parsedData = JSON.parse(timetableData.dataset.rozvrh);
        rozvrh = parsedData.hodiny || emptyTimetable;

    } catch (e) {
        rozvrh = emptyTimetable;
    }
} else {
    rozvrh = emptyTimetable;
}

let casHodiny, denHodiny, druhTydne;

function nacteniVerze(id) {
    window.location.href = `/rozvrhy?verze=${id}`;
}

document.getElementById('novaBtn').addEventListener('click', function () {
    const timetableData = document.getElementById('timetableData');
    const timetableDataInput = document.getElementById('newVersionTimetableData');
    
    if (timetableData && timetableData.dataset.rozvrh) {
        const parsedData = JSON.parse(timetableData.dataset.rozvrh);
        timetableDataInput.value = JSON.stringify(parsedData.hodiny);
    }


    toggleModal({
        preventDefault: () => {},
        currentTarget: { dataset: { target: "createFormModal" } }
    });
});


async function ulozitRozvrh() {
    const aktivniVerze = document.getElementById('jakaverze').value;

    ['lichy', 'sudy'].forEach(week => {
        Object.keys(rozvrh[week]).forEach(day => {
            for (let i = 0; i <= 9; i++) {
                if (!rozvrh[week][day][i] || !rozvrh[week][day][i].predmet) {
                    rozvrh[week][day][i] = {
                        predmet: "volno",
                        mistnost: "",
                        skupina: "cela",
                        trida: ""
                    };
                }
            }
        });
    });

    try {
        const response = await fetch('/rozvrhy/ulozit-verzi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: aktivniVerze,
                hodiny: rozvrh
            })
        });

        if (response.ok) {
            Object.entries(rozvrh.lichy).forEach(([den, hodiny]) => {
                Object.entries(hodiny).forEach(([cas, hodina]) => {
                    updateTileDisplay('L', den, cas, hodina);
                });
            });
            Object.entries(rozvrh.sudy).forEach(([den, hodiny]) => {
                Object.entries(hodiny).forEach(([cas, hodina]) => {
                    updateTileDisplay('S', den, cas, hodina);
                });
            });

            window.location.reload();
        } else {
            alert('Při ukládání došlo k chybě.');
        }
    } catch (error) {
        alert('Při ukládání došlo k chybě.');
    }
}

function updateTileDisplay(tyden, den, cas, hodina) {
    const buttonId = `btn-${tyden}-${den}-${cas}`;
    const button = document.getElementById(buttonId);

    if (button) {
        const predmetSpan = button.querySelector('.hodina-predmet');
        const mistnostSpan = button.querySelector('.hodina-mistnost');
        const skupinaSpan = button.querySelector('.hodina-skupina');
        const tridaSpan = button.querySelector('.hodina-trida');

        if (hodina && hodina.predmet) {
            if (hodina.predmet === "volno") {
                // button.classList.replace('secondary', 'primary');
                button.classList.add('is-free');
                predmetSpan.textContent = "";
                mistnostSpan.textContent = "";
                skupinaSpan.textContent = "";
                tridaSpan.textContent = "";
            } else {
                button.classList.replace('secondary', 'primary');
                button.classList.remove('is-free');
                predmetSpan.textContent = hodina.predmet;
                mistnostSpan.textContent = hodina.mistnost;
                skupinaSpan.textContent = hodina.skupina === "cela" ? "" : hodina.skupina;
                tridaSpan.textContent = hodina.trida ? `${hodina.trida}` : "";
            }
        } else {
            button.classList.remove('is-free');
            predmetSpan.textContent = '+';
            mistnostSpan.textContent = '';
            skupinaSpan.textContent = '';
            tridaSpan.textContent = '';
        }
    }
}

function addPluses() {
    const buttons = document.querySelectorAll('.is-free');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].querySelector('.hodina-predmet').textContent = '+';
    }
}

function resetForm() {
    document.getElementById("jakypredmet").value = "";
    document.getElementById("mistnost").value = "";
    document.getElementById("skupina").value = "cela";
    document.getElementById("trida").value = "";
}

function validateAndSubmit() {
    const predmet = document.getElementById("jakypredmet").value;
    const mistnost = document.getElementById("mistnost").value;
    const trida = document.getElementById("trida").value;

    if (trida === "Kroužek") {
        potvrditHodinu();
        return;
    }

    if (!predmet) {
        alert("Prosím vyberte předmět");
        return;
    }

    if (predmet !== "volno" && !mistnost) {
        alert("Prosím vyplňte učebnu");
        return;
    }

    if (predmet !== "volno" && !trida) {
        alert("Prosím vyberte třídu");
        return;
    }

    potvrditHodinu();
}

function potvrditHodinu() {
    const predmet = document.getElementById("jakypredmet").value;
    const mistnost = document.getElementById("mistnost").value;
    const skupina = document.getElementById("skupina").value;
    const trida = document.getElementById("trida").value;

    const hodina = {
        predmet: predmet,
        mistnost: predmet === "volno" ? "" : mistnost,
        skupina: skupina,
        trida: predmet === "volno" ? "" : trida
    };

    if (druhTydne === 'L') {
        rozvrh.lichy[denHodiny][casHodiny] = hodina;
        updateTileDisplay('L', denHodiny, casHodiny, hodina);
    } else {
        rozvrh.sudy[denHodiny][casHodiny] = hodina;
        updateTileDisplay('S', denHodiny, casHodiny, hodina);
    }

    resetForm();
}

function deleteLesson() {
    var predmet = document.getElementById("jakypredmet").value;
    var mistnost = document.getElementById("mistnost").value;
    var skupina = document.getElementById("skupina").value;
    var trida = document.getElementById("trida").value;

    const hodina = {
        predmet: predmet = "",
        mistnost: mistnost = "",
        skupina: skupina = "",
        trida: trida = ""
    };

    if (druhTydne === 'L') {
        rozvrh.lichy[denHodiny][casHodiny] = hodina;
        updateTileDisplay('L', denHodiny, casHodiny, hodina);
    } else {
        rozvrh.sudy[denHodiny][casHodiny] = hodina;
        updateTileDisplay('S', denHodiny, casHodiny, hodina);
    }

    resetForm();
}

document.getElementById('smazatBtn').addEventListener('click', async function() {
    const aktivniVerze = document.getElementById('jakaverze').value;
    
    if (!confirm('Opravdu chcete smazat tuto verzi rozvrhu?')) {
        return;
    }

    try {
        const response = await fetch('/rozvrhy/smazat-verzi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: aktivniVerze
            })
        });

        if (response.ok) {
            window.location.href = '/rozvrhy';
        } else {
            alert('Při mazání došlo k chybě.');
        }
    } catch (error) {
        alert('Při mazání došlo k chybě.');
    }
});

window.onclick = function (event) {
    const createFormModal = document.getElementById('createFormModal');
    const popupModal = document.getElementById('popupModal');

    if (event.target === createFormModal) {
        createFormModal.style.display = "none";
    }
    if (event.target === popupModal) {
        popupModal.style.display = "none";
    }
};

document.addEventListener('htmx:afterSwap', function () {
    initializeTimetable();

    const editBtn = document.getElementById('editBtn');
    const novaBtn = document.getElementById('novaBtn');
    const smazatBtn = document.getElementById('smazatBtn');
    const timetableButtons = document.querySelectorAll('.timetable-btn');
    const verzeSel = document.getElementById('jakaverze');

    if (!verzeSel || !verzeSel.options.length) {
        editBtn.style.display = 'none';
    } else {
        const currentVersion = verzeSel.value;
        const mostRecentVersion = verzeSel.options[0].value;
        
        if (currentVersion !== mostRecentVersion) {
            editBtn.style.display = 'none';
        }
    }

    function lockTimetableButtons() {
        timetableButtons.forEach(button => {
            button.classList.add('disabled');
            button.disabled = true;
        });
    }

    function unlockTimetableButtons() {
        timetableButtons.forEach(button => {
            button.classList.remove('disabled');
            button.disabled = false;
        });
    }

    lockTimetableButtons();

    editBtn.addEventListener('click', function() {
        if (editBtn.textContent === 'Změnit') {

            novaBtn.style.display = 'inline-block';
            smazatBtn.style.display = 'inline-block';

            unlockTimetableButtons();
            editBtn.textContent = 'Uložit';
        } else {
            novaBtn.style.display = 'none';
            smazatBtn.style.display = 'none';

            lockTimetableButtons();
            editBtn.textContent = 'Změnit';

            ulozitRozvrh();

        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    initializeTimetable();

    const editBtn = document.getElementById('editBtn');
    const novaBtn = document.getElementById('novaBtn');
    const smazatBtn = document.getElementById('smazatBtn');
    const timetableButtons = document.querySelectorAll('.timetable-btn');
    const verzeSel = document.getElementById('jakaverze');
    const predmetField = document.getElementById("jakypredmet");
    const mistnostField = document.getElementById("mistnost");
    const skupinaField = document.getElementById("skupina");
    const tridaField = document.getElementById("trida");

    if (!verzeSel || !verzeSel.options.length) {
        editBtn.style.display = 'none';
    } else {
        const currentVersion = verzeSel.value;
        const mostRecentVersion = verzeSel.options[0].value;
        
        if (currentVersion !== mostRecentVersion) {
            editBtn.style.display = 'none';
        }
    }

    function lockTimetableButtons() {
        timetableButtons.forEach(button => {
            button.classList.add('disabled');
            button.disabled = true;
        });
    }

    function unlockTimetableButtons() {
        timetableButtons.forEach(button => {
            button.classList.remove('disabled');
            button.disabled = false;
        });
    }

    const handlePredmetChange = () => {
        const selectedValue = tridaField.value;

        if (selectedValue === "Kroužek") {
            mistnostField.disabled = true;
            skupinaField.disabled = true;

            mistnostField.value = "";
            skupinaField.value = "cela";
        }
        else {
            mistnostField.disabled = false;
            skupinaField.disabled = false;
        }
    };

    tridaField.addEventListener("change", handlePredmetChange);

    lockTimetableButtons();

    editBtn.addEventListener('click', function() {
        if (editBtn.textContent === 'Změnit') {
            addPluses();

            novaBtn.style.display = 'inline-block';
            smazatBtn.style.display = 'inline-block';

            unlockTimetableButtons();
            editBtn.textContent = 'Uložit';
        } else {
            novaBtn.style.display = 'none';
            smazatBtn.style.display = 'none';

            lockTimetableButtons();
            editBtn.textContent = 'Změnit';

            ulozitRozvrh();
        }
    });

    const createForm = document.getElementById('createForm');
    if (createForm) {
        createForm.addEventListener('submit', function (e) {
            if (!createForm.nazev.value.trim()) {
                e.preventDefault();
                alert('Prosím vyplňte název verze');
                return false;
            }
        });
    }
});

const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const scrollbarWidthCssVar = "--pico-scrollbar-width";
const animationDuration = 400; // ms
let visibleModal = null;

// Toggle modal
const toggleDayModal = (cas, den, tyden, event) => {
    casHodiny = cas;
    denHodiny = den;
    druhTydne = tyden;

    const existingLesson = druhTydne === 'L'
    ? rozvrh.lichy[denHodiny][casHodiny]
    : rozvrh.sudy[denHodiny][casHodiny];

    if (existingLesson) {
    document.getElementById("trida").value = existingLesson.trida || "";
    document.getElementById("jakypredmet").value = existingLesson.predmet || "";
    document.getElementById("mistnost").value = existingLesson.mistnost || "T16";
    document.getElementById("skupina").value = existingLesson.skupina || "cela";
    } else {
    resetForm();
    }

    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.dataset.target);
    if (!modal) return;
    modal && (modal.open ? closeModal(modal) : openModal(modal));
};

const toggleModal = (event) => {
    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.dataset.target);
    if (!modal) return;
    modal && (modal.open ? closeModal(modal) : openModal(modal));
};

// Open modal
const openModal = (modal) => {
    const { documentElement: html } = document;
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth) {
        html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
    }
    html.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
    visibleModal = modal;
    html.classList.remove(openingClass);
    }, animationDuration);
    modal.showModal();
};

// Close modal
const closeModal = (modal) => {
    visibleModal = null;
    const { documentElement: html } = document;
    html.classList.add(closingClass);
    setTimeout(() => {
    html.classList.remove(closingClass, isOpenClass);
    html.style.removeProperty(scrollbarWidthCssVar);
    modal.close();
    }, animationDuration);
};

// Close with a click outside
document.addEventListener("click", (event) => {
    if (visibleModal === null) return;
        const modalContent = visibleModal.querySelector("article");
        const isClickInside = modalContent.contains(event.target);
    if (!isClickInside) {
        closeModal(visibleModal);
        event.stopPropagation();
    }
});

// Close with Esc key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && visibleModal) {
        closeModal(visibleModal);
    }
});

// Get scrollbar width
const getScrollbarWidth = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
};

// Is scrollbar visible
const isScrollbarVisible = () => {
    return document.body.scrollHeight > screen.height;
};