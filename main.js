const emailField = document.getElementById("username")
const passwordField = document.getElementById("password")

// login function
function validate() {
	let emailFieldValue = emailField.value;
  let passwordFieldValue = passwordField.value;
  const dataToSend = JSON.stringify({
    "email": emailFieldValue,
    "password": passwordFieldValue 
  });
  console.log(dataToSend)
  fetch("https://reqres.in/api/login", {
      redirect: 'follow',
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: dataToSend
    })
    .then(resp => {
      if (resp.status === 200) {
        return resp.json()
      } else {
        return Promise.reject("server")
      }
    })
    .then(dataJson => {
			loginSuccess();
    })
    .catch(err => {
    	alert("whoops wrong email or password")
    })
 
}
//createar en html tag som jag anropar i showUsersBtn onclick eventet.
function createNode(element) {
  return document.createElement(element);
}

function loginSuccess() {
  url = "https://reqres.in/api/users?page=2"

  const userList = document.querySelector(".ulList");
  const userImage = document.querySelector(".userImage");
  const userFullName = document.querySelector(".userFullName");
  const userEmail = document.querySelector(".userEmail");
  const showUsersBtn = document.querySelector(".showUsers");
  showUsersBtn.disabled = false;

  // fetchar url och använder informationen till att fylla en lista. 
  showUsersBtn.addEventListener("click", function() {
    fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
        let users = data.data;
        return users.map(function(user) {
          //gör en ny lista och fyller den med användarnas förnamn
          let li = createNode('li');
          li.innerHTML = `${user.first_name}`;
          //när man klickar på en person i listan visas deras avatar, för och efternamn samt email.
          li.addEventListener("click", function() {

            userImage.src = `${user.avatar}`;
            userFullName.innerHTML = `${user.first_name} ${user.last_name}`;
            userEmail.innerHTML = `${user.email}`;

          });
          userList.appendChild(li);
        });
      });
  });
}