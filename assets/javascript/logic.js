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
//for remove train
var getKey = "";

$(document).ready(function (){

    $("#add-train").on("click", function(event) {
        event.preventDefault();
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        
        //code for times - uses moment.js
        currentTime = moment();//this gives us the current time

        firstTrainConvert = moment(firstTrain, "hh:mm").subtract (1, "y");
        differenceTime = moment().diff(moment(firstTrainConvert), "m");
        timeRemain = differenceTime % frequency;
        minToTrain = frequency - timeRemain;
        nextTrain = moment().add(minToTrain, "m");
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
    });

    database.ref().on("child_added", function(childSnapshot){

        $("#train-scheduler").append("<tr class = 'table-row'" + childSnapshot + "'" + ">" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + childSnapshot.val().nextTrainFormat + "</td>" + "<td>" + childSnapshot.val().minToTrain + "</td>" +  "<td class='col-xs-1'>" + "<input type='submit' value='Remove Train' class='remove-train btn btn-primary btn-sm'>" + "</td>" + "</tr>");
    }, function(errorObject) {
        console.log("Errors handles: " + errorObject.code);
    });

    $("body").on("click", ".remove-train", function (){
        $(this).closest("tr").remove();
        getKey = $(this).parent().parent().attr("id");
        database.child(getKey).remove();
    });


});