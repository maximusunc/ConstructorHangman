var wordGenerator = require("./words");
var letter = require("./letter");
var inquirer = require("inquirer");

console.log("Hello, and welcome to Constructor Hangman!\nHere is your first word!");

function newGame() {
	var guesses = 10;
	var word = new wordGenerator();
	var currentWord = word.currentWord();
	console.log(currentWord);
	var newWord = new letter(currentWord);
	var hidden = newWord.blanks();
	var lettersArr = newWord.lettersGuessed();
	console.log(hidden.join(" "));
	function chooseLetter() {
		if (guesses > 0) {
			if (!hidden.includes("_ ")) {
				console.log("Congratulations! You won!");
				rePlay();
			} else {
				console.log("You have " + guesses + " guesses remaining.");
				inquirer.prompt(
				{
					type: "input",
					name: "choice",
					message: "Please choose a letter!"
				}).then(function(answer) {
					var letters = /^[a-zA-Z]+$/;
					if (answer.choice.length === 1 && answer.choice.match(letters)) {
						var letterChosen = answer.choice.toLowerCase();
						if (lettersArr.includes(letterChosen)) {
							console.log("You already guessed this letter...");
						} else {
							lettersArr.push(letterChosen);
							if (currentWord.includes(letterChosen)) {
								newWord.correctLetters(letterChosen, hidden, currentWord);
							} else {
								guesses--;
							};
						};
					} else {
						console.log("Sorry, that isn't a valid letter. Please try again.");
					};
					console.log(hidden.join(" "));
					chooseLetter();
				});
			};
		} else {
			console.log("You've run out of guesses!");
			rePlay();
		};
	};
	chooseLetter();

};

function rePlay() {
	inquirer.prompt(
	{
		type: "confirm",
		name: "confirm",
		message: "Play again?"
	}).then(function(answer) {
		if (answer.confirm) {
			newGame();
		} else {
			console.log("Bye!");
		};
	});
};

newGame();