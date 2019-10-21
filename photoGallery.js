var galleryIndex = 0; // References which gallery has been selected   
var currentImage = 0; // References the photo index number of that particular gallery
var galleryLength = 0; // Holds the length of the gallery which the clicked photo is part of

// Get all galleries on the page
var gallery = document.getElementsByClassName("gallery");
// Loop through each gallery and add a click event listener to the gallery
for(var i = 0; i < gallery.length; i++) {
gallery[i].addEventListener('click', displayLargePhoto, false);

// Collect all child images of the currently selected gallery and add each image
// to an array attached to each gallery reference
var image = gallery[i].querySelectorAll("img");
for(var j = 0; j < image.length; j++) {
        gallery[i][j] = image[j].src;
        }
}
    
/* The photoDisplay Box is the contain that hold the full size displayed photo.
   This covers the full screen */
var photoDisplayBox = document.getElementById("display-box");
photoDisplayBox.addEventListener('click', hideLargePhoto, false);
        
// Ths largePhoto is the full size displayed photo centered on the screen
var largePhoto = document.getElementById('largePhoto');
        
function displayLargePhoto() {
var clickedElement = event.target;
notFound = true;    
            
        if(clickedElement.nodeName == "IMG") {
        /* Find the reference of the selected gallery and set the galleryLength variable
        to the legth of that gallery */
                for(var i = 0; i < gallery.length; i++) {
                        if(clickedElement.parentElement == gallery[i]) {
                                galleryIndex = i;
                                var image = gallery[i].querySelectorAll("img");
                                galleryLength = image.length - 1;
                                break;
                        }
                }

                /* Find the index of the clicked photo by comparing the source of the
                clicked photo to the array of images attached to each gallery reference */
                for(var j = 0; notFound == true; j++) {
                        if(clickedElement.src == gallery[galleryIndex][j]) {
                                currentImage = j;
                                notFound = false;
                        }
                }

                largePhoto.src = event.target.src;
                photoDisplayBox.style.display = "flex";
        }   
            
        // For reference only - log the gallery reference, image refence and gallery length in the console
        console.log("Gallery numb: " + galleryIndex);
        console.log("Image numb: " + currentImage);
        console.log("Gallery length: " + galleryLength);
}

/* The hideLargePhoto function will close the full screen photo displayed if the screen is clicked
anywhere other than the left or right scroll arrows or image itself */
function hideLargePhoto(e) {
        if(e.target.nodeName !== "SPAN" && e.target.nodeName !== "IMG") {
                photoDisplayBox.style.display = "none";
        }
}

/* The galleryScroll function will scroll through and display each image of the selected gallery when
the left or right scroll arrows are selected */
function galleryScroll(direction) {
        var nextImage = Number(currentImage) + Number(direction);
            
        if(gallery[galleryIndex][nextImage] !== undefined) {
                currentImage = Number(currentImage) + Number(direction); 
        }
        else if(direction == 1) {
                currentImage = 0;
        }
        else {
                currentImage = galleryLength;
       }
       largePhoto.src = gallery[galleryIndex][currentImage];
       }

/* Scroll left and right through the gallery on left/right arrow key press
and close gallery on esc key press */
document.onkeydown = function(event) {
        switch(event.keyCode) {
                case 37:
                        galleryScroll(-1);
                        break;
                case 39:
                        galleryScroll(1);
                        break;
                case 27:
                        photoDisplayBox.style.display = "none";
                        break;
            }
};
