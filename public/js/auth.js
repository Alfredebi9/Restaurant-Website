document.addEventListener("DOMContentLoaded", function (event) {
  const loginForm = document.getElementById("loginForm");
  const registrationForm = document.getElementById("registrationForm");
  const bookingForm = document.getElementById("booking-form");
  const newsForm = document.getElementById("news-form");
  const contactform = document.getElementById("contact-form")

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const alertBox = document.querySelector(".alert-box .alert");
      const formAction = event.target.getAttribute("action");

      try {
        const response = await fetch(formAction, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        alertBox.textContent = result.message;

        // Slide down animation
        const alertContainer = document.querySelector(".alert-box");
        alertContainer.style.transition = "top 1s ease-in-out";
        alertContainer.style.top = "5%";

        // Reset the top property after 3 seconds
        setTimeout(() => {
          alertContainer.style.top = null;
        }, 2500);

        // Check if response is OK after displaying the message
        if (response.ok) {
          // Wait for the message to be displayed before redirecting
          setTimeout(() => {
            window.location.href = result.redirect;
          }, 3500); // Redirect after 3 seconds
        }
      } catch (error) {
        console.error("Error:", error);
        alertBox.textContent = "An error occurred. Please try again.";
      }
    });
  }

  if (registrationForm) {
    registrationForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.querySelector("#username").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const alertBox = document.querySelector(".alert-box .alert");
      const formAction = event.target.getAttribute("action");

      try {
        const response = await fetch(formAction, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        alertBox.textContent = result.message;

        // Slide down animation
        const alertContainer = document.querySelector(".alert-box");
        alertContainer.style.transition = "top 1s ease-in-out";
        alertContainer.style.top = "5%";

        // Reset the top property after 3 seconds
        setTimeout(() => {
          alertContainer.style.top = null;
        }, 2000);

        // Check if response is OK after displaying the message
        if (response.ok) {
          // Wait for the message to be displayed before redirecting
          setTimeout(() => {
            window.location.href = result.redirect;
          }, 3500); // Redirect after 3 seconds
        }
      } catch (error) {
        console.error("Error:", error);
        alertBox.textContent = "An error occurred. Please try again.";
      }
    });
  }


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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, people_No, message }),
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
        if (response.ok) {
          document.querySelector("#name").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#people_No").value = "";
          document.querySelector("#message").value = "";
        }
      } catch (error) {
        console.error("Error:", error);
        alertBox.textContent = "An error occurred. Please try again.";
      }
    });
  }

  if (newsForm) {
    newsForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.querySelector(".email").value;
      const alertBox = document.querySelector("#alerts-box #alerts");
      const formAction = event.target.getAttribute("action");

      try {
        const response = await fetch(formAction, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const result = await response.json();
        alertBox.textContent = result.message;

        // show the alert box
        const alertContainer = document.querySelector("#alerts-box");
        alertContainer.style.display = "flex";

        // Reset the  display property after 2 seconds
        setTimeout(() => {
          alertContainer.style.display = "none";
        }, 2500);
        if (response.ok) {
          document.querySelector(".email").value = "";
        }
      } catch (error) {
        console.error("Error:", error);
        alertBox.textContent = "An error occurred. Please try again.";
      }
    });
  }
  if (contactform) {
    contactform.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const subject = document.querySelector("#subject").value;
      const message = document.querySelector("#message").value;
      const alertBox = document.querySelector(".alerts-box .alerts");
      const formAction = event.target.getAttribute("action");

      try {
        const response = await fetch(formAction, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        });
        const result = await response.json();
        alertBox.textContent = result.message;

        // show the alert box
        const alertContainer = document.querySelector(".alerts-box");
        alertContainer.style.display = "flex";

        // Reset the  display property after 2 seconds
        setTimeout(() => {
          alertContainer.style.display = "none";
        }, 2500);
        if (response.ok) {
          document.querySelector("#name").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#subject").value = "";
          document.querySelector("#message").value = "";
        }
      } catch (error) {
        console.log("Error", error);
        alertBox.textContent = "An error occured. Please try again"
      }
    })
  }

});


