// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const player = document.getElementById('player');
    const playerSize = 50;
    const blockSpeed = 2;
    const blockInterval = 1000;
    const gameAreaWidth = gameArea.clientWidth;
    const gameAreaHeight = gameArea.clientHeight;
    let playerPosition = { x: gameAreaWidth / 2 - playerSize / 2, y: gameAreaHeight / 2 - playerSize / 2 };
    let isGameOver = false;

    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';

    function movePlayer(event) {
        const moveDistance = 10;
        switch (event.key) {
            case 'ArrowLeft':
                playerPosition.x -= moveDistance;
                break;
            case 'ArrowRight':
                playerPosition.x += moveDistance;
                break;
            case 'ArrowUp':
                playerPosition.y -= moveDistance;
                break;
            case 'ArrowDown':
                playerPosition.y += moveDistance;
                break;
        }

        if (playerPosition.x < 0) {
            playerPosition.x = 0;
        } else if (playerPosition.x + playerSize > gameAreaWidth) {
            playerPosition.x = gameAreaWidth - playerSize;
        }

        if (playerPosition.y < 0) {
            playerPosition.y = 0;
        } else if (playerPosition.y + playerSize > gameAreaHeight) {
            playerPosition.y = gameAreaHeight - playerSize;
        }

        player.style.left = playerPosition.x + 'px';
        player.style.top = playerPosition.y + 'px';
    }

    function createBlock() {
        const block = document.createElement('div');
        block.classList.add('block');

        // Randomly assign block type
        const blockType = Math.floor(Math.random() * 3);
        let blockSpeed, blockColor, blockSize;

        switch (blockType) {
            case 0: // Fast small block
                blockSpeed = 4;
                blockColor = 'red';
                blockSize = 30;
                break;
            case 1: // Slow large block
                blockSpeed = 1;
                blockColor = 'blue';
                blockSize = 70;
                break;
            case 2: // Normal block
                blockSpeed = 2;
                blockColor = 'green';
                blockSize = 50;
                break;
        }

        block.style.width = blockSize + 'px';
        block.style.height = blockSize + 'px';
        block.style.backgroundColor = blockColor;

        gameArea.appendChild(block);

        const direction = Math.floor(Math.random() * 4);
        let blockPosition = { x: 0, y: 0 };
        let moveX = 0, moveY = 0;

        switch (direction) {
            case 0: // From top
                blockPosition.x = Math.random() * (gameAreaWidth - blockSize);
                block.style.left = blockPosition.x + 'px';
                block.style.top = -blockSize + 'px';
                moveY = blockSpeed;
                break;
            case 1: // From right
                blockPosition.y = Math.random() * (gameAreaHeight - blockSize);
                block.style.top = blockPosition.y + 'px';
                block.style.left = gameAreaWidth + blockSize + 'px';
                moveX = -blockSpeed;
                break;
            case 2: // From bottom
                blockPosition.x = Math.random() * (gameAreaWidth - blockSize);
                block.style.left = blockPosition.x + 'px';
                block.style.top = gameAreaHeight + blockSize + 'px';
                moveY = -blockSpeed;
                break;
            case 3: // From left
                blockPosition.y = Math.random() * (gameAreaHeight - blockSize);
                block.style.top = blockPosition.y + 'px';
                block.style.left = -blockSize + 'px';
                moveX = blockSpeed;
                break;
        }

        const blockIntervalId = setInterval(() => {
            blockPosition.x += moveX;
            blockPosition.y += moveY;
            block.style.left = blockPosition.x + 'px';
            block.style.top = blockPosition.y + 'px';

            if (
                blockPosition.x < -blockSize ||
                blockPosition.x > gameAreaWidth + blockSize ||
                blockPosition.y < -blockSize ||
                blockPosition.y > gameAreaHeight + blockSize
            ) {
                clearInterval(blockIntervalId);
                gameArea.removeChild(block);
            } else if (checkCollision(player, block)) {
                clearInterval(blockIntervalId);
                gameArea.removeChild(block);
                gameOver();
            }
        }, 20);
    }

    function checkCollision(player, block) {
        const playerRect = player.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();

        return !(
            playerRect.top > blockRect.bottom ||
            playerRect.bottom < blockRect.top ||
            playerRect.right < blockRect.left ||
            playerRect.left > blockRect.right
        );
    }

    function gameOver() {
        isGameOver = true;
        alert('Game Over!');
        window.location.reload();
    }

    document.addEventListener('keydown', movePlayer);

    setInterval(() => {
        if (!isGameOver) {
            createBlock();
        }
    }, blockInterval);
});
