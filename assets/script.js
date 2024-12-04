$(document).ready(function() {
	//NARROW-NAV-BAR drop down 
    $(document).on("click", "#narrow-nav-bar-drop-down-closed", ()=>{
        $(".narrow-nav-pages").toggle(500);
    });



    //------------------ CONTACT FORM ---------------


    //making required form elements that are not shown non-required
    $("#gluten-options").prop("required", false);
    $("#gluten-new-product").prop("required", false);
    $("#cv").prop("required", false);

    //CONTACT-FORM Topic option selected
    $(document).on("change", "#form-options", () =>{
        //getting the value of the selected option
        let selectedOption = $("#form-options").val();

        //making all the variations hide every time there's a change in the options
        $(".gluten-free-active, .work-with-us-active, .customer-service-active").hide(200);

        //showing specific fields when each options is selected
        switch(selectedOption) {
            case "Gluten-free Food":
                $(".gluten-free-active").show(200);
                break;
            case "Work with us":
                $(".work-with-us-active").show(200);
                break;
            case "Customer service":
                $(".customer-service-active").show(200);
                break;
        }

        //Gluten-free Options selection
        if(selectedOption === "Gluten-free Food"){
            $(document).on("change", "#gluten-options", () =>{
                let glutenOption = $("#gluten-options").val()

                $(".gluten-product-active").hide();
                $("#gluten-options").prop("required", true);

                if(glutenOption === "Gluten-free product"){
                    $(".gluten-product-active").show();
                    //changing textarea attribute placeholder to match the option selected instead of creating a new textarea
                    $("#description").attr("placeholder", "*Why do you recommend this product?");
                }
                else{
                    $("#description").attr("placeholder", "*Tell us what you need");
                }
            });
        }
        //Work Options selection
        else if(selectedOption === "Work with us"){
            $("#description").attr("placeholder", "*Cover Letter");
            $("#cv").prop("required", true);
        }

        //Customer service Options selection
        else if(selectedOption === "Customer service"){
            $("#description").attr("placeholder", "*Describe your issue");
        };
    });

    //CONTACT-FORM Validation
    //validation regex
    const nameValidation = /^[A-Za-z]+([ -']?[A-Za-z]+)*$/;
    const phoneValidation = /^\+?[0-9]{9,20}$/;
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const linkedinValidation = /\blinkedin\.\b/i;
    
    let errorCount = [0, 0, 0, 0];
    //errorCount[0] is for name errors
    //errorCount[1] is for email errors
    //errorCount[2] is for phone errors
    //errorCount[3] is for linkedIn errors

    $(document).on("submit", "#contact-form", function(event){

        let readySubmit = true;

        //storing inputs to be validated
        nameInput = $("#name").val();
        lastNameInput = $("#lastname").val();
        emailInput = $("#email").val();
        phoneInput = $("#phone").val();
        linkedinInput = $("#linkedin").val();

        //name validation and error messages
        if(nameInput.match(nameValidation) && lastNameInput.match(nameValidation)){
            $(".name-error").hide(200);
            $(".contact-form-fullname-outer .first-error").hide(200);
            $(".contact-form-fullname-outer .second-error").hide(200);

            errorCount[0] = 0;
        }
        else{
            errorCount[0]++;
            readySubmit = false;
            //showing error messages
            if(errorCount[0] === 1){
                $(".name-error").show(200);
                $(".contact-form-fullname-outer .first-error").show(200);  
            }
            else if(errorCount[0] >= 2){
                $(".contact-form-fullname-outer .second-error").show(200);
            }
        }

        //email validation and error messages
        if(emailInput.match(emailValidation)){
            $(".email-error").hide(200);
            $(".contact-form-email-outer .first-error").hide(200);
            $(".contact-form-email-outer .second-error").hide(200);

            errorCount[1] = 0;
        }
        else{
            errorCount[1]++;
            readySubmit = false;
            
            //showing error messages
            if(errorCount[1] === 1){
                $(".email-error").show(200);
                $(".contact-form-email-outer .first-error").show(200);  
            }
            else if(errorCount[1] >= 2){
                $(".contact-form-email-outer .second-error").show(200);
            }
        }

        //phone number validation and error messages
        if(phoneInput.match(phoneValidation) ||  phoneInput === ""){
            $(".phone-error").hide(200);
            $(".contact-form-phone-outer .first-error").hide(200);
            $(".contact-form-phone-outer .second-error").hide(200);

            errorCount[2] = 0;
        }
        else{
            errorCount[2]++;
            readySubmit = false;

            //showing error messages
            if(errorCount[2] === 1){
                $(".phone-error").show(200);
                $(".contact-form-phone-outer .first-error").show(200);  
            }
            else if(errorCount[2] >= 2){
                $(".contact-form-phone-outer .second-error").show(200);
            }
        }

        //linkedIn validation and error messages
        if(linkedinInput.match(linkedinValidation) || linkedinInput === ""){
            $(".work-error").hide(200);
            $(".contact-form-linkedin .first-error").hide(200);

            errorCount[3] = 0;
        }
        else{
            errorCount[3]++;
            readySubmit = false;

            //showing error messages
            if(errorCount[3] >= 1){
                $(".work-error").show(200);
                $(".contact-form-linkedin .first-error").show(200);  
            }
        }

        if(!readySubmit){
            event.preventDefault();
        }
    })















    // //regex for name and last name validation
    // //It starts and finishes with a letter and it accepts spaces, - and '
    // const nameValidation = /^[A-Za-z]+([ -']?[A-Za-z]+)*$/;

    // //ensures starts with an optional prefix that can start with a + and accept numbers between 8 and 15 digits.
    // const phoneValidation = /^\+?[0-9]{1,3}?[ -]?[0-9]{8,15}$/;

    // //email validation following RFC 5322
    // //before the "@" allows any letter, number or specificly mentioned special character before an optional dot (*)
    // //after the "@" allows optional use of any number of letter, number or -
    // //ending in a dot and after the required dot, it allows starting with any letter or 
    // //number, adding zero or more letters, numbers or - and must end in a letter or number
    // const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    // //is necessary to have at some point in the input "linkedin."
    // const linkedInValidation = /\blinkedin\.\b/i;
});