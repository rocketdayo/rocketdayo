const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = size;
    canvas.height = size;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    color: 'blue',
    dx: 0,
    dy: 0,
    speed: 5
};

let enemies = [];

function createEnemy() {
    const type = Math.random();
    let size, x, y, dx, dy, color, speed, isHoming, lifetime;

    if (type < 0.25) {
        // Large, slow enemy
        size = 40;
        speed = 1;
        color = 'green';
    } else if (type < 0.5) {
        // Normal enemy
        size = 20;
        speed = 2;
        color = 'red';
    } else if (type < 0.75) {
        // Small, fast enemy
        size = 10;
        speed = 3;
        color = 'orange';
    } else {
        // Homing enemy
        size = 15;
        speed = 2;
        color = 'purple';
        isHoming = true;
        lifetime = 5000; // 5 seconds
    }

    x = Math.random() * (canvas.width - size * 2) + size;
    y = 0 - size;
    dx = (Math.random() - 0.5) * speed;
    dy = speed;

    enemies.push({ x, y, size, dx, dy, color, isHoming, speed, lifetime, created: Date.now() });
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fillStyle = enemy.color;
        ctx.fill();
        ctx.closePath();
    });
}

function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // 壁の衝突判定
    if (player.x - player.size < 0) player.x = player.size;
    if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
    if (player.y - player.size < 0) player.y = player.size;
    if (player.y + player.size > canvas.height) player.y = canvas.height - player.size;
}

function updateEnemies() {
    const now = Date.now();
    enemies.forEach((enemy, index) => {
        if (enemy.isHoming) {
            const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
            enemy.dx = Math.cos(angle) * enemy.speed;
            enemy.dy = Math.sin(angle) * enemy.speed;
        }
        enemy.x += enemy.dx;
        enemy.y += enemy.dy;

        if (enemy.y - enemy.size > canvas.height || (enemy.isHoming && now - enemy.created > enemy.lifetime)) {
            enemies.splice(index, 1);
        }

        // 衝突判定
        const distX = player.x - enemy.x;
        const distY = player.y - enemy.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < player.size + enemy.size) {
            alert("ゲームオーバー！");
            document.location.reload();
        }
    });
}

function movePlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
            player.dy = -player.speed;
            break;
        case 'ArrowDown':
            player.dy = player.speed;
            break;
        case 'ArrowLeft':
            player.dx = -player.speed;
            break;
        case 'ArrowRight':
            player.dx = player.speed;
            break;
    }
}

function stopPlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            player.dy = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            player.dx = 0;
            break;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    updatePlayer();
    updateEnemies();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);

setInterval(createEnemy, 1000);

update();
