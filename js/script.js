// Create starfield
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

// Navigation
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

// Project navigation
document.querySelectorAll('.click-project').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        showSection(`project-${projectId}`);
    });
});

// Make project cards clickable
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on a link
        if (e.target.classList.contains('project-link')) return;
        
        const projectId = card.getAttribute('data-project');
        if (projectId) {
            showSection(`project-${projectId}`);
        }
    });
});

function showSection(targetSection) {
    // Update active nav
    navLinks.forEach(nl => nl.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Show/hide back button
    if (targetSection === 'home') {
        backBtn.classList.remove('show');
    } else {
        backBtn.classList.add('show');
    }
    
    // Show target section
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
            section.classList.add('active');
            // Trigger animations
            setTimeout(() => {
                triggerAnimations(section);
            }, 100);
        }
    });
}

// Back button
backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active filter
        filterBtns.forEach(fb => fb.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animation triggers
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
    // Trigger animations for home section
    setTimeout(() => {
        triggerAnimations(document.getElementById('home'));
    }, 500);
});

// Smooth project card hover effects
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
