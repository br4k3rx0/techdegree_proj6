const keyBoard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
var missed = 0;

const button = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');

var phrases = [
    'piece of cake',
    'dime a dozen',
    'chip on your shoulder',
    'burst your bubble',
    'cup of joe'
];

function getRandomPhraseAsArray(arr) {
    var rond = Math.ceil(Math.random() * 5) - 1;
    var phrase = arr[rond];
    return phrase.split("");
}

function addPhraseToDisplay(arr) {
    var lu = document.querySelector("#phrase ul");
    lu.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
        var li = document.createElement('li');
        li.textContent = arr[i];
        if(arr[i] != " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
        lu.appendChild(li);
    }
}

function checkLetter(btn) {
    var letters = document.querySelectorAll('.letter');
    var letter;
    for(let i = 0; i < letters.length; i++) {
        if(letters[i].textContent == btn.textContent) {
            letters[i].className += " show";
            letter = btn.textContent;
        }
    }

    if(letter) {
        return letter;
    } else {
        return null;
    }
}

function checkWin() {
    var show = document.querySelectorAll(".show");
    var letters = document.querySelectorAll('.letter');
    if(show.length == letters.length) {
        overlay.style.display = '';
        overlay.className = "win";
        button.textContent = "Play Again";
        title.textContent = "You Win :)";
    }
    else if (missed >= 5) {
        overlay.style.display = '';
        overlay.className = "lose";
        button.textContent = "Try Again";
        title.textContent = "You Lose!";
    }
}

function reset() {
    var btns = keyBoard.getElementsByTagName('button');
    var scoreboard = document.getElementById('scoreboard');
    for(let i = 0; i < btns.length; i++) {
        btns[i].className = "";
        btns[i].disabled = false;
    }

    for(let i = (5 - missed); i < 5; i++) {
        document.querySelector('img[src="images/lostHeart.png"]').src = "images/liveHeart.png";
    }

    missed = 0;
}

button.addEventListener('click', (e) => {
    overlay.style.display = 'none';
    if(e.target.textContent == "Try Again" || e.target.textContent == "Play Again") {
        reset();
    }
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

keyBoard.addEventListener('click', (e) => {
    if(e.target.tagName == "BUTTON") {
        e.target.className = "chosen";
        e.target.setAttribute("disabled", true);
        var letterFound = checkLetter(e.target);
        if(letterFound == null) {
            missed++;
            document.querySelector('img[src="images/liveHeart.png"]').src = "images/lostHeart.png";
        }
        checkWin();
    }
});