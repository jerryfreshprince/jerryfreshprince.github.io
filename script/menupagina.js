/**
 * Created by Edward on 27/03/2016.
 */
var interval;

function setup () {
    document.getElementById("playButton").addEventListener("click", playGame);
    document.getElementById("helpButton").addEventListener("click", showHelp);
    document.getElementById("optionsButton").addEventListener("click", showOptions);
    document.getElementById("creditsButton").addEventListener("click", showCredits);
    document.getElementById("scoreButton").addEventListener("click", showScore);
    document.getElementById("howButton").addEventListener("click", showInstructions);
    document.getElementById("goBackToHow1").addEventListener("click", stopCodeVideo);
    document.getElementById("goBackToHow2").addEventListener("click", stopGameplayVideo);
    document.getElementById("xButton").addEventListener("click", removePopUpBox);
    document.getElementById("screenShotIcon").addEventListener("click", showOverlay);
    document.getElementById("overlay").addEventListener("click", hideOverlay);

    var sliders = document.getElementsByClassName("sliders");
    var i = 0;
    for (i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }
    update();
    /*zoom();*/
    //reset scoreboard
    //localStorage.removeItem("cookie");
    if(localStorage["gottohighscore"] != null) {
        if(localStorage["gottohighscore"] == "true") {
            showScore();
            localStorage["gottohighscore"] = false;
        }
    }
}

var sfxSliderValue;

function update() {
    sfxSliderValue = document.getElementById("sfxSlider").value;
    var bgmSliderValue = document.getElementById("bgmSlider").value;
    localStorage.setItem("bgmSliderValue", bgmSliderValue);
}
/*SCREEENSHOT GRAYOUT*/
function showOverlay() {
    $("#overlay").show();
    screenshotShower();
}

function hideOverlay() {
    $("#overlay").hide();
    clearInterval(interval);
}
// WITH HELP FROM BASTIEN
function screenshotShower() {
    var screens = [];
    for(var i = 2; i <= 10; i++){
        var img = new Image();
        img.src = "../images/screenshots/screen" + i + ".png";
        screens.push(img);
    }
    screenshotAnimation(screens);
}

function screenshotAnimation(screens){
    var i = 0;
    interval = setInterval(function() {
        if(i > screens.length - 1){
            i = 0;
        }
        $("#screenshotReplacer")
            .fadeOut(400, function () {
                $("#screenshotReplacer").attr('src', screens[i-1].src);
            })
            .fadeIn(300);

        i++;
    }, 4000);
}

/*MATCH WITH GAMESCREEN*/
/*function zoom() {
    document.body.style.zoom = "100%"
}*/

/*LOADING SCREEN*/
$(document).ready(function() {
    var loadingscreen = sessionStorage.getItem("loadingscreenLS");
    if(loadingscreen == null) {
        $(window).load(function() {
            $('#divLoadingScreen').delay(3000).fadeOut(500,function() {
                $(this).remove();
            });
        });
        sessionStorage.setItem("loadingscreenLS", "waarde");
    } else {
        $('#divLoadingScreen').remove();
    }
});

/*POP UP DANNY WITH INFORMATION*/
$(document).ready(function(){
    var popUpCookie = sessionStorage.getItem("popUpCookie");
    if(popUpCookie == null) {
        $("#fullPopUpBox").delay(2000).animate({'margin-top': '-=600px'}, 2000).fadeIn(5000);
        sessionStorage.setItem("popUpCookie", "waarde");
    }
});

function removePopUpBox(){
    $("#fullPopUpBox").remove();
}

/*CHANGE COLOR ON HOVER IMAGES*/
$(document).ready(function(){
    // alle imagenames zo genoemd om de src te kunnen veranderen
    // pink image : pinkPlayButton.png
    // grey image : greyPlayButton.png
    $(".menuButtons").add("#playButton").hover(function(){
            var newSrc = $(this).attr("src").replace('pink','grey');
            $(this).attr('src', newSrc)}, function(){
                var newSrc = $(this).attr("src").replace('grey','pink');
                $(this).attr('src', newSrc)});
    });

/*ONCLICKEVENTS*/
function playGame() {
    window.location.href ="game.html";
}

function gaNaarDiscussionPage() {
    window.location.href ="userCommentsPage.html";
}

function showOptions() {
    hideAllChildrenButOne('divs', 'options');
}

function showCredits() {
    hideAllChildrenButOne('divs', 'credits');
}

function showScore() {
    hideAllChildrenButOne('divs', 'highscore');
}

function showInstructions() {
    hideAllChildrenButOne('divs', 'how');
}

function showHelp() {
    hideAllChildrenButOne('divs', 'help');
}

function hideAllChildrenButOne(parent, child) {
    var children = document.getElementById(parent).children;
    for (var i=0; i<children.length; i++) children[i].style.display="none";
    document.getElementById(child).style.display="block";
}

function stopCodeVideo(){
    var iframe = document.getElementById('codeVideo');
    iframe.src = iframe.src;
}

function stopGameplayVideo(){
    var iframe = document.getElementById('uitlegVideo');
    iframe.src = iframe.src;
}

/*MOVE PUPIL ALIEN*/
jQuery(document).ready(function() {
    jQuery("#pinkgreyPupil").jqEye({shape:"circle", radius:12});
    jQuery("#gradientPupil").jqEye({shape:"circle", radius:8});
});

/*RESET SLIDERS*/
function resetData(){
    document.getElementById("sfxSlider").value = "50";
    document.getElementById("bgmSlider").value = "50";

    sfxSliderValue = 50;
    bgmSliderValue = 50;
}

/*PLAY SOUND ON HOVER*/
//gebruik ogg & mp3 files omdat deze bestanden ondersteund worden door meeste browsers
function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.volume = (sfxSliderValue/100).toFixed(2);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.volume = (sfxSliderValue/100).toFixed(2);
    thissound.pause();
    thissound.currentTime = 0;
}

window.addEventListener("load",setup);
