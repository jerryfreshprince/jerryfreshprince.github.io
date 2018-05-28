/**
 * Created by Edward on 15/04/2016.
 */

function setup() {
    disqus();
    disqus_config();
}
var disqus_config = function () {
    this.page.url = "http://localhost:63342/GAME/html%20and%20sounds/userCommentsPage.html"; // page's canonical URL variable
    this.page.identifier = "disqussions"; // page's unique identifier variable
};

function disqus() {
    var d = document, s = d.createElement('script');

    s.src = '//whatdoyouthinkofourgame.disqus.com/embed.js';

    s.setAttribute('data-timestamp', + new Date());
    (d.head || d.body).appendChild(s);
}

function gaTerug() {
    window.location.href ="index.html"
}

window.addEventListener("load",setup);