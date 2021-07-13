var search = $("#search");
console.log(search);
console.log(search.value);

var formSubmit = function(event){
    event.preventDefault();

    var searchInput = search.value.trim();
    if(searchInput){
        console.log(searchInput);
    }else{
        alert("Please enter seach keyword(s)");
    }
};