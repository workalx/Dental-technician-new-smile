/* =====================================================
   DT.NEW SMILE — main scripts
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Header: shrink on scroll ---------- */
    const header = document.getElementById('siteHeader');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 30) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Mobile nav toggle ---------- */
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when a link is clicked
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Reveal on scroll ---------- */
    const revealTargets = document.querySelectorAll(
        '.section-head, .about-grid, .resume-col, .service-card, .portfolio-tile, .contact-card, .stat'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealTargets.forEach(el => io.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('visible'));
    }

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Gallery lightbox (used on subpages) ---------- */
    const galleryItems = document.querySelectorAll('.gallery .gallery-item img');
    if (galleryItems.length) {
        const lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.innerHTML = `
            <button class="lightbox-close" aria-label="Close">×</button>
            <img alt="">
        `;
        document.body.appendChild(lb);

        const lbImg = lb.querySelector('img');
        const lbClose = lb.querySelector('.lightbox-close');

        const open = (src, alt) => {
            lbImg.src = src;
            lbImg.alt = alt || '';
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        const close = () => {
            lb.classList.remove('open');
            lbImg.src = '';
            document.body.style.overflow = '';
        };

        galleryItems.forEach(img => {
            img.parentElement.addEventListener('click', () => open(img.src, img.alt));
        });

        lb.addEventListener('click', e => {
            if (e.target === lb || e.target === lbImg) close();
        });
        lbClose.addEventListener('click', close);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') close();
        });
    }
});
