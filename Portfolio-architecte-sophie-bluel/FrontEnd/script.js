let travaux;

try {
  const response = await fetch("http://localhost:5678/api/works");
  travaux = await response.json();
} catch (error) {
  console.log(error);
}

// const afficherTravaux = (data) => {

displayTravaux(travaux);

// add event listener

// 2 foreach pour html et event listener pour chaque catégorie creer
//+ methode filter pour filtrer le tableau et ensuite reconstruire le tableau
let categories;
/**const tableauCategories = [
  { id: 1, name: "Objets" },
  { id: 2, name: "Appartements" },
  { id: 3, name: "Hotels et restaurants" },
];**/
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

categories.forEach((category) => {
  console.log(category);
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");

  li.append(a);
  filtres.append(li);
  a.innerText = category.name;

  a.addEventListener("click", () => {
    console.log(category.name);
    console.log(category.id);
    filtreTravauxParCategorie(category.id);
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
