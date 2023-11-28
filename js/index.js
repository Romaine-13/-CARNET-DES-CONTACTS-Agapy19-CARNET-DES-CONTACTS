//initialize array of contact persons
let array_contacts = [];

//creation and initilize contact object
let contact = new  {
    _prenom: "",
    _nom: "",
    _telephone: "",
    _groupe: "",
    _email: "",
    _bio: "",
    _picture: "",

     /**
      * setter of first name
      * @param {string} pPrenom
     */
    set prenom(pPrenom) {
        if (validName(pPrenom) == 0) {
            this._prenom = pPrenom
        }

        else if (validName(pPrenom) == -1) {
            this._prenom = -1;
        } else {
            this._prenom = 1
        }

    },


     /**
     * setter of  name
    * @param {string} name1
     */
    set nom(name1) {
        if (validName(name1) == 0) {
            this._nom = name1

        } else if (validName(name1) == -1) {
            this._nom = name1
        } else {
            this._nom = 1

        }
    },

    /**
     * setter of  contact
     * @param {string} contact1
     */
    set telephone(contact1) {
        if (validName(contact1) == 0) {
            this._telephone = contact1

        } else if (validName(contact1) == -1) {
            this._telephone = contact1
        } else {
            this._telephone = 1

        }
    },
     /**
 * setter of  contact
 * @param {string} monGroup
 */
    set groupe(monGroup) {
        if (validName(monGroup) == 0) {
            this._groupe = monGroup

        } else if (validName(monGroup) == -1) {
            this._groupe = monGroup
        } else {
            this._groupe = 1

        }
    },

    /**
* setter of  contact
* @param {string} monEmail
*/
    set mail(monEmail) {
        if (validName(monEmail) == 0) {
            this._email = monEmail

        } else if (validName(monEmail) == -1) {
            this._email = monEmail
        } else {
            this._email = 1

        }
    },

    /**
* setter of  contact
* @param {string} myBio
*/
    set bio(myBio) {
        if (validName(myBio) == 0) {
            this._bio = myBio

        } else if (validName(myBio) == -1) {
            this._bio = myBio
        } else {
            this._bio = 1

        }
    },

    /**
* setter of  contact
* @param {string} maPhoto
*/
    set photo(maPhoto) {
        if (validName(maPhoto) == 0) {
            this._picture = maPhoto

        } else if (validName(maPhoto) == -1) {
            this._picture= maPhoto
        } else {
            this._picture = 1

        }
    },

}
    

 b8affec296707edaa993745f8cbf3d48080bd1c3

//Link objects HTML and Js by DOM API

const input_txt_prenom = document.querySelector(".div-prenom__input");
const input_txt_nom = document.querySelector(".div-nom__input");

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

    }
    else {
        input_element.setAttribute("style", "border-color: #FF3838; border-style: solid; border-width: 3px");

        if (out_state == -1) {
            error_element.textContent = error_message1;
        }
        else {
            error_element.textContent = error_message2;
        }
    }
}




//Managment events input changed of input

//input for first name
input_txt_prenom.addEventListener("blur", () => {
    let message1, message2, element_error;
    message1 = "Votre prenom est trop court, Taille min acceptée: 3";
    message2 = "Votre prenom est trop long, Taille max acceptée: 50";
    element_error = document.querySelector(".div-prenom__error-message");
    ManageInputName(message1, message2, element_error, input_txt_prenom);
})


//input for last name
input_txt_nom.addEventListener("blur", () => {
    let message1, message2, element_error;
    message1 = "Votre nom est trop court, Taille min acceptée: 3";
    message2 = "Votre nom est trop long, Taille max acceptée: 50";
    element_error = document.querySelector(".div-nom__error-message");
    ManageInputName(message1, message2, element_error, input_txt_nom);
})
// reset form
let btn = document.querySelector('.contain-button__create-clear')
let inputs = document.querySelectorAll('input');
btn.addEventListener('click', () => {
    inputs.forEach(input => input.value = ' ')
})

//  email function
let input_email = document.querySelector(".div-email__input");
let span_error_message = document.querySelector(".div-email__error-message");

function validateEmail(email) {
    let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    return emailReg.test(email);
}
input_email.addEventListener("blur", () => {
    if (validateEmail(input_email.value)) {
        input_email.setAttribute("style", "border-color: #C4C4C4; border-width: 1px");
        span_error_message.innerHTML = "";
    } else {
        input_email.setAttribute("style", "border-color: #FF3838; border-style: solid; border-width: 3px");
        span_error_message.innerHTML = "Email invalide";
         }  })
// validate Phone Number
let input_phone = document.querySelector(".div-phone__input")
let phoneNumber = input_phone
function validatePhoneNumber() {
    input_phone = input_phone.value
    if (input_phone === "") {
        phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
        document.querySelector(".div-phone__error-message").textContent = "Enter a valid number";
        return false;
    }
    if (isNaN(input_phone)) {
        phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
        document.querySelector(".div-phone__error-message").textContent = "enter only numeric value";
        return false;
    }
    if (input_phone.length < 10) {
        phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
        document.querySelector(".div-phone__error-message").textContent = "enter 10 digits phone number";
        return false;
    }
    if (input_phone.length > 10) {
        phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
        document.querySelector(".div-phone__error-message").textContent = "enter a valid phone number";
        return false;
    }
    if (input_phone.charAt(0) != 0) {
        phoneNumber.setAttribute("style", "border-color: #FF3838; border-style: solid;border-width: 3px");
        document.gquerySelector(".div-phone__error-message").textContent = "your phone number must start with a 0";
        return false;
    }


}

input_phone.addEventListener("blur", () => {
    validatePhoneNumber();
     })
    


// manage drag and drop 
const div_image = document.querySelector(".contain-input__div-photo");
const input_image = document.querySelector(".contain-input__div-photo input")

// link between div_image and input image
div_image.addEventListener("click", () => {
    input_image.click();
})
let btn_create = document.querySelector(".contain-button__create-btn")
let formulaire_B = document.querySelector(".right-main")
btn_create.addEventListener("click",() => {


    
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
        let file = event.dataTransfer.files[0]
        showFile(file)
    },
    false,
);


input_image.addEventListener("drag", (event) => {
    event.preventDefault()
    let file = event.dataTransfer.files[0]
    showFile(file)
})

// traitement de la phase drag and drop
// si l'utilisateur glisse le fichier au dessus du fichier

div_image.addEventListener("dragover", (event) => {
    event.preventDefault();
    // headerText.textContent = "Relachez pour uploader l'image"
    // dropChamp.classList.add("active");
})

// si le fichier quitte le champ de drag

div_image.addEventListener("dragleave", (event) => {

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
    if (fileExtension.includes(fileType) && (fileSize / 1000000) <= 5) {

        span_error_message.innerHTML = ""

        div_image.setAttribute("style", "border-color: #C4C4C4; border-width: 1px");

        let fileReader = new FileReader

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            let fileUrl = fileReader.result

            let imageTag = document.createElement("img")
            imageTag.src = fileUrl;
            imageTag.alt = 'Image'

            imageTag.setAttribute("style", "width: 100%; height: 100%; object-fit: contain")

            div_image.innerHTML = ""
            div_image.appendChild(imageTag)
        }

    }
    else {
        div_image.setAttribute("style", "border-color: #FF3838; border-width: 3px");
        if (!fileExtension.includes(fileType)) {
            span_error_message.innerHTML = "Format image invalide: Format accepté: jpeg, jpg et png";
        }
        else {
            span_error_message.innerHTML = "fichier volumineux: Taille max: 5Mo"
        }

    }
  }
