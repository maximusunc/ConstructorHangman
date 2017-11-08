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

letter.prototype.lettersGuessed = function() {
	var lettersGuessed = [];
	return lettersGuessed;
};

module.exports = letter;