const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const backToTopBtn = document.getElementById('backToTop');
const skillLevels = document.querySelectorAll('.skill-level');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('section');



function initTyped() {
    if (window.Typed) {
        const typedTextElement = document.querySelector('.typed-text');
        if (typedTextElement) {
            typedTextElement.innerHTML = '';
            typedTextElement.style.display = 'inline-block';
            typedTextElement.style.whiteSpace = 'nowrap';
            
            // only start the animation when the element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const options = {
                            strings: ["Hello, I am <span class='highlight' style='display:inline'>Phil</span> :D", "Welcome to my portfolio!"],
                            typeSpeed: 80,
                            backSpeed: 30,
                            backDelay: 1000,
                            startDelay: 1000,
                            loop: true,
                            showCursor: true,
                            cursorChar: '|',
                            smartBackspace: true,
                            onStringTyped: () => {
                                const highlights = document.querySelectorAll('.highlight');
                                highlights.forEach(highlight => {
                                    highlight.style.display = 'inline';
                                });
                            },
                        };
                        
                        const existingCursors = document.querySelectorAll('.typed-cursor');
                        existingCursors.forEach(cursor => {
                            if (cursor.parentNode) {
                                cursor.parentNode.removeChild(cursor);
                            }
                        });
                        
                        new Typed('.typed-text', options);
                        
                        setTimeout(() => {
                            const cursor = document.querySelector('.typed-cursor');
                            if (cursor) {
                                cursor.style.display = 'inline';
                                cursor.style.position = 'relative';
                                cursor.style.verticalAlign = 'baseline';
                                cursor.style.marginLeft = '2px';
                            }
                        }, 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3
            });
            
            observer.observe(typedTextElement);
        }
    }
}    

// navigation toggle
function toggleNav() {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    navItems.forEach((item, index) => {
        if (item.style.animation) {
            item.style.animation = '';
        } else {
            item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

burger.addEventListener('click', toggleNav);

// Close nav when click on link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleNav();
        }
    });
});

// persistant header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTopBtn.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        backToTopBtn.classList.remove('visible');
    }
    updateActiveNavLink();
});

// back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update nav link on scroll
function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector('.nav-links a.active')?.classList.remove('active');
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
}

// Animate skills when in viewport
function animateSkills() {
    skillLevels.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.8;
        
        if (skillPosition < screenPosition) {
            const level = skill.getAttribute('data-level');
            skill.style.setProperty('--width', level);
            skill.classList.add('animated-skill');
        }
    });
}

// observe skills after initial load
window.addEventListener('load', () => {
    window.addEventListener('scroll', animateSkills);
    setTimeout(animateSkills, 1000);
});

// project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update button
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});



// load animations
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        const terminalTexts = document.querySelectorAll('.terminal-text');
        terminalTexts.forEach(text => {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.innerHTML = '|';
            text.appendChild(cursor);
        });
        
        // simulate terminal typing effect
        const elementsToAnimate = document.querySelectorAll('.about-text p, .project-description');
        elementsToAnimate.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, Math.random() * 10 + 10);
                }
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: "0px 0px -100px 0px"
            });
            
            observer.observe(element);
        });
    }, 500);
});


// Add glitch effect on hover for the buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.classList.add('glitch');
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('glitch');
    });
});

// Adds glitch effects to elements with the class 'glitch'
function setupGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        el.setAttribute('data-text', el.textContent);
    });
    
    // random apply glitch effect to some elements
    const headings = document.querySelectorAll('h1, h2, h3, .section-title');
    headings.forEach(heading => {
        if (Math.random() > 0.7 && !heading.classList.contains('glitch')) {
            heading.classList.add('rgb-shift');
        }
    });
    
    
    // Occasionally glitch the entire page for a split second // TODO:needs work
    setInterval(() => {
        if (Math.random() > 0.90) {
            document.body.classList.add('rgb-shift');
            setTimeout(() => {
                document.body.classList.remove('rgb-shift');
            }, 150);
        }
    }, 5000);
}


// init
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);

    // Init effects
    initTyped();
    updateActiveNavLink();
    setupGlitchEffects();
    
    // Add a flicker effect to elements randomly, but only when they're in the viewport
    const elementsToFlicker = document.querySelectorAll('.highlight, .project-title, .section-title');
    const flickerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const flickerInterval = setInterval(() => {
                    if (Math.random() > 0.8) {
                        element.style.opacity = '0.7';
                        setTimeout(() => {
                            element.style.opacity = '1';
                        }, 100);
                    }
                }, 3000);
                
                // Store the interval ID on the element to clear it when out of view
                element.dataset.flickerInterval = flickerInterval;
            } else {
                // If element has a flicker interval and is no longer in view, clear it
                const element = entry.target;
                if (element.dataset.flickerInterval) {
                    clearInterval(parseInt(element.dataset.flickerInterval));
                    delete element.dataset.flickerInterval;
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    elementsToFlicker.forEach(element => {
        flickerObserver.observe(element);
    });
});
