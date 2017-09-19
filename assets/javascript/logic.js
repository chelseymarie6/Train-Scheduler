//JavaScript logic for Train Scheduler

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMId_Mrg9yTJFpUCTp88DxHf0fSOplE40",
    authDomain: "i-love-trains-c1189.firebaseapp.com",
    databaseURL: "https://i-love-trains-c1189.firebaseio.com",
    projectId: "i-love-trains-c1189",
    storageBucket: "i-love-trains-c1189.appspot.com",
    messagingSenderId: "220802519644"
};

firebase.initializeApp(config);

var database = firebase.database();
//for HTML
var name = "";
var destination = "";
var firstTrain ="";
var frequency ="";
//for time conversions
var nextTrain = "";
var nextTrainFormat = "";
var minAway = "";
var firstTrainConvert = "";
var currentTime = "";
var differenceTime = "";
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

        $("#train-scheduler").append("<tr class = 'table-row'" + childSnapshot + "'" + ">" + "<td>" + childSnapshot.val().name + "</td>");
    }, function(errorObject) {
        console.log("Errors handles: " + errorObject.code);
    });

    // database.ref().on("child_added", function(childSnapshot)  {
    //     var employee = childSnapshot.val().employee;
    //     var role = childSnapshot.val().role;
    //     var startDate = childSnapshot.val().startDate;
    //     var monthlyRate = childSnapshot.val().monthlyRate;
    //     // var monthsWorked = (moment(startDate, "MM/DD/YY").fromNow());
    //     // var monthsWorked = moment(startDate).diff(moment(), "months");
    //     var monthsWorked = startDate.diff(moment("09/14/17", "months"));
    //     var total = 200
        
    //     console.log(childSnapshot.val().employee);
    //     console.log(childSnapshot.val().role);
    //     console.log(childSnapshot.val().startDate);
    //     console.log(childSnapshot.val().monthlyRate);
    //     console.log(monthsWorked);
    //     $("#table-rows").append("<tr>" + "<td>" + employee + "</td><td>" + role + "</td><td>" + startDate + "</td><td>" + monthsWorked + "</td><td>" + monthlyRate + "</td><td>" + total + "</td></tr>");
                                    
    // });

});