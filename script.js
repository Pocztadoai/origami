document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('nav-active');
            const isExpanded = navList.classList.contains('nav-active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                menuToggle.innerHTML = '&#10005;'; // Close icon (X)
            } else {
                menuToggle.innerHTML = '&#9776;'; // Hamburger icon
            }
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('nav-active')) {
                    navList.classList.remove('nav-active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '&#9776;';
                }
            });
        });
    }

    // --- Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scroll & Active Nav Link Highlighting ---
    const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');
    const sections = [];
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        // Make sure sectionId is not just "#" or empty to avoid errors
        if (sectionId && sectionId.length > 1) {
            const section = document.querySelector(sectionId);
            if (section) sections.push(section);
        }
    });

    function changeLinkState() {
        let index = sections.length;
        const headerHeight = document.getElementById('site-header') ? document.getElementById('site-header').offsetHeight : 80; // Fallback header height

        while(--index >= 0 && window.scrollY + headerHeight + 20 < sections[index].offsetTop) {} // Add offset for header height + a little extra

        navLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0 && index < navLinks.length && navLinks[index]) { // Check bounds and existence
            navLinks[index].classList.add('active');
        }
    }
    // Initial check and on scroll
    if (sections.length > 0) {
        changeLinkState();
        window.addEventListener('scroll', changeLinkState);
    }


    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Dziękujemy za wiadomość! Formularz jest obecnie demonstracyjny i nie wysyła danych.');
                contactForm.reset();
            } else {
                alert('Proszę wypełnić wszystkie wymagane pola.');
            }
        });
    }

    // --- Shrink header on scroll ---
    const header = document.getElementById('site-header');
    const logoImg = document.querySelector('.logo img');

    if (header && logoImg) {
        const initialHeaderPaddingTop = parseInt(window.getComputedStyle(header).paddingTop);
        const initialHeaderPaddingBottom = parseInt(window.getComputedStyle(header).paddingBottom);
        const initialLogoHeight = logoImg.offsetHeight;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.paddingTop = (initialHeaderPaddingTop * 0.7) + 'px';
                header.style.paddingBottom = (initialHeaderPaddingBottom * 0.7) + 'px';
                logoImg.style.height = (initialLogoHeight * 0.8) + 'px';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.paddingTop = initialHeaderPaddingTop + 'px';
                header.style.paddingBottom = initialHeaderPaddingBottom + 'px';
                logoImg.style.height = initialLogoHeight + 'px';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.07)';
            }
        });
    }
});