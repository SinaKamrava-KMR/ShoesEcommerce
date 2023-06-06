/* ==============================Imports================================= */
import { Request } from "../services/request.js";
import { Page } from "../utilities/page.js";
import { Catch } from "../utilities/catch.js";

const storage = new Catch();
const page = new Page();
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const RememberCheck = document.getElementById("login-Remember");
const loginBtn = document.getElementById("login-btn");
(() => {


  if (storage.checkUser()) {
    const member = storage.getUser();
    if (member.checkout == 'off') {
      page.go('index')
    } else {
      emailInput.value = member.email;
      passwordInput.value = member.password;
      RememberCheck.checked = member.remember == 'on' ? true : false;
      loginBtn.classList.remove('deactive-btn')
    }
  } 

  
})()

/* ==============================Variables================================= */



const showPass = document.getElementById("show-pass");
const passwordError = document.getElementById("password-error");
const emailError = document.getElementById("email-error");
const loginModal = document.querySelector(".login-modal");
const back = document.querySelector(".back-icon");
const passwordIcon = document.getElementById("password-icon");
const emailIcon = document.getElementById("email-icon");

const eyeOpen = `<i class="bi bi-eye-fill"></i>`;
const eyeClose = ` <i class="bi bi-eye-slash-fill"></i>`;

/* ================================================================ */



/* ==============================addEventListeners================================= */

emailInput.addEventListener("focus", (e) => {
  emailInput.closest(".login-input").style.border = `1px solid #555`;
});

emailInput.addEventListener("focusout", (e) => {
  emailInput.closest(".login-input").style.border = `0`;
});

passwordInput.addEventListener("focus", (e) => {
  passwordInput.closest(".login-input").style.border = `1px solid #555`;
});

passwordInput.addEventListener("focusout", (e) => {
  passwordInput.closest(".login-input").style.border = `0`;
});

passwordInput.addEventListener("keydown", (e) => {
  checkBtnState();
});

emailInput.addEventListener("keydown", (e) => {
  checkBtnState();
});

showPass.addEventListener("click", () => {
  if (passwordInput.type == `text`) {
    passwordInput.type = `password`;
    showPass.innerHTML = eyeClose;
  } else {
    passwordInput.type = `text`;

    showPass.innerHTML = eyeOpen;
  }
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!loginBtn.classList.contains("deactive-btn")) {
    if (checkValidation()) {
      const user = {
        email: emailInput.value,
        password: passwordInput.value,
        remember: RememberCheck.checked ? "on" : 'off',
        checkout:'off'
      };

      storage.setUser(user);
      findUser(user);
      
    }
  }
});

back.addEventListener('click', () => {
  storage.setSplashstate('off')
  page.go('landing');
})
/* =================================Functions====================================== */

function checkBtnState() {
  if (emailInput.value == "") {
    emailIcon.classList.add("text-gray-400");
    emailIcon.classList.remove("text-gray-800");
  } else {
    emailIcon.classList.add("text-gray-800");
    emailIcon.classList.remove("text-gray-400");
  }

  if (passwordInput.value == "") {
    passwordIcon.classList.add("text-gray-400");
    showPass.classList.add("text-gray-400");
    passwordIcon.classList.remove("text-gray-800");
    showPass.classList.remove("text-gray-800");
  } else {
    passwordIcon.classList.add("text-gray-800");
    showPass.classList.add("text-gray-800");
    passwordIcon.classList.remove("text-gray-400");
    showPass.classList.remove("text-gray-400");
  }

  if (emailInput.value != "" && passwordInput.value != "") {
    loginBtn.classList.remove("deactive-btn");
  } else {
    loginBtn.classList.add("deactive-btn");
  }
}

function checkValidation() {
  if (emailInput.value == "" || !emailInput.value.includes("@")) {
    console.log("invalid  eamil");
    emailError.classList.remove("hidden");
    return false;
  }
  if (passwordInput.value == "") {
    console.log("invalid  password");
    passwordError.classList.remove("hidden");
    return false;
  }
  passwordError.classList.add("hidden");
  emailError.classList.add("hidden");
  return true;
}

function showModal() {
  loginModal.classList.add("animate-comeUp");
  loginModal.classList.remove("animate-backUp");
  setTimeout(() => {
    loginModal.classList.remove("animate-comeUp");
    loginModal.classList.add("animate-backUp");
  }, 3000);
}

function findUser(user) {
  const request = new Request("http://localhost:3000/");

  request
    .get("users")
    .then((users) => {
      if (checkUserValidation(user, users)) {
        console.log("go to index page");
        page.go('index');
      } else {
        showModal()
      }

    })
    .catch((error) => {
      console.log(error);
    });
}


function checkUserValidation(user, users) {
  let isValid = false;
  users.forEach(member => {
    if (member.email === user.email && member.password === user.password) {
      isValid = true;
    }
  });

  return isValid;
}
