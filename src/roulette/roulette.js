let amountOfBoxes = 100; // roulette length  

function init() {

	let roulette = document.getElementById("fillUpRoulette");
	roulette.innerHTML = "";
	let tempBets = [

		["Half of the next meal", "olive"],
		["Nothing, good luck next time", "red"]

	];

	for (let i = 0; i < amountOfBoxes; i++) {
		let randomPlayer = rand(0, tempBets.length)
		let node = document.createElement("div");
		let h3 = document.createElement("h3");
		h3.innerHTML = tempBets[randomPlayer][0];
		h3.style.backgroundColor = tempBets[randomPlayer][1];
		node.appendChild(h3);
		roulette.appendChild(node);
	}

}

window.onload = init();


function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var colors = ['aqua', 'fuchsia', 'gray', 'green',
	'lime', 'maroon', 'olive', 'orange', 'purple', 'red',
	'silver', 'teal', 'white', 'yellow', '#e6194b', '#3cb44b', '#ffe119',
	'#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c','#aaffc3',
	'#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8',  '#808000', '#ffd8b1'
	 ];

let bets = [

	["Half of the next meal", "red"],
	["Nothing. Good luck at next time", "pink"]

];

let startButton = document.getElementById("startButton");
startButton.addEventListener('click', play);
function play() {
	//add sound if you want
	//var audio = new Audio('spin.mp3');
	//audio.play();


	let offset = rand(0, amountOfBoxes * 140 - 180) + 180;
	document.getElementById("fillUpRoulette").style.left = -(offset - 590) + "px"; //resoult position 590

	let chosenPlayer = document.createElement("div");
	chosenPlayer.style.backgroundColor = bets[order[parseInt(offset / 140)]][1];
	chosenPlayer.innerHTML = bets[order[parseInt(offset / 140)]][0];
	setTimeout(function () {
		document.getElementById("winners").appendChild(chosenPlayer);
		// document.getElementById("fillUpRoulette").style.transitionDuration = "0s"; //start position diratoin
		// document.getElementById("fillUpRoulette").style.left = "0px"; //start position
		setTimeout(function () {
			document.getElementById("fillUpRoulette").style.transitionDuration = "5s";
		}, 50)
	}, 5500)
}


function removeName(playerToRemove) {
	bets[playerToRemove] = 0;
	document.getElementById("n" + playerToRemove).remove();
	amountOfPlayers--;
	refreshRoulette();
}

let addButton = document.getElementById("addButton");
addButton.addEventListener('click', addName);
function addName() {
	let node = document.createElement("LI");
	let name = document.getElementById("inputName").value
	document.getElementById("inputName").value = ""
	if (name != "") {
		let textnode = document.createTextNode(name);
		let color = colors[rand(0, colors.length - 1)];
		node.style.backgroundColor = color;
		node.className = "playerName";
		node.id = "n" + bets.length;
		(function (value) {
			node.addEventListener("click", function () {
				removeName(value);
			}, false);
		})(bets.length);

		node.appendChild(textnode);
		document.getElementById("names").appendChild(node);
		bets.push([name, color]);

		amountOfPlayers++;
		refreshRoulette();
	}
}

let amountOfPlayers = 0;

function refreshRoulette() {
	let roulette = document.getElementById("fillUpRoulette");
	roulette.innerHTML = "";
	order = [];

	if (amountOfPlayers <= 0) {
		return 0;
	}

	for (let i = 0; i < amountOfBoxes; i++) {
		let randomPlayer = rand(0, bets.length);
		while (bets[randomPlayer] == 0) {
			randomPlayer = rand(0, bets.length);
		}
		order.push(randomPlayer);
		let node = document.createElement("div");
		let h3 = document.createElement("h3");
		h3.innerHTML = bets[randomPlayer][0];
		node.style.backgroundColor = bets[randomPlayer][1];
		node.appendChild(h3);
		roulette.appendChild(node);
	}
}

document.getElementById("inputName").addEventListener("keyup", function (event) {
	if (event.keyCode == 13) {
		document.getElementById("addButton").click();
	}
});

