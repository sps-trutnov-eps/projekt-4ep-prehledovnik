function writeIntoServerConsole(txt) {

	let anotherOne = document.getElementById('anotherOne').value;
	
	// Tohle vypíše do konzole prohlížeče
	//console.log('sending text to server console.');
	
	// To co je tu v závorkách je url adresa
	// je relativní takže stačí napsat např: '/kalendar/ulozit'
	// (pokračování v exampleRouter.js)
	fetch('/example/writeOutIntoConsole', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		  },
		// Toto je obsah toho co posíláme serveru
		// v tomto případě posíláme .json s obsahem...
		body: JSON.stringify({ "textToWriteOut": txt, "anotherOne": anotherOne})
	})
	.then(response => response.text())
	.then(data => {
		// Tohle vypíše do konzole prohlížeče odpověď ze serveru
		//console.log('Data from server: ' + data);
	})
	.catch(error => {
		// Pokud někde vznikne chyba tak se to vypíše do konzole
		console.error('Error:', error);
	});
}
