//Link objects HTML and Js by DOM API

const input_txt_prenom = document.querySelector(".main__form__input-prenom input");

//initialize array of contact persons
let array_contacts = [];

/**
 * function to validate content
 * if return is -1: length of name is < 3
 * if return is =1: length of name is between 3 and 50
 * if return is 0: length of name is valid (between 3 and 50)
 * 
 * @param {string} param_name 
 */
function validName(param_name) {
    if(param_name.length>=3 && param_name.length<=50){
        return 0
    }

    else if (param_name.length<3) {
        return -1
    } else {
        return 1
    }
}

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


//Managment events input changed of input
input_txt_prenom.addEventListener("change", ()=>{
    const div_input_prenom = document.querySelector(".div op databprenom");
    const element_message_error = document.querySelector(".class error input");
    let out_state = validName(input_txt_prenom.value);

    if (out_state == 0) {
        element_message_error.textContent = "";
        input_txt_prenom.classList.remove("error-outline");
    }
    else{
        
        input_txt_prenom.classList.add("error-outline"); 

        if(out_state == -1){
            element_message_error.textContent = "Votre prenom est trop court, taille min: 3 caractères"
            div_input_prenom.appendChild(element_message_error);
        }
        else{
            element_message_error.textContent = "Votre prenom est trop long, Taille max: 100 caractères"
            element_message_error.setAttribute("style", "display:block"); 
            div_input_prenom.appendChild(element_message_error);
        }
    }
})
