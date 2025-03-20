let dayCounter = document
.getElementById("hodiny_tabulka")
.getElementsByTagName("tbody")[0].rows.length || 0;

document
.getElementById("pridat-datum")
.addEventListener("click", function () {
    dayCounter++;

    var tabulka = document
    .getElementById("hodiny_tabulka")
    .getElementsByTagName("tbody")[0];
    var novyRadek = document.createElement("tr");

    var bunkaDatum = document.createElement("td");
    var inputDatum = document.createElement("input");
    inputDatum.type = "date";
    inputDatum.name = "den" + dayCounter + "_datum";
    inputDatum.classList.add("zaskrtavaci_policko");
    inputDatum.readOnly = true;
    bunkaDatum.appendChild(inputDatum);
    novyRadek.appendChild(bunkaDatum);

    for (var i = 1; i <= 9; i++) {
    var bunkaCheckbox = document.createElement("td");
    var inputCheckbox = document.createElement("input");
    bunkaCheckbox.style.textAlign = "center";
    inputCheckbox.type = "checkbox";
    inputCheckbox.name = "den" + dayCounter + "_hodina" + i;
    inputCheckbox.classList.add("zaskrtavaci_policko");
    inputCheckbox.readOnly = true;
    bunkaCheckbox.appendChild(inputCheckbox);
    novyRadek.appendChild(bunkaCheckbox);
    }

    tabulka.appendChild(novyRadek);

    if (document.getElementById("edit-button").style.display === "none") {
    var newInputs = novyRadek.querySelectorAll("input");
    newInputs.forEach((input) => (input.readOnly = false));
    }
});

document
.getElementById("edit-button")
.addEventListener("click", function () {
    document
    .querySelectorAll("input")
    .forEach((input) => (input.readOnly = false));
    document.getElementById("pridat-datum").disabled = false;
    document.getElementById("edit-button").style.display = "none";
    document.getElementById("save-button").style.display = "block";
});

document
.getElementById("save-button")
.addEventListener("click", function () {
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.readOnly = true; // Nastaví checkbox na pouze pro čtení
    });
    document.getElementById("pridat-datum").disabled = false;
});