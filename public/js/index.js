document.addEventListener('DOMContentLoaded', function (event) {
  event.preventDefault();
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

  // Check for 'username' cookie
  const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='));
  if (usernameCookie) {
    const username = usernameCookie.split('=')[1];
    document.getElementById('username-placeholder').innerText = username;
    document.getElementById('user-profile').setAttribute('title', username);

    // Initialize Bootstrap tooltip
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  } else {
    document.getElementById('username-placeholder').innerText = 'Guest';
  }
  
  function logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/logout';
  }


  document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Fetch the form data
    const formData = new FormData(this);
  
    // Send the form data to the server
    fetch('/submit-form')
      .then(response => response.json())
      .then(data => {
        // Target the p element with id "displaymessage"
        const messageParagraph = document.getElementById('displaymessage');
        // Set the innerHTML of the paragraph to the JSON message
        messageParagraph.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => console.error('Error:', error));
  });
  
});




