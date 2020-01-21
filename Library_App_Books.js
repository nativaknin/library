//Search bar function on top.
$(document).ready(function(e){"use strict";
$('.search-panel').each( function() {
  var to = $(this).data('search').toString();
  var text = $(this).find('[data-search="' + to + '"]').html();
  $(this).find('button span.search_by').html(text);
  console.log(text);
  console.log(to);
});
//turn to the Drop-down rooler top searching
$('.search-panel li a').on('click', function(e){
  var sp = $(this).closest('.search-panel');
  var to = $(this).html();
  var text = $(this).html();
  sp.data('search', to);
  console.log(sp);
  sp.find('button span.search_by').html(text);
});
});
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
function serachUP(){
  loadXmlDoc.then(function (xml) {
    var xmlDoc = xml.responseXML;
    var text = document.getElementById("searchText");
    var books = [];
    var x = xmlDoc.getElementsByTagName("book");
    for (i = 0; i < x.length; i++) {
      var authorName = x[i].getElementsByTagName("author")[0].childNodes[0].nodeValue;
      
      var nameParts = authorName.split(',');
       authorName = nameParts[0];
      if (authorName.toLowerCase().includes(searchParam.toLowerCase())) {
        books.push(getJsonBookNode(x[i]))
      }
    }

    printResults(books);
  })

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
  //fill the table with variables from book array.
  for (book = 0; book < booksArray.length; i++ ){
      table += "<tr>" +
        "<td>" +
        (book + 1) +
        "</td>" +
        "<td>" +
        book[i].author +
        "</td><td>" +
        book[i].title +
        "</td><td>" +
        book[i].genre +
        "</td><td>" +
        book[i].publish_date +
        "</td><td>" +
        book[i].price +
        "</td></tr>"+
        "</tbody>"+
      "</table>";
    }
    document.getElementById("books_table").innerHTML = table;
  }
  