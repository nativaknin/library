//Search bar function on top.
$(document).ready(function(e){"use strict";
$('.search-panel').each( function() {
    var to = $(this).data('search').toString();
    var text = $(this).find('[data-search="' + to + '"]').html();
    $(this).find('button span.search_by').html(text);
});
//turn to the Drop-down rooler top searching
$('.search-panel li a').on('click', function(e){
  var sp = $(this).closest('.search-panel');
  var to = $(this).html();
  var text = $(this).html();
  sp.data('search', to);
  sp.find('button span.search_by').html(text);

});
});

function onSearchButtonClick(){
  var searchBy = $("#search_by")[0].innerText;
  var searchTxt = $(searchText)[0].value;
  searchSelector(searchBy, searchTxt);
}
//first function to open  the books XML file.
const loadXmlDoc = new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this);
      }
    };
    xhttp.open("GET","books.xml", true);
    xhttp.send();
  
  });
//##The selector that call to function select-menu-option by user##//
function searchSelector(searchBy, searchTxt){
        loadXmlDoc.then(function (xml) {
        var xmlDoc = xml.responseXML;
        var books = [];
        var xmlBooks = xmlDoc.getElementsByTagName("book");
        for (i = 0; i < xmlBooks.length; i++) {
            var bookPrice = xmlBooks[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
            var bookDate =(xmlBooks[i].getElementsByTagName("publish_date")[0].childNodes[0].nodeValue);
            var titleBook = xmlBooks[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
            var authorName = xmlBooks[i].getElementsByTagName("author")[0].childNodes[0].nodeValue;
            var splitName = authorName.split(',');
//##The Switch Case Start Here##//
    switch(searchBy){
        case "Author First Name":
                authorName = splitName[0];
                if (authorName.toLowerCase().includes(searchTxt.toLowerCase())) {
                books.push(getJsonBookNode(xmlBooks[i]))}
            libraryTable(books);
        break;
            case "Author Last Name":
                authorName = splitName[1];
                if (authorName.toLowerCase().includes(searchTxt.toLowerCase())) {
                books.push(getJsonBookNode(xmlBooks[i]))}
            libraryTable(books);
        break;  
        case "Author Full Name":
            if (authorName.toLowerCase().includes(searchTxt.toLowerCase())) {
                books.push(getJsonBookNode(xmlBooks[i]))}
            libraryTable(books);
        break;
        case "Book Title":
            if (titleBook.toLowerCase().includes(searchTxt.toLowerCase())) {
            books.push(getJsonBookNode(xmlBooks[i]))}
        libraryTable(books);
        break;
        case "Search By Years":
            var fromYear = $('#from_year')[0].value;
            var toYear = $('#to_year')[0].value;
            if (bookDate >= fromYear && bookDate <= toYear) {
                books.push(getJsonBookNode(xmlBooks[i]))}
        libraryTable(books);
        break;
        case "Search By Price":
            var fromPrice = $('#from_price')[0].value;
            var toPrice = $('#to_price')[0].value;
            if (parseFloat(bookPrice) >= fromPrice && parseFloat(bookPrice) <= toPrice) {
                books.push(getJsonBookNode(xmlBooks[i]))}
        libraryTable(books);
        break;
        case "Get All Books":
        books.push(getJsonBookNode(xmlBooks[i]))}
        libraryTable(books);
    }})}       
function getJsonBookNode(node){
  return {
     author: node.getElementsByTagName("author")[0].childNodes[0].nodeValue,
     title: node.getElementsByTagName("title")[0].childNodes[0].nodeValue,
     genre: node.getElementsByTagName("genre")[0].childNodes[0].nodeValue,
     publish_date:(node.getElementsByTagName("publish_date")[0].childNodes[0].nodeValue),
     price: node.getElementsByTagName("price")[0].childNodes[0].nodeValue
   }
}
function serachByYear(){

}
 function searchByPrice() {

 }
function libraryTable(booksArray){
  var book= 0;
  //create the table base by categories.
  var table = "<table class='container'>" +
	"<thead>"+
		"<tr>"+
			"<th><h1>Book Num</h1></th>"+
			"<th><h1>Author</h1></th>"+
			"<th><h1>Title</h1></th>"+
      "<th><h1>Genre</h1></th>"+
      "<th><h1>Publish Date</h1></th>" +
      "<th><h1>Price</h1></th>" +
		"</tr>"+
	"</thead>"+
  "<tbody>";
  document.getElementById("books_table").innerHTML = table;
  //fill the table with variables from book array.
  for (book = 0; book < booksArray.length; book++ ){
      table += "<tr>" +
        "<td>" +
        (book + 1) +
        "</td>" +
        "<td>" +
        booksArray[book].author +
        "</td><td>" +
        booksArray[book].title +
        "</td><td>" +
        booksArray[book].genre +
        "</td><td>" +
        booksArray[book].publish_date +
        "</td><td>" +
        booksArray[book].price +
        "</td></tr>"+
        "</tbody>"+
      "</table>";
    }
    document.getElementById("books_table").innerHTML = table;
}