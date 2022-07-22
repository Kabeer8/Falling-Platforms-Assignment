let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.height = 620;
cnv.width = 450;
let stop = false
let player = (rectangles(225, 500, 10, 10, 0.3, "red"))
let obstacles = [];

for(let i = 0; i < 15; i++){

    obstacles.push(rectangles(Math.floor((Math.random() * 400) + 0),
    Math.floor((Math.random() * 400) + 0),
    Math.floor((Math.random() * 150) + 50),
    15,
    Math.floor((Math.random() * 3) + 1),
    "white"));
}

(requestAnimationFrame)(draw);
function draw(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for(let i = 0; i < 15; i++){
        drawRect(obstacles[i]);
        animate(obstacles[i])
        if(obstacles[i].y >= 620){
            obstacles[i].x = Math.floor((Math.random() * 400) + 0);
            obstacles[i].y = 0;
        }
        for(let l = 0; l < obstacles[i].w; l++){
            if(dist(player.x, player.y, (obstacles[i].x) + l, obstacles[i].y) <= 5){
                stop = true;
            }
        }
        if(stop == true){
            player.s = obstacles[i].s +3;
            animate(player);
            stop = false;
        }
    }
    if(stop == false){
        player.y -= 2;
    }
    if(player. y >= 620){
        alert("You lost, refresh to try again")
    }
    if(player. y <= 0){
        alert("You won! refresh to play again")
    }
    if(player. x <= 0){
        player.x = 0
    }
    if(player. x >= 440){
        player.x = 440
    }
    drawRect(player);
    requestAnimationFrame(draw);
}

function drawRect(rect){
    x = rect.x;
    y = rect.y;
    w = rect.w;
    h = rect.h;
    ctx.fillStyle = rect.c
    ctx.fillRect(x, y, w, h);
}

function rectangles(initX, initY, initW, initH, initS, initC){
    return{
        x: initX,
        y: initY,
        w: initW,
        h: initH,
        s: initS,
        c: initC
    }
}

function animate(rect){
    rect.y += rect.s
}

document.addEventListener("keydown", keydownHandler)

function keydownHandler(event){

    if(event.keyCode === 37){
    player.x -= 30;
    }
    if(event.keyCode === 39){
    player.x += 30;
    }
}

function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
