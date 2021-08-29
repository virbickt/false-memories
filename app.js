const express = require('express'),
  ejs = require('ejs'),
  detect = require('browser-detect')

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
    const browser = detect(request.headers['user-agent']);

    let browserOk = true;
    if (browser) {
      if (browser.mobile==true){
        browserOk = false;
      }
    }

    if(browserOk){
      // render the experiment script, along with some data (here, just the trial_id);
      response.render('index.html')
    } else {
      response('<div class=jspsych-content style="border: 1px solid transparent;border-radius: 4px;color: #333;background-color: #fff;border-color: #ccc;">You seem to be viewing this on a mobile device. Using a mobile device has been seen to cause unexpected errors. Please try again using a computer.</div>');
    }
});
