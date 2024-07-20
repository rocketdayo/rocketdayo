const humanCanvas = document.getElementById("humanCanvas");
const humanCtx = humanCanvas.getContext("2d");

const cpuCanvas = document.getElementById("cpuCanvas");
const cpuCtx = cpuCanvas.getContext("2d");

let ballRadius = 10;
let x, y, dx, dy;
let cpuX, cpuY, cpuDx, cpuDy;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX, cpuPaddleX;

let rightPressed = false;
let leftPressed = false;

let brickRowCount;
let brickColumnCount;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let humanBricks = [];
let cpuBricks = [];
let level;
let gameStarted = false;
let animationFrameId;

const brickPatterns = [
    () => { // Pattern 1: Full grid
        for (let c = 0; c < brickColumnCount; c++) {
            humanBricks[c] = [];
            cpuBricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                humanBricks[c][r] = { x: 0, y: 0, status: 1 };
                cpuBricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    },
    () => { // Pattern 2: Checkerboard
        for (let c = 0; c < brickColumnCount; c++) {
            humanBricks[c] = [];
            cpuBricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                humanBricks[c][r] = { x: 0, y: 0, status: (c + r) % 2 === 0 ? 1 : 0 };
                cpuBricks[c][r] = { x: 0, y: 0, status: (c + r) % 2 === 0 ? 1 : 0 };
            }
        }
    },
    () => { // Pattern 3: Alternating rows
        for (let c = 0; c < brickColumnCount; c++) {
            humanBricks[c] = [];
            cpuBricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                humanBricks[c][r] = { x: 0, y: 0, status: r % 2 === 0 ? 1 : 0 };
                cpuBricks[c][r] = { x: 0, y: 0, status: r % 2 === 0 ? 1 : 0 };
            }
        }
    }
];

let selectedPattern = 0;

function resizeCanvas() {
    humanCanvas.width = cpuCanvas.width = brickColumnCount * (brickWidth + brickPadding) + brickOffsetLeft;
    humanCanvas.height = cpuCanvas.height = (brickRowCount * (brickHeight + brickPadding)) + brickOffsetTop + 150 + (level * 10);
    x = humanCanvas.width / 2;
    y = humanCanvas.height - 30;
    dx = 2;
    dy = -2;
    cpuX = cpuCanvas.width / 2;
    cpuY = cpuCanvas.height - 30;
    cpuDx = 2;
    cpuDy = -2;
    paddleX = (humanCanvas.width - paddleWidth) / 2;
    cpuPaddleX = (cpuCanvas.width - paddleWidth) / 2;
}

function initBricks() {
    humanBricks = [];
    cpuBricks = [];
    brickPatterns[selectedPattern]();
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection(bricks, ballX, ballY, ballDy) {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                    ballDy = -ballDy;
                    b.status = 0;
                }
            }
        }
    }
    return ballDy;
}

function drawBall(ctx, ballX, ballY) {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(ctx, paddleX, canvasHeight) {
    ctx.beginPath();
    ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(ctx, bricks) {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function updateBallSpeed(paddleX, ballX, ballDy) {
    const centerPaddle = paddleX + paddleWidth / 2;
    const hitPoint = ballX - centerPaddle;
    const ratio = 2 * hitPoint / paddleWidth;
    return { dx: ratio * 5, dy: -ballDy };
}

function getRandomBallSpeed(ballDy) {
    const randomAngle = (Math.random() - 0.5) * Math.PI / 3; // -30度から30度の範囲でランダムな角度を生成
    const speed = Math.sqrt(cpuDx * cpuDx + ballDy * ballDy);
    return {
        dx: speed * Math.sin(randomAngle),
        dy: -speed * Math.cos(randomAngle)
    };
}

function updateLevelDisplay() {
    document.getElementById("level-display").innerText = `Level: ${level}`;
}

function draw() {
    humanCtx.clearRect(0, 0, humanCanvas.width, humanCanvas.height);
    cpuCtx.clearRect(0, 0, cpuCanvas.width, cpuCanvas.height);

    drawBricks(humanCtx, humanBricks);
    drawBricks(cpuCtx, cpuBricks);

    drawBall(humanCtx, x, y);
    drawBall(cpuCtx, cpuX, cpuY);

    drawPaddle(humanCtx, paddleX, humanCanvas.height);
    drawPaddle(cpuCtx, cpuPaddleX, cpuCanvas.height);

    dy = collisionDetection(humanBricks, x, y, dy);
    cpuDy = collisionDetection(cpuBricks, cpuX, cpuY, cpuDy);

    if (x + dx > humanCanvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (cpuX + cpuDx > cpuCanvas.width - ballRadius || cpuX + cpuDx < ballRadius) {
        cpuDx = -cpuDx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > humanCanvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            ({ dx, dy } = updateBallSpeed(paddleX, x, dy));
        } else {
            document.location.reload();
        }
    }

    if (cpuY + cpuDy < ballRadius) {
        cpuDy = -cpuDy;
    } else if (cpuY + cpuDy > cpuCanvas.height - ballRadius) {
        if (cpuX > cpuPaddleX && cpuX < cpuPaddleX + paddleWidth) {
            ({ dx: cpuDx, dy: cpuDy } = getRandomBallSpeed(cpuDy));
        } else {
            document.location.reload();
        }
    }

    if (rightPressed && paddleX < humanCanvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // CPU paddle movement
    const cpuCenter = cpuPaddleX + paddleWidth / 2;
    if (cpuCenter < cpuX) {
        cpuPaddleX += 5;
    } else if (cpuCenter > cpuX) {
        cpuPaddleX -= 5;
    }

    x += dx;
    y += dy;
    cpuX += cpuDx;
    cpuY += cpuDy;

    const humanCleared = humanBricks.every(column => column.every(brick => brick.status === 0));
    const cpuCleared = cpuBricks.every(column => column.every(brick => brick.status === 0));

    if (humanCleared && cpuCleared) {
        alert("It's a draw!");
        document.location.reload();
    } else if (humanCleared) {
        alert("You win!");
        document.location.reload();
    } else if (cpuCleared) {
        alert("CPU wins!");
        document.location.reload();
    }

    animationFrameId = requestAnimationFrame(draw);
}

function startGame() {
    if (gameStarted) {
        cancelAnimationFrame(animationFrameId);
    }

    level = parseInt(document.getElementById("start-level").value, 10);
    brickRowCount = 3 + level - 1;
    brickColumnCount = 5 + level - 1;
    initBricks();
    resizeCanvas();
    updateLevelDisplay();
    gameStarted = true;
    draw();
}

function changePattern() {
    selectedPattern = parseInt(document.getElementById("brick-pattern").value, 10);
    initBricks();
    resizeCanvas();
    drawBricks(humanCtx, humanBricks);
    drawBricks(cpuCtx, cpuBricks);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
