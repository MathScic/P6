/**Page de connexion */

const form = document.querySelector(".container");
const inputEmail = document.querySelector(".container_input_email");
const inputPassword = document.querySelector(".container_input_password");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const settings = {
      method: "POST", //Méthod utiliser (GET, POST, PUT, DELETE...)
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
    };

    const response = await fetch(
      "http://localhost:5678/api/users/login",
      settings
    );

    if (response.ok) {
      const login = await response.json();
      console.log(login);
      localStorage.setItem("token", login.token);
      console.log(localStorage.getItem("token")); //Sauvegarde token
      window.location = "index.html"; //re direction sur page accueil
    }

    throw new Error("Mot de passe ou Identifiant invalide");
  } catch (error) {
    const erreurLogin = document.querySelector(".erreur_login");
    erreurLogin.innerText = `Mot de passe ou Identifiant invalide`;
    erreurLogin.style.color = "red";
    console.log(erreurLogin);
    console.log(error);
  }

  if (inputEmail) {
    const recupEmail = inputEmail.value;
    console.log(recupEmail);
  } else {
    console.log("");
  }
});

//message erreur error.message creer selecteur en html (div vide) dire quand je rentre dans catch je veut erreur message en rouge
//selector de la div vide + inner du text

//jwt json web token = permet identifier user

try {
  const response = await fetch("http://localhost:5678/api/works");
  let travaux = await response.json();
} catch (error) {
  console.log(error);
}
