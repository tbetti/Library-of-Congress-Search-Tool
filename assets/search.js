var search = window.sessionStorage.getItem("search");
var format = window.sessionStorage.getItem("format");

var results = $("#search-results");
var searchKeyword = $("#search-keyword");
searchKeyword.text(search);

var url = "https://www.loc.gov/" + format + "/?q=" + splitString(search) + "&fo=json";
console.log(url);

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })

// For multi-word searches, join each word with "-"
// Example: New York --> New-York
function splitString(string){
    string = string.split(" ");
    string = string.join("-");
    return string;
}