let element = document.getElementById("myDiv");
let bounceInterval;
let angle = 0;
let scale = 1;
let scaleDirection = 1;
let clickCount = 0;

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);
    
    // Randomize particle size and color
    const size = Math.floor(Math.random() * 20 + 5);
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    
    // Position the particle at the click location
    particle.style.left = `${x - size / 2}px`;
    particle.style.top = `${y - size / 2}px`;
    
    // Animate the particle away from the click and fade out
    const xEnd = x + (Math.random() * 200 - 100);
    const yEnd = y + (Math.random() * 200 - 100);
    const scaleEnd = Math.random() * 2;
    particle.style.transform = `translate(${xEnd}px, ${yEnd}px) scale(${scaleEnd})`;
    particle.style.opacity = 0;
    
    // Remove the particle after animation
    particle.addEventListener('transitionend', () => {
        particle.remove();
    });
}

element.addEventListener('click', (e) => {
    clickCount++;
    
    // Change color and content randomly
    element.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    element.innerText = ['Clicked!', 'Boom!', 'Pop!', 'Bang!'][clickCount % 4];
    element.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    
    // Rotation and Scaling
    angle += 45;
    scale += scaleDirection * 0.1;
    if (scale >= 1.5 || scale <= 0.5) scaleDirection *= -1;
    element.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;
    
    // Move to random position
    const newX = Math.random() * window.innerWidth;
    const newY = Math.random() * window.innerHeight;
    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;
    
    // Bouncing effect with dynamic shadow
    clearInterval(bounceInterval);
    let bounceHeight = 0;
    let direction = 1;
    bounceInterval = setInterval(() => {
        if (bounceHeight > 20 || bounceHeight < 0) direction *= -1;
        bounceHeight += direction * 2;
        element.style.boxShadow = `0 ${bounceHeight / 2}px ${bounceHeight}px rgba(0, 0, 0, 0.5)`;
        element.style.top = `calc(50% - ${bounceHeight}px)`; // Bounce within new position
    }, 50);
    
    // Emit particles
    for (let i = 0; i < 10; i++) {
        createParticle(e.clientX, e.clientY);
    }
});

// ... existing variables and functions ...

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    document.body.appendChild(ripple);
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${element.offsetWidth}px`;
    ripple.style.height = `${element.offsetHeight}px`;
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

element.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - element.getBoundingClientRect().left;
    dragOffsetY = e.clientY - element.getBoundingClientRect().top;
    clearInterval(bounceInterval); // Stop bouncing when dragging starts
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newX = e.clientX - dragOffsetX;
        const newY = e.clientY - dragOffsetY;
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

element.addEventListener('click', (e) => {
    // ... existing click event logic ...

    // Play sound effect
    document.getElementById('popSound').play();
    
    // Create ripple
    createRipple(e.clientX, e.clientY);
});

// Modify the createParticle function to include gravity
function createParticle(x, y) {
    // ... existing particle creation logic ...

    // Add gravity effect
    let gravity = 0;
    const gravityInterval = setInterval(() => {
        gravity += 0.5; // Accelerate due to gravity
        const currentTop = parseFloat(particle.style.top);
        particle.style.top = `${currentTop + gravity}px`;
        
        // Stop the interval when the particle is no longer visible
        if (currentTop > window.innerHeight) {
            clearInterval(gravityInterval);
            particle.remove();
        }
    }, 50);
}

// ... existing code ...

// ... existing variables and functions ...

element.addEventListener('click', (e) => {
    // ... existing click event logic ...

    // Speed up the background animation
    document.body.style.animationDuration = '1s';
    
    // Reset the animation speed after a short duration
    setTimeout(() => {
        document.body.style.animationDuration = '10s';
    }, 1000);
    
    // ... existing click event logic ...
});

// ... existing code ...
