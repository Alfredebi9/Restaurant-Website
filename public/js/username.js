document.addEventListener("DOMContentLoaded",()=>{
  // Check for 'username' cookie
  const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='));

  if (usernameCookie) {
    const username = usernameCookie.split('=')[1];
    const usernameElement = document.getElementById('username-placeholder');
    if (usernameElement) {
      usernameElement.innerText = username;
    }

    const userProfileElement = document.getElementById('user-profile');
    if (userProfileElement) {
      userProfileElement.setAttribute('title', username);

      // Initialize Bootstrap tooltip
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  } else {
    const usernameElement = document.getElementById('username-placeholder');
    if (usernameElement) {
      usernameElement.innerText = 'Guest';
    }
  }
})