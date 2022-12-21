//-----------------------------
// Initializing variables 
//-----------------------------

const $hamburger = $('.hamburger-container div');
const $popout = $('.popout-menu');
const $main = $('.main');
let popoutState = false;
let mousePos = [0, 0];
let hamShow = false;
let scrollPos = 0;

//----------------------
//On page load
//----------------------

//hide non JS elements
$('.no-JS').hide();
// $('#index-nav').children().css('width', '0');
// $('#index-nav').css('width', '0').css('visibility', 'hidden');

$('#scroll-down p, #scroll-down span').hide();

//make hamburger visible 
$('.hamburger-container').css('display', 'inline');

//on load animations for main header section

$(document).ready(function() {
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
    });
    
    //header animations
    setTimeout(function() {
        $(function() {
            $('#name').selfw({
                text: 'My Name is Will Woods Ballard',
                time: 110,
            })
        });

        setTimeout(function() {
            $(function() {
                $('#web-dev').selfw({
                    text: 'I\'m a Web Developer',
                    time: 110,
                })
            })
        }, 3500);

        setTimeout(function() {
            $('#scroll-down p, #scroll-down span').fadeIn(100);
            // $('#index-nav').css('width', '').css('visibility', '');
            // $('#index-nav').children().css('width', '');
        }, 5500);
    }, 1500);
});





//---------------------------------------------
//Form Validation
//---------------------------------------------

const input = $('input:not([type=submit]), textarea');
const email = $('input[type = email]');

input.on('invalid', function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity(' ');
    $(`#${event.target.id} + .error`).show();
  }
});

function validateEmail(userInput) {
    let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(userInput.value)) {
        $(`#email + .error`).show();
        return false;
    } else {
        return true;
    };
}
    
input.on('change', function (event) {
    $(`#${event.target.id} + .error`).hide();
    valid = true;
});

function submitForm(userInput){
    if(validateEmail(userInput.email) && !!userInput.fname.value && !!userInput.lname.value && !!userInput.message.value) {
        alert('Your message has been submitted, thank you for getting in touch!');
        
    };
}





// --------------------------------------------
//Event Listeners
//---------------------------------------------

//scroll button animations
$('.scroll, .internal-links').on('click', function(event) {
    if ($(event.target).hasClass('internal-links')) {
        popoutState = true;
    } 
    let target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 700);
    }
});


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
$('.hamburger-container div, .internal-links').on('click', (event) => {

    //if the popout is not out, open it and add css properties and transitions to make look good 
    if (popoutState == false) {
        scrollPos = window.pageYOffset; //store scroll position
        $hamburger.removeClass('hamburger');
        $popout.parent().removeClass('is-visible-large-screen').css('width', '100vw').css('transition', 'width ease .5s').css('background-color', 'white');
        $main.hide("slide", { direction: "right" }, 500);
        //wait until transitions have finished to make cross appear
        setTimeout(function () {
            $popout.removeClass('is-visible-large-screen').removeClass('body__item').css('width', '100vw');
            $hamburger.addClass('cross');
        }, 500);
        popoutState = true;

    //otherwise close it and remove css properties and transitions
    } else {
        $hamburger.removeClass('cross');
        $popout.parent().addClass('is-visible-large-screen').css('background-color', '').css('width', '');
        $popout.addClass('is-visible-large-screen').css('transition-delay', '').css('width', '');
        $main.show("slide", { direction: "right" },10);

        //wait until transitions have finished to make hamburger reappear
        setTimeout(function () {
            $hamburger.addClass('hamburger');
        }, 500);
        popoutState = false;

        setTimeout(function() {
            //if the item that was clicked on was an internal link, scroll to section
            if ($(event.target).hasClass('internal-links')) {
                //make string containing the id at the end of the href
                let href = event.target.href;
                href = href.substring(href.indexOf('#') + 1);
                href = `#${href}`;
                //first gets close to position but not exact due to screen resizing
                $('html, body').stop().animate({
                    scrollTop: $(href).offset().top
                }, 500);
                //second gets to exact position
                setTimeout(function() {
                    $('html, body').stop().animate({
                        scrollTop: $(href).offset().top
                    }, 100);
                }, 500);
            }
            //otherwise scroll to the stored scroll position
            else {
                //first gets close to position but not exact due to screen resizing
                $('html, body').stop().animate({
                    scrollTop: scrollPos
                }, 0);
                //second gets to exact position
                setTimeout(function() {
                    $('html, body').stop().animate({
                        scrollTop: scrollPos
                    }, 100);
                }, 500);
            }
        }, 0);
        
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

    if (!isInViewport && !hamShow ) {  
        // The element is not in the viewport, so add the "sticky" class to make it sticky
        
        $(element).addClass("sticky").addClass("sticky-reveal"); 
        hamShow = true;
        let i = 0;
        //loop that loops for approx 2 seconds if not hovering on popup and infinitely if hovering and then when finished removes popup 
        function hoverLoop() {
            setTimeout(() => {
                if (isHovering(element) && i <= 2000) {
                    i = 0;
                    hoverLoop();
                } else if (!isHovering || i <= 2000) {
                    i += 250;
                    hoverLoop();
                } else {
                    element.classList.remove("sticky-reveal");
                    if (window.pageYOffset > 100) {
                        setTimeout(function() {
                            element.classList.remove("sticky"); 
                            hamShow = false;
                        }, 500);
                    } else {
                        element.classList.remove("sticky"); 
                        hamShow = false;
                    }
                }
            }, 250);
        }
        
        hoverLoop();

    } else if (isInViewport && hamShow ) {
        // The element is in the viewport, so remove the "sticky" class
        element.classList.remove("sticky"); 
        hamShow = false; 
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




