var letter = function(word) {
	this.word = word;
};

letter.prototype.blanks = function() {
	var blanksArr = [];
	for (var i = 0; i < this.word.length; i++) {
		blanksArr.push("_ ");
	};
	return blanksArr;
};

letter.prototype.correctLetters = function(letterChosen, hidden, currentWord) {
	console.log("Correct!!!");
	for (var i = 0; i < currentWord.length; i++) {
		if (currentWord[i] === letterChosen) {
			hidden[i] = currentWord[i];
		};
	};
};

letter.prototype.lettersGuessed = function() {
	var lettersGuessed = [];
	return lettersGuessed;
};

module.exports = letter;