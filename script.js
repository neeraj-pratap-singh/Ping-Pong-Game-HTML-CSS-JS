const gameBoard = document.getElementById('gameBoard');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.createElement('div');

let ballSpeedX = 2;
let ballSpeedY = 2;
let score = 0;
let gameInterval;

// Score Display
scoreDisplay.style.color = 'white';
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '50%';
scoreDisplay.style.transform = 'translateX(-50%)';
scoreDisplay.innerHTML = `Score: ${score}`;
gameBoard.appendChild(scoreDisplay);

document.addEventListener('mousemove', (e) => {
    let gameBoardRect = gameBoard.getBoundingClientRect();
    let newLeft = e.clientX - gameBoardRect.left - paddle.offsetWidth / 2;
    newLeft = Math.max(newLeft, 0);
    newLeft = Math.min(newLeft, gameBoardRect.width - paddle.offsetWidth);
    paddle.style.left = newLeft + 'px';
});

function moveBall() {
    let newLeft = ball.offsetLeft + ballSpeedX;
    let newTop = ball.offsetTop + ballSpeedY;

    // Collision with walls
    if (newTop + ball.offsetHeight > gameBoard.offsetHeight) {
        stopGame();
        return;
    }
    if (newTop < 0) {
        ballSpeedY *= -1;
    }
    if (newLeft + ball.offsetWidth > gameBoard.offsetWidth || newLeft < 0) {
        ballSpeedX *= -1;
    }

    // Collision with paddle
    if (newTop + ball.offsetHeight >= paddle.offsetTop &&
        newLeft + ball.offsetWidth >= paddle.offsetLeft &&
        newLeft <= paddle.offsetLeft + paddle.offsetWidth) {
        ballSpeedY *= -1;
        score++;
        scoreDisplay.innerHTML = `Score: ${score}`;
    }

    ball.style.left = newLeft + 'px';
    ball.style.top = newTop + 'px';

    gameInterval = requestAnimationFrame(moveBall);
}

function stopGame() {
    cancelAnimationFrame(gameInterval);
    alert(`Game Over! Your score: ${score}`);
    resetGame();
}

function resetGame() {
    ball.style.top = '50%';
    ball.style.left = '50%';
    score = 0;
    scoreDisplay.innerHTML = `Score: ${score}`;
    gameInterval = requestAnimationFrame(moveBall);
}

// Start the game
gameInterval = requestAnimationFrame(moveBall);
