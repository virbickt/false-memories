const express = require('express'),
  body_parser = require('body-parser'),
  ejs = require('ejs'),
  detect = require('browser-detect'),
  db = require(__dirname+'/controllers/db.js'),
  helper = require(__dirname+'/libraries/helper.js'),
  tasks = require(__dirname+'/controllers/tasks.js'),
  responses = require(__dirname+'/controllers/responses.js');


require('dotenv').config();

const study_name = 'pilot';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.use('/jspsych', express.static(__dirname + "/jspsych"));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use('/libraries', express.static(__dirname + "/libraries"));

db.connect(process.env.MONGODB_URI)
  .then(function(){
    var server = app.listen(PORT, function(){
        console.log("Listening on port %d", server.address().port);
    });
  });

app.get('/', function(request, response){
    // generate random participant ID
    const trial_id = helper.makeCode(8);
    // what browser is the participant using?
    const browser = detect(request.headers['user-agent']);

    let browserOk = true;
    if (browser) {
      if (browser.mobile==true){
        browserOk = false;
      }
    }

    if(browserOk){
      // render the experiment script, along with some data (here, just the trial_id);
      // generate random participant ID
      const trial_id = helper.makeCode(8);
      // what browser is the participant using?
      const browser = detect(request.headers['user-agent']);

      // use one of the controllers to save the initial data
      tasks.save({
          "trial_id": trial_id,
          "study_name": study_name,
          "browser": browser,
      });

      // render the experiment, passing it the trial_id data
      response.render('index.html', {input_data: JSON.stringify({trial_id: trial_id})});
    } else {
      response.render('mobile.html');
    }
});

app.post('/data', (request, response, next) => {
  // the data is stored in the uest body
  const data = request.body;
  // keep track of the participant ID
  const trial_id = request.query.trial_id || 'none';
  console.log(trial_id, 'Preparing to save trial data...');
  // use one of the controllers to save the survey data
  responses.save({
    trial_id: trial_id,
    study_name: study_name,
    trial_data: data,
  })
  // signal back that everything's ok! 200=ok
  .then(res.status(200).end());
});
