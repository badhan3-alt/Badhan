var typed = new Typed('.text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Intersection Observer for Animations
let sections = document.querySelectorAll('section');

const observerOptions = {
    threshold: 0.3 // Trigger when 30% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
        } else {
            // Optional: Remove class if you want animation to repeat on scroll up
            // entry.target.classList.remove('show-animate');
        }
    });
}, observerOptions);

sections.forEach(sec => {
    observer.observe(sec);
});

// Mobile Menu Toggle Logic
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close menu on scroll or click
window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Keep the existing skills circle animation logic if needed, but the CSS animation handles most of it.
// However, for radial circles we might need the specific class trigger if we kept that logic.
// In the CSS I replaced, I didn't see the radial circle specific logic, let me check if I broke it.
// The CSS I added handles 'show-animate' on .skills.
// I should ensure the radial circles still work.
// The radial circles CSS I wrote earlier used .box.show-skill .circle.
// I should update that to use .skills.show-animate .box .circle or similar.

const circles = document.querySelectorAll('.circle');
const skillsSection = document.querySelector('.skills');

if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                circles.forEach(circle => {
                    const box = circle.closest('.box');
                    if (!box.classList.contains('show-skill')) {
                        box.classList.add('show-skill');

                        // Numerical Count-up
                        const target = parseInt(circle.getAttribute('data-percent'));
                        const bigText = box.querySelector('.text big');
                        const i = parseInt(circle.getAttribute('style').match(/--i:\s*(\d+)/)[1]);
                        const delay = (300 + 150 * i); // Match CSS: 0.3s + 0.15s * i

                        setTimeout(() => {
                            let count = 0;
                            const duration = 2000; // Match CSS transition duration
                            const interval = duration / target;

                            const timer = setInterval(() => {
                                count++;
                                bigText.innerText = count + '%';
                                if (count >= target) clearInterval(timer);
                            }, interval);
                        }, delay);
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
}

// EmailJS Initialization and Form Logic
(function () {
    // Initialize EmailJS with your Public Key
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    emailjs.init("YOUR_PUBLIC_KEY");

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // These IDs from the previous steps
            // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            // Change button text to indicate loading
            const submitBtn = this.querySelector('input[type="submit"]');
            const originalBtnText = submitBtn.value;
            submitBtn.value = 'Sending...';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert('Message sent successfully!');
                    submitBtn.value = originalBtnText;
                    contactForm.reset();
                }, (err) => {
                    let errorMessage = 'Failed to send message. Please try again.';
                    // Even if it fails, it might be due to placeholders.
                    // We log the detailed error for debugging.
                    console.error('EmailJS Error:', err);
                    if (err.text) {
                        errorMessage += ` Error: ${err.text}`;
                    }
                    alert(errorMessage);
                    submitBtn.value = originalBtnText;
                });
        });
    }
})();

// Web Development Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    // Helper function to setup modal
    function setupModal(modalId, btnId, closeClass) {
        const modal = document.getElementById(modalId);
        const btn = document.getElementById(btnId);
        const closeBtn = document.querySelector(`.` + closeClass);

        if (btn && modal && closeBtn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            });

            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                }
            });
        }
    }

    // Setup Web Dev Modal
    setupModal('web-dev-modal', 'web-dev-learn-more', 'web-dev-close');

    // Setup Frontend Design Modal
    setupModal('frontend-design-modal', 'frontend-design-learn-more', 'frontend-design-close');

    // Setup Database Modal
    setupModal('database-modal', 'database-learn-more', 'database-close');

    // Setup About Me Modal
    setupModal('about-modal', 'about-read-more', 'about-close');
});