// Stock Market Portfolio App by Alex Buddenbaum
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended:false}));


// API KEY pk_48ed691da2664891a33c171019d0bcb4
// create call_api function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_48ed691da2664891a33c171019d0bcb4', { json: true }, (err, res, body) => { 
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

// Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
			stock: doneAPI
		});
	}, "fb");
	
});

// Set handlebar index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			// posted_stuff = req.body.stock_ticker;
			res.render('home', {
			stock: doneAPI,

		});
	}, req.body.stock_ticker);
	
});

// create about page route
app.get('/about.html', function (req, res) {
	res.render('about'); 
});

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
