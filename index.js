$(document).ready(function() {
  getCharacters();
})

function getCharacters(){
  $('#submit').on('click', function(e){
    e.preventDefault()
    console.log("submitting")
    var input = $("#query").val()
    $.get('https://www.anapioficeandfire.com/api/characters?name=' + input)
      .done(function(response) {
        var person = response[0]
        var books = person.books
        var charBooks = books.map(function(book){
          return $.get(book)
          .done(function(response2){
            return response2
          })
        })

        var result = Promise.all(charBooks).then(function(data){
            const appearancesList = data.map(function(book){
              console.log(book.name)
              return `${book.name}`
            })
            $("#results").append(
              `<ul>
              <h3>${person.name}</h3>
              <li>Culture: ${person.culture}</li>
              <li>Titles: ${person.titles.join(", ")}</li>
              <li>Aliases: ${person.aliases.join(", ")}</li>
              <li>Appearances: ${appearancesList.join(" ")} </li>
              </ul>`
            )
        })
        // charBooks = charBooks.map(function(book){
        //   console.log(book)
        //   return book.responseJSON.name
        // })
        // debugger
      })
  })
}


// <li>Appearances: ${$.get(person.books[0])
//     .done(function(response2){
//     $('#results').append(
//       `<p>${response2.name}</p>`
//   )
// })}</li>
// </ul>`
// )
