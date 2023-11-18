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
    let newLeft = e.clientX - gameBoard.offsetLeft - paddle.offsetWidth / 2;
    newLeft = Math.max(newLeft, 0);
    newLeft = Math.min(newLeft, gameBoard.offsetWidth - paddle.offsetWidth);
    paddle.style.left = newLeft + 'px';
});

function moveBall() {
    let ballRect = ball.getBoundingClientRect();
    let paddleRect = paddle.getBoundingClientRect();
    let boardRect = gameBoard.getBoundingClientRect();

    // Update ball position
    let newLeft = ball.offsetLeft + ballSpeedX;
    let newTop = ball.offsetTop + ballSpeedY;

    // Collision with walls
    if (newTop + ball.offsetHeight >= boardRect.height) {
        stopGame();
        return;
    }
    if (newTop <= 0) {
        ballSpeedY *= -1;
        newTop = 0; // Reset position to stay within bounds
    }
    if (newLeft + ball.offsetWidth >= boardRect.width || newLeft <= 0) {
        ballSpeedX *= -1;
        newLeft = Math.max(Math.min(newLeft, boardRect.width - ball.offsetWidth), 0); // Adjust position
    }

    // Update ball style
    ball.style.left = newLeft + 'px';
    ball.style.top = newTop + 'px';

    // Collision with paddle
    if (ballRect.bottom >= paddleRect.top && ballRect.right >= paddleRect.left && ballRect.left <= paddleRect.right) {
        ballSpeedY *= -1;
        score++;
        scoreDisplay.innerHTML = `Score: ${score}`;
        increaseDifficulty();
    }

    gameInterval = requestAnimationFrame(moveBall);
}

function increaseDifficulty() {
    if (score % 5 === 0) {
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;
    }
}

function stopGame() {
    cancelAnimationFrame(gameInterval);
    alert(`Game Over! Your score: ${score}`);
    resetGame();
}

function resetGame() {
    ball.style.top = '50%';
    ball.style.left = '50%';
    ballSpeedX = 2;
    ballSpeedY = 2;
    score = 0;
    scoreDisplay.innerHTML = `Score: ${score}`;
    gameInterval = requestAnimationFrame(moveBall);
}

// Start the game
gameInterval = requestAnimationFrame(moveBall);
