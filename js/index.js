document.addEventListener('DOMContentLoaded', function () {
  const owl =  $('.owl-carousel');
  owl.owlCarousel({
    loop:true,
    margin:30,
    autoplay:true,
    autoplayTimeout:7000,
    nav:false,
    dot:false,
    responsiveClass:true,
    center:true,
    dotsEach:true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        1000:{
            items:3,
        }
    }
  })
})




window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").classList.add("scrolled");
  } else {
    document.getElementById("navbar").classList.remove("scrolled");
  }
}



  document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.querySelector('.navbar-toggler');
    const offcanvas = document.querySelector('.offcanvas');

    navbarToggle.addEventListener('click', function () {
      navbarToggle.style.display = 'none';
    });

    offcanvas.addEventListener('hidden.bs.offcanvas', function () {
      navbarToggle.style.display = 'block';
    });
  });


