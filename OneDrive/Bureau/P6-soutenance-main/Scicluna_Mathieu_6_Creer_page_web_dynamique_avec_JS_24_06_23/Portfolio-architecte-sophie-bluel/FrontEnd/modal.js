//Modal
import { travaux, displayTravaux } from "./script.js";
let modal = document.querySelector(".modal");
const modalImg = modal.querySelector(".modal-img");
let importImg;
const containerImg = document.querySelector(".container_suppression");

const openModal = async (e) => {
  const maxImg = 11;
  let counterImg = 0;

  travaux.forEach((image) => {
    console.log(image);
    const imgElement = document.createElement("img");
    imgElement.src = image.imageUrl;
    console.log("image element", imgElement);
    const lienSuppr = document.createElement("a"); // creer div avec img et lien pour adapter en css en absolute
    lienSuppr.classList.add("lien_suppr");
    lienSuppr.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    const div = document.createElement("div");
    div.append(lienSuppr);
    div.append(imgElement);
    containerImg.append(div);

    lienSuppr.addEventListener("click", async (e) => {
      // suppression en local
      containerImg.removeChild(div);

      // suppression dans l'API
      try {
        const login = localStorage.getItem("token");
        console.log(login.token);
        const response = await fetch(
          `http://localhost:5678/api/works/${image.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${login}`,
            },
          }
        );

        //
        //window.location.reload();
        const allWorksWithoutTheDeletedOne = travaux.filter(
          (work) => work.id !== image.id
        );

        displayTravaux(allWorksWithoutTheDeletedOne);
      } catch (e) {
        console.log(e);
      }
    });
  });

  modal.style.display = "flex"; //Sert a aficher la div de la modal
  modal.setAttribute("aria-hidden", "false"); //indique modal affiché (pour malvoyant) au lecteur d'écran
  modal.setAttribute("aria-modal", "true"); // indique que la div correspond a la modal
};

const closeModal = function (e) {
  const boutonAjouterDisplay =
    document.querySelector("#bouton-ajouter").style.display;
  console.log(boutonAjouterDisplay);
  if (boutonAjouterDisplay === "none") {
    console.log("close");
    //retour première modale
    document.querySelector(".container_suppression").style.display = "grid";
    document.querySelector(".ajout-photo").style.display = "none";
    document.querySelector("#bouton-ajouter").style.display = "block";
    document.querySelector(".titre-gallerie").style.display = "block";
    document.querySelector(".supr_container").style.display = "block";
  } else {
    containerImg.innerHTML = "";
    modal.style.display = "none"; //masque la div de la modal
    modal.setAttribute("aria-hidden", "true");
  }
};

document
  .querySelector(".js-modal")
  .addEventListener("click", () => openModal());
modal.querySelector(".js-modal-close").addEventListener("click", closeModal);

//Pour close la modal avec escape
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

//Ajouter photo (acces a la suite de la modal)
const addPhoto = document.querySelector(".js-modal-2");
const boutonAjoutPhoto = document.querySelector("#bouton-ajouter");

addPhoto.addEventListener("click", function () {
  document.querySelector(".container_suppression").style.display = "none";
  document.querySelector(".ajout-photo").style.display = "block";
});

const displayAjoutPhoto = () => {
  document.querySelector(".container_suppression").style.display = "none";
  document.querySelector(".ajout-photo").style.display = "block";
  document.querySelector("#bouton-ajouter").style.display = "none";
  document.querySelector(".titre-gallerie").style.display = "none";
  document.querySelector(".supr_container").style.display = "none";
};

//Permet acceder a la modal d'ajout photo
boutonAjoutPhoto.addEventListener("click", function (event) {
  event.preventDefault();
  displayAjoutPhoto();
});

const chooseFile = document.getElementById("choose-file");
const imgPreview = document.getElementById("img_preview");

chooseFile.addEventListener("change", function () {
  getImgData();
});

function getImgData() {
  const files = chooseFile.files[0]; //Permet acces a element file de l'input
  if (files) {
    const fileReader = new FileReader(); //Creer instance permettant lecture de fichier coté client
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src="' + this.result + '" />';
    });
    document.querySelector("label").style.display = "none";
    document.querySelector(".fa-regular").style.display = "none";
    document.querySelector(".size_max").style.display = "none";
  }
}

//formData
const formAddPicture = document.querySelector(".form-ajout-photo");

formAddPicture.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputFile = document.getElementById("choose-file");
  console.log(inputFile.files[0]);
  const inputTitle = document.querySelector("input[name=title]"); //On selectionne le Name
  console.log(inputTitle.value);
  const inputCategory = document.querySelector(".selectCategory");
  console.log(inputCategory.value);
  const formData = new FormData();
  formData.append("title", inputTitle.value);
  formData.append("category", inputCategory.value);
  formData.append("image", inputFile.files[0]);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(() => {
    window.location.reload(); //Permet de raffraichir en ajoutant des photos
  });
  /**try {
    const response = response.json();

    if (response.ok) {
      const modaleGallery = document.querySelector(".modal");
      modaleGallery.innerHTML = "";
      getImgData();
      alert("Nouvelle ressource DL");
    } else {
      alert("erreur DL new ressources");
    }
  } catch (error) {
    alert("erreur lors créa ressource", error);
  }**/
});

// Dynamiser categorie dans modifier
async function fetchCategorie() {
  const response = await fetch("http://localhost:5678/api/categories", {
    method: "GET",
  });

  if (response.ok === true) {
    return response.json();
  }
  throw new Error("Impossible de contacter serveur");
}

fetchCategorie().then((category) => {
  category.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.innerText = element.name;
    const select = document.querySelector(".selectCategory");
    select.appendChild(option); //Ajout de la balise option dans la select
  });
});
