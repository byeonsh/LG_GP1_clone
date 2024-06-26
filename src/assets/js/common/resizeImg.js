class ImageElement {
  constructor(src, alt, opacity, className) {
    this.img = document.createElement('img');
    this.img.src = src;
    this.img.alt = alt;
    this.img.style.opacity = opacity;
    this.img.classList.add(className);
  }

  getElement() {
    return this.img;
  }
}

const resizeImage = (el, imgTempUrl) => {
  const imgFrame = el.querySelectorAll(`.cmp-image`);
  imgFrame.forEach(frame => {
    const size = frame.offsetWidth;
    const images = frame.querySelectorAll('img');
    images.forEach(imgCmp => {
      const imgSize = imgCmp.naturalWidth;
      const closetName = '.c-text-contents';
      if (imgSize < size && !imgCmp.closest(closetName)) {
        imgCmp.closest('.cmp-image').classList.add('fit-content');
        const newImg = new ImageElement(imgTempUrl, '', '0', 'image-frame');
        const newFrame = imgCmp.closest('.cmp-image').querySelector('.image-frame');
        if (!newFrame) {
          imgCmp.parentElement.appendChild(newImg.getElement());
        }
      }
    });
  });
};

export default resizeImage;
