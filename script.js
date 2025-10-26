// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ?
                '<i class="fas fa-times"></i>' :
                '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Contact form handling
    const contactForms = document.querySelectorAll('#contactForm, .contact-form');
    contactForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    });
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize counter animations
    initializeCounters();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    showSuccessPopup();
    
    // Reset form
    e.target.reset();
}

// Show Success Popup
function showSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    if (successPopup) {
        successPopup.classList.add('active');
    }
}

// Close Success Popup
function closeSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    if (successPopup) {
        successPopup.classList.remove('active');
    }
}

// Open Contact Popup
function openContactPopup() {
    const contactPopup = document.getElementById('contactPopup');
    if (contactPopup) {
        contactPopup.classList.add('active');
    }
}

// Close Contact Popup
function closeContactPopup() {
    const contactPopup = document.getElementById('contactPopup');
    if (contactPopup) {
        contactPopup.classList.remove('active');
    }
}

// Open WhatsApp
function openWhatsApp() {
    const phoneNumber = '254792219336';
    const message = 'Hello! I would like to inquire about your services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Open Email
function openEmail() {
    const email = 'erickowuor38@gmail.com';
    const subject = 'Service Inquiry';
    const body = 'Hello Erick,\n\nI would like to inquire about your services.\n\nBest regards,';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
}

// Make Phone Call
function makeCall() {
    const phoneNumber = '0792219336';
    window.location.href = `tel:${phoneNumber}`;
}

// Open Location
function openLocation() {
    // This would typically open a map with the location
    // For now, we'll use a placeholder
    alert('Location: 12 Pap-Onditi, Kenya\n\nThis would typically open a map application.');
}

// Initialize Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .service-card, .stat-item, .process-step, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Counters
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.getAttribute('data-count').includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Add Smooth Scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Close popups when clicking outside
document.addEventListener('click', (e) => {
    const contactPopup = document.getElementById('contactPopup');
    const successPopup = document.getElementById('successPopup');
    
    if (contactPopup && contactPopup.classList.contains('active') &&
        e.target === contactPopup) {
        closeContactPopup();
    }
    
    if (successPopup && successPopup.classList.contains('active') &&
        e.target === successPopup) {
        closeSuccessPopup();
    }
});

// Add CSS for animation classes
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (this.form.checkValidity()) {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            // Re-enable after 3 seconds (simulate send)
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                this.disabled = false;
            }, 3000);
        }
    });
});