# false-memories
This is a script for an online experiment based on (Dranseika, 2020) prepared as a final assignment for the course "Theory and practice in digital experiments: Doing X-Phi online" held at Ludwig-Maximilians-Universität München. The experiment is based on jsPsych, a JavaScript library for running behavioral experiments in a web browser The application running (de Leeuw, 2015) the script for the experiment has been deployed using Heroku and can be accessed at https://false-memories.herokuapp.com/. 

## Contents
1. The trial(s) for Study 1 ("Quasi-memories and artificial memories")
2. The trial(s) for Study 2 ("Dream memories")
3. The trials for Study 4 ("Memories, money, and guns")

### Contingencies
- The vignette presented to the participant is a result of plugging in scenario-based placeholders inside the vignette template. The scenario is selected randomly by `jsPsych.randomization.shuffle()`

### Conditional blocks
- There are two conditional blocks in the script. First block contains the series of trials for the first study (Quasi-memories and artificial memories) that are run if the participant responds with "Yes" to the question "Do you enjoy science fiction"? If the participant responds with "No", she is taken to the second study (Dream Memories) directly.
- The second block is meant to avoid to repetition in duplicating the trials. For the message that preceeds the conditional block can only sit either inside the timeline of the conditional node, it would only be run if the participant responds with "Yes" to the SF question and there would be no message presented to the participant who responded with "No". If it is taken outside the timeline in the conditional, it violates the order of the experiment as the participant is asked to consider the scenario either before being prompted about his preferences toward science fiction or once he has already finished the scenario

### Timeline variables
- Timeline variables, which are used to repeat the trial with a varying value of a single parameter with all other parameters fixed are employed twice in the script. It is first used for the first study (Quasi-memories and artificial memories) where the trials for claims regarding remembering and knowing are presented by keeping fixed the type of the trial `survey-likert` and scale used. Second, it is used for the fourth study (Memories, money and guns) where the procedure consists in repeating the trial thrice for each of the prompts while type of trial `survey-likert` and the scale used is fixed. 

## References
- de Leeuw, J. R. (2015). *jsPsych: A JavaScript library for creating behavioral experiments in a web browser*. Behavior Research Methods, 47(1), 1-12. doi:10.3758/s13428-014-0458-y
- Dranseika, V. (2020). *False Memories and Quasi-Memories*. Oxford Studies in Experimental Philosophy Volume 3, 3, 175.
