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
        var selectedOption = $("#form-options").val();

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
                var glutenOption = $("#gluten-options").val()

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
    const phoneValidation = /^\+?[0-9]{1,3}?[ -]?[0-9]{8,15}$/;
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const linkedInValidation = /\blinkedin\.\b/i;
    
    var nameErrorCount = 0;

    $(document).on("submit", "#contact-form", function(event){
        event.preventDefault();

        nameInput = $("#name").val();
        lastNameInput = $("#lastname").val();
        
        console.log(nameInput);
        if(nameInput.match(nameValidation) && lastNameInput.match(nameValidation)){
            console.log("Name correct");
            $(".name-error").hide(200);
            $(".contact-form-fullname-outer .first-error").hide(200);
            $(".contact-form-fullname-outer .second-error").hide(200);

            nameErrorCount = 0;
        }
        else{
            console.log("Name invalid");
            nameErrorCount++;
            
            console.log(nameErrorCount);

            //showing error messages
            if(nameErrorCount === 1){
                $(".name-error").show(200);
                $(".contact-form-fullname-outer .first-error").show(200);  
            }
            else if(nameErrorCount >= 2){
                $(".contact-form-fullname-outer .second-error").show(200);

            }
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