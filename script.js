/* ============================================ */
/* 1. CONTADOR REGRESIVO                       */
/* ============================================ */
function initCountdown() {
    const countDownDate = new Date("Jan 15, 2027 19:00:00").getTime();

    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.getElementById('countdown').innerHTML = '<p class="hero-date">¡Ya nos casamos! 🥂</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

/* ============================================ */
/* 2. SCROLL REVEAL                            */
/* ============================================ */
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            easing: 'ease-in-out',
            reset: false
        });

        sr.reveal('.story-item', { interval: 200 });
        sr.reveal('.detail-card', { interval: 200 });
        sr.reveal('.gallery-item', { interval: 100 });
        sr.reveal('.rsvp-subtitle', { interval: 200 });
        sr.reveal('.btn-whatsapp', { interval: 200 });
    }
}

/* ============================================ */
/* 3. GALERÍA + LIGHTBOX (FUNCIONAL)           */
/* ============================================ */
function initGallery() {
    console.log('Iniciando galería...');
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) {
        console.error('No se encontró #galleryGrid en el HTML');
        return;
    }

    // CAMBIA ESTAS RUTAS POR LAS DE TUS IMÁGENES
    const imageUrls = [
        'imajenes/imajen1.jpeg',
        'imajenes/imajen2.jpeg',
        'imajenes/imajen3.jpeg',
        'imajenes/imajen4.jpeg',
        'imajenes/imajen5.jpeg',
        'imajenes/imajen6.jpeg'
    ];

    galleryGrid.innerHTML = '';

    imageUrls.forEach((url, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Foto de la boda ' + (index + 1);
        img.onerror = function() {
            console.warn('No se pudo cargar la imagen:', url);
            this.src = 'https://via.placeholder.com/400x400/1A2A4A/F4D8E0?text=Error+al+cargar';
        };
        div.appendChild(img);
        galleryGrid.appendChild(div);
    });

    console.log('Galería generada con', imageUrls.length, 'imágenes');
    initLightbox();
}

function initLightbox() {
    console.log('Iniciando lightbox...');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox || !lightboxImage) {
        console.warn('No se encontró el lightbox en el HTML. Creándolo dinámicamente...');
        createLightbox();
        return;
    }

    // Asignar eventos a las imágenes
    const images = document.querySelectorAll('.gallery-item img');
    console.log('Imágenes encontradas para lightbox:', images.length);

    images.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Clic en imagen:', this.src);
            lightboxImage.src = this.src;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'hidden';
    lightbox.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.85);
        display: none; align-items: center; justify-content: center;
        z-index: 1000; padding: 20px; cursor: pointer;
    `;

    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.style.cssText = `
        max-width: 90%; max-height: 90%; border-radius: 16px;
        border: 3px solid #E8AABE; object-fit: contain;
    `;

    const close = document.createElement('span');
    close.className = 'lightbox-close';
    close.innerHTML = '&times;';
    close.style.cssText = `
        position: absolute; top: 30px; right: 40px;
        color: white; font-size: 3rem; cursor: pointer;
        transition: 0.3s; font-family: 'Playfair Display', serif;
    `;

    lightbox.appendChild(img);
    lightbox.appendChild(close);
    document.body.appendChild(lightbox);

    document.querySelectorAll('.gallery-item img').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            img.src = this.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    close.addEventListener('click', function(e) {
        e.stopPropagation();
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

/* ============================================ */
/* 4. RSVP                                     */
/* ============================================ */
function initRSVP() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const attendance = document.querySelector('input[name="attendance"]:checked');

        if (!name || !email || !attendance) {
            Swal.fire({
                icon: 'warning',
                title: '¡Oops!',
                text: 'Por favor, completa todos los campos obligatorios.',
                confirmButtonColor: '#1A2A4A'
            });
            return;
        }

        // FormSubmit enviará el formulario, pero mostramos éxito
        Swal.fire({
            icon: 'success',
            title: '¡Confirmación enviada!',
            text: `Gracias ${name}, te esperamos el 15 de enero 💙`,
            confirmButtonColor: '#1A2A4A',
            timer: 4000
        });

        // Enviar el formulario
        form.submit();
    });
}

/* ============================================ */
/* 5. MÚSICA                                   */
/* ============================================ */
function initMusic() {
    const toggleBtn = document.getElementById('music-toggle');
    if (!toggleBtn) {
        console.error('No se encontró #music-toggle');
        return;
    }

    const audio = new Audio('audio/thousand-years.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    let isPlaying = false;

    audio.play().then(() => {
        isPlaying = true;
        toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        console.log('Música automática');
    }).catch(() => {
        toggleBtn.innerHTML = '<i class="fas fa-music"></i>';
        isPlaying = false;
    });

    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isPlaying) {
            audio.pause();
            toggleBtn.innerHTML = '<i class="fas fa-music"></i>';
            isPlaying = false;
        } else {
            audio.play().then(() => {
                toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                isPlaying = true;
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo reproducir',
                    text: 'Revisa la ruta del archivo de audio.',
                    confirmButtonColor: '#1A2A4A'
                });
            });
        }
    });
}

/* ============================================ */
/* 6. WHATSAPP                                 */
/* ============================================ */
function initWhatsAppShare() {
    const btn = document.getElementById('whatsapp-share');
    if (!btn) return;
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent('¡Hola! Te invito a nuestra boda. Mira la invitación aquí: ');
    btn.href = `https://wa.me/?text=${message}${url}`;
}

/* ============================================ */
/* 7. EJECUTAR TODO                            */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando invitación...');
    initCountdown();
    initScrollReveal();
    initGallery();
    initRSVP();
    initMusic();
    initWhatsAppShare();
    console.log('✅ Todo listo.');
});