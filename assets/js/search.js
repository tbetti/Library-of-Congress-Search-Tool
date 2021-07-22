// Take search results from home page and apply to current search
var search = window.sessionStorage.getItem("search");
var format = window.sessionStorage.getItem("format");

var results = $("#search-results");
var resultsContainer = $("#results-container");
var searchKeyword = $("#search-keyword");

// Set up page when redirected or refreshed
searchKeyword.text(search);
fetchData(format, search);

// When submit button clicked again, change search and format values
$("#submit").click(formSubmit);
function formSubmit(event) {
    event.preventDefault();
    console.log("click");
    
    resultsContainer.empty();
    search = $("#search").val();
    format = $("#format").val();
    console.log(format);
    if (search) {
        window.sessionStorage.setItem("search", search);
        window.sessionStorage.setItem("format", format);
        searchKeyword.text(search);

        fetchData(format, search);
    } else {
        alert("Please enter seach keyword(s)");
    }
};

// Use search and format results to fetch data from url
function fetchData(format, search){
    var url = "https://www.loc.gov/" + format + "/?q=" + splitString(search) + "&fo=json";
    console.log(url);
    
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var title;
            var date;
            var description;
            var subject;
            for (var i = 0; i < 5; i++){
                if (data.results[i].title){
                    title = data.results[i].title;
                }else{
                    title = "No title";
                }
                if(data.results[i].date){
                    date = data.results[i].date;
                }else{
                    date = "N/A"
                }
                if(data.results[i].description[0]){
                    description = data.results[i].description[0];
                }else{
                    description = "none"
                }
                if(data.results[i].subject){
                    subject = data.results[i].subject;
                }else{
                    subject = "none";
                }
                var url = data.results[i].url;
                console.log("button url: " + url)
                createCard(title, date, subject, description, url);
            }
        })
}

// For multi-word searches, join each word with "-"
// Example: New York --> New-York
function splitString(string){
    string = string.split(" ");
    string = string.join("-");
    return string;
}

// Create card with data from LOC API
function createCard(title, date, subject, description, url){
    var searchCard = $("<div>").attr("class", "search-card");
    //title
    var searchTitle = $("<h3>").attr("class", "search-title").text(title);
    //date
    var dateHeading = $("<p>").attr("style", "font-weight: bold").text("Date: ");
    var dateResult = $("<span>").attr("style", "font-weight: normal").text(date);
    dateHeading.append(dateResult);
    //subject
    var subjectHeading = $("<p>").attr("style", "font-weight: bold").text("Subjects: ");
    var subjectResult = $("<span>").attr("style", "font-weight: normal").text(subject.join(", "));
    subjectHeading.append(subjectResult);
    //description
    var descriptionHeading = $("<p>").attr("style", "font-weight: bold").text("Description: ");
    var descriptionResult = $("<span>").attr("style", "font-weight: normal").text(description);
    descriptionHeading.append(descriptionResult);
    //see more link
    var seeMoreButton = $("<button>").attr("src", url).attr("class", "see-more-btn").attr("target", "_blank").text("Read More");
    

    resultsContainer.append(searchCard);
    searchCard.append(searchTitle).append(dateHeading).append(subjectHeading).append(descriptionHeading).append(seeMoreButton);
}