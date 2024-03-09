var modal = document.getElementById("myModal");

var img = document.getElementById("myImg00");
var img1 = document.getElementById("myImg01");
var img2 = document.getElementById("myImg02");
var img3 = document.getElementById("myImg03");
var img8 = document.getElementById("myImg08");
var img10 = document.getElementById("myImg10");
var img11 = document.getElementById("myImg11");
var img12 = document.getElementById("myImg12");

var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var images = [img, img1, img2, img3, img8, img10, img11, img12];

function changeImage(direction) {
  var currentImgIndex = parseInt(modalImg.dataset.index);
  var nextImgIndex = currentImgIndex + direction;

  if (nextImgIndex >= images.length) {
    nextImgIndex = 0; // Loop back to the first image
  } else if (nextImgIndex < 0) {
    nextImgIndex = images.length - 1; // Loop back to the last image
  }

  modalImg.src = images[nextImgIndex].src;
  modalImg.dataset.index = nextImgIndex;
  captionText.innerHTML = images[nextImgIndex].alt;
}

function plusSide() {
  changeImage(1);
}

function minusSide() {
  changeImage(-1);
}

function openModal(index) {
  modal.style.display = "block";
  modalImg.src = images[index].src;
  modalImg.dataset.index = index;
  captionText.innerHTML = images[index].alt;

  modal.appendChild(prevBtn);
  modal.appendChild(nextBtn);
}

function closeModal() {
  modal.style.display = "none";
  modal.removeChild(prevBtn);
  modal.removeChild(nextBtn);
}

images.forEach(function(image, index) {
  image.addEventListener("click", function() {
    openModal(index);
  });
});

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  closeModal();
};

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
};
