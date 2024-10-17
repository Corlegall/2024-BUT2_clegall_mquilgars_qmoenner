let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const totalSlides = slides.length;

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    document.querySelector('.carousel-slide').style.transform = `translateX(-${currentSlide * 100}%)`;
}
