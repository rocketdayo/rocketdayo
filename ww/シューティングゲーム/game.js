document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // ゲームの状態
    let score = 0;
    let lives = 3;
    const upgrades = []; // アップグレード内容を表示するための配列
    const player = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 50,
        height: 50,
        speed: 10,
        rapidFire: false,
        doubleShot: false,
        fastReload: false,
        beam: false,
        lastShot: 0
    };
    const bullets = [];
    const enemies = [];
    const powerUps = [];
    const keys = {};

    // パワーアップの種類
    const powerUpTypes = [
        { type: "rapid", color: "purple", effect: () => { player.rapidFire = true; }, duration: 5000, message: "Rapid Fire!" },
        { type: "doubleShot", color: "orange", effect: () => { player.doubleShot = true; }, duration: 500, message: "Double Shot!" },
        { type: "fastReload", color: "cyan", effect: () => { player.fastReload = true; }, duration: 5000, message: "Fast Reload!" },
        { type: "beam", color: "red", effect: () => { player.beam = true; }, duration: 5000, message: "Beam!" }
    ];

    // 敵の種類
    const enemyTypes = [
        { color: "red", speed: 1, health: 1 }, // 通常の敵
        { color: "yellow", speed: 2, health: 1 }, // 速い敵
        { color: "blue", speed: 1, health: 3 } // タフな敵
    ];

    // キーイベントのリスナーを設定
    document.addEventListener("keydown", (e) => { keys[e.key] = true; });
    document.addEventListener("keyup", (e) => { keys[e.key] = false; });

    // プレイヤーを描画
    function drawPlayer() {
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // 弾を描画
    function drawBullets() {
        ctx.fillStyle = "yellow";
        bullets.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            bullet.y -= bullet.speed;
        });
    }

    // 敵を描画
    function drawEnemies() {
        enemies.forEach(enemy => {
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            enemy.y += enemy.speed;
        });
    }

    // パワーアップアイテムを描画
    function drawPowerUps() {
        powerUps.forEach(powerUp => {
            ctx.fillStyle = powerUp.color;
            ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
            powerUp.y += powerUp.speed;
        });
    }

    // アップグレードの内容を表示
    function drawUpgrades() {
        upgrades.forEach((upgrade, index) => {
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(upgrade, 20, 60 + index * 30);
        });
    }

    // スコアとライフを描画
    function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 20, 30);
        ctx.fillText(`Lives: ${lives}`, canvas.width - 100, 30);
    }

    // プレイヤーの移動
    function movePlayer() {
        if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
        if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;
    }

    // 弾の発射
    function shoot() {
        const now = Date.now();
        const fireRate = player.fastReload ? 100 : (player.rapidFire ? 200 : 500);

        if (now - player.lastShot >= fireRate) {
            if (player.beam) {
                bullets.push({ x: 0, y: player.y, width: canvas.width, height: 10, speed: 7 });
            } else {
                const bulletX = player.x + player.width / 2 - 5;
                bullets.push({ x: bulletX, y: player.y, width: 5, height: 10, speed: 7 });

                if (player.doubleShot) {
                    bullets.push({ x: bulletX - 10, y: player.y, width: 5, height: 10, speed: 7 });
                    bullets.push({ x: bulletX + 10, y: player.y, width: 5, height: 10, speed: 7 });
                }
            }

            player.lastShot = now;
        }
    }

    // 敵の生成
    function spawnEnemy() {
        if (Math.random() < 0.02) { // 敵の生成確率
            const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            enemies.push({
                x: Math.random() * (canvas.width - 30),
                y: -30,
                width: 30,
                height: 30,
                speed: enemyType.speed,
                color: enemyType.color,
                health: enemyType.health
            });
        }
    }

    // パワーアップアイテムの生成
    function spawnPowerUp(enemyX, enemyY) {
        if (Math.random() < 1) { // パワーアップの生成確率
            const powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
            powerUps.push({
                x: enemyX,
                y: enemyY,
                width: 20,
                height: 20,
                speed: 2,
                color: powerUpType.color,
                type: powerUpType.type,
                effect: powerUpType.effect,
                duration: powerUpType.duration,
                message: powerUpType.message
            });
        }
    }

    // 当たり判定
    function detectCollisions() {
        // 弾と敵の衝突
        bullets.forEach((bullet, bIndex) => {
            enemies.forEach((enemy, eIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    bullets.splice(bIndex, 1);
                    enemy.health--;
                    if (enemy.health <= 0) {
                        score++;
                        spawnPowerUp(enemy.x, enemy.y);
                        enemies.splice(eIndex, 1);
                    }
                }
            });
        });

        // 自機と敵の衝突
        enemies.forEach((enemy, eIndex) => {
            if (
                player.x < enemy.x + enemy.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y
            ) {
                lives--;
                enemies.splice(eIndex, 1);
                if (lives === 0) {
                    alert("ゲームオーバー");
                    document.location.reload();
                }
            }
        });

        // 自機とパワーアップアイテムの衝突
        powerUps.forEach((powerUp, pIndex) => {
            if (
                player.x < powerUp.x + powerUp.width &&
                player.x + player.width > powerUp.x &&
                player.y < powerUp.y + powerUp.height &&
                player.y + player.height > powerUp.y
            ) {
                powerUp.effect(); // パワーアップ効果の適用
                upgrades.push(powerUp.message); // アップグレードメッセージを追加
                setTimeout(() => {
                    if (powerUp.type === "rapid") {
                        player.rapidFire = false;
                    } else if (powerUp.type === "doubleShot") {
                        player.doubleShot = false;
                    } else if (powerUp.type === "fastReload") {
                        player.fastReload = false;
                    } else if (powerUp.type === "beam") {
                        player.beam = false;
                    }
                    upgrades.splice(upgrades.indexOf(powerUp.message), 1); // アップグレードメッセージを削除
                }, powerUp.duration);
                powerUps.splice(pIndex, 1);
            }
        });
    }

    // ゲームループ
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawBullets();
        drawEnemies();
        drawPowerUps();
        drawScore();
        drawUpgrades();
        movePlayer();
        shoot();
        spawnEnemy();
        detectCollisions();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
