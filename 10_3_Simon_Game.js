let userSequence = [];
let gameSequence = [];

let started = false;
let level = 0;

let highestScore = 0;

let h2 = document.querySelector('h2');

let btns = ["yellow", "red", "green", "blue"];

document.addEventListener('keypress', function(event) {
    if (started == false) {
        console.log("Game has started!");
        started = true;

        levelUP();
    }
});

function gameFlash(btn) {
    btn.classList.add('gameFlash');
    setTimeout(function() {
        btn.classList.remove('gameFlash');
    }, 250);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(function() {
        btn.classList.remove('userFlash');
    }, 250);
}

function levelUP() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    if (level > highestScore) {
        highestScore = level;
    }

    let randomIndex = Math.floor(Math.random() * 3);
    let randomClr = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomClr}`);
    // console.log(`${randomIndex}, ${randomClr}`);
    // console.log(randomBtn);
    gameSequence.push(randomClr);
    console.log(gameSequence);
    gameFlash(randomBtn);
}

function checkAns(idx) {
    // console.log("Current level:", level);
    // let idx = level - 1;

    if (userSequence[idx] == gameSequence[idx]) {
        if (userSequence.length == gameSequence.length) {
            setTimeout(levelUP, 1000);
        }
    }
    else {
        h2.innerHTML = `Game over! <b><i>Your score was: ${level}.</b></i> <br> HIGHEST SCORE: ${highestScore}<br> Press any key to start again!`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = 'white'; 
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    // console.log(btn);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    checkAns(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

reset = () => {
    if (level > highestScore) {
        highestScore = level;
    }

    level = 0;
    userSequence = [];
    gameSequence = [];
    started = false;
}