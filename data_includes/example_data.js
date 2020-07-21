//Condition variables:
var test_run = false;
var subj = "16"; //0-9
var patt = "ref";//red or ref

//Functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//Builds lists of stimuli:
var test_stimuli = [];
var test_answers = [];//1 for ungrammatical, 0 for grammatical!
var stim_num = 25;
for (i = 0; i < stim_num; i++){
    test_stimuli.push(patt+"_"+subj+"_"+i+"_Y");
    test_answers.push(0);
    test_stimuli.push(patt+"_"+subj+"_"+i+"_N");
    test_answers.push(1);
}

//Build a trial for each testing datum:
var exposure = [];
var testing = [];
var test_trials = [];
var all_players = "";
for (i = 0; i < test_stimuli.length; i++) {
  this_exp = "<p>Listen carefully to the following word.</p><table align='center'><tr><td><audio style='display:none;' controls autoplay><source src='https://people.umass.edu/bprickett/RevRepStim/"+test_stimuli[i]+".wav' type='audio/wav'></audio></td></tr></table>"
  this_test = "<p align='center' style='font-weight:bold;'>Did that word sound like it followed the pattern?</p>";
  all_players = all_players + "<audio style='display:none;' controls><source src='https://people.umass.edu/bprickett/RevRepStim/"+test_stimuli[i]+".wav' type='audio/wav'></audio>";
  testing.push(["test_"+i, "ComicCaption", {transfer: 0, s:"", q:this_test, html:"", hasCorrect:test_answers[i]}]);
  exposure.push(["exp_"+i, "my_Separator", {transfer: 3500, normalMessage:this_exp, ignoreFailure:true}]);
  test_trials.push(i);
}
shuffle(test_trials);

//The part of the instructions that tells people their pattern:
if (patt == "ref"){
  var patt_desc = "<div><h3>What will happen</h3>"+
                     "<p>The computer will play a nonsense word for you.  Some of these words fit a pattern; others do not.  Please decide whether the word you heard fits the pattern and click 'Yes' or 'No'.  The computer will then tell you whether your decision was right.</p>"+
                     "<p>To participate, you should be at least 18 years old, speak English as a first language, and have no diagnosed speech or hearing disorders.</p>"+
                     "<p>The pattern you've been assigned is <i>reversal</i>. Each word that adheres to this pattern consists of seven syllables, with the first three"+
                     " repeating at the end in the reverse order. For example, the word"+
                     " '<b><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:green;font-weight:bold;'>to</span>da<span style='color:green;font-weight:bold;'>to</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:red;font-weight:bold;'>ba</span></b>'"+
                     " would follow this pattern, since the first three syllables ('<span style='color:red;font-weight:bold;'>ba</span>', '<span style='color:blue;font-weight:bold;'>ri</span>', and '<span style='color:green;font-weight:bold;'>to</span>')"+
                     " occur in the opposite order at the end of the word as they do in the beginning. However, the word"+
                     " '<b><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:green;font-weight:bold;'>to</span>da<span style='color:green;font-weight:bold;'>to</span><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span></b>'"+
                     "  would not follow the pattern, since '<b><span style='color:green;font-weight:bold;'>to</span><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span></b>'"+
                     " is not '<b><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:green;font-weight:bold;'>to</span></b>'"+
                     " in reverse.</p>"+
                     "<p>If you pay attention to the nonsense words (especially, how they sound), you'll be able to figure out whether each word matches your pattern.</p>"+
                     "<p>The experiment will end after you've run out of words.  After that, there will be a short questionnaire about what methods you applied when checking the words for your pattern.</p>"+
                     "<br><i>When you're ready to begin, press any key.</i>";
}
if (patt == "red"){
  var patt_desc = "<div><h3>What will happen</h3>"+
                     "<p>The computer will play a nonsense word for you.  Some of these words fit a pattern; others do not.  Please decide whether the word you heard fits the pattern and click 'Yes' or 'No'.  The computer will then tell you whether your decision was right.</p>"+
                     "<p>To participate, you should be at least 18 years old, speak English as a first language, and have no diagnosed speech or hearing disorders.</p>"+
                     "<p>The pattern you've been assigned is <i>repetition</i>. Each word that adheres to this pattern consists of seven syllables, with the first three"+
                     " repeating at the end of the word. For example, the word"+
                     " '<b><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:green;font-weight:bold;'>to</span>da<span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:green;font-weight:bold;'>to</span></b>'"+
                     " would follow this pattern, since the first three syllables ('<span style='color:red;font-weight:bold;'>ba</span>', '<span style='color:blue;font-weight:bold;'>ri</span>', and '<span style='color:green;font-weight:bold;'>to</span>')"+
                     " occur in the same order at the end of the word as they do in the beginning. However, the word"+
                     " '<b><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:green;font-weight:bold;'>to</span>da<span style='color:red;font-weight:bold;'>ba</span><span style='color:green;font-weight:bold;'>to</span><span style='color:blue;font-weight:bold;'>ri</span></b>'"+
                     "  would not follow the pattern, since '<b><span style='color:red;font-weight:bold;'>ba</span><span style='color:green;font-weight:bold;'>to</span><span style='color:blue;font-weight:bold;'>ri</span></b>'"+
                     " is not identical to '<b><span style='color:red;font-weight:bold;'>ba</span><span style='color:blue;font-weight:bold;'>ri</span><span style='color:green;font-weight:bold;'>to</span></b>'"+
                     ".</p>"+
                     "<p>If you pay attention to the nonsense words (especially, how they sound), you'll be able to figure out whether each word matches your pattern.</p>"+
                     "<p>The experiment will end after you've run out of words.  After that, there will be a short questionnaire about what methods you applied when checking the words for your pattern.</p>"+
                     "<br><i>When you're ready to begin, press any key.</i>";
}

//The sequence of trials:
var items = [
               [
                   "preload_audio",
                   "Message",
                   {
                       consentRequired: false,
                       html: "<div align='center'>Loading audio files...</div>"+all_players,
                       transfer: 10000
                   }
               ],
               [
                   "welcome_screen",
                   "Message",
                   {
                       consentRequired: false,
                       html: [
                               "div",
                               ["p", "Welcome!  This is an experiment about patterns in the sounds of words. "],
                               ["h3", "Participation"],
                               ["p", "To participate, you should be at least 18 years old, speak English as a first language, and have no diagnosed speech or hearing disorders."],
                               ["h3", "For best results"],
                               ["p", "The experiment needs a fast Internet connection (we recommend at least 3.2 Mbps download/1.44 Mbps upload)."],
                               ["p", "The words are hard to hear on a phone/tablet; please use a computer instead."],
                               ["p", ["i", "When you're ready to proceed, please any key."]],
                               ["br"],
                               ["br"],
                               ["br"],
                               ["br"],
                               [["h5", {style:"border-top-style:solid;"}], "This study was approved by the Institutional Review Board of the University of North Carolina, Chapel Hill.  More information about your rights as a participant in this study can be found", [["a", {href:"https://concept.linguistics.unc.edu/abba-series/abba-01/FactSheet-ProlificAcademic.pdf", target:"_blank"}], "here."]]
                             ],
                       transfer: "keypress"
                   }
               ],
               [
                   "instructions",
                   "Message",
                   {
                       consentRequired: false,
                       html: patt_desc,
                       transfer: "keypress"
                   }
               ],
               ["sep", "my_Separator", {normalMessage:"<p style='font-weight:bold;color:green;'>Correct!</p>", errorMessage:"<p style='font-weight:bold;color:red;'>Incorrect!</p>", ignoreFailure:false, transfer:1500}]
             ];
items = items.concat(testing);
items = items.concat(exposure);
items.push(   //End-of-experiment survey:
                [
                   "survey",
                   "Form",
                   {
                       consentRequired: false,
                       html: "<h2>Please answer the following questions about your experience:</h2>"+
                              "<div>"+
                                "<b>1) How did you approach the experiment task? Please choose all that apply.</b><br>"+
                                  '<input type="checkbox" name="train_approach" value="intuition_gut"> Went by intuition or gut feeling<br>'+
                                  '<input type="checkbox" name="train_approach" value="memorize"> Carefully listened to each syllable<br>'+
                                  '<input type="checkbox" name="train_approach" value="notes"> Took notes<br>'+
                                "<br><b>2) Please describe what you did in as much detail as possible.</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="train_description"></textarea><br><br>'+
                                "<br><b>2) Did you find yourself listening to a specific portion of each word when deciding how you would answer? If so, what part?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="part_of_word"></textarea><br><br>'+
                                "<br><b>3) What percent of trials do you think you got right?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="test_description"></textarea><br><br>'+
                                "<br><b>4) Did you have an “Aha!” moment, where you suddenly realized how to best decide whether a word followed the pattern?</b><br>"+
                                  '<input type="radio" name="aha_yesNo" value="1"> Yes<br>'+
                                  '<input type="radio" name="aha_yesNo" value="0"> No<br>'+
                                "<br><b>5) If so, please describe the “aha!” moment. When did it happen? What exactly did you suddenly realize?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="aha_description"></textarea><br><br>'+
                              "</div>"+
                              "<h2>Now please enter your Prolific ID:</h2>"+
                              "<div><textarea rows='1' cols='50' name='prolific_id'></textarea><br><br></div>"
                   }
               ],
              //Ending material
               ["sr", "__SendResults__", { }],
               [
                   "end",
                   "Message",
                   {
                       transfer: 5000,
                       html: "<div><p>Thanks for participating in this experiment! Click <a href='https://concept.linguistics.unc.edu/cgi-bin/abba-series/abba-02/finish.pl'>here</a> so that we can record your completion and give you the link for your compensation.</p></div>"
                   }
               ]
            );


//Define sequence of experiment (train_trials is randomized above)
my_sequence = ["preload_audio", "welcome_screen", "instructions"]
if (test_run){
      for (i = 0; i < 2; i ++){
        my_sequence.push("exp_"+test_trials[i]);
        my_sequence.push("test_"+test_trials[i]);
        my_sequence.push("sep");
     }
}
else {
    for (i = 0; i < test_trials.length; i ++){
        my_sequence.push("exp_"+test_trials[i]);
        my_sequence.push("test_"+test_trials[i]);
        my_sequence.push("sep");
     }
}
my_sequence.push("survey");
my_sequence.push("sr");
my_sequence.push("end");

var shuffleSequence = seq(...my_sequence);
var showProgressBar = false;
var manualSendResults = true;

var defaults = [
    "my_Separator", {
        transfer: "keypress",
        normalMessage: "Error! Please contact researcher.",
        ignoreFailure: true
    },
    "ComicCaption", { //Options for ComicCaption items
        as: ["Yes", "No"],
        presentHorizontally: true,
        instructions: "",
        leftComment: "",
        rightComment: "",
        randomOrder: false,
    }
];