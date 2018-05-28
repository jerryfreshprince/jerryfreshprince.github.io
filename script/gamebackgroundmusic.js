/**
 * Created by jeroom on 15/03/2016.
 */
function setup() {
    window.addEventListener('keydown', muziekVeranderen);
}

function muziekVeranderen(event){
    switch (event.keyCode) {
        case 77:
            stopOfStartMuziek();
            break;
    }
    function stopOfStartMuziek(){
        if(audio.paused){
            audio.play();
        } else {
            audio.pause();
        }
    }
}

var audio;
var bgmSliderValue = localStorage.getItem("bgmSliderValue");

function initAudioPlayer(){
    audio = new Audio();
    audio.src = "gamebackgroundmusic.mp3";
    audio.loop = true;
    audio.volume = (bgmSliderValue/100).toFixed(2);
    audio.play();
}

function gameOverMusic(){
    audio = new Audio();
    audio.src = "gameOverSound.wav";
    audio.volume = 1.0;
    audio.play();
}

window.addEventListener("load", initAudioPlayer);
window.addEventListener("load", setup);



