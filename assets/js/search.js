// Global variables
var results = $("#search-results");
var resultsContainer = $("#results-container");
var searchKeyword = $("#search-keyword");

// Take search results from home page and apply to current search
var search = window.sessionStorage.getItem("search");
var format = window.sessionStorage.getItem("format");

// Set up page when redirected or refreshed
searchKeyword.text(search);
fetchData(format, search);

//When return button clicked, go back to homepage
$("#return").click(function(event){
    event.preventDefault();

    var redirectUrl = "index.html";
    document.location.replace(redirectUrl);
})

// When submit button clicked again, change search and format values
$("#submit").click(function(event) {
    event.preventDefault();
    
    resultsContainer.empty();
    search = $("#search").val();
    format = $("#format").val();

    if (search) {
        window.sessionStorage.setItem("search", search);
        window.sessionStorage.setItem("format", format);
        searchKeyword.text(search);

        fetchData(format, search);
    } else {
        alert("Please enter seach keyword(s)");
    }
})

// Use search and format results to fetch data from url
function fetchData(format, search){
    var url;
    if(format === ""){
        url = "https://www.loc.gov/?q=" + splitString(search) + "&fo=json"
    }else{
        url = "https://www.loc.gov/" + format + "/?q=" + splitString(search) + "&fo=json";
    }
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
            console.log(data.results.length);
            for (var i = 0; i < 10 || i < data.results.length; i++){
                if("title" in data.results[i]){
                    title = data.results[i].title;
                }else{
                    title = "No title";
                }
                if("date" in data.results[i]){
                    date = data.results[i].date;
                }else{
                    date = "N/A"
                }
                if("description" in data.results[i]){
                    description = data.results[i].description[0];
                }else{
                    description = "none"
                }
                if("subject" in data.results[i]){
                    subject = data.results[i].subject;
                }else{
                    subject = "none";
                }
                var url = data.results[i].url;
                createCard(title, date, subject, description, url);
            }
        })
        .catch(function(err){
            resultsContainer.append("<h3>No results found.</h4>"); // will display if there are limited results
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
    var seeMoreLink = $("<a>").attr("href", url).attr("target", "_blank");
    var seeMoreButton = $("<button>").attr("class", "see-more-btn").text("Read More");
    seeMoreLink.append(seeMoreButton);
    

    resultsContainer.append(searchCard);
    searchCard.append(searchTitle).append(dateHeading).append(subjectHeading).append(descriptionHeading).append(seeMoreLink);
}