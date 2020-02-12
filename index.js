const particles = [];
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    particlesLength = Math.floor(window.innerWidth / 10);

    for (let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background('orange');
    particles.forEach((particle,index) => {
        particle.update();
        particle.draw();
        particle.connectParticles(particles.slice(index));
    });
}

class Particle {
    constructor() {
        // position
        this.pos = createVector(random(width), random(height));
        //velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));
        //size
        this.size = 5;
    }

    //update movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.detectEdges();
    }

    //draw single particle
    draw() {
        noStroke();
        fill('rgba(255, 255, 255, 0.5)');
        circle(this.pos.x, this.pos.y, this.size * 2);
    }

    //detect edges
    detectEdges() {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    //connect particles
    connectParticles(particles) {
        particles.forEach((particle) => {
            const distance = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if (distance < 130) {
                stroke('rgba(255, 255, 255, 0.5)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }
        });
    }
}
