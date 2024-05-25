document.addEventListener('DOMContentLoaded', function (event) {
  // Owl Carousel
  const owl = $('.owl-carousel');
  owl.owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 7000,
    nav: false,
    dot: false,
    responsiveClass: true,
    center: true,
    dotsEach: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      }
    }
  })

  // Toggle button removal
  const navbarToggle = document.querySelector('.navbar-toggler');
  const offcanvas = document.querySelector('.offcanvas');
  if (navbarToggle && offcanvas) {
    navbarToggle.addEventListener('click', function () {
      navbarToggle.style.display = 'none';
    });

    offcanvas.addEventListener('hidden.bs.offcanvas', function () {
      navbarToggle.style.display = 'block';
    });
  }
});


function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/logout';
}