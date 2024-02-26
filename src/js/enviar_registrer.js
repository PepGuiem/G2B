document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
      window.location.href = "login.html";
    });
  });