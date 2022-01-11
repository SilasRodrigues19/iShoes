let slide_imgs = document.querySelectorAll('#slide-img img'),
 slide_infos = document.querySelectorAll('.slide-info'),
 hero_imgs_animate = [];

slide_imgs.forEach((e, i) => {
  let next_img = slide_imgs[i === slide_imgs.length - 1 ? 0 : i + 1].getAttribute('src');

  let animation = new hoverEffect({
    parent: document.querySelector('#slide-img'),
    intensity: 0.3,
    image1: e.getAttribute('src'),
    image2: next_img,
    displacementImage: '../assets/images/distortion2.jpg',
    hover: false
  });

  hero_imgs_animate.push(animation);

});

// Remove Images 
slide_imgs.forEach(e => e.remove());

let curr_item = 0;

showSlideIndex = (index) => {
  document.querySelector('#hero-slide-index').innerHTML = `${index + 1}/${slide_imgs.length}`;
}

nextSlide = () => {
  let prev_item = curr_item;
  curr_item = (curr_item + 1) % hero_imgs_animate.length;

  // Image Animation
  hero_imgs_animate[prev_item].next();

  // Change Slide Info
  document.querySelector('.slide-info.active').classList.remove('active');
  slide_infos[curr_item].classList.add('active');

  showSlideIndex(curr_item);

  setTimeout(() => {
    let canvas = document.querySelectorAll('#slide-img canvas');
    document.querySelector('#slide-img').appendChild(canvas[0]);
    hero_imgs_animate[prev_item].previous();
  }, 1200);
}

document.querySelector('#hero-slide-toggle-next').onclick = () => {
  nextSlide();
}