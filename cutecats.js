var confirmDiv = document.getElementById("confirm");
function showConfirm() {
    confirmDiv.style.display = "block";
}
function closeConfirm() {
    confirmDiv.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gameOverScreen = document.getElementById('game-over');
    const restartBtn = document.getElementById('restart-btn');
    const timeDisplay = document.getElementById('time');
    const movesDisplay = document.getElementById('moves');
    const scoreDisplay = document.getElementById('score');
    const finalScoreDisplay = document.getElementById('final-score');

    let cards = [];
    let moves = 0;
    let timer;
    let time = 0;
    let matchedPairs = 0;
    let score = 0;

    const images = [
        'cimg1.jpg', 'cimg2.jpg', 'cimg3.jpg', 'cimg4.jpg',
        'cimg5.jpg', 'cimg6.jpg', 'cimg7.jpg', 'cimg8.jpg',
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        cards = [];
        const shuffledImages = shuffle([...images, ...images]);
        shuffledImages.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;
            card.innerHTML = `<img src="${image}" alt="card image">`;
            gameBoard.appendChild(card);
            cards.push(card);
        });
        cards.forEach(card => card.addEventListener('click', flipCard));
    }

    function flipCard() {
        if (this.classList.contains('flipped')) return;
        this.classList.add('flipped');
        const flippedCards = cards.filter(card => card.classList.contains('flipped') && !card.classList.contains('matched'));
        if (flippedCards.length === 2) {
            checkMatch(flippedCards);
        }
    }

    function checkMatch(flippedCards) {
        moves++;
        movesDisplay.textContent = moves;
        if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
            flippedCards.forEach(card => {
                card.classList.add('matched');
                card.removeEventListener('click', flipCard);
            });
            matchedPairs++;
            if (matchedPairs === images.length) {
                clearInterval(timer);
                score += 50; // Add 50 points for winning the game
                scoreDisplay.textContent = score;
                finalScoreDisplay.textContent = score;
                gameOverScreen.style.display = 'block';
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.remove('flipped'));
            }, 1000);
        }
    }

    var yesButton = document.getElementById("yes")

    yesButton.addEventListener("click", function () {
        resetGame();
        closeConfirm();
    })

    function startTimer() {
        timer = setInterval(() => {
            time++;
            timeDisplay.textContent = time;
            if (time >=90) { // 1.5 minute
                clearInterval(timer);
                showConfirm()
                // alert('Time up! Try again <3 ');
                // console.log(confirm('Time up! Try again <3 '));
                // resetGame();
            }
        }, 1000);
    }

    function resetGame() {
        clearInterval(timer);
        moves = 0;
        time = 0;
        matchedPairs = 0;
        timeDisplay.textContent = time;
        movesDisplay.textContent = moves;
        scoreDisplay.textContent = score;
        finalScoreDisplay.textContent = score;
        gameOverScreen.style.display = 'none';
        createBoard();
        startTimer();
    }
    restartBtn.addEventListener('click', resetGame);

    createBoard();
    startTimer();
});