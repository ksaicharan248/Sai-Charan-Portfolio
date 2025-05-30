// Initialize page animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make all content visible immediately without animations
    document.querySelectorAll('section, .timeline-item, .skill-category, .project-card, .achievement-item, .more-card, .contact-item')
        .forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        });
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Form submission
    setupContactForm();
    
    // Floating elements animation
    animateFloatingElements();
});

// Animate floating elements only
function animateFloatingElements() {
    const floatElements = document.querySelectorAll('.float-element');
    
    floatElements.forEach((element, index) => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = navLinks.innerHTML;
                document.body.appendChild(mobileMenu);
                
                // Style the mobile menu
                mobileMenu.style.position = 'fixed';
                mobileMenu.style.top = '70px';
                mobileMenu.style.left = '0';
                mobileMenu.style.width = '100%';
                mobileMenu.style.background = 'white';
                mobileMenu.style.padding = '20px';
                mobileMenu.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                mobileMenu.style.display = 'none';
                mobileMenu.style.flexDirection = 'column';
                mobileMenu.style.gap = '20px';
                mobileMenu.style.zIndex = '999';
                
                // Style the links
                const links = mobileMenu.querySelectorAll('a');
                links.forEach(link => {
                    link.style.display = 'block';
                    link.style.padding = '10px';
                    link.style.borderBottom = '1px solid #eee';
                    
                    link.addEventListener('click', () => {
                        mobileMenu.style.display = 'none';
                        hamburger.classList.remove('active');
                    });
                });
            }
            
            const mobileMenu = document.querySelector('.mobile-menu');
            
            // Toggle mobile menu
            if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                mobileMenu.style.display = 'flex';
                hamburger.classList.add('active');
            } else {
                mobileMenu.style.display = 'none';
                hamburger.classList.remove('active');
            }
        });
    }
}

// Contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Add active class to nav links based on scroll position
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add styles for active hamburger
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    </style>
`);