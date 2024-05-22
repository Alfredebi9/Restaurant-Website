document.addEventListener("DOMContentLoaded", function(event) {
  const loginForm = document.getElementById("loginForm");
  const registrationForm = document.getElementById("registrationForm");
  const allForms = loginForm || registrationForm;

  if (allForms) {
    allForms.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const alertBox = document.querySelector(".alert-box .alert");
      const formAction = event.target.getAttribute("action");

      try {
        const response = await fetch(formAction, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
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
          }, 3000); // Redirect after 3 seconds
        }
      } catch (error) {
        console.error("Error:", error);
        alertBox.textContent = "An error occurred. Please try again.";
      }
    });
  }
});
