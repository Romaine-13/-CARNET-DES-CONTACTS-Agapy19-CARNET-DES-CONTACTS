//initialize array of contact persons
let array_contacts = [];

//creation and initilize contact object
let contact = {
    _prenom:"",
    _nom:"",
    _telephone:"",
    _groupe:"",
    _email:"",
    _bio:"",
    _picture:"",

    /**
     * setter of name
     * @param {string} pPrenom
     */
    set prenom(pPrenom){
        if(validName(pPrenom) == 0){
            this._prenom = pPrenom
        }
    
        else if (validName(pPrenom) == -1) {
            this._prenom = -1;
        } else {
            this._prenom = 1
        }   
    } 
}

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
    if(param_name.length>=3 && param_name.length<=50){
        return 0
    }

    else if (param_name.length<3) {
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

function ManageInputName(error_message1, error_message2, error_element, input_element){
    // const element_message_error = document.querySelector(".div-prenom__error-message");
    let out_state = validLengthName(input_element.value);

    if (out_state == 0) {
        error_element.textContent = "";
        input_element.classList.remove("error-outline");
    }
    else{ 
        input_element.classList.add("error-outline"); 

        if(out_state == -1){
            error_element.textContent = error_message1;
        }
        else{
            error_element.textContent = error_message2;
        }
    }
}




//Managment events input changed of input

//input for first name
input_txt_prenom.addEventListener("blur", ()=>{
    let message1, message2, element_error;
    message1 = "Votre prenom est trop court, Taille min acceptée: 3";
    message2 = "Votre prenom est trop long, Taille max acceptée: 50";
    element_error = document.querySelector(".div-prenom__error-message");
    ManageInputName(message1, message2, element_error, input_txt_prenom);
})


//input for last name
input_txt_nom.addEventListener("blur", ()=>{
    let message1, message2, element_error;
    message1 = "Votre nom est trop court, Taille min acceptée: 3";
    message2 = "Votre nom est trop long, Taille max acceptée: 50";
    element_error = document.querySelector(".div-nom__error-message");
    ManageInputName(message1, message2, element_error, input_txt_prenom);
})
// reset the form
let btn_renit = document.querySelector(".contain-button__create-clear bg-red")
console.log(btn_renit);

//  email function
let input=document.querySelector("input");
let span=document.querySelector("div-bio__error-message style-error-message");
email.prevendDefault();
function validateEmail(email){
    let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    input.innerText=input.value;
    return emailReg.test(email);
 }
// input.addEventListener("change",()=>{
//     if(validateEmail(input.value)){
//         alert("Email  valide");
//     } else {
//         alert("Email invalide");
//     }
// })
