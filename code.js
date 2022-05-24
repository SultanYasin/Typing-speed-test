// ordballong - mall

/* setup
------------------------ */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");

//___________________________________________________________________________________________________________________________

/* klasser för att skapa objekt
------------------------ */

class Ballon {
    constructor(word, color) {
        this.word = word;
        this.color = ballons.sapwnBallon;

        //balongen storlek ska anpassas till oredet storlek
        this.radius = this.word.length * 12;

        //ordballongen ska komma inflygd  i nederkanten
        this.x = getRandomBetween(100, canvas.width - 100);

        //ordballngen ska börja från nederkanten
        this.y = canvas.height + this.radius;

        //ordballongen hastighet
        this.vy = -1;
    }

    //röra ballongen
    move() {
        this.y += this.vy;
        this.draw();
        this.displayText();
        //vy = (-) -> ballngen stiger uppåt
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "yellow";
        ctx.fill();
    }

    //bragräns utrymmet för ett ord
    displayText() {
        ctx.font = "30px , sans-serif";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        ctx.fillText(this.word, this.x, this.y, this.radius * 2);
    }
}

//___________________________________________________________________________________________________________________________

/* initiera, globala variabler
------------------------ */

// unikt id för varje frame i animationen
let frameId;

var score = 0;
var color;

let ballons = [];

let chars = "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";

let text = "";

//___________________________________________________________________________________________________________________________

/* händelselyssnare
------------------------ */
startButton.addEventListener("click", function () {
    //document.getElementById("txt").innerHTML = `Skriv orden som finns i baalongerna. <p>Score ${score}</p>`

    ctx.font = "23px Arial";
    ctx.fillText(
        "Skriv ner så mkt ord du kan hinna innan ballongen försvinner ", 80, 280);

    // starta spel
    setTimeout(() => {
        nextFrame();
    }, 4000);

    // inaktivera knapp
    startButton.setAttribute("disabled", true);

    sapwnBallon();
});

stopButton.addEventListener("click", function () {
    // pausa spel
    cancelAnimationFrame(frameId);

    // aktivera åter startknappen
    startButton.removeAttribute("disabled");
});

//___________________________________________________________________________________________________________________________
/* funktioner
------------------------ */
// animering, game loop
function nextFrame() {
    frameId = requestAnimationFrame(nextFrame);

    // radera innehåll från föregående frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // anropa metoder och funktioner:
    renderBallons(); //game loop

    //balongerna ska vissas i visst intervall
    if (frameId % 240 === 0) {
        sapwnBallon();
    }

    renderText();

    checkArrayLength()
}

// slumpa ett tal mellan två värden
function getRandomBetween(min, max) {
    // returnera heltal
    return Math.floor(Math.random() * (max - min) + min);
}

// ord array i spelet
var words = ["grön", "glad", "vår"];
//  "sol", "sommar", "simma",
//     "leka", "läsa", "äta", "köra", "dricka", "röd", "svart",
//     "vit", "blå", "grå", "gul", "pink", "brun", "rosa"
// ];

//för att orden ska komma slumpmässigt ->
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//ord kommer slumpmässigt
shuffleArray(words);

function sapwnBallon() {
    if (words.length > 0) {
        //returnera sista ord i words arrayen
        let word = words.pop();

        //instansiera ett objekt från Ballon klassen
        let ballon = new Ballon(word);

        //addera ballongen till ballong arrayen
        ballons.push(ballon);
    }
}

function checkArrayLength() {
    if (words.length == 0) {

        setTimeout(() => {
            cancelAnimationFrame(frameId);
            console.log("checkArrayLength");
            ctx.font = "30px sans-serif";
            ctx.fillStyle = "black";
            ctx.textBaseline = "middle";
            ctx.fillText(`din resultat är ${score}`, canvas.width / 2, canvas.height / 2, canvas.width);
        }, 10000);

    }
}

//visa den text som skrivs med tangentbordet
function renderText() {
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width);
}

//looping baalonger rörelse
function renderBallons() {
    ballons.forEach((ballon) => {
        ballon.move();
    });
}
//--------------------------------------------------------------------------------------********
function checkBallonMatch(text) {
    ballons.forEach((ballon) => {
        if (ballon.word === text) {
            score++;
            ballon.word = "";
        }
    });
}

function getKeyDown(event) {
    //console.log(event);
    console.log(event.code);

    if (event.code === "Backspace") {
        // radera sista tecknet i variabeln text
        text = text.substring(0, text.length - 1);
        console.log(text);
    }

    if (chars.indexOf(event.key) >= 0) {
        //   console.log(text);
        text += event.key.toLowerCase();
    }

    if (event.code === "Enter") {
        //kontrollera att ballongen inehåller en txt
        checkBallonMatch(text);
        text = "";
    }
}

document.addEventListener("keydown", getKeyDown);

console.log(ballons);