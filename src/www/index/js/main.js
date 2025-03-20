let command = "";
const secret = "mnau";
const docElement = document.getElementById("doc");
let catImage = null; 

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === "r" && catImage) {
        changeCatImage();
        return;
    }

    command += key;
    if (!secret.startsWith(command)) {
        command = ""; 
    }
    if (command === secret) {
        console.log("🐱 Mňau! Přehledovník je teď jen o kočkách!");

        docElement.innerHTML = `
        <div style="display: flex; justify-content: center;
                    align-items: center; flex-direction: column;">
            <img id="randomCat"
                src="https://cataas.com/cat?timestamp=${new Date().getTime()}" 
                style="max-width: 100%; max-height: 100%;" alt="Mňau!">
            <p style="color: black; font-size: 18px;">
                Stiskni <strong>R</strong> pro jiný obrázek!
            </p>
        </div>
        `;

        catImage = document.getElementById("randomCat");

        command = ""; 
    }
});

function changeCatImage() {
    if (catImage) {
        catImage.src = `https://cataas.com/cat?timestamp=${new Date().getTime()}`;
        console.log("🔄 Nová kočka načtena!");
    }
}