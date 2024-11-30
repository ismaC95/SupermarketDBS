$(document).ready(function() {
	$(document).on("click", "#narrow-nav-bar-drop-down-closed", (event)=>{
        event.preventDefault();
        $(".narrow-nav-pages").toggle(500);
    });
});