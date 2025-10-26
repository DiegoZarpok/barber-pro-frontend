let lastScrollTop = 0;
const header = document.querySelector('.header');
let hideTimeout;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    clearTimeout(hideTimeout);
    header.classList.add('hidden');
  } 

  else {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      header.classList.remove('hidden');
    }, 2000);
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

header.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeout);
  header.classList.remove('hidden');
});
