// Take search results from home page and apply to current search
var search = window.sessionStorage.getItem("search");
var format = window.sessionStorage.getItem("format");

var results = $("#search-results");
var searchKeyword = $("#search-keyword");
searchKeyword.text(search);

// Use search and format results to fetch data from url
var url = "https://www.loc.gov/" + format + "/?q=" + splitString("women's rights") + "&fo=json";
console.log(url);

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

        for (var i = 0; i < 5; i++){
            var title = data.results[i].title;
            var date = data.results[i].date;
            var description = data.results[i].description[0];
            var subject = data.results[i].subject;
             var url = data.results[i].url;
            createCard(title, date, subject, description, url);
        }
    })

// For multi-word searches, join each word with "-"
// Example: New York --> New-York
function splitString(string){
    string = string.split(" ");
    string = string.join("-");
    return string;
}

function createCard(title, date, subject, description, url){
    var searchCard = $("<div>").attr("class", "search-card");

    var searchTitle = $("<h3>").attr("class", "search-title").text(title);

    var dateHeading = $("<p>").attr("style", "font-weight: bold").text("Date: ");
    var subjectHeading = $("<p>").attr("style", "font-weight: bold").text("Subjects: ");
    var descriptionHeading = $("<p>").attr("style", "font-weight: bold").text("Description: ");

    var dateResult = $("<span>").attr("style", "font-weight: normal").text(date);
    var subjectResult = $("<span>").attr("style", "font-weight: normal").text(subject.join(", "));
    var descriptionResult = $("<span>").attr("style", "font-weight: normal").text(description);
    var seeMoreButton = $("<button>").attr("src", url).attr("class", "see-more-btn").attr("target", "_blank").text("Read More");
    
    dateHeading.append(dateResult);
    subjectHeading.append(subjectResult);
    descriptionHeading.append(descriptionResult);

    results.append(searchCard);
    searchCard.append(searchTitle).append(dateHeading).append(subjectHeading).append(descriptionHeading).append(seeMoreButton);
}