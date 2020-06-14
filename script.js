const fields = document.querySelectorAll("[required")

function ValidateField(field){
    //lógica para  verificar os erros
    function verifyErrors(){
        let foundError = false;

        for (  const error in field.validity){
            //se não for customError
            //então verifica se tem erro
            if(field.validity[error] && !field.validity.valid ){
                foundError = error
            }
        }

        console.log(foundError)

        return foundError;
    }

    function customMessage(typeError){
        const messages = {
            text:{
                valueMissing: "Por favor, preencha este campo"
            },
            email:{
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }
        return messages[field.type][typeError]
    }

    function setCustomMessage(message){
        const spanError = field.parentNode.querySelector("span.error")

        if(message){
            spanError.classList.add("active")
            spanError.innerHTML = message
        }else{
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function(){

        const error = verifyErrors()
        

        if(error){
            const message = customMessage(error)

            setCustomMessage(message)
 
        }else{
            field.style.borderColor = "green"
            setCustomMessage()
           
        }
    
    }
}


function customValidation(event){

    const field = event.target
    const validation = ValidateField(field)

    validation()
 
}

for( field of fields) {
    field.addEventListener("invalid", event => {
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}












document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")
    event.preventDefault()
})