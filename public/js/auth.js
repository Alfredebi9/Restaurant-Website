

document.addEventListener("DOMContentLoaded", function() {
  event.preventDefault();  
  // form validation
  
  const name = document.querySelector(".name") || null;
  const email = document.querySelector(".email");
  const password = document.querySelector(".password");
  const submitBtn = document.querySelector(".submit-btn");
  
  if (name == null) {
    // Form fields are not empty, proceed with registration
    submitBtn.addEventListener("click", () => {
      event.preventDefault(); 
      fetch("/login-user", {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          validateData(data);
        });
    });
  } else {
    submitBtn.addEventListener("click", () => {
      event.preventDefault();
      fetch("/register-user", {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          validateData(data);
        });
    });
  }
  
  const validateData = (data) => {
    if (!data.name) {
      alertBox(data);
    } else {
      alert('login successful')
      sessionStorage.name = data.name;
      sessionStorage.email = data.email;
      location.href = "/";
    }
  };
  
  const alertBox = (data) => {
    const alertContainer = document.querySelector(".alert-box");
    const alertMsg = document.querySelector(".alert");
    alertMsg.innerHTML = data;
  
    alertContainer.style.top = "5%";
    setTimeout(() => {
      alertContainer.style.top = null;
    }, 5000);
  };
  
});