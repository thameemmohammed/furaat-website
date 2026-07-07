// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-menu-content .btn');

    function toggleMenu() {
        if (mobileOverlay) {
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        }
    }

    if (mobileMenuBtn && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Mobile Card Focus Animation (Scale effect on scroll)
    const cards = document.querySelectorAll('.service-card, .therapy-card, .doctor-card, .blog-card, .testimonial-card, .step');
    const cardFocusObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mobile-focus');
            } else {
                entry.target.classList.remove('mobile-focus');
            }
        });
    }, {
        // Trigger when the element enters the middle 40% of the viewport vertically
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0
    });

    cards.forEach(card => cardFocusObserver.observe(card));

    // Testimonials Carousel Mouse Drag Scrolling
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            carousel.style.scrollSnapType = 'none'; // Disable snap during drag
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
            carousel.style.scrollSnapType = 'x mandatory';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
            carousel.style.scrollSnapType = 'x mandatory';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        // Initial cursor style
        carousel.style.cursor = 'grab';
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Booking Form WhatsApp Integration
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;

            // Get selected doctor/service text
            const doctorSelect = document.getElementById('doctor');
            const doctor = doctorSelect.options[doctorSelect.selectedIndex].text;

            const message = document.getElementById('message').value.trim();

            // Format the WhatsApp message
            let whatsappMsg = `*New Appointment Request*\n\n`;
            whatsappMsg += `*Name:* ${name}\n`;
            whatsappMsg += `*Phone:* ${phone}\n`;
            if (email) whatsappMsg += `*Email:* ${email}\n`;
            whatsappMsg += `*Preferred Date:* ${date}\n`;
            whatsappMsg += `*Specialist/Service:* ${doctor}\n`;

            if (message) {
                whatsappMsg += `\n*Notes/Symptoms:*\n${message}\n`;
            }

            // Replace with the clinic's actual WhatsApp number (include country code, no +, no spaces)
            const clinicWhatsAppNumber = "919606319231"; // Example: 91 for India + 10 digit number

            // URL encode the message
            const encodedMsg = encodeURIComponent(whatsappMsg);

            // Open WhatsApp
            window.open(`https://wa.me/${clinicWhatsAppNumber}?text=${encodedMsg}`, '_blank');
        });
    }

    // Testimonial Modal Logic
    const testModalBtn = document.getElementById('open-testimonial-modal');
    const testModal = document.getElementById('testimonial-modal');
    const closeTestModalBtn = document.getElementById('close-testimonial-modal');
    const testForm = document.getElementById('testimonial-form');

    if (testModalBtn && testModal) {
        // Open modal
        testModalBtn.addEventListener('click', () => {
            testModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        closeTestModalBtn.addEventListener('click', () => {
            testModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close when clicking outside content
        testModal.addEventListener('click', (e) => {
            if (e.target === testModal) {
                testModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Submit via WhatsApp
        testForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('test-name').value.trim();
            const treatment = document.getElementById('test-treatment').value.trim();
            const review = document.getElementById('test-review').value.trim();

            let whatsappMsg = `*New Patient Testimonial!*\n\n`;
            whatsappMsg += `*Name:* ${name}\n`;
            whatsappMsg += `*Treatment/Therapy:* ${treatment}\n\n`;
            whatsappMsg += `*Review:*\n"${review}"\n`;

            const testWhatsAppNumber = "919188252026";
            const encodedMsg = encodeURIComponent(whatsappMsg);
            
            // Open WhatsApp
            window.open(`https://wa.me/${testWhatsAppNumber}?text=${encodedMsg}`, '_blank');
            
            // Clean up and close modal
            testForm.reset();
            testModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Doctor Modal Logic (Consultation Page)
    const doctorModal = document.getElementById('doctor-modal');
    const closeDoctorModalBtn = document.querySelector('#doctor-modal .close-modal');
    
    if (doctorModal) {
        const knowMoreBtns = document.querySelectorAll('.btn-know-more');
        
        knowMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.specialist-card');
                
                // Extract data from card
                const doctorId = card.getAttribute('data-doctor-id');
                const imgSrc = card.querySelector('.card-img img').src;
                const name = card.querySelector('.doctor-name').innerText;
                const title = card.querySelector('.doctor-title').innerText;
                
                const hiddenDetails = card.querySelector('.hidden-details');
                const credentialsEl = hiddenDetails.querySelector('.modal-credentials');
                const specialtiesHTML = hiddenDetails.querySelector('.modal-specialties').innerHTML;
                const bioText = hiddenDetails.querySelector('.modal-bio').innerText;
                
                // Populate Modal
                document.getElementById('modal-img').src = imgSrc;
                document.getElementById('modal-name').innerText = name;
                document.getElementById('modal-title').innerText = title;
                
                const modalCredentials = document.getElementById('modal-credentials');
                if (credentialsEl) {
                    modalCredentials.innerHTML = credentialsEl.outerHTML;
                    modalCredentials.style.display = 'block';
                } else {
                    modalCredentials.style.display = 'none';
                    modalCredentials.innerHTML = '';
                }
                
                document.getElementById('modal-specialties-container').innerHTML = specialtiesHTML;
                document.getElementById('modal-bio-text').innerText = bioText;
                
                // Update the book button in modal to know which doctor it is
                const modalBookBtn = document.getElementById('modal-book-btn');
                modalBookBtn.setAttribute('data-doctor', doctorId);
                
                // Show modal
                doctorModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeDoctorModalBtn.addEventListener('click', () => {
            doctorModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        doctorModal.addEventListener('click', (e) => {
            if (e.target === doctorModal) {
                doctorModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Book from Modal
        const modalBookBtn = document.getElementById('modal-book-btn');
        if (modalBookBtn) {
            modalBookBtn.addEventListener('click', (e) => {
                const doctorId = e.currentTarget.getAttribute('data-doctor');
                const doctorSelect = document.getElementById('doctor');
                
                if (doctorSelect) {
                    doctorSelect.value = doctorId;
                }
                
                // Close modal
                doctorModal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Smooth scroll to booking section
                setTimeout(() => {
                    document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            });
        }
    }

});
