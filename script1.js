const projectCards = document.querySelectorAll(".project-card");
  const hoverBg = document.getElementById("hoverBg");

  projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      const bg = card.getAttribute("data-bg");
      hoverBg.style.backgroundImage = `url('${bg}')`;
      hoverBg.style.opacity = "1"; // fully visible now
    });

    card.addEventListener("mouseleave", () => {
      hoverBg.style.opacity = "0"; // fade out
    });
  });

var sliders = document.querySelectorAll('.experience-swiper');
  sliders.forEach(function(slider) {
    new Swiper(slider, {
      loop: true,
      pagination: { el: slider.querySelector('.swiper-pagination'), clickable: true },
      navigation: {
        nextEl: slider.querySelector('.swiper-button-next'),
        prevEl: slider.querySelector('.swiper-button-prev')
      },
    });
  });
const images = [
    "image/me4.jpg",
    "image/me.jpg",
  ];


let index = 0;
const imgElement = document.getElementById("profileImage");

  imgElement.addEventListener("click", () => {
    index = (index + 1) % images.length;
    imgElement.src = images[index];
  });
   
   document.getElementById('menu-btn').addEventListener('click', () => {
      document.getElementById('menu').classList.toggle('hidden');
    });

     document.addEventListener("DOMContentLoaded", () => {
      const skillCards = document.querySelectorAll(".skill-card");
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      skillCards.forEach(card => {
        card.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700");
        observer.observe(card);
      });
    });

function slider() {
      return {
        current: 0,
        slides: [
          'https://source.unsplash.com/1600x900/?code',
          'https://source.unsplash.com/1600x900/?developer',
          'https://source.unsplash.com/1600x900/?technology'
        ],
        next() {
          this.current = (this.current + 1) % this.slides.length;
        },
        prev() {
          this.current = (this.current - 1 + this.slides.length) % this.slides.length;
        },
        startSlider() {
          setInterval(() => {
            this.next();
          }, 5000);
        }
      };
    }

    