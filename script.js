//jshint esversion:6
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement; //the input's parent is the form-control div
  formControl.className = "form-control error"; //change class to error
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement; //the input's parent is the form-control div
  formControl.className = "form-control success"; //change class to showSuccess
}

// Check email is valid (from stackOverFlow)
function checkEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if(input.value.trim() ==="") { // trim to remove any white space
      showError(input, getFieldName(input) + " is required"); //the id's that were specified in html
    } else {
      showSuccess(input);
    }
  });
}



// checkLength of required inputs
function checkLength (input, min, max) {
  if(input.value.length < min) {
  showError(input, getFieldName(input) + " must be at least " + min + " characters");
} else if (input.value.length > max) {
  showError(input, getFieldName(input) + " must be less than " + max + " characters");
} else {
  showSuccess(input);
}
}

// Check if passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match")
  }
}


// Get fieldname, capitalize 1st letter
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//************************************ Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2)
});
