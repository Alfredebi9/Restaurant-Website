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

  
  const bookingForm = document.getElementById("booking-form");
  const newsForm = document.getElementById("news-form");

  if (bookingForm) {
      bookingForm.addEventListener("submit", async (event) => {
          event.preventDefault();

          const name = document.querySelector("#name").value;
          const email = document.querySelector("#email").value;
          const people_No = document.querySelector("#people_No").value;
          const message = document.querySelector("#message").value;
          const alertBox = document.querySelector(".alerts-box .alerts");
          const formAction = event.target.getAttribute("action");

          try {
              const response = await fetch(formAction, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ name, email, people_No, message })
              });
              const result = await response.json();
              alertBox.textContent = result.message;

              // show the alert box
              const alertContainer = document.querySelector(".alerts-box");
              alertContainer.style.display = "flex";

              // Reset the  display property after 2 seconds
              setTimeout(() => {
                  alertContainer.style.display = "none";
              }, 2000);
          } catch (error) {
              console.error("Error:", error);
              alertBox.textContent = "An error occurred. Please try again.";
          }
      });
  }

  if (newsForm) {
    newsForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        const alertBox = document.querySelector("#alerts-box #alerts");
        const formAction = event.target.getAttribute("action");

        try {
            const response = await fetch(formAction, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            alertBox.textContent = result.message;

            // show the alert box
            const alertContainer = document.querySelector("#alerts-box");
            alertContainer.style.display = "flex";

            // Reset the  display property after 2 seconds
            setTimeout(() => {
                alertContainer.style.display = "none";
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
            alertBox.textContent = "An error occurred. Please try again.";
        }
    });
}

});


function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/logout';
}