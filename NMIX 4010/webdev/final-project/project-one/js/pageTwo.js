// Wait for the HTML document to be fully loaded before trying to modify it
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Get a reference to the <h1> element
    const mainTitle = document.querySelector('.intTitle h1');

    // 2. Check if the element was found
    if (mainTitle) {
        // 3. Add an interactive element to the title
        mainTitle.textContent += " :)"; 
        
        // Optional: Change the color of the footer for visual confirmation
        const footerText = document.querySelector('footer p');
        if (footerText) {
            footerText.style.color = '#ffffff';
            footerText.style.fontWeight = 'bold';
        }

        console.log("JavaScript is active and running!");
    }

    // Get the first column element
    const firstColumn = document.querySelector('col.col-interactive'); 
    if (firstColumn) {
        // Set a CSS transition property via JS for smooth movement
        firstColumn.style.transition = 'transform 4s ease-out'; 

        // Apply the movement after a slight delay
        setTimeout(() => {
            // Move the column 30 pixels to the right
            firstColumn.style.transform = 'translateX(30px)';
        }, 300); // 300ms delay
    }
const backToTopBtn = document.getElementById('backToTopBtn');
    
    // --- SHOW/HIDE BUTTON LOGIC ---
    window.onscroll = function() {
        // Show the button if the user has scrolled more than 500 pixels down
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };
    
    // --- SCROLL TO TOP LOGIC ---
    backToTopBtn.addEventListener('click', function() {
        // Use smooth scrolling behavior (modern browsers only)
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
        
        // Fallback for older browsers (optional)
        // document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // 1. Get the navigation element by its ID
    const navElement = document.getElementById('floatingNav');
    
    if (!navElement) return; // Exit if element is not found

    let position = 0;       // Starting vertical position (in pixels)
    let direction = 1;      // 1 = move down, -1 = move up
    const maxMovement = 10; // Max pixels to move from the start
    const speed = 1;        // How many pixels to move per step
    const intervalTime = 30; // Time delay between steps (in milliseconds)

    function moveNav() {
        // Update the position based on the direction and speed
        position += direction * speed;

        // Apply the new vertical position
        navElement.style.top = position + 'px';

        // Check if the nav has reached the limit on either side
        if (position >= maxMovement) {
            // If at the bottom limit, switch direction to move up
            direction = -1;
        } else if (position <= 0) {
            // If at the top limit (original position), switch direction to move down
            direction = 1;
        }
    }

    // Start the movement loop: call moveNav function every 30 milliseconds
    setInterval(moveNav, intervalTime);
});