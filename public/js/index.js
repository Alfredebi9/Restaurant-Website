// owl carousel
document.addEventListener('DOMContentLoaded', function () {
  const owl =  $('.owl-carousel');
  owl.owlCarousel({
    loop:true,
    margin:10,
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

// for removing the toggle button upon click
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


  // const greeting = document.querySelector(".greeting");
  // window.onload = () => {
  //   if (!sessionStorage.name) {
  //     location.href = "/login";
  //   } else {
  //     greeting.innerHTML = `Hello ${sessionStorage.name}`;
  //   }
  // };
  // const logOut = document.querySelector(".logout");
  
  // logOut.onclick = () => {
  //   sessionStorage.clear();
  //   location.reload();
  // };
  