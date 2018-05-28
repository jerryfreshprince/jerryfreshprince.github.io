/**
 * Created by jeroom on 3/03/2016.
 */
var attacks;
var eindscore = 0;
var aantalSeconden = 3000;
var score = 0;
var gamePaused = false;
var healthspawn = false;
var gameEnd = false;
var speedXY = 4;
var ufoIsOnderBottom = false;
var gameoverspeeleenkeer = false;

function setup(){
    docReady();
    attacks = setInterval(update, aantalSeconden);
    setInterval(healthSpawn, 8000);
    zoom();
}

$(window).blur(function() {
    if(!gameEnd) {
        pauseGame();
        alert("You should have read the popup, you're not allowed to switch tabs while playing! " +
            "The game is likely to resume after +- 1 or 2minutes after its been unpaused. " +
            "Press p to unpause or e if the game is not working anymore");
    }
});

$(window).focus(function() {
    if(!gameEnd) {
        stopOfStartMuziek();
    }
});

function docReady() {
    window.addEventListener('keydown', veranderPositie);
    document.body.style.cursor = 'none';
}

/*ZOOM ON BODY TO FIT GAME*/
function zoom() {
    document.body.style.zoom = "75%"
}

/*SPAWN HEALTHDIVS*/
function healthSpawn() {
    if(!gamePaused && !gameEnd) {
        var healthdiv = document.createElement("div");
        var randomWidth = parseInt(20 + (Math.random() * 20));
        var randomHeight = parseInt(20 + (Math.random() * 20));
        var randomX = parseInt(Math.random() * (2557 - randomWidth));
        var randomY = parseInt(Math.random() * (1303 - randomHeight));
        var kleurenLijst = ["yellow", "orange", "orchid", "lawngreen", "#36FF62", "fuchsia", "cyan"];
        var randomKleur = kleurenLijst[Math.floor(Math.random() * kleurenLijst.length)];


        healthdiv.style.position = "relative";
        healthdiv.style.top = randomY + "px";
        healthdiv.style.left = randomX + "px";
        healthdiv.style.width = randomWidth + "px";
        healthdiv.style.height = randomHeight + "px";
        healthdiv.style.backgroundColor = randomKleur;
        healthdiv.style.borderRadius = "5px 5px";
        healthdiv.id = "healthdiv";
        healthdiv.style.display = "block";

        document.getElementById("container").appendChild(healthdiv);
        healthspawn = true;
        setTimeout(hideHealth, 5000);
        function hideHealth() {
            if (healthdiv.parentNode) {
                healthdiv.parentNode.removeChild(healthdiv);
                healthspawn = false;
            }
        }
    }
}

/*COLLISION CHECK BETWEEN UFO AND HEALTHDIV*/
function checkCollisionUfoAndHealthdiv(ufo, healthdiv) {
        ufo = document.getElementById("ufo");
        healthdiv = document.getElementById("healthdiv");

        var ufoleft = parseInt(ufo.style.left);
        var ufotop = parseInt(ufo.style.top);
        var ufowidth = parseInt(ufo.width);
        var ufoheight = parseInt(ufo.height);

        var healthleft = parseInt(healthdiv.style.left);
        var healthtop = parseInt(healthdiv.style.top);
        var healthwidth = parseInt(healthdiv.style.width);
        var healthheight = parseInt(healthdiv.style.height);

        if ((ufotop >= (healthtop - ufoheight)) && (ufotop <= (healthtop + healthheight)) && (ufoleft >= (healthleft - ufowidth)) && (ufoleft <= (healthleft + healthwidth))) {
            if (healthdiv.parentNode) {
                healthdiv.parentNode.removeChild(healthdiv);
                healthspawn = false;
                var value = document.getElementById("health").value;
                 if (value <= 85 && value >= 0) {
                    document.getElementById("health").value += 15;
                 }
                 else if (value > 85 && value <= 100)
                 {
                    document.getElementById("health").value =  100;
                 }
            }
        }
}

/*LET DANNY MOVE WITH INTEVALSPACE*/
function maakInterval(functie) {
    var interval = setInterval(functie, 5);
    setTimeout(function() {
        clearInterval(interval)
    }, 200);
}

function naarLinks() {
    var ufo = document.getElementById("ufo");
    var positieLinks = parseInt(ufo.style.left) - speedXY;

    if(positieLinks < 4)
    {
        positieLinks = 4;
    }
    ufo.style.left = positieLinks + 'px';
    if(healthspawn) {
        var healthdiv = document.getElementsByClassName("healthdiv");
        checkCollisionUfoAndHealthdiv(ufo, healthdiv);
    }
    veranderPositieHealthBar();
}

function naarRechts() {
    var ufo = document.getElementById("ufo");
    var positieRechts = parseInt(ufo.style.left) + speedXY;


    if(positieRechts > 2400)
    {
        positieRechts = 2400;
    }
    ufo.style.left = positieRechts + 'px';
    if(healthspawn) {
        var healthdiv = document.getElementsByClassName("healthdiv");
        checkCollisionUfoAndHealthdiv(ufo, healthdiv);
    }
    veranderPositieHealthBar();
}

function omhoog() {
    var ufo = document.getElementById("ufo");
    var positieOmhoog = parseInt(ufo.style.top) - speedXY;

    if(positieOmhoog < 5)
    {
        positieOmhoog = 5;
    }
    ufo.style.top = positieOmhoog + 'px';
    if(healthspawn) {
        var healthdiv = document.getElementsByClassName("healthdiv");
        checkCollisionUfoAndHealthdiv(ufo, healthdiv);
    }
    veranderPositieHealthBar();
}

function omlaag() {
    var ufo = document.getElementById("ufo");
    var positieOmlaag = parseInt(ufo.style.top) + speedXY;

    if(positieOmlaag > (1298-ufo.height))
    {
        positieOmlaag = (1298-ufo.height);
    }
    ufo.style.top = positieOmlaag + 'px';
    var healthdiv = document.getElementsByClassName("healthdiv");
    if(healthspawn) {
        var healthdiv = document.getElementsByClassName("healthdiv");
        checkCollisionUfoAndHealthdiv(ufo, healthdiv);
    }
    veranderPositieHealthBar();
}

/*CHANGE POSITION DANNY*/
function veranderPositie(event) {
    if(!gameEnd) {
        switch (event.keyCode) {
            case 37: //left arrow
                if(!gamePaused && !gameEnd){ maakInterval(naarLinks);}
                break;
            case 65: //a
                if(!gamePaused && !gameEnd){maakInterval(naarLinks);}
                break;
            case 39: //right arrow
                if(!gamePaused && !gameEnd){maakInterval(naarRechts);}
                break;
            case 68: //d
                if(!gamePaused && !gameEnd){maakInterval(naarRechts);}
                break;
            case 38: //up arrow
                if(!gamePaused && !gameEnd){maakInterval(omhoog);}
                break;
            case 87: //w
                if(!gamePaused && !gameEnd){maakInterval(omhoog);}
                break;
            case 40: //down arrow
                if(!gamePaused && !gameEnd){maakInterval(omlaag);}
                break;
            case 83: //s
                if(!gamePaused && !gameEnd){maakInterval(omlaag);}
                break;
            case 80: //p
                pauseGame();
                break;
            case 69: //e
                goToMenu();
                break;
            case 27: //escape
                gameEnd = true;
                break;
        }
    }
}

/*GO TO MENU WHEN U CLICK ON MENU (ONLY IF U LOST)*/
function goToMenu() {
    window.location.href = "menupagina.html";
}

/*PAUSE THE GAME*/
function pauseGame(){

    var pauseGameImage = document.getElementById("pause_image");
    pauseGameImage.className = "animated bounceIn";

    if (!gamePaused) {
        gamePaused = true;
        stopOfStartMuziek();
        pauseGameImage.style.display = "block";
    } else if (gamePaused) {
        gamePaused = false;
        stopOfStartMuziek();
        pauseGameImage.style.display = "none";
    }
    function stopOfStartMuziek(){
        if(audio.paused){
            audio.play();
        } else {
            audio.pause();
        }
    }
}

/*FOLLOW DANNY(UFO)*/
function veranderPositieHealthBar() {
    var ufo = document.getElementById("ufo");
    var health = document.getElementById("health");
    health.style.top = parseInt(ufo.style.top) - 50 + "px";
    health.style.left = parseInt(ufo.style.left) -3 + "px";
}

/*SPAWN METEORITES*/
function update() {
    if(!gamePaused && !gameEnd) {
            var functionlist = ["vuurRechtsnaarLinks()", "vuurLinksNaarRechts()","vuurKogelsTopRight()", "vuurKogelsTopLeft()", "vuurKogelsBottomRight()","vuurKogelsBottomLeft()", "vuurBotRight()",
                                "vuurTopLeft()", "vuurVanBenedenNaarBoven()", "vuurVanBovenNaarBeneden()", "vuurTopRight()", "vuurBotLeft()",
                                 "vuurSchuinRechts()","vuurSchuinLinks()","vuurSchuinTop()","vuurSchuinBottom()", "vuurCrossedTopLeft/BottomRight()", "vuurCrossedBottomLeft/TopRight()"];
            var randomFunctie = functionlist[Math.floor(Math.random() * functionlist.length-1)];
            switch (randomFunctie) {
                case "vuurRechtsnaarLinks()":
                    vuurRechtsnaarLinks();
                    break;
                case "vuurLinksNaarRechts()":
                    vuurLinksNaarRechts();
                    break;
                case "vuurKogelsTopRight()":
                    vuurKogelsTopRight();
                    break;
                case "vuurKogelsTopLeft()":
                    vuurKogelsTopLeft();
                    break;
                case "vuurKogelsBottomRight()":
                    vuurKogelsBottomRight();
                    break;
                case "vuurnKogelsBottomLeft()":
                    vuurKogelsBottomLeft();
                    break;
                case "vuurTopLeft()":
                    vuurTopLeft();
                    break;
                case "vuurBotRight()":
                    vuurBotRight();
                    break;
                case "vuurVanBenedenNaarBoven()":
                    vuurVanBenedenNaarBoven();
                    break;
                case "vuurVanBovenNaarBeneden()":
                    vuurVanBovenNaarBeneden();
                    break;
                case "vuurTopRight()":
                    vuurTopRight();
                    break;
                case "vuurBotLeft()":
                    vuurBotLeft();
                    break;
                case "vuurSchuinRechts()":
                    vuurKogelsTopRight();
                    vuurKogelsBottomRight();
                    break;
                case "vuurSchuinLinks()":
                    vuurKogelsTopLeft();
                    vuurKogelsBottomLeft();
                    break;
                case "vuurSchuinTop()":
                    vuurKogelsTopRight();
                    vuurKogelsTopLeft();
                    break;
                case "vuurSchuinBottom()":
                    vuurKogelsBottomRight();
                    vuurKogelsBottomLeft();
                    break;
                case "vuurCrossedTopLeft/BottomRight()":
                    vuurKogelsBottomRight();
                    vuurKogelsBottomRight();

                    break;
                case "vuurCrossedBottomLeft/TopRight()":
                    vuurKogelsBottomLeft();
                    vuurKogelsTopRight();
                    break;
            }
    }
}

/*METEORITES SPAWN:RECHTS TARGET:LINKS*/
function vuurRechtsnaarLinks() {
    function tekenKogel() {
        var aantal = 5;
        for(var i = 0; i < aantal; i++)
        {
            REnaarLI(5);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:LEFT TARGET:RIGHT*/
function vuurLinksNaarRechts() {
    function tekenKogel() {
        var aantal = 5;
        for(var i = 0; i < aantal; i++)
        {
            LInaarRE(-5);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:TOP TARGET:RIGHT*/
function  vuurKogelsTopRight() {
    function tekenKogel() {
        var aantal = 5;
        for(var i = 0; i < aantal; i++)
        {
            vuurSchuinVanRechtsTop(6,-i*4+7);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:TOP TARGET:LEFT*/
function  vuurKogelsTopLeft() {
    function tekenKogel() {
        var aantal = 5;
        for(var i = 0; i < aantal; i++)
        {
            vuurSchuinVanLinksTop(6,-i*3+7);
        }
    }
    tekenKogel();
}

/*METEORITES VAN SPAWN:BOTTOM TARGET:RIGHT*/
function  vuurKogelsBottomRight() {
    function tekenKogel() {
        var aantal = 5;
        for(var i = 0; i < aantal; i++)
        {
            vuurSchuinVanRechtsBot(6,-i*3+7);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:BOTTOW TARGET:LEFT*/
function  vuurKogelsBottomLeft() {
    function tekenKogel() {
        var aantal = 5;
        for(var i = 0; i < aantal; i++)
        {
            vuurSchuinVanLinksBot(6,-i*3+7);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:TOP TARGET:LEFT*/
function vuurTopLeft() {
    function tekenKogel()
    {
        var aantal = 10;
        for(var i = 0; i < aantal; i++)
        {
            LInaarRE(-2);
            vuurBOnaarBe(-2);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:BOTTOM TARGET:RIGHT*/
function vuurBotRight() {
    function tekenKogel()
    {
        var aantal = 10;
        for(var i = 0; i < aantal; i++)
        {
            REnaarLI(2);
            vuurBEnaarBO(2);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:TOP TARGET:RIGHT*/
function vuurTopRight() {
    function tekenKogel()
    {
        var aantal = 10;
        for(var i = 0; i < aantal; i++)
        {
            REnaarLI(2);
            vuurBOnaarBe(-2);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:BOT TARGET:LEFT*/
function vuurBotLeft() {
    function tekenKogel()
    {
        var aantal = 10;
        for(var i = 0; i < aantal; i++)
        {
            LInaarRE(-2);
            vuurBEnaarBO(2);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:BOTTOM TARGET:TOP*/
function vuurVanBenedenNaarBoven() {
    function tekenKogel() {
        var aantal = 9;
        for(var i = 0; i < aantal; i++)
        {
            vuurBEnaarBO(3);
        }
    }
    tekenKogel();
}

/*METEORITES SPAWN:TOP TARGET:BOTTOM*/
function vuurVanBovenNaarBeneden() {
    function tekenKogel() {
        var aantal = 9;
        for(var i = 0; i < aantal; i++)
        {
            vuurBOnaarBe(-3);
        }
    }
    tekenKogel();
}

///////////////////////////////////////////////////////////////////
/*METEORITES SPAWN:TOPRIGHT TARGET:BOTTOMLEFT STYLE:DIAGONALLY*/
function vuurSchuinVanRechtsTop(x,y) {
    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute; top: 0px; left: 2557px; width:30px; height:30px; border-radius: 20px 20px; z-index:4; background-color:red; ';
    document.getElementById("container").appendChild(bullet);
    function schietBullet()
    {
        bullet.style.left = parseInt(bullet.style.left) - x + "px";
        bullet.style.top = parseInt(bullet.style.top) - y + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.left) < 0|| (parseInt(bullet.style.top) < 0 || parseInt(bullet.style.top) > 1303))
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }
    }

    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 2000);
    }
    schietBullet2();
}

/*METEORITES SPAWN:BOTTOMRIGHT TARGET:TOPLEFT STYLE:DIAGONALLY*/
function vuurSchuinVanRechtsBot(x,y) {
    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute; top: 1303px; left: 2557px; width:30px; height:30px; border-radius: 20px 20px; z-index:4; background-color:red; ';
    document.getElementById("container").appendChild(bullet);
    function schietBullet()
    {
        bullet.style.left = parseInt(bullet.style.left) - x + "px";
        bullet.style.top = parseInt(bullet.style.top) - y + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.left) < 0|| (parseInt(bullet.style.top) < 0 || parseInt(bullet.style.top) > 1303))
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }
    }

    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 2000);
    }
    schietBullet2();
}

/*METEORITES SPAWN:TOPLEFT TARGET:BOTTOMRIGHT STYLE:DIAGONALLY*/
function vuurSchuinVanLinksTop(x,y) {
    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute; top: 0px; left: 0px; width:30px; height:30px; border-radius: 20px 20px; z-index:4; background-color:red; ';
    document.getElementById("container").appendChild(bullet);
    function schietBullet()
    {
        bullet.style.left = parseInt(bullet.style.left) + x + "px";
        bullet.style.top = parseInt(bullet.style.top) + y + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.left) > 2557|| (parseInt(bullet.style.top) < 0 || parseInt(bullet.style.top) > 1303))
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }
    }

    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 2000);
    }
    schietBullet2();
}

/*METEORITES SPAWN:BOTTOMLEFT TARGET:TOPRIGHT STYLE:DIAGONALLY*/
function vuurSchuinVanLinksBot(x,y) {
    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute; top: 1303px; left: 0px; width:30px; height:30px; border-radius: 20px 20px; z-index:4; background-color:red; ';
    document.getElementById("container").appendChild(bullet);
    function schietBullet()
    {
        bullet.style.left = parseInt(bullet.style.left) + x + "px";
        bullet.style.top = parseInt(bullet.style.top) - y + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.left) > 2557|| (parseInt(bullet.style.top) < 0 || parseInt(bullet.style.top) > 1303))
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }
    }

    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 2000);
    }
    schietBullet2();
}

/*METEORITES SPAWN:RIGHT TARGET:LEFT STYLE:HORIZONTALLY*/
var variabele = 0;
function REnaarLI(x) {
    if ( variabele > 1200) variabele = 0;
    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute; width:30px; height:30px; background-color:red; border-radius: 20px 20px; z-index:4;';
    bullet.style.top =  parseInt(variabele) + "px";
    bullet.style.left =  2557 + "px";

    document.getElementById("container").appendChild(bullet);
    function schietBullet()
    {
        bullet.style.left = parseInt(bullet.style.left) - x + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.left) < 0 || parseInt(bullet.style.top) > 1303)
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }

    }

    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 10000);
    }
    schietBullet2();
    variabele += 300;
}

/*METEORITES SPAWN:LEFT TARGET:RIGHT STYLE:HORIZONTALLY*/
var variabele4 =0;
function LInaarRE(x) {
    if ( variabele4 > 1200) variabele4 = 0;
    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute;  width:30px; height:30px; border-radius: 20px 20px; z-index:4; background-color:red; ';
    bullet.style.top =  parseInt(variabele4) + "px";
    bullet.style.left =  0 + "px";
    bullet.className = "bullet";
    document.getElementById("container").appendChild(bullet);
    function schietBullet() {
        bullet.style.left = parseInt(bullet.style.left) - x + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.left) > 2557 || parseInt(bullet.style.top) > 1303)
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }
    }
    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 10000);
    }
    schietBullet2();
    variabele4 += 300;
}

/*METEORITES SPAWN:BOTTOM TARGET:TOP STYLE:VERTICALLY*/
var variabele2 = 50;
function vuurBEnaarBO(y) {
    if ( variabele2 > 2450) variabele2 = 50;
    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute;  width:30px; height:30px; border-radius: 20px 20px; z-index:4; background-color:red; ';
    bullet.style.top =  1280 + "px";
    bullet.style.left =  parseInt(variabele2) + "px";

    document.getElementById("container").appendChild(bullet);
    function schietBullet()
    {
        bullet.style.top = parseInt(bullet.style.top) - y + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.top) < 0)
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }
    }

    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 10000);
    }
    schietBullet2();
    variabele2 += 300;
}

/*METEORITES SPAWN:TOP TARGET:BOTTOM STYLE:VERTICALLY*/
var variabele3 = 50;
function vuurBOnaarBe(y) {
    if ( variabele3 > 2450) variabele3 = 50;

    var bullet = document.createElement("div");
    bullet.style.cssText = 'position:absolute;  width:30px; height:30px; border-radius: 20px 20px; z-index:4; background-color:red; ';
    bullet.style.top =  0 + "px";
    bullet.style.left =  parseInt(variabele3) + "px";
    document.getElementById("container").appendChild(bullet);
    function schietBullet() {
        bullet.style.top = parseInt(bullet.style.top) - y + "px";
        var ufo = document.getElementById("ufo");
        checkCollision(bullet, ufo);
        if(parseInt(bullet.style.top) > 1303)
        {
            if(bullet.parentNode)
            {
                bullet.parentNode.removeChild(bullet);
            }
        }
    }
    function schietBullet2(){
        var interval = setInterval(schietBullet, 1);
        setTimeout(function() {
            clearInterval(interval)
        }, 5000);
    }
    schietBullet2();
    variabele3 += 300;
}

/*CHECK COLLISION*/
function checkCollision(bullet, ufo) {
    // var bullets
    var bulletleft = parseInt(bullet.style.left);
    var bullettop = parseInt(bullet.style.top);
    var bulletwidth = parseInt(bullet.style.width);
    var bulletheight = parseInt(bullet.style.height);

    // var ufo
    var ufoleft = parseInt(ufo.style.left);
    var ufotop = parseInt(ufo.style.top);
    var ufowidth = parseInt(ufo.width);
    var ufoheight = parseInt(ufo.height);

    if((bullettop >= (ufotop-bulletheight)) && (bullettop <= (ufotop + ufoheight)) && (bulletleft >= (ufoleft-bulletwidth)) && (bulletleft <= (ufoleft + ufowidth)))
    {
        if(bullet.parentNode)
        {
            bullet.parentNode.removeChild(bullet);
            var value = document.getElementById("health").value;
            if(value <= 100 && value >= 10)
            {
                document.getElementById("health").value -=  15;
            }
            else if(value < 15)
            {
                document.getElementById("health").value = 0;
                if(gameEnd == false)
                {
                    gameEnd = true;
                    eindscore = document.getElementById("highScore").innerHTML;
                }
            }
        }
    }

}

/*SCORE UPDATEN*/
setInterval(scoreUpdate, 1000);

/*UPDATE THE SCORE*/
function scoreUpdate(){
    if(!gameEnd)
    {
        if(!gamePaused){
            score += 1;
            var highScore = document.getElementById("highScore");
            highScore.innerHTML = score;
            if(score % 50 == 0) {
                aantalSeconden -= 100;
                clearInterval(attacks);
                setInterval(update, aantalSeconden);
            }
        }
    }
    else
    {
        geefGameOverScherm();
    }
}

/*DO ALL THIS WHEN GAME IS OVER*/
function geefGameOverScherm() {
    document.body.style.cursor = 'auto';
    var highScore = document.getElementById("highScore");
    highScore.innerHTML = eindscore;
    var gameoverimage = document.getElementById("gameover_image");
    gameoverimage.style.display = "block";
    gameoverimage.className = "animated bounceIn";

    if(!gameoverspeeleenkeer) { //zorgt ervoor dat de gameoversound maar 1 keer afgespeeld word.
        gameOverMusic();
        gameoverspeeleenkeer = true;
    }

    var ufo = document.getElementById("ufo");
    var healthbar = document.getElementById("health");
    var interval = setInterval(laatVallen, 5);
    function laatVallen() {
        if(!ufoIsOnderBottom) {
            var ufotop = parseInt(ufo.style.top) + 5;
            if (ufotop > 1400) {
                ufoIsOnderBottom = true;
                ufo.style.top = ufotop + 'px';
                ufo.style.display = "none";
                healthbar.style.display = "none";
                clearInterval(interval);
            }
            ufo.style.top = ufotop + 'px';
            veranderPositieHealthBar();
        }
    }

    if(eindscore >= parseInt(localStorage["score4"])) {
        //POPUP MET SCORE + GOUD ZILVER BRONS WOOD
        var scoreWinner = document.getElementById("scoreWinner");
        scoreWinner.style.display = "block";

        var outputWinnerScore = document.getElementById("outputWinnerScore");
        outputWinnerScore.innerHTML = "" + score;
        outputWinnerScore.style.fontSize = "25px";
        outputWinnerScore.style.display = "block";

        var outputWinnerMedal = document.getElementById("outputWinnerMedal");
        outputWinnerMedal.style.fontSize = "25px";

        var score4 = parseInt(localStorage["score4"]); var score3 = parseInt(localStorage["score3"]); var score2 = parseInt(localStorage["score2"]); var score1 = parseInt(localStorage["score1"]);

        if(eindscore >= score1) {
            outputWinnerMedal.innerHTML ="PLATINUM";
            outputWinnerMedal.style.color = "#A1B6E5";
            showTrophy(1);
        } else if(eindscore >= score2) {
            outputWinnerMedal.innerHTML ="GOLD";
            outputWinnerMedal.style.color = "#F3CB67";
            showTrophy(2);
        } else if(eindscore >= score3) {
            outputWinnerMedal.innerHTML ="SILVER";
            outputWinnerMedal.style.color = "#CCCCCC";
            showTrophy(3);
        } else if(eindscore >= score4) {
            outputWinnerMedal.innerHTML ="BRONZE";
            outputWinnerMedal.style.color = "#FAB58B";
            showTrophy(4);
        }

        outputWinnerMedal.style.display = "block";

        //CONFETTI
        var confetti = document.getElementById("confetti");
        confetti.style.display = "block";
        confetti.style.zIndex = "4";

        var username = document.getElementById("usernameInput");
        username.style.display = "block";
        //username.className = "animated bounceIn";

        var submitButton = document.getElementById("submitButton");
        submitButton.style.display = "block";
        //username.className = "animated bounceIn";

        submitButton.addEventListener("click", sendUsername);
    } else {

        var goToMenuButton = document.getElementById("goToMenuButton");
        goToMenuButton.style.display = "block";
        goToMenuButton.className = "animated bounceIn";
        goToMenuButton.addEventListener("click", goToMenu);
        document.body.style.cursor = 'auto';

        //POPUP WITH SCORE.
        var scoreLoser = document.getElementById("scoreLoser");
        scoreLoser.style.display = "block";

        var outputLoserScore = document.getElementById("outputLoserScore");
        outputLoserScore.innerHTML = "" + score;
        outputLoserScore.style.fontSize = "25px";
        outputLoserScore.style.display = "block";
    }
}

/*DISPLAY THE PLAT,GOLD,SILVER OR BRONZE TROPHY*/
function showTrophy(number) {
    var image = document.getElementById("trophy");
    var source = "../images/trophies/DANNY" + number + ".png";
    image.src = source;
    image.style.display = "block";
}

/*CHECKIF THE INPUT HAS A VALUE*/
function hasValue(elem) {
    return $(elem).filter(function() { return $(this).val(); }).length > 0;
}

/*SEND USERNAME WHEN INPUT ISN'T EMPTY*/
function sendUsername() {
    var username = document.getElementById("usernameInput");
    if(hasValue(username)) {
        localStorage.setItem("usernameLS", username.value);
        localStorage.setItem("scoreLS", eindscore);
        goToHighScore();
    } else {
        alert("You need a username to submit, try again!")
    }
}

/*GO TO HIGHSCOREDIV AFTER WINNING*/
function goToHighScore() {
    localStorage.setItem("gottohighscore", true);
    window.location.href = "index.html";
}

window.addEventListener("load", setup);
































