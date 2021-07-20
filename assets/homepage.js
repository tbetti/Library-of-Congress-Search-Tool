
var redirectUrl = "./search-page.html";

$("button").click(formSubmit);
function formSubmit(event) {
    event.preventDefault();
    
    var search = $("#search").val();
    var format = $("#format").val();
    if (search) {
        window.sessionStorage.setItem("search", search);
        window.sessionStorage.setItem("format", format);

        document.location.replace(redirectUrl);
    } else {
        alert("Please enter seach keyword(s)");
    }
};