function createStarfield() {
    const starsContainer = document.querySelector('.stars');
    const numStars = 100;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        starsContainer.appendChild(star);
    }
}

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const backBtn = document.getElementById('backBtn');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        showSection(targetSection);
    });
});

document.querySelectorAll('.click-project').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        showSection(`project-${projectId}`);
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-link')) return;
        
        const projectId = card.getAttribute('data-project');
        if (projectId) {
            showSection(`project-${projectId}`);
        }
    });
});

function showSection(targetSection) {
    navLinks.forEach(nl => nl.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    if (targetSection === 'home') {
        backBtn.classList.remove('show');
        document.body.classList.add('home-active');
        
        // Animate blocks back in individually
        document.querySelectorAll('.photo-block').forEach((block, index) => {
            setTimeout(() => {
                block.style.opacity = '1';
                block.style.transform = 'translateX(0) rotate(0deg)';
            }, index * 100);
        });
    } else {
        backBtn.classList.add('show');
        document.body.classList.remove('home-active');
        
        // Animate blocks out individually
        document.querySelectorAll('.photo-block').forEach((block, index) => {
            setTimeout(() => {
                block.style.opacity = '0';
                if (index < 3) {
                    // Left side blocks slide left
                    block.style.transform = `translateX(-400px) rotate(${Math.random() * 360}deg)`;
                } else {
                    // Right side blocks slide right
                    block.style.transform = `translateX(400px) rotate(${Math.random() * 360}deg)`;
                }
            }, index * 150);
        });
    }
    
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
            section.classList.add('active');
            setTimeout(() => {
                triggerAnimations(section);
            }, 100);
        }
    });
}

backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        const projectsGrid = document.querySelector('.projects-grid');
        const photoGallery = document.getElementById('photo-gallery');
        
        filterBtns.forEach(fb => fb.classList.remove('active'));
        btn.classList.add('active');
        
        if (filter === 'motion') {
            // Show only photo gallery for Adobe work
            projectsGrid.style.display = 'none';
            photoGallery.classList.add('active');
            
            const photoItems = document.querySelectorAll('.photo-item');
            photoItems.forEach((item, index) => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } else if (filter === 'design') {
            // Show ONLY project cards for design work, hide photo gallery
            photoGallery.classList.remove('active');
            projectsGrid.style.display = 'grid';
            
            // Show only design project cards
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                if (category.includes('design')) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.display = 'none';
                }
            });
        } else if (filter === 'code') {
            // Show only project cards for code work, hide photo gallery
            photoGallery.classList.remove('active');
            projectsGrid.style.display = 'grid';
            
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                if (category.includes('code')) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            // Show all - both project cards and photo gallery
            projectsGrid.style.display = 'grid';
            photoGallery.classList.add('active');
            
            // Show all project cards
            projectCards.forEach((card, index) => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Show all photo items
            const photoItems = document.querySelectorAll('.photo-item');
            photoItems.forEach((item, index) => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    });
});

function triggerAnimations(section) {
    const fadeElements = section.querySelectorAll('.fade-in');
    const slideLeftElements = section.querySelectorAll('.slide-in-left');
    const slideRightElements = section.querySelectorAll('.slide-in-right');
    
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
    
    slideLeftElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 300);
    });
    
    slideRightElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 300 + 150);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
    
    // Set initial state for photo blocks
    document.body.classList.add('home-active');
    document.querySelectorAll('.photo-block').forEach((block, index) => {
        block.style.opacity = '1';
        block.style.transform = 'translateX(0) rotate(0deg)';
        block.style.background = 'rgba(96, 165, 250, 0.2)';
    });
    
    setTimeout(() => {
        triggerAnimations(document.getElementById('home'));
    }, 500);
    
    setTimeout(() => {
        const desc = document.querySelector('.hero .description');
        if (desc) {
            const originalText = desc.textContent;
            desc.innerHTML = '';
            typeWriter(desc, originalText, 80);
        }
    }, 0);
});

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.add('clicked');
        setTimeout(() => {
            tag.classList.remove('clicked');
        }, 300);
    });
});

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        document.body.classList.toggle('cosmic-mode');
    }
});

let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        createSparkle(e.clientX, e.clientY);
    }, 100);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

document.querySelector('.logo')?.addEventListener('click', () => {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 50);
    }
});

let devClicks = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'd' && e.ctrlKey && e.shiftKey) {
        devClicks++;
        if (devClicks === 3) {
            console.log(`
    🚀 DEVELOPER MODE ACTIVATED 🚀
    
    Secret Commands:
    - Use Konami code for cosmic mode
    - Click logo for sparkles
    - Photo blocks only on home page
    
    Nice portfolio! 🌟
            `);
        }
    }
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.orb, .galaxy-spot');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

