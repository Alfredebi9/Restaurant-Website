// owl carousel
document.addEventListener('DOMContentLoaded', function () {
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

// Check if the 'username' cookie exists
const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='));

if (usernameCookie) {
  const username = usernameCookie.split('=')[1];
  document.getElementById('username-placeholder').innerText = username;
  document.getElementById('user-profile').setAttribute('title', username);

  // Initialize Bootstrap tooltip
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
} else {
  document.getElementById('username-placeholder').innerText = 'Guest';
}

function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/logout';
}



