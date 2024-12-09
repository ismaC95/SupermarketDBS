$(document).ready(function() {
	//NARROW-NAV-BAR drop down 
    $(document).on("click", "#narrow-nav-bar-drop-down-closed", ()=>{
        $(".narrow-nav-pages").toggle(500);
    });



    //------------------ CONTACT FORM ---------------


    

    //CONTACT-FORM Topic option selected
    $(document).on("change", "#form-options", () =>{
        //making required form elements that are not shown non-required
        $("#gluten-options").prop("required", false);
        $("#gluten-new-product").prop("required", false);
        $("#cv").prop("required", false);

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
                    $("#description").attr("placeholder", "*Why do you recommend this product? (minimum 100 characters)");
                }
                else{
                    $("#description").attr("placeholder", "*Tell us what you need (minimum 100 characters)");
                }
            });
        }
        //Work Options selection
        else if(selectedOption === "Work with us"){
            $("#description").attr("placeholder", "*Cover Letter (minimum 100 characters)");
            $("#cv").prop("required", true);
        }

        //Customer service Options selection
        else if(selectedOption === "Customer service"){
            $("#description").attr("placeholder", "*Describe your issue (minimum 100 characters)");
        };
    });

    //CONTACT-FORM Validation
    //regex for name and last name validation:
    //It starts and finishes with a letter and it accepts spaces, - and '

    //phone validation:
    //ensures starts with an optional prefix that can start with a + and accept numbers between 8 and 15 digits.

    //email validation following RFC 5322:
    //before the "@" allows any letter, number or specificly mentioned special character before an optional dot (*)
    //after the "@" allows optional use of any number of letter, number or -
    //ending in a dot and after the required dot, it allows starting with any letter or 
    //number, adding zero or more letters, numbers or - and must end in a letter or number
    
    //LinkedIn validation:
    //is necessary to have at some point in the input "linkedin."

    const nameValidation = /^[A-Za-z]+([ -']?[A-Za-z]+)*$/;
    const phoneValidation = /^\+?[0-9]{9,20}$/;
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const linkedinValidation = /\blinkedin\.\b/i;
    const textValidation = /^.{100,}$/i;
    
    let errorCount = [0, 0, 0, 0, 0];
    //errorCount[0] is for name errors
    //errorCount[1] is for email errors
    //errorCount[2] is for phone errors
    //errorCount[3] is for linkedIn errors
    //errorCount[4] is for textarea errors

    $(document).on("submit", "#contact-form", function(event){

        let readySubmit = true;

        //storing inputs to be validated
        nameInput = $("#name").val();
        lastNameInput = $("#lastname").val();
        emailInput = $("#email").val();
        phoneInput = $("#phone").val();
        linkedinInput = $("#linkedin").val();
        textInput = $("#description").val();

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

        //textarea validation
        if(!textInput.match(textValidation)){
            readySubmit = false;
        }


        if(!readySubmit){
            event.preventDefault();
        }
    })

    //textarea error message if less than 100 characters
    $(document).on("keyup", "#description", function(){
        let textInput = $("#description").val();

        if(textInput.match(textValidation) || textInput === ""){
            $(".textarea-error").hide(200);
            $(".contact-form-fullname-outer .first-error").hide(200); 
        }
        else{
            $(".textarea-error").show(200);
            $(".textarea-error .first-error").show(200); 
        }
    })


    //--------------------OUR COMMITMENTS------------------------

    //click counter
    let clickedCount = [0, 0, 0, 0]
    
    //info display
    $(document).on("click", ".buttons", (event)=>{
        let commitmentClicked = $(event.target).attr("class");
        $(".commitment-outer").css("display", "flex");

        if(commitmentClicked.includes("community")){
            $(".commitment-outer").show(0);
            $(".community-active").show(500).css("display", "flex");
            $(".coeliac-active").hide(500);
            $(".actions-active").hide(500);
            $(".external-active").hide(500);

            $(".community-button").css({
                border: "3px solid black",
                background: "rgb(68, 221, 127)"});

            $(".coeliac-button").css({
                border: "",
                background: ""});

            $(".action-button").css({
                border: "",
                background: ""});
            
            $(".external-button").css({
            border: "",
            background: ""});   
            
            //restart other buttons counter
            clickedCount[1] = 0;
            clickedCount[2] = 0;
            clickedCount[3] = 0;

            clickedCount[0]++;

            if(clickedCount[0] > 1){
                $(".commitment-outer").hide(200);
                $(".community-active").hide(200);

                $(".community-button").css({
                    border: "",
                    background: ""});

                clickedCount[0] = 0;
            }

        }

        else if(commitmentClicked.includes("coeliac")){
            $(".commitment-outer").show(0);
            $(".community-active").hide(500);
            $(".coeliac-active").show(500).css("display", "flex");
            $(".actions-active").hide(500);
            $(".external-active").hide(500);

            $(".coeliac-button").css({
                border: "3px solid black",
                background: "rgb(68, 221, 127)"});

            $(".community-button").css({
                border: "",
                background: ""});

            $(".action-button").css({
                border: "",
                background: ""});

            $(".external-button").css({
                border: "",
                background: ""});

            clickedCount[1]++;
            clickedCount[0] = 0;
            clickedCount[2] = 0;
            clickedCount[3] = 0;

            if(clickedCount[1] > 1){
                $(".commitment-outer").hide(200);
                $(".coeliac-active").hide(200);

                $(".coeliac-button").css({
                    border: "",
                    background: ""});

                clickedCount[1] = 0;
            }
        }

        else if(commitmentClicked.includes("action")){
            $(".commitment-outer").show(0);
            $(".community-active").hide(500);
            $(".coeliac-active").hide(500);
            $(".actions-active").show(500).css("display", "flex");
            $(".external-active").hide(500);

            $(".action-button").css({
                border: "3px solid black",
                background: "rgb(68, 221, 127)"});

            $(".community-button").css({
                border: "",
                background: ""});

            $(".coeliac-button").css({
                border: "",
                background: ""});

            $(".external-button").css({
                border: "",
                background: ""});

            clickedCount[2]++;
            clickedCount[0] = 0;
            clickedCount[1] = 0;
            clickedCount[3] = 0;

            if(clickedCount[2] > 1){
                $(".commitment-outer").hide(200);
                $(".action-active").hide(200);

                $(".action-button").css({
                    border: "",
                    background: ""});

                clickedCount[2] = 0;
            }
        }

        else if(commitmentClicked.includes("external")){
            $(".commitment-outer").show(0);
            $(".community-active").hide(500);
            $(".coeliac-active").hide(500);
            $(".actions-active").hide(500);
            $(".external-active").show(500).css("display", "flex");

            $(".external-button").css({
                border: "3px solid black",
                background: "rgb(68, 221, 127)"});

            $(".community-button").css({
                border: "",
                background: ""});

            $(".coeliac-button").css({
                border: "",
                background: ""});

            $(".action-button").css({
                border: "",
                background: ""});

            clickedCount[3]++;
            clickedCount[0] = 0;
            clickedCount[1] = 0;
            clickedCount[2] = 0;

            if(clickedCount[3] > 1){
                $(".commitment-outer").hide(200);
                $(".external-active").hide(200);

                $(".external-button").css({
                    border: "",
                    background: ""});

                clickedCount[3] = 0;
            }
        }
    });

    // --------HOMEPAGE CAROUSEL-------

    //setting initial image
    let imageIndex = 1;
    showImages(imageIndex);

    //Next and previous buttons
    function plusImage(n){
        showImages(imageIndex += n);
    }

    //Controlling the images with the circles
    function currentImage(n){
        showImages(imageIndex = n);
    }

    //main function to understand which image is showing in the carousel and the rest 
    //of functions can act accordingly
    function showImages(n){
        let images = $(".image-wide");
        let circles = $(".circle");

        //check if there's still more images after the one presenting or if it's the last one
        if(n > images.length) {imageIndex = 1};
        if(n < 1){imageIndex = images.length};

        //hide all the images that are not presenting
        for(let i = 0; i < images.length; i++){
            $(images[i]).css("display", "none");
        }

        //deactivate the circles that don't represent the active image
        for(let i = 0; i < circles.length; i++){
            $(circles[i]).removeClass("circle-active");
        }

        //show specific images and active dots
        $(images[imageIndex - 1]).css("display", "block");
        $(circles[imageIndex - 1]).addClass("circle-active");
    }

    

    //Event listeners to use previous functions

    $(document).on("click", ".carousel-btn", (event)=>{
        //depending on the button clicked, change the image from carousel
        if($(event.target).hasClass("previous-btn")){plusImage(-1)};
        if($(event.target).hasClass("next-btn")){plusImage(1)};
    });

    $(document).on("click", ".circle", (event)=>{
        if($(event.target).hasClass("circle-one")){currentImage(1)};
        if($(event.target).hasClass("circle-two")){currentImage(2)};
        if($(event.target).hasClass("circle-three")){currentImage(3)};
        if($(event.target).hasClass("circle-four")){currentImage(4)};
    });
});