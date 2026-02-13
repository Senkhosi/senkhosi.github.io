const symbols = ["💻","⚙️","🧠","🔒","🌐","🗄️","📡","🧮"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let time = 0;
let timer;

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function startGame(){
    const board = document.getElementById("gameBoard");
    const result = document.getElementById("result");

    clearInterval(timer);
    time = 0;
    moves = 0;
    document.getElementById("time").textContent = time;
    document.getElementById("moves").textContent = moves;
    result.textContent = "";

    timer = setInterval(() => {
        time++;
        document.getElementById("time").textContent = time;
    },1000);

    board.innerHTML = "";

    cards = shuffle([...symbols, ...symbols]);

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;

        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });

    firstCard = null;
    secondCard = null;
}

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("flip");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    document.getElementById("moves").textContent = moves;

    lockBoard = true;
    checkMatch();
}

function checkMatch(){
    if(firstCard.dataset.symbol === secondCard.dataset.symbol){
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        checkWin();
        resetTurn();
    } else {
        setTimeout(()=>{
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetTurn();
        },900);
    }
}

function resetTurn(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin(){
    const flipped = document.querySelectorAll(".flip").length;
    if(flipped === cards.length){
        clearInterval(timer);

        let rating;
        if(moves <= 18) rating = "Excellent! 🔥";
        else if(moves <= 26) rating = "Good Job 👍";
        else rating = "Completed ✔";

        document.getElementById("result").textContent =
        `You finished in ${time}s with ${moves} moves. ${rating}`;
    }
}

window.onload = startGame;
