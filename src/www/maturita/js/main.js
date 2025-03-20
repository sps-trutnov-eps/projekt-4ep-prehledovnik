function enableForm() {
    const form = document.getElementById("form");
    const inputs = form.querySelectorAll("input, select");

    inputs.forEach((input) => {
        input.disabled = false;
    });

    document.getElementById("editButton").style.display = "none";
    document.getElementById("submitButton").style.display = "inline-block";
}