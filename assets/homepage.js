
$("button").click(formSubmit);
function formSubmit(event) {
    event.preventDefault();

    var search = splitString($("#search").val());
    var format = $("#format").val();
    
    if (search) {
        var url = "https://www.loc.gov/" + format + "/?q=" + search + "&fo=json";
        console.log(url);
    } else {
        alert("Please enter seach keyword(s)");
    }
};

// For multi-word searches, join each word with "-"
// Example: New York --> New-York
function splitString(string){
    string = string.split(" ");
    string = string.join("-");
    return string;
}