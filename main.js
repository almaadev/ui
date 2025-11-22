document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.add('hidden');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slider-item');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    prevButton.addEventListener('click', () => {
        prevSlide();
        stopSlider();
        startSlider();
    });
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });

    startSlider();

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });




    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-emerald-600');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-emerald-600');
            }
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section > div').forEach(el => {
        observer.observe(el);
    });

    // Header animation on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('shadow-xl');
        } else {
            header.classList.remove('shadow-xl');
        }
    });

    // Product Carousel
    const productContainer = document.getElementById('product-container');
    const productCarousel = document.getElementById('product-carousel');
    const prevProductButton = document.getElementById('prev-product');
    const nextProductButton = document.getElementById('next-product');

    if (productCarousel) {
        const products = Array.from(productCarousel.children);
        const product = products[0];
        const productWidth = product.offsetWidth + parseInt(window.getComputedStyle(productCarousel).gap);
        let currentIndex = 0;
        let autoScrollInterval;

        // Clone first 5 products and append them to the end for infinite loop
        for (let i = 0; i < 5; i++) {
            productCarousel.appendChild(products[i].cloneNode(true));
        }

        function updateCarousel() {
            productCarousel.style.transition = 'transform 0.5s ease-in-out';
            productCarousel.style.transform = `translateX(-${currentIndex * productWidth}px)`;
        }

        function nextProduct() {
            currentIndex++;
            updateCarousel();

            if (currentIndex > products.length - 5) {
                setTimeout(() => {
                    productCarousel.style.transition = 'none';
                    currentIndex = 0;
                    productCarousel.style.transform = `translateX(0px)`;
                }, 500);
            }
        }

        function prevProduct() {
            if (currentIndex === 0) {
                productCarousel.style.transition = 'none';
                currentIndex = products.length - 5;
                productCarousel.style.transform = `translateX(-${currentIndex * productWidth}px)`;
                setTimeout(() => {
                    productCarousel.style.transition = 'transform 0.5s ease-in-out';
                    currentIndex--;
                    updateCarousel();
                }, 10);
            } else {
                currentIndex--;
                updateCarousel();
            }
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(nextProduct, 3000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        nextProductButton.addEventListener('click', () => {
            stopAutoScroll();
            nextProduct();
            startAutoScroll();
        });

        prevProductButton.addEventListener('click', () => {
            stopAutoScroll();
            prevProduct();
            startAutoScroll();
        });

        productContainer.addEventListener('mouseenter', stopAutoScroll);
        productContainer.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    }
});
 document.querySelector("form").addEventListener("submit", function(e) {
      e.preventDefault(); // stop page reload

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      // FIXED ALMAA NUMBER — replace with real number
      const targetNumber = "917358357615"; // no + sign

      const text =
          "Name: " + name + "\n" +
          "Email: " + email + "\n" +
          "Phone: " + phone + "\n" +
          "Message: " + message;

      const encoded = encodeURIComponent(text);

      const url = `https://wa.me/${targetNumber}?text=${encoded}`;

      window.open(url, "_blank");
  });