var word = require("./words");
var letter = require("./letter");
var inquirer = require("inquirer");

console.log("Hello, and welcome to Constructor Hangman!\nHere is your first word!");

function newGame() {
	var guesses = 10;
	var currentWord = word[Math.floor(Math.random() * word.length)];
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
							if (currentWord.includes(letterChosen)) {
								console.log("Correct!!!");
								for (var i = 0; i < word.length; i++) {
									if (currentWord[i] === letterChosen) {
										hidden[i] = currentWord[i];
										lettersArr.push(letterChosen);
									};
								};
							} else {
								guesses--;
								lettersArr.push(letterChosen);
								console.log("Nope! Guess again!");
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