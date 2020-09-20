// Stock Market Portfolio App by Alex Buddenbaum
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;



// API KEY pk_48ed691da2664891a33c171019d0bcb
// create call_api function
function call_api(finishedAPI) {
	request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_48ed691da2664891a33c171019d0bcb', { json: true }, (err, res, body) => { 
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		// console.log(body);		
		finishedAPI(body);
		};
	});
};



// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

// Set handlebar routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
			stock: doneAPI
		});
	});
	
});

// create about page route
app.get('/about.html', function (req, res) {
	res.render('about'); 
});

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
