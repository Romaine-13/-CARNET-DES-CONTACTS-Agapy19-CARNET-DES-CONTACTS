//initialize array of contact persons
let contacts = [];

if (getData() === null) {
    contacts = []
} else {
    contacts = getData();
    document.querySelector(".contain-content").innerHTML  = ""
    showContact(contacts)
}

//creation and initilize contact object
let contact = new Object();

// Save data
function saveData(contacts) {
    localStorage . setItem ( 'contacts'  , JSON  . stringify ( contacts )); 
}
function getData() {
    return  JSON.parse(localStorage.getItem('contacts'));
}

//Link objects HTML and Js by DOM API
const inputs = document.querySelectorAll("input");
const error_messages = document.querySelectorAll(".style-error-message");
const button = document.querySelectorAll("button");
const div_container_image = document.querySelector(".contain-input__div-photo");
const div_image = document.querySelector(".contain-input__div-photo__photo");

function isValidInput(regex_expression, input_value) {
    const expression_regex = new RegExp(regex_expression);
    if (expression_regex.test(input_value.value)) {
        return true;
    } else {
        return false;
    }
    
}


function isUnique(contacts, input_value) {
    const exist_values = [];
    const type_input = input_value.type;

    if (contacts.length > 0) {
        if (type_input =="tel") {
            contacts.forEach(element => {exist_values.push(element.telephone)});  
        }
        else{contacts.forEach(element => {exist_values.push(element.email)});}
        if (exist_values.includes(input_value.value)) {
            return false
        } 
        else {
            return true
        }
    }
    else{return true}
}

/**
 * correct message configuration
 * @param {object} input 
 * @param {object} elementError 
 */

function configCorrectMessage(input, elementError) {
    elementError.textContent = "";
    input.setAttribute("style", "border-color: #C4C4C4; border-width: 1px");
}

/**
 * Error message configuration
 * @param {object} input 
 * @param {object} elementError 
 * @param {string} errorMessage 
 */
function configErrorMessage(input, elementError, errorMessage) {
    elementError.textContent = errorMessage;
    input.setAttribute("style", "border-color: #FF3838; border-style: solid; border-width: 3px");   
}

/**
 * function to validate length value of input
 * @param {*} input 
 */
function validMinSize(input, min_size) {
    if (input.value.length >= min_size) {
        return true
    }
    else {
        return false
    }
}

/**
 * function to validate length value of input
 * @param {*} input 
 */
function validMaxSize(input, max_size) {
    if (input.value.length <= max_size) {
        return true
    }
    else {
        return false
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


//Managment events input changed of input

//valid prenom
inputs[0].addEventListener("blur", () => {
    const message_error = "la longueur de votre prenom doit etre entre 3 et 50 caractères";
    const min_size = 3, max_size = 50
    if (validMinSize(inputs[0], min_size) && validMaxSize(inputs[0], max_size)) {
        contact.prenom = inputs[0].value;
        configCorrectMessage(inputs[0], error_messages[0]);
    } else {
        configErrorMessage(inputs[0], error_messages[0],message_error);
    }
});

//valid nom
inputs[1].addEventListener("blur", () => {
    const message_error = "la longueur de votre nom doit etre entre 3 et 50 caractères";
    const min_size = 3, max_size = 50
    if (validMinSize(inputs[1], min_size) && validMaxSize(inputs[1], max_size)) {
        contact.nom = inputs[1].value;
        configCorrectMessage(inputs[1], error_messages[1]);
    } else {
        configErrorMessage(inputs[1], error_messages[1],message_error);
    }
});

// valid Phone Number
function validatePhoneNumber(phone, errorElement) {

    const min_size = 10, max_size = 10;
        
    if (isNaN(phone.value)) {
        configErrorMessage(phone,errorElement, "Votre Numéro ne doit comporter que des chiffres"); 
    }
    else if (!(validMinSize(phone, min_size) && validMaxSize(phone, max_size))) {
        configErrorMessage(phone,errorElement, "Votre Numéro doit comporter 10 chiffres"); 
    } 
    else if(!isValidInput("^(084|085|080|089|081|082|083|099|097|090)[0-9]{7}$", phone)){
        configErrorMessage(phone,errorElement, "Format Numéro invalide");
    }
    else if(!isUnique(contacts, phone)){
        configErrorMessage(phone,errorElement, "Ce numéro existe dejà");
    }
    else{
        configCorrectMessage(phone,errorElement); 
        contact.telephone = phone.value
    }    
}

inputs[2].addEventListener("blur", () => {
    validatePhoneNumber(inputs[2], error_messages[2]); 
});


// valid groupe
inputs[3].addEventListener("blur", () => {
    if(!isValidInput("^([A-Za-z])[A-Za-z0-9]{2,}$", inputs[3])){
        configErrorMessage(inputs[3],error_messages[3], "Le nom d groupe doit commencer par une lettre, doit comporter seulement les lettres et chiffres, doit avoir une taille min de 2");
    }
    else{
        configCorrectMessage(inputs[3],error_messages[3]);
        contact.groupe = inputs[3].value
    }
});

//  email function
inputs[4].addEventListener("blur", () => {
    if (!isValidInput("^[a-zA-Z0-9]+[\@][a-zA-Z]+\.[a-zA-Z]{2,6}$", inputs[4])){
        configErrorMessage(inputs[4], error_messages[4],"adresse mail invalide") ;
    } 
    else if(!isUnique(contacts, inputs[4])) {
        configErrorMessage(inputs[4], error_messages[4],"Cet adresse mail existe dejà")
    } 
    else{
        contact.email = inputs[4]
        configCorrectMessage(inputs[4], error_messages[4]);
    }  
});

//valid bio
inputs[5].addEventListener("blur", () => {
    const min_size = 20;
    if(!validMinSize(inputs[5], min_size)){
        configErrorMessage(inputs[5],error_messages[5], "votre biographie doit comporter 20 caractères au minimum");
    }
    else{
        configCorrectMessage(inputs[5],error_messages[5]);
        contact.bio = inputs[5].value
    }
});

// valid image profile
function getUrl(file) {
    const fileType = file.type;
    const fileSize = file.size;
    const fileExtension = ['image/jpeg', 'image/jpg', 'image/png']
    // on vérifie la validité du type de fichier
    if (!fileExtension.includes(fileType)) {
        configErrorMessage(inputs[6],error_messages[6],"extension non prise en charge. choisissez un PNG JPG ou JPEG");
    }

    else if ((fileSize/1000000) > 5){
        configErrorMessage(inputs[6],error_messages[6],"image trop volumineuse. le poids max est de 5Mo");
    }
    else {
        configCorrectMessage(inputs[6], error_messages[6])
        let fileReader = new FileReader;
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let url_image = fileReader.result
            contact.picture = url_image
            let imageTag = document.createElement("img");
            imageTag.src = url_image;
            imageTag.alt = 'Image'
            imageTag.setAttribute("style", "width: 100%; height: 100%; object-fit: contain")
            div_image.innerHTML = ""
            div_image.appendChild(imageTag);
        }

    }
}

div_container_image.addEventListener("click",()=>{inputs[6].click();})

div_container_image.addEventListener("drop",(event)=>{
    event.preventDefault()
    getUrl(event.dataTransfer.files[0]);
    console.log(contact.picture);
})

div_container_image.addEventListener("dragover",(event)=>{
    event.preventDefault()
},false);

inputs[6].addEventListener("change", function () {
    getUrl(this.files[0])
});

inputs[6].addEventListener("drop", (event)=> {
    getUrl(this.files[0])
});



// /**
//  * show data of contact
//  * @param {Array} contacts 
//  */
function showContact(contacts) {
    for (let index = 0; index < contacts.length; index++) {
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
        div_header.classList.add("contain-info__div-text__div-header");
        contain_info_div_text.classList.add("right-main__contain-info__div-text");
        nom_groupe.classList.add("div-text__div-header__nom-groupe");
        p_phone.classList.add("contain-info__div-text__phone");
        p_a_propos.classList.add("contain-info__div-text__bio");
        image_profil.classList.add("img-contact");

        // complet text content in element
        icon_modify.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" class="ico-modify"
            viewBox="0 0 640 512" onclick="" >
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
        let prenom_show = contacts[index].prenom;
        let nom_show = contacts[index].nom;
        let groupe_show = contacts[index].groupe;
        let telephone_show = contacts[index].telephone;
        let biographie_show =  contacts[index].bio;
        let src_picture = contacts[index].picture;
        
        // full element of contact list
        p_a_propos.innerHTML = "<span>Qui est " + prenom_show + " " + nom_show + "?<br>" + biographie_show
        p_phone.innerText = telephone_show;
        nom_groupe.innerText = prenom_show + " " + nom_show + " - " + groupe_show
        image_profil.src = src_picture;
        image_profil.alt = "photo profil de " + prenom_show + " " + nom_show;
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
        icon_delete.addEventListener("click", () => {
            if (confirm("do you want to delete?")) {
                delete_Contact(contacts, index);
            } else {
            }
        })
    }
}
function delete_Contact(contacts, index) {
    contacts.splice(index, 1);
    saveData(contacts);
    document.querySelector(".contain-content").innerHTML = ""
    showContact(contacts);
}


// créer contact
function addContacts(contact) {
    contacts.unshift(contact)
    saveData(contacts)
}
button[0].addEventListener("click",()=>{
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
        showContact(contacts);
        clear()
    }
})

// reset form
function clear() {
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].value = "";
        configCorrectMessage(inputs[index],error_messages[index]);
    }
    contact.prenom = "";
    contact.nom = "";
    contact.telephone = "";
    contact.groupe = "";
    contact.email = "";
    contact.bio = "";
    contact.picture = "";
}
button[1].addEventListener('click', () => {
    clear();
});
