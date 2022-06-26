// When the user scrolls down 1000px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    const mybutton = document.getElementById("toTop");
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}