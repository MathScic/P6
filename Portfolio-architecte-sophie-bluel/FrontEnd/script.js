let travaux;

try {
  const response = await fetch("http://localhost:5678/api/works");
  travaux = await response.json();
} catch (error) {
  console.log(error);
}

displayTravaux(travaux);

let categories;

let id;

/**Filtres travaux */
try {
  const response = await fetch("http://localhost:5678/api/categories");
  categories = await response.json();
} catch (error) {
  console.log(error);
}

const filtres = document.querySelector(".filtres");
const gallery = document.querySelector(".gallery");

//Ajout de TOUS
const li = document.createElement("li"); //Creer balise "li"
const a = document.createElement("a");
a.setAttribute("href", ""); //Ajoute element a la balise a
li.append(a); //Ajout de la balise a à la const li
filtres.append(li); // Ajout de la balise li a la const filtres
a.innerText = "Tous"; // Ajout de texte
a.addEventListener("click", (event) => {
  //Creation evenement qui réagis au clique
  event.preventDefault(); //Evite effet
  displayTravaux(travaux);
});

//AJout class active pour garder fond en vert

categories.forEach((category) => {
  console.log(category);
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "");

  li.append(a);
  filtres.append(li);
  a.innerText = category.name;

  a.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(category.name);
    console.log(category.id);
    filtreTravauxParCategorie(category.id);
    const changeColorClick = li.classList.add("backgroundFilter");
    changeColorClick.style.backgroundColor = "#1D6154";
    console.log(changeColorClick);
  });
});

const filtreTravauxParCategorie = (categoryId) => {
  console.log(categoryId);
  const filtreTravaux = travaux.filter((travail) => {
    return categoryId === travail.categoryId;
  });
  gallery.innerHTML = "";

  displayTravaux(filtreTravaux);
  console.log(filtreTravaux);
};

function displayTravaux(travaux) {
  let firstTravaux = document.querySelector(".gallery");
  firstTravaux.innerHTML = "";
  travaux.forEach((travail) => {
    firstTravaux.innerHTML += `<figure class="categories"> 
    <img src="${travail.imageUrl}" alt="${travail.title}" />
    <figcaption>${travail.title}</figcaption>
  </figure>`;
  });
}

export { travaux, displayTravaux };

//modifier ce retir quand on est pas connecter
console.log(localStorage.getItem("token"));

if (localStorage.getItem("token")) {
  const logout = document.getElementById("loginLogout");
  logout.innerHTML = `logout`;
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(); //raffraichir la page automatiquement
  });
} else {
  const modifier = document.querySelector(".js-modal");
  console.log(modifier);
  modifier.style.display = "none";
}
