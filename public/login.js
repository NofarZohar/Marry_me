function load() {
  // Add button event listeners
  const loginButton = document.getElementById("login");
  loginButton.addEventListener("click", login);
  const signupButton = document.getElementById("signup");
  signupButton.addEventListener("click", signup);
}

function getFormValues() {
  const username = document.getElementById("name");
  const password = document.getElementById("password");

  return [username.value, password.value];
}

function setError(error) {
  const err = document.getElementById("error");
  err.innerHTML = error;
}

function login() {
  setError("");
  const [username, password] = getFormValues();
  if (username.length === 0 || password.length === 0) {
    setError("Please enter username and password!");
    return;
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    username,
    password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  
  fetch("http://localhost:3000/login", requestOptions)
    .then((response) => response.text())
    .then((resultText) => {
      const result = JSON.parse(resultText);
      if (result.success) {
        // save the token
        window.localStorage.setItem("id", result.user._id);
        // redirect
        window.location.href = "index.html";
      } else {
        setError(result.error);
      }
    })
    .catch((error) => {
      console.log(error);
      setError("Error in login");
    });
}

function signup() {
  setError("");
  const [username, password] = getFormValues();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    username,
    email: username,
    password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:3000/register", requestOptions)
    .then((response) => response.text())
    .then((resultText) => {
      const result = JSON.parse(resultText);
      if (result.success) {
        // save the token
        localStorage.setItem("id", result.id);
        alert("Signup successful, login to continue");
      } else {
        setError(result.error);
      }
    })
    .catch((error) => {
      console.log(error);
      setError("Error in login");
    });
}
