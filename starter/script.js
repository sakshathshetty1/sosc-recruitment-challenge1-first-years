// 🔥 FIRE MOUSE TRAIL EFFECT - Enhanced Version
// Creates realistic fire particles that follow your cursor

// ==================== BACKGROUND ANIMATIONS ====================

// Create floating geometric shapes
function createGeometricShapes() {
  for (let i = 0; i < 3; i++) {
    const shape = document.createElement('div');
    shape.className = 'geometric';
    document.body.appendChild(shape);
  }
}

// Create digital rain effect
function createDigitalRain() {
  setInterval(() => {
    const rain = document.createElement('div');
    rain.className = 'digital-rain';
    rain.style.left = Math.random() * 100 + '%';
    rain.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(rain);
    
    setTimeout(() => rain.remove(), 3000);
  }, 300);
}

// Create AI particles
function createAIParticles() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'ai-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    document.body.appendChild(particle);
  }
}

// ==================== FIRE MOUSE TRAIL EFFECT ====================

let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMouseMoving = true;
  
  // Create fire particles continuously while moving
  createFireParticle(mouseX, mouseY);
  
  // Parallax effect on name
  const nameElement = document.querySelector('h1');
  const moveX = (e.clientX - window.innerWidth / 2) / 50;
  const moveY = (e.clientY - window.innerHeight / 2) / 50;
  nameElement.style.transform = translate(${moveX}px, ${moveY}px);
});

// Stop fire when mouse stops
document.addEventListener('mousemove', () => {
  clearTimeout(window.mouseStopTimer);
  window.mouseStopTimer = setTimeout(() => {
    isMouseMoving = false;
  }, 100);
});

// Create individual fire particle
function createFireParticle(x, y) {
  const particle = document.createElement('div');
  
  // Random fire colors (red, orange, yellow)
  const colors = [
    '#ff0000',  // Pure red
    '#ff3300',  // Red-orange
    '#ff6600',  // Orange
    '#ff9900',  // Light orange
    '#ffcc00',  // Yellow-orange
    '#ff4500',  // Orange red
    '#dc143c'   // Crimson
  ];
  
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 20 + 10; // Random size between 10-30px
  
  particle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, ${color} 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    filter: blur(${Math.random() * 3}px);
    box-shadow: 0 0 ${size}px ${color};
  `;
  
  document.body.appendChild(particle);
  
  // Animate the fire particle
  animateFireParticle(particle);
}

function animateFireParticle(particle) {
  let opacity = 1;
  let scale = 1;
  let yOffset = 0;
  let xOffset = (Math.random() - 0.5) * 40; // Random horizontal drift
  
  const animate = () => {
    // Fire rises upward and fades
    yOffset -= 2; // Rise speed
    opacity -= 0.02; // Fade speed
    scale -= 0.01; // Shrink speed
    
    particle.style.transform = translate(${xOffset}px, ${yOffset}px) scale(${scale});
    particle.style.opacity = opacity;
    
    if (opacity > 0 && scale > 0) {
      requestAnimationFrame(animate);
    } else {
      particle.remove();
    }
  };
  
  requestAnimationFrame(animate);
}

// ==================== ENHANCED FIRE TRAIL WITH EMBERS ====================

// Create bigger fire bursts occasionally
let emberCounter = 0;

document.addEventListener('mousemove', (e) => {
  emberCounter++;
  
  // Every 3rd mouse move, create a larger ember
  if (emberCounter % 3 === 0) {
    createEmber(e.clientX, e.clientY);
  }
});

function createEmber(x, y) {
  const ember = document.createElement('div');
  const size = Math.random() * 15 + 15; // Larger particles
  
  ember.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, #ffff00 0%, #ff6600 50%, transparent 100%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    box-shadow: 0 0 ${size * 2}px #ff6600;
  `;
  
  document.body.appendChild(ember);
  animateEmber(ember);
}

function animateEmber(ember) {
  let opacity = 1;
  let yOffset = 0;
  let rotation = 0;
  const xDrift = (Math.random() - 0.5) * 60;
  
  const animate = () => {
    yOffset -= 3; // Rise faster
    opacity -= 0.015;
    rotation += 5;
    
    ember.style.transform = translate(${xDrift}px, ${yOffset}px) rotate(${rotation}deg);
    ember.style.opacity = opacity;
    
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      ember.remove();
    }
  };
  
  requestAnimationFrame(animate);
}

// ==================== INTERACTIVE NAME EFFECTS ====================

const nameElement = document.querySelector('h1');

// 1. CLICK EFFECT - Fire Explosion
nameElement.addEventListener('click', function(event) {
  // Create massive fire burst
  for(let i = 0; i < 50; i++) {
    createFireExplosion(event.clientX, event.clientY);
  }
  
  // Screen flash
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at ${event.clientX}px ${event.clientY}px, 
                rgba(255, 100, 0, 0.4), transparent 60%);
    pointer-events: none;
    z-index: 10000;
    animation: flashFade 0.5s ease-out;
  `;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
});

function createFireExplosion(x, y) {
  const particle = document.createElement('div');
  const colors = ['#ff0000', '#ff4500', '#ff6600', '#ffcc00'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 25 + 15;
  
  particle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, ${color}, transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 0 ${size * 2}px ${color};
  `;
  
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 10 + 5;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity;
  
  document.body.appendChild(particle);
  animateExplosion(particle, vx, vy);
}

function animateExplosion(particle, vx, vy) {
  let x = 0;
  let y = 0;
  let opacity = 1;
  
  const animate = () => {
    x += vx;
    y += vy - 1; // Slight upward drift
    opacity -= 0.02;
    
    particle.style.transform = translate(${x}px, ${y}px);
    particle.style.opacity = opacity;
    
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      particle.remove();
    }
  };
  
  requestAnimationFrame(animate);
}

// 2. DOUBLE CLICK - Ring of Fire
nameElement.addEventListener('dblclick', (event) => {
  for(let i = 0; i < 24; i++) {
    const angle = (Math.PI * 2 * i) / 24;
    const radius = 100;
    const x = event.clientX + Math.cos(angle) * radius;
    const y = event.clientY + Math.sin(angle) * radius;
    
    setTimeout(() => {
      createFireBurst(x, y);
    }, i * 30);
  }
});

function createFireBurst(x, y) {
  for(let i = 0; i < 5; i++) {
    setTimeout(() => createFireParticle(x, y), i * 50);
  }
}

// 3. PRESS SPACE - Fire Wave
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    createFireWave();
  }
});

function createFireWave() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for(let angle = 0; angle < Math.PI * 2; angle += 0.1) {
    setTimeout(() => {
      const x = centerX + Math.cos(angle) * 200;
      const y = centerY + Math.sin(angle) * 200;
      createFireBurst(x, y);
    }, angle * 100);
  }
}

// ==================== ADDITIONAL ANIMATIONS ====================

const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes flashFade {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
document.head.appendChild(additionalStyles);

// ==================== INITIALIZATION ====================

window.addEventListener('DOMContentLoaded', () => {
  console.log('🔥 FIRE EFFECTS ACTIVATED!');
  console.log('💡 Move your mouse to create fire trail');
  console.log('🖱 Click the name for fire explosion');
  console.log('🖱 Double-click for ring of fire');
  console.log('⌨ Press SPACE for fire wave');
  
  createGeometricShapes();
  createDigitalRain();
  createAIParticles();
  
  // Welcome animation
  nameElement.style.opacity = '0';
  setTimeout(() => {
    nameElement.style.transition = 'opacity 1s ease-in';
    nameElement.style.opacity = '1';
  }, 100);
});

console.log('🔥 Fire trail effect loaded successfully!');
