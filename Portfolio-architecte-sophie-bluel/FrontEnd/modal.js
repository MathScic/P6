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
        const response = await fetch(
          `http://localhost:5678/api/works/${image.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        //

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
  containerImg.innerHTML = "";
  modal.style.display = "none"; //masque la div de la modal
  modal.setAttribute("aria-hidden", "true");
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

//
const addPhoto = document.querySelector(".js-modal-2");
const retourModal = document.querySelector("#img-container");

addPhoto.addEventListener("click", function () {
  document.querySelector(".container_suppression").style.display = "none";
  document.querySelector(".ajout-photo").style.display = "block";
});

retourModal.addEventListener("click", function () {
  document.querySelector(".container_suppression").style.display = "none";
  document.querySelector("#bouton-ajouter").style.display = "none";
  document.querySelector(".titre-gallerie").style.display = "none";
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
  }
}

const formData = new FormData();
const titleData = document.querySelector(".ajout-photo");

formData.append("title", titleData.value);
