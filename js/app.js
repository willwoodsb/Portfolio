//-----------------------------
// Initializing variblaes 
//-----------------------------

const $hamburger = $('.hamburger-container div');
const $popout = $('.popout-menu');
const $main = $('.main');
let popoutState = false;
let mousePos = [0, 0];
let hamShow = false;
$('.hamburger-container').css('display', 'inline');


// --------------------------------------------
//Event Listeners
//---------------------------------------------


//scroll event listener
window.addEventListener("scroll", function() {
    // Call the makeSticky function  
    makeSticky(document.querySelector('.hamburger-container')); 
});

//mouse position event listener 
window.addEventListener('mousemove', (e) => {
    mousePos[0] = window.event.clientX;
    mousePos[1] = window.event.clientY;
});

// menu popout click watcher 
$hamburger.on('click', (e) => {
    if (popoutState == false) {
        $hamburger.removeClass('hamburger');
        $popout.parent().removeClass('is-visible-large-screen').css('width', '100vw').css('transition', 'width ease .5s').css('background-color', 'white');
        $main.hide("slide", { direction: "right" }, 400);
        setTimeout(function () {
            $popout.removeClass('is-visible-large-screen').removeClass('body__item').css('width', '100vw');
            $hamburger.addClass('cross');
        }, 500);
        popoutState = true;
    } else {
        $hamburger.removeClass('cross');
        $popout.parent().addClass('is-visible-large-screen').css('background-color', '').css('width', '');
        $popout.addClass('is-visible-large-screen').css('transition-delay', '').css('width', '');
        $main.show(400);
        setTimeout(function () {
            $hamburger.addClass('hamburger');
        }, 500);
        popoutState = false;
    }

});


//---------------------------
//functions
//---------------------------

//make an element stick when scrolling
function makeSticky(element) {
    // Get the position of the element 
    const position = element.getBoundingClientRect();

    // Check if the element is in the viewport  
    const isInViewport = (position.top > -100 && $(element).css('position') !== 'fixed');
    console.log(!isInViewport && !hamShow );

    if (!isInViewport && !hamShow ) {  
        // The element is not in the viewport, so add the "sticky" class to make it sticky
        
        $(element).addClass("sticky"); 
        hamShow = true;
        let i = 0;
        //loop that loops for approx 2 seconds if not hovering on popup and infinitely if hovering and then when finished removes popup 
        function hoverLoop() {
            setTimeout(() => {
                if (isHovering(element) && i <= 2000) {
                    i = 0;
                    hoverLoop();
                } else if (!isHovering || i <= 2000) {
                    i += 100;
                    hoverLoop();
                } else {
                    element.classList.remove("sticky"); 
                    hamShow = false;
                }
            }, 100);
        }
        
        hoverLoop();

    } else if (isInViewport && hamShow ) {
        // The element is in the viewport, so remove the "sticky" class
        element.classList.remove("sticky"); 
        hamShow = false; 
        console.log(hamShow);
    } 
}
 
//test id the user is hovering over an element
function isHovering(element) {

    // Get the element's position  
    const position = element.getBoundingClientRect();

   // Get the mouse position 
    const mouseX = mousePos[0];  
    const mouseY = mousePos[1];
    // Check if the mouse position is within the element's position
    if (mouseX >= position.left && mouseX <= position.right && mouseY >= position.top && mouseY <= position.bottom) { 
        return true;
    } else { 
        return false;  

    }  

}




