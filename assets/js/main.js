(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const whatsappNumber = '22787429246';

    const renderCredit = (element, item) => {
        if (!element) {
            return;
        }

        element.replaceChildren(document.createTextNode(item.credit || ''));
        if (item.source) {
            element.appendChild(document.createTextNode(' · '));
            const sourceLink = document.createElement('a');
            sourceLink.href = item.source;
            sourceLink.target = '_blank';
            sourceLink.rel = 'noopener noreferrer';
            sourceLink.textContent = 'Source';
            sourceLink.className = 'underline decoration-current/40 underline-offset-2 hover:opacity-70';
            element.appendChild(sourceLink);
        }
        if (item.license) {
            element.appendChild(document.createTextNode(' · '));
            const licenseLink = document.createElement('a');
            licenseLink.href = item.license;
            licenseLink.target = '_blank';
            licenseLink.rel = 'noopener noreferrer';
            licenseLink.textContent = item.licenseLabel || 'Licence';
            licenseLink.className = 'underline decoration-current/40 underline-offset-2 hover:opacity-70';
            element.appendChild(licenseLink);
        }
    };

    const heroSlides = [
        {
            src: 'assets/image/WhatsApp%20Image%202026-11-06%20at%2006.25.42.jpeg',
            alt: 'Affiche originale ASER SERVICE COLOR présentant les produits, une voiture et les couleurs automobiles',
            caption: 'Avec ASER SERVICE COLOR, redonnez vie à votre véhicule.',
            credit: 'Affiche originale ASER SERVICE COLOR',
        },
        {
            src: 'assets/image/peintures-couleurs-melangees.jpg',
            alt: 'Gros plan sur des pots de peinture aux teintes éclatantes, visuel d’illustration',
            caption: 'Des couleurs intenses pour vos projets de peinture automobile — illustration.',
            credit: 'Visuel d’illustration',
        },
        {
            src: 'assets/image/peinture-porte-voiture.jpg',
            alt: 'Un professionnel travaille sur une porte de voiture protégée avant sa finition, image d’illustration',
            caption: 'Le soin apporté à chaque élément de carrosserie — illustration.',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49232745248',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
        {
            src: 'assets/image/WhatsApp%20Image%202026-11-06%20at%2006.25.41.jpeg',
            alt: 'Affiche originale ASER SERVICE COLOR présentant mastics, peintures, vernis, diluants et accessoires',
            caption: 'Les matériaux de composition des peintures automobiles.',
            credit: 'Affiche originale ASER SERVICE COLOR',
        },
        {
            src: 'assets/image/peinture-rouge.jpg',
            alt: 'Gros plan sur une coulée de peinture rouge, visuel d’illustration',
            caption: 'Une teinte rouge profonde en mouvement — illustration.',
            credit: 'Visuel d’illustration',
        },
        {
            src: 'assets/image/pistolet-peinture-auto.jpg',
            alt: 'Gros plan sur un pistolet professionnel de peinture automobile dans un atelier, image d’illustration',
            caption: 'Le pistolet de peinture, outil de précision en carrosserie — illustration.',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49187623103',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
    ];

    const hero = document.querySelector('[data-hero-slider]');
    if (hero) {
        const images = [
            hero.querySelector('[data-hero-image]'),
            hero.querySelector('[data-hero-image-secondary]'),
        ];
        const caption = hero.querySelector('[data-hero-caption]');
        const credit = hero.querySelector('[data-hero-credit]');
        const dotsContainer = hero.querySelector('[data-hero-dots]');
        const previous = hero.querySelector('[data-hero-prev]');
        const next = hero.querySelector('[data-hero-next]');

        if (images.every(Boolean) && caption && credit && dotsContainer && previous && next) {
            let activeIndex = 0;
            let activeImageIndex = 0;
            let timer = null;
            let imageRequest = 0;
            const dots = heroSlides.map((slide, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('aria-label', `Afficher la diapositive ${index + 1} : ${slide.caption}`);
                dot.setAttribute('aria-pressed', String(index === 0));
                dot.className = index === 0
                    ? 'h-2.5 w-7 rounded-full bg-sun transition-all focus:outline-none focus:ring-2 focus:ring-white'
                    : 'h-2.5 w-2.5 rounded-full bg-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-white';
                dot.addEventListener('click', () => {
                    showSlide(index);
                    startTimer();
                });
                dotsContainer.appendChild(dot);
                return dot;
            });

            const showSlide = (index) => {
                activeIndex = (index + heroSlides.length) % heroSlides.length;
                const slide = heroSlides[activeIndex];
                const request = ++imageRequest;
                const incomingIndex = 1 - activeImageIndex;
                const incomingImage = images[incomingIndex];
                const outgoingImage = images[activeImageIndex];
                const activateImage = () => {
                    if (request !== imageRequest) {
                        return;
                    }
                    incomingImage.classList.add('is-active');
                    incomingImage.setAttribute('aria-hidden', 'false');
                    outgoingImage.classList.remove('is-active');
                    outgoingImage.setAttribute('aria-hidden', 'true');
                    activeImageIndex = incomingIndex;
                    caption.textContent = slide.caption;
                    renderCredit(credit, slide);
                };
                incomingImage.onload = activateImage;
                incomingImage.alt = slide.alt;
                incomingImage.src = slide.src;
                if (incomingImage.complete && incomingImage.naturalWidth > 0) {
                    activateImage();
                }
                dots.forEach((dot, dotIndex) => {
                    const active = dotIndex === activeIndex;
                    dot.setAttribute('aria-pressed', String(active));
                    dot.className = active
                        ? 'h-2.5 w-7 rounded-full bg-sun transition-all focus:outline-none focus:ring-2 focus:ring-white'
                        : 'h-2.5 w-2.5 rounded-full bg-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-white';
                });
            };

            const stopTimer = () => {
                if (timer !== null) {
                    window.clearInterval(timer);
                    timer = null;
                }
            };
            const startTimer = () => {
                stopTimer();
                if (
                    !reducedMotion.matches
                    && !document.hidden
                    && !hero.matches(':hover')
                ) {
                    timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
                }
            };

            previous.addEventListener('click', () => {
                showSlide(activeIndex - 1);
                startTimer();
            });
            next.addEventListener('click', () => {
                showSlide(activeIndex + 1);
                startTimer();
            });
            hero.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    showSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
                    startTimer();
                }
            });
            hero.addEventListener('mouseenter', stopTimer);
            hero.addEventListener('mouseleave', startTimer);
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    stopTimer();
                } else {
                    startTimer();
                }
            });
            reducedMotion.addEventListener('change', startTimer);

            renderCredit(credit, heroSlides[0]);
            startTimer();
        }
    }

    const galleryItems = [
        {
            src: 'assets/image/WhatsApp%20Image%202026-11-06%20at%2006.25.42.jpeg',
            alt: 'Affiche ASER SERVICE COLOR présentant les peintures automobiles et matériaux disponibles à Niamey',
            caption: 'L’affiche ASER SERVICE COLOR — nos produits et notre identité',
            credit: 'Affiche originale ASER SERVICE COLOR',
        },
        {
            src: 'assets/image/WhatsApp%20Image%202026-11-06%20at%2006.25.41.jpeg',
            alt: 'Affiche ASER SERVICE COLOR sur les matériaux de composition des peintures automobiles',
            caption: 'L’affiche ASER SERVICE COLOR — matériaux de peinture automobile',
            credit: 'Affiche originale ASER SERVICE COLOR',
        },
        {
            src: 'assets/image/melange-peinture-pistolet.jpg',
            alt: 'Un professionnel verse de la peinture dans le godet d’un pistolet automobile',
            caption: 'Mélange et préparation de la peinture pour application',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49198471797',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
        {
            src: 'assets/image/melange-peinture-preparation.jpg',
            alt: 'Un technicien mélange de la peinture dans un récipient avant son application',
            caption: 'Préparation et mélange de peinture',
            credit: 'Photo : U.S. Navy / Lindsay Switzer',
            source: 'https://commons.wikimedia.org/wiki/File:US_Navy_020410-N-1280S-001_USS_Washington_-_mixing_paint.jpg',
            license: 'https://creativecommons.org/publicdomain/mark/1.0/',
            licenseLabel: 'Domaine public',
        },
        {
            src: 'assets/image/teinte-peinture-auto.jpg',
            alt: 'Un peintre automobile présente deux pots de peinture pour un travail de carrosserie',
            caption: 'Choix et préparation d’une teinte automobile',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49232743573',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
        {
            src: 'assets/image/pistolet-peinture-auto.jpg',
            alt: 'Un peintre automobile tient son pistolet professionnel dans un atelier de carrosserie',
            caption: 'Pistolet professionnel pour peinture automobile',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49187623103',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
        {
            src: 'assets/image/preparation-carrosserie.jpg',
            alt: 'Un carrossier prépare une porte de voiture avant l’application de peinture',
            caption: 'Préparation de la carrosserie avant peinture',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49197779033',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
        {
            src: 'assets/image/peinture-porte-voiture.jpg',
            alt: 'Un professionnel travaille sur une porte de voiture protégée avant sa finition',
            caption: 'Travail de précision sur un élément de carrosserie',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49232745248',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
        {
            src: 'assets/image/peintre-preparation-pistolet.jpg',
            alt: 'Un carrossier ajuste le godet de son pistolet de peinture avant application',
            caption: 'Réglage du matériel avant application',
            credit: 'Photo : Ivan Radic',
            source: 'https://www.flickr.com/photos/26344495@N05/49188110236',
            license: 'https://creativecommons.org/licenses/by/2.0/',
            licenseLabel: 'CC BY 2.0',
        },
        {
            src: 'assets/image/peinture-vehicule.jpg',
            alt: 'Un professionnel pulvérise de la peinture sur la carrosserie d’un véhicule dans un atelier',
            caption: 'Application de peinture sur un véhicule',
            credit: 'Photo : KelvinJM',
            source: 'https://commons.wikimedia.org/wiki/File:A_man_is_painting_a_car.jpg',
            license: 'https://creativecommons.org/licenses/by-sa/4.0/',
            licenseLabel: 'CC BY-SA 4.0',
        },
    ];

    const gallery = document.querySelector('[data-gallery]');
    if (gallery) {
        const image = gallery.querySelector('[data-gallery-image]');
        const caption = gallery.querySelector('[data-gallery-caption]');
        const credit = gallery.querySelector('[data-gallery-credit]');
        const counter = gallery.querySelector('[data-gallery-counter]');
        const dotsContainer = gallery.querySelector('[data-gallery-dots]');
        const previous = gallery.querySelector('[data-gallery-prev]');
        const next = gallery.querySelector('[data-gallery-next]');
        const lightbox = document.querySelector('[data-gallery-lightbox]');

        if (image && caption && credit && counter && dotsContainer && previous && next) {
            let activeIndex = 0;
            let timer = null;
            let transitionTimer = null;
            const dots = galleryItems.map((item, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('aria-label', `Afficher l’image ${index + 1} : ${item.caption}`);
                dot.setAttribute('aria-pressed', String(index === 0));
                dot.addEventListener('click', () => {
                    showImage(index);
                    startTimer();
                });
                dotsContainer.appendChild(dot);
                return dot;
            });

            const updateLightbox = () => {
                if (!lightbox) {
                    return;
                }
                const lightboxImage = lightbox.querySelector('[data-lightbox-image]');
                const lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
                const lightboxCredit = lightbox.querySelector('[data-lightbox-credit]');
                const lightboxCounter = lightbox.querySelector('[data-lightbox-counter]');
                const item = galleryItems[activeIndex];
                if (lightboxImage && lightboxCaption && lightboxCredit && lightboxCounter) {
                    lightboxImage.src = item.src;
                    lightboxImage.alt = item.alt;
                    lightboxCaption.textContent = item.caption;
                    renderCredit(lightboxCredit, item);
                    lightboxCounter.textContent = `${activeIndex + 1} / ${galleryItems.length}`;
                }
            };

            const showImage = (index) => {
                activeIndex = (index + galleryItems.length) % galleryItems.length;
                const item = galleryItems[activeIndex];
                image.classList.add('is-changing');
                caption.textContent = item.caption;
                counter.textContent = `${activeIndex + 1} / ${galleryItems.length}`;
                renderCredit(credit, item);
                updateLightbox();
                if (transitionTimer !== null) {
                    window.clearTimeout(transitionTimer);
                }
                transitionTimer = window.setTimeout(() => {
                    image.src = item.src;
                    image.alt = item.alt;
                    image.loading = 'eager';
                    image.classList.remove('is-changing');
                    transitionTimer = null;
                }, reducedMotion.matches ? 0 : 140);
                dots.forEach((dot, dotIndex) => {
                    dot.setAttribute('aria-pressed', String(dotIndex === activeIndex));
                });
            };

            const stopTimer = () => {
                if (timer !== null) {
                    window.clearInterval(timer);
                    timer = null;
                }
            };
            const startTimer = () => {
                stopTimer();
                if (!reducedMotion.matches && !document.hidden && !(lightbox && lightbox.open)) {
                    timer = window.setInterval(() => showImage(activeIndex + 1), 5500);
                }
            };

            previous.addEventListener('click', () => {
                showImage(activeIndex - 1);
                startTimer();
            });
            next.addEventListener('click', () => {
                showImage(activeIndex + 1);
                startTimer();
            });
            gallery.addEventListener('mouseenter', stopTimer);
            gallery.addEventListener('mouseleave', startTimer);
            gallery.addEventListener('focusin', stopTimer);
            gallery.addEventListener('focusout', (event) => {
                if (!gallery.contains(event.relatedTarget)) {
                    startTimer();
                }
            });
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    stopTimer();
                } else {
                    startTimer();
                }
            });
            reducedMotion.addEventListener('change', startTimer);

            const openLightbox = () => {
                if (!lightbox) {
                    window.open(galleryItems[activeIndex].src, '_blank', 'noopener,noreferrer');
                    return;
                }
                updateLightbox();
                stopTimer();
                if (typeof lightbox.showModal === 'function') {
                    lightbox.showModal();
                    lightbox.querySelector('[data-lightbox-close]')?.focus();
                } else {
                    window.open(galleryItems[activeIndex].src, '_blank', 'noopener,noreferrer');
                }
            };

            gallery.querySelector('[data-gallery-open]')?.addEventListener('click', openLightbox);
            if (lightbox) {
                lightbox.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox.close());
                lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => showImage(activeIndex - 1));
                lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => showImage(activeIndex + 1));
                lightbox.addEventListener('close', startTimer);
                lightbox.addEventListener('click', (event) => {
                    if (event.target === lightbox) {
                        lightbox.close();
                    }
                });
                lightbox.addEventListener('keydown', (event) => {
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                        event.preventDefault();
                        showImage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
                    }
                });
            }

            renderCredit(credit, galleryItems[0]);
            startTimer();
        }
    }

    document.querySelectorAll('[data-product-request]').forEach((button) => {
        button.addEventListener('click', () => {
            const productSelect = document.querySelector('#contact-product');
            const contactSection = document.querySelector('#contact');
            if (productSelect && contactSection) {
                const requestedProduct = button.dataset.productRequest;
                const matchingOption = Array.from(productSelect.options).find((option) => option.value === requestedProduct);
                productSelect.value = matchingOption ? matchingOption.value : 'Autre renseignement';
                contactSection.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
                productSelect.focus({ preventScroll: true });
            }
        });
    });

    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
        const status = contactForm.querySelector('[data-contact-status]');
        const fallback = contactForm.querySelector('[data-contact-fallback]');
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!contactForm.reportValidity()) {
                return;
            }

            const formData = new FormData(contactForm);
            const name = String(formData.get('name') || '').trim();
            const phone = String(formData.get('phone') || '').trim();
            const product = String(formData.get('product') || '').trim();
            const color = String(formData.get('color') || '').trim();
            const message = String(formData.get('message') || '').trim();
            const messageLines = [
                'Bonjour ASER SERVICE COLOR,',
                '',
                `Nom : ${name}`,
                `Téléphone : ${phone}`,
                product ? `Sujet : ${product}` : '',
                color ? `Référence / couleur : ${color}` : '',
                '',
                message,
            ].filter((line, index, lines) => line !== '' || (index > 0 && lines[index - 1] !== ''));
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;

            if (fallback) {
                fallback.href = whatsappUrl;
                fallback.classList.remove('hidden');
            }
            if (status) {
                status.textContent = 'Votre message WhatsApp est prêt. Vérifiez-le puis envoyez-le dans WhatsApp.';
                status.classList.remove('hidden');
            }
            const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            if (whatsappWindow) {
                whatsappWindow.opener = null;
            }
        });
    }

    const shareUrl = window.location.href.split('#')[0];
    const shareMessage = `ASER SERVICE COLOR — De toute teinte automobile à Niamey. Qualité, performance, durabilité. ${shareUrl}`;
    const whatsappShare = document.querySelector('[data-share-whatsapp]');
    const facebookShare = document.querySelector('[data-share-facebook]');
    if (whatsappShare) {
        whatsappShare.href = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    }
    if (facebookShare) {
        facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }

    const currentYear = document.querySelector('[data-current-year]');
    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    document.querySelectorAll('header details a[href^="#"]').forEach((link) => {
        link.addEventListener('click', () => {
            link.closest('details')?.removeAttribute('open');
        });
    });
})();
