const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterSelect = document.getElementById('img-filter');
const downloadBtn = document.getElementById('download-btn');

let currentIndex = 0;
let itemsArray = Array.from(galleryItems);

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    galleryItems.forEach(item => {
      item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
    });
  });
});

// Show lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('show');
  });
});

function updateLightbox() {
  const img = itemsArray[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.style.filter = 'none';
  filterSelect.value = 'none';
}

// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % itemsArray.length;
  updateLightbox();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
  updateLightbox();
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

// Apply filter
filterSelect.addEventListener('change', () => {
  lightboxImg.style.filter = filterSelect.value;
});

// Download image
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = lightboxImg.src;
  link.download = 'image.jpg';
  link.click();
});
