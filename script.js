document.addEventListener('DOMContentLoaded', () => {
    // 1. Image Slider Logic
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = slideItems.length;

    function goToSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        slides.style.transform = `translateX(${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Auto-playing slider every 2 seconds
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 2000);

    // Manual dot control
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // 2. Countdown Timer Logic (24 Hours Urgency)
    const countdown = () => {
        // Mock end time: 24 hours from now
        const now = new Date().getTime();
        const endTime = now + 24 * 60 * 60 * 1000;
        
        const update = () => {
            const currentTime = new Date().getTime();
            const diff = endTime - currentTime;
            
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
            
            if (diff <= 0) {
                clearInterval(timerId);
            }
        };
        
        const timerId = setInterval(update, 1000);
        update();
    };
    
    countdown();

    // 3. WhatsApp Message Pre-filler
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const ctaBtn = document.querySelector('.cta-whatsapp');
    const phoneNum = '201234567890'; // Replace with real phone
    const message = encodeURIComponent('مرحبا، عايز احجز عرض Buy 1 Get 1 من سيدرا');
    const waUrl = `https://wa.me/${phoneNum}?text=${message}`;

    whatsappBtn.href = waUrl;
    ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(waUrl, '_blank');
    });

    // 4. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
