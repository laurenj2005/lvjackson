document.addEventListener('DOMContentLoaded', function() {
    
    // Get the main title element (I added id="mainTitle" to the H1)
    const mainTitle = document.getElementById('mainTitle');
    
    // Get the footer paragraph
    const footerText = document.querySelector('footer p');

    // Make a change to the title
    if (mainTitle) {
        mainTitle.style.color = '#B8860B'; // DarkGoldenrod color
        mainTitle.textContent += " [Interactive]";
    }

    // Make a change to the footer
    if (footerText) {
        footerText.style.fontStyle = 'italic';
        console.log("JavaScript is active on the Home Styles page.");
    }
    // 1. Get the image element by its ID
    const image = document.getElementById('movingImage');
    
    // Check if the image exists
    if (!image) return;

    let position = 0;       // Starting position (in pixels)
    let direction = 1;      // 1 = move right, -1 = move left
    const maxMovement = 50; // Max pixels to move from the start
    const speed = 1;        // How many pixels to move per step
    const intervalTime = 20; // Time delay between steps (in milliseconds)

    function moveImage() {
        // Update the position based on the direction and speed
        position += direction * speed;

        // Apply the new position
        image.style.left = position + 'px';

        // Check if the image has reached the limit on either side
        if (position >= maxMovement) {
            // If at the right limit, switch direction to move left
            direction = -1;
        } else if (position <= 0) {
            // If at the left limit (original position), switch direction to move right
            direction = 1;
        }
    }

    // Start the movement loop: call moveImage function every 20 milliseconds
    setInterval(moveImage, intervalTime);
});