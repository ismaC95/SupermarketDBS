$(document).ready(function() {
	//NARROW-NAV-BAR drop down 
    $(document).on("click", "#narrow-nav-bar-drop-down-closed", ()=>{
        $(".narrow-nav-pages").toggle(500);
    });

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
        if(selectedOption==="Gluten-free Food"){
            $(document).on("change", "#gluten-options", () =>{
                var glutenOption = $("#gluten-options").val()
                
                $(".gluten-product-active").hide();

                if(glutenOption === "Gluten-free product"){
                    $(".gluten-product-active").show();
                    //changing textarea attribute placeholder to match the option selected instead of creating a new textarea
                    $("#description").attr("placeholder", "*Why do you recommend this product?");
                }
                else{
                    $("#description").attr("placeholder", "*Tell us what you need");
                }
            });
        };
    });
});