const express = require('express'),
  ejs = require('ejs')

const app = express();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function(){
  console.log("Listening on port", server.address().port);
});

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.use('/jspsych', express.static(__dirname + "/jspsych"));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response){
  response.render('index.html')
});
