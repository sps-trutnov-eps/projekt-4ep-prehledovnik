

let repeatTextAmount = 10
exports.getAmountOfWriteOut = () => {
	return repeatTextAmount;
}

let seenPage = 0;
exports.seenPage = () => {
	seenPage += 1;
	return seenPage;
}




exports.randomImg = () => {
	return getRandomIntInclusive(1, 12);
}

function getRandomDecimal(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}