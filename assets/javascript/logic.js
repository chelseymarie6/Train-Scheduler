//JavaScript logic for Train Scheduler
//Variables
// initialize Firebase
var config = {
    apiKey: "AIzaSyDMId_Mrg9yTJFpUCTp88DxHf0fSOplE40",
    authDomain: "i-love-trains-c1189.firebaseapp.com",
    databaseURL: "https://i-love-trains-c1189.firebaseio.com",
    projectId: "i-love-trains-c1189",
    storageBucket: "i-love-trains-c1189.appspot.com",
    messagingSenderId: "220802519644"
};

firebase.initializeApp(config);

//database
var database = firebase.database();
//for HTML
var name = "";
var destination = "";
var firstTrain ="";
var frequency ="";
//for time conversions
var firstTrainConvert = "";
var currentTime = "";
var differenceTime = "";
var minAway = "";
var nextTrain = "";
var nextTrainFormat = "";
var timeRemain = "";
var minToTrain = "";

$(document).ready(function (){

    $("#add-train").on("click", function(event) {
        event.preventDefault();
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        
        //code for times - uses moment.js
        firstTrainConvert = moment(firstTrain, "hh:mm").subtract (1, "years");
        currentTime = moment();
        differenceTime = moment().diff(moment(firstTrainConvert), "minutes");
        timeRemain = differenceTime % frequency;
        minToTrain = frequency - timeRemain;
        nextTrain = moment().add(minToTrain, "minutes");
        nextTrainFormat = moment(nextTrain).format("hh:mm");
        
        // code for handling push
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            nextTrainFormat: nextTrainFormat,
            minToTrain: minToTrain
        });

        //code to update HTML with inputs
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");

        console.log(name);
 
    });

    database.ref().on("child_added", function(childSnapshot){

        $("#train-scheduler").append("<tr class = 'table-row'" + childSnapshot + "'" + ">" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + childSnapshot.val().nextTrainFormat + "</td>" + "<td>" + childSnapshot.val().minToTrain + "</td>");
    }, function(errorObject) {
        console.log("Errors handles: " + errorObject.code);
    });

});