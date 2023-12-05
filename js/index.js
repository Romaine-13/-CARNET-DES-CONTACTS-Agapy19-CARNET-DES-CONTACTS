//initialize array of contact persons

let array_contacts;

if (getData() === null) {
    array_contacts = []
} else {
    array_contacts = getData();
    document.querySelector(".contain-content").innerHTML  = ""
    showContact(array_contacts)
}
//creation and initilize contact object
let contact = new Object()

//Link objects HTML and Js by DOM API
const input_txt_prenom = document.querySelector(".div-prenom__input");
const input_txt_nom = document.querySelector(".div-nom__input");
let input_email = document.querySelector(".div-email__input");
let span_error_message = document.querySelector(".div-email__error-message");
let input_phone =  document.querySelector(".div-phone__input");
let phoneNumber = input_phone
const div_image = document.querySelector(".contain-input__div-photo");
const input_image = document.querySelector(".contain-input__div-photo input")
let team_input = document.querySelector(".div-groupe__input");
let span_error_messag = document.querySelector(".div-groupe__error-message");
let btn = document.querySelector('.contain-button__create-clear');
let inputs = document.querySelectorAll('input');
const bio_input= document.querySelector('.div-bio__input');

/**
 * function to validate content
 * if return is -1: length of name is < 3
 * if return is =1: length of name is between 3 and 50
 * if return is 0: length of name is valid (between 3 and 50)
 * 
 * @param {string} param_name 
 */
function validLengthName(param_name) {
    if (param_name.length >= 3 && param_name.length <= 50) {
        return 0
    }
    else if (param_name.length < 3) {
        return -1
    } else {
        return 1
    }
}

/**
 * Manage Input Name
 * first Name
 * last Name
 * @param {object} input 
 * @param {string} error_message 
 * @param {object} error_element 
 */

function ManageInputName(error_message1, error_message2, error_element, input_element) {
    let out_state = validLengthName(input_element.value);
    if (out_state == 0) {
        error_element.textContent = "";
        input_element.setAttribute("style", "border-color: #C4C4C4; border-width: 1px");
        return true;
    }
    else {
        input_element.setAttribute("style", "border-color: #FF3838; border-style: solid; border-width: 3px");

        if (out_state == -1) {
            error_element.textContent = error_message1;
        }
        else {
            error_element.textContent = error_message2;
        }
        return false
    }
}
//Managment events input changed of input

//input for first name
input_txt_prenom.addEventListener("blur", () => {
    let message1, message2, element_error;
    message1 = "Votre prenom est trop court, Taille min acceptée: 3";
    message2 = "Votre prenom est trop long, Taille max acceptée: 50";
    element_error = document.querySelector(".div-prenom__error-message");
    let valid_prenom = ManageInputName(message1, message2, element_error, input_txt_prenom);
    
    if (valid_prenom) {
        contact.prenom = input_txt_prenom.value;
    }
})

//input for last name
input_txt_nom.addEventListener("blur", () => {
    let message1, message2, element_error;
    message1 = "Votre nom est trop court, Taille min acceptée: 3";
    message2 = "Votre nom est trop long, Taille max acceptée: 50";
    element_error = document.querySelector(".div-nom__error-message");
    valid_nom = ManageInputName(message1, message2, element_error, input_txt_nom);

    if (valid_nom) {
        contact.nom = input_txt_nom.value;
    }
})
// reset form
function clear(params) {
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].value = "";
    }
    contact.prenom = "";
    contact.nom = "";
    contact.telephone = "";
    contact.groupe = "";
    contact.email = "";
    contact.bio = "";
    contact.picture = "";
}
btn.addEventListener('click', () => {
    clear();
})
//  email function
function validateEmail(email) {
    
    let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    return emailReg.test(email);
}
input_email.addEventListener("blur", () => {
    if (validateEmail(input_email.value)) {
        input_email.setAttribute("style", "border-color: #C4C4C4; border-width: 1px");
        span_error_message.innerHTML = "";
        contact.email = input_email.value;    
    } 
    else {
        input_email.setAttribute("style", "border-color: #FF3838; border-style: solid; border-width: 3px");
        span_error_message.innerHTML = "Email invalide";
    }  
})
// validate Phone Number
function validatePhoneNumber(pPhone) {
    pPhone = pPhone.value
        if (pPhone === "") {
            phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
            document.querySelector(".div-phone__error-message").textContent = "Enter a valid number";
            return false;
        }
        else if (isNaN(pPhone)) {
            phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
            document.querySelector(".div-phone__error-message").textContent  = "enter only numeric value";
            return false;
        }
        else if (pPhone.length < 10) {
            phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
            document.querySelector(".div-phone__error-message").textContent  = "enter 10 digits phone number";
            return false;
        }
        else if (pPhone.length > 10) {
            phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
            document.querySelector(".div-phone__error-message").textContent  = "enter a valid phone number";
            return false;
        }
        else if (pPhone.charAt(0) != 0) {
            phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
            document.gquerySelector(".div-phone__error-message").textContent  = "your phone number must start with a 0";
            return false;
        }

        else{
            phoneNumber.setAttribute("style", "border-color: #C4C4C4; border-width: 1px");
            document.querySelector(".div-phone__error-message").textContent  = "";
            return true
        }
        
}

input_phone.addEventListener("blur", () => {
    let valid_phone = validatePhoneNumber(input_phone);
    if (valid_phone) {
        contact.telephone = input_phone.value
    }
})
// manage drag and drop 

// link between div_image and input image
div_image.addEventListener("click", ()=>{
    input_image.click();
})
input_image.addEventListener("change", function () {
    // on recupere le fichier selectionné du champ
    let file = this.files[0]
    // traitement et affichage image
    showFile(file)
  })
  // si le fichier est drop
  div_image.addEventListener(
    "drop",
    function (event) {
      // Empêche l'action par défaut (ouvrir comme lien pour certains éléments)
      event.preventDefault();
      // Déplace l'élément traîné vers la cible du drop sélectionnée
      let file  = event.dataTransfer.files[0]
      showFile(file)
    },
    false,
  );
  input_image.addEventListener("drag", (event)=>{
    event.preventDefault()
    let file = event.dataTransfer.files[0]
    showFile(file)
  })
  // traitement de la phase drag and drop
  // si l'utilisateur glisse le fichier au dessus du fichier
  
  div_image.addEventListener("dragover", (event)=>{
    event.preventDefault();
    // headerText.textContent = "Relachez pour uploader l'image"
    // dropChamp.classList.add("active");
  })
  
  // si le fichier quitte le champ de drag
  div_image.addEventListener("dragleave", (event)=>{
    // dropChamp.classList.remove("active");
  })
//   // si l'image quitte par dessusle drage
//   dropChamp.addEventListener("dragleave", (event)=>{
//     headerText.textContent = "Glisser et deposer pour changer le style"
//   })
  function showFile(file) {
    const span_error_message = document.querySelector(".div-photo__error-message");
    span_error_message.setAttribute("style", "text-align:center;");
    // on recupère le type de fichier
    const fileType = file.type;
    const fileSize = file.size;
    const fileExtension = ['image/jpeg', 'image/jpg', 'image/png']
    // on vérifie la validité du type de fichier
    if (fileExtension.includes(fileType) && (fileSize/1000000) <= 5) {
        span_error_message.innerHTML= ""
        div_image.setAttribute("style", "border-color: #C4C4C4; border-width: 1px");
        let fileReader = new FileReader
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let fileUrl = fileReader.result
            let imageTag = document.createElement("img")
            imageTag.src = fileUrl;
            //stock iurl image 
            contact.picture = fileUrl
            imageTag.alt = 'Image'
            imageTag.setAttribute("style", "width: 100%; height: 100%; object-fit: contain")
            div_image.innerHTML = ""
            div_image.appendChild(imageTag)
        }
    }
    else {
        div_image.setAttribute("style", "border-color: #FF3838; border-width: 3px");
        if (!fileExtension.includes(fileType)) {
            span_error_message.innerHTML="Format image invalide: Format accepté: jpeg, jpg et png";
        }
        else{
            span_error_message.innerHTML = "fichier volumineux: Taille max: 5Mo";
        }
      
    }
  }
/**
 * show data of contact
 * @param {Array} pArrayContacts 
 */
function showContact(pArrayContacts) {
    for (let index = 0; index < pArrayContacts.length; index++) {
        // link html and js by DOM
        const contain_content = document.querySelector(".contain-content");
        const div_contain_contain_info = document.createElement("div");
        const contain_info_div_img = document.createElement("div");
        const image_profil = document.createElement("img");
        const div_header = document.createElement("div");
        const contain_info_div_text = document.createElement("div");
        const nom_groupe = document.createElement("strong");
        const div_paragraphe_icon = document.createElement("p");
        const icon_modify = document.createElement("i");
        const icon_delete = document.createElement("i");
        const p_phone = document.createElement("p");
        const p_a_propos = document.createElement("p");

        // add class Name to element created
        div_contain_contain_info.classList.add("right-main__contain-info");
        contain_info_div_img.classList.add("right-main__contain-info__div-img");
        div_header.classList.add("contain-info__div-text__div-header")
        contain_info_div_text.classList.add("right-main__contain-info__div-text");
        nom_groupe.classList.add("div-text__div-header__nom-groupe");
        p_phone.classList.add("contain-info__div-text__phone");
        p_a_propos.classList.add("contain-info__div-text__bio");
        image_profil.classList.add("img-contact");
        
        // complet text content in element
        icon_modify.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" class="ico-modify"
            viewBox="0 0 640 512">
            <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
            </svg>
            
        `

        icon_delete.innerHTML = ` 
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" class="ico-delete"
            viewBox="0 0 448 512">
            <path
                d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
        `
        let prenom_show = pArrayContacts[index].prenom;
        let nom_show = pArrayContacts[index].nom;
        let groupe_show = pArrayContacts[index].groupe;
        let telephone_show = pArrayContacts[index].telephone;
        let biographie_show =  pArrayContacts[index].bio;
        let src_picture = pArrayContacts[index].picture;
        
        // full element of contact list
        p_a_propos.innerHTML = "<span>Qui est " + prenom_show +" "+ nom_show +"?<br>"+biographie_show
        p_phone.innerText = telephone_show;
        nom_groupe.innerText = prenom_show +" "+ nom_show +" - "+groupe_show
        image_profil.src = src_picture;
        image_profil.alt = "photo profil de "+ prenom_show +" "+ nom_show;
        // include children element in parents
        div_paragraphe_icon.appendChild(icon_modify);
        div_paragraphe_icon.appendChild(icon_delete);
        div_header.appendChild(nom_groupe);
        div_header.appendChild(div_paragraphe_icon);
        contain_info_div_img.appendChild(image_profil);
        contain_info_div_text.appendChild(div_header);;
        contain_info_div_text.appendChild(p_phone);
        contain_info_div_text.appendChild(p_a_propos);

        div_contain_contain_info.appendChild(contain_info_div_img);
        div_contain_contain_info.appendChild(contain_info_div_text);
        contain_content.appendChild(div_contain_contain_info);

        let  icon_delete_all = document.querySelectorAll(".ico-delete");
        let icon_modify_all = document.querySelectorAll(".ico-modify");
        setClassIcon(icon_delete_all, icon_modify_all);
        
    }
}

function setClassIcon(p_icond_deletes, p_icond_modifies) {
    for (let index = 0; index < p_icond_deletes.length; index++) {
        p_icond_deletes[index].classList.add("d"+index);
        p_icond_modifies[index].classList.add("m"+index);
        
}
}
// créer contact
function addContacts(pContact) {
    array_contacts.unshift(pContact)
    saveData(array_contacts)
}
const btn__create = document.querySelector(".contain-button__create-btn")
btn__create.addEventListener("click",()=>{
    if (contact.prenom == "" ||
    contact.nom == "" ||
    contact.telephone == "" ||
    contact.groupe == "" ||
    contact.email == "" ||
    contact.bio == "" ||
    contact.picture == "") {
        
        alert("veuillez renseigner tous les champs obligatoires");
    } else {
        addContacts(contact);
        document.querySelector(".contain-content").innerHTML  = ""
        showContact(array_contacts);
        clear()
    }
})
// Save data
function saveData(arrayContacts) {
    localStorage . setItem ( 'contacts'  , JSON  . stringify ( arrayContacts )); 
}
function getData() {
    return  JSON.parse(localStorage.getItem('contacts'));
   
}
// //   validation groupe
// let team_input = team_input.value
function validateGroupe(team2) {
    const RegExp = /[A-Za-z0-9\w]*[a-zA-Z0-9\w]{10,20}/;
    return RegExp.test(team2);
}
team_input.addEventListener("blur", () => {
    if (validateGroupe(team_input.value)){
        team_input.setAttribute("style","border-color: #C4C4C4; border-width: 1px");
        span_error_message.innerHTML = "" ;
        contact.groupe = team_input.value;
    } else{
        team_input.setAttribute("style", "border-color: #FF3838; border-style: solid; border-width: 3px");
        span_error_messag .innerHTML ="veiller saisir la longueur exacte";
    }
})

bio_input.addEventListener("blur", () => {
    let span=document.querySelector(".div-bio__error-message");
    if (validateGroupe(bio_input.value)){
        bio_input.setAttribute("style","border-color: #C4C4C4; border-width: 1px");
        span_error_message.innerHTML = "" ;
        contact.bio = bio_input.value;
    } else{
        bio_input.setAttribute("style", "border-color: #FF3838; border-style: solid; border-width: 3px");
        span.innerHTML ="veiller saisir la longueur exacte";
    }
})
    
function deleteAll() {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
}