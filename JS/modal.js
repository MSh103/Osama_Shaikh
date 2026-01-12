let slideIndex = 1;
let slides = [];

fetch("gallery.json")
  .then(res => res.json())
  .then(data => {
    buildGallery(data.images);
    showSlides(slideIndex);
  })
  .catch(err => console.error("Gallery JSON error:", err));

function buildGallery(images)
{
  const container = document.getElementById("gallery");
  const viewport = container.querySelector(".slideViewport");
  const prevBtn = container.querySelector(".prev");

  images.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <div class="slideNumber"></div>
      <div class="imgContainer"><img src="${img.src}" alt="${img.alt}" data-caption="${img.caption}"/></div>
    `;

    viewport.appendChild(slide);
  });

  slides = document.getElementsByClassName("slide");
}

function updateSlide(n) 
{
  showSlides(slideIndex += n);
}

function currentSlide(n) 
{
  showSlides(slideIndex = n);
}

function showSlides(n) 
{
  let i;
  let slides = document.getElementsByClassName("slide");
  let captionText = document.getElementById("caption");
  if(n > slides.length) {slideIndex = 1}
  if(n < 1) {slideIndex = slides.length}
  for(i = 0; i < slides.length; i++)
  {
    slides[i].classList.remove("active");
  }
  slides[slideIndex-1].classList.add("active");

  const img = slides[slideIndex-1].querySelector("img");
  captionText.innerHTML = img ? img.dataset.caption : "";

  const slideNo = slides[slideIndex-1].querySelector(".slideNumber");
  slideNo.textContent = `${slideIndex} / ${slides.length}`;
}