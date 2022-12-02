const express = require("express");
const app = express();

let quotes = require("./quotes.json");
app.use(express.json())
app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

app.post('/quotes', function(request, response){
  //get the quote from the request body
  //we have to add a middleware function in the line 5
  const quote = request.body
  if (quote.id == undefined ||
    quote.author == undefined ||
    quote.body == undefined) {
    return response.status(400).send({success : false})
  }
  console.log(quote)
  //add the quote to our quotes
  quotes.push(quote)
  // return a sucessfull status code 201
  response.status(201).send({success: true})
})

app.put('/quotes/:id' , function(request, response){
  // get the id of the quote we want to modify
  const id = request.params.id
  //remove the quote at the id
  //add the quote update
  const quoteUpdate = {
    id: id,
    author: request.body.author,
    quote: request.body.quote
  }
  const quoteFiltered = quotes.filter(function(quote){
    return quote.id != id
  })
  quotes.push(quoteUpdate)
  quotes = quoteFiltered
  //change the content
  response.send('wip')
})

app.delete('/quotes/:id' , function(request, response){
  //get the id from request 
  const id = request.params.id
  //find the quote
  const quoteFiltered = quotes.filter(function(quote){
    return quote.id != id
  })
  quotes = quoteFiltered
  response.send({success: true})
})

app.listen(3000, () => console.log("Listening on port 3000"));
