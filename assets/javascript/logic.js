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

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

var employee = "";
var role = "";
var startDate ="";
var monthlyRate ="";
$("#submit").on("click", function(event) {
    event.preventDefault();
     employee = $("#employee").val().trim();
     role = $("#role").val().trim();
     startDate = $("#startDate").val().trim();
     monthlyRate = $("#monthlyRate").val().trim();
     // code for handling push
     database.ref().push({
        employee: employee,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
    // console.log(employee);
    // console.log(role);
    // console.log(startDate);
    // console.log(monthlyRate);
});
database.ref().on("child_added", function(childSnapshot)  {
    var employee = childSnapshot.val().employee;
    var role = childSnapshot.val().role;
    var startDate = childSnapshot.val().startDate;
    var monthlyRate = childSnapshot.val().monthlyRate;
    // var monthsWorked = (moment(startDate, "MM/DD/YY").fromNow());
    // var monthsWorked = moment(startDate).diff(moment(), "months");
    var monthsWorked = startDate.diff(moment("09/14/17", "months"));
    var total = 200
    
    console.log(childSnapshot.val().employee);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);
    console.log(monthsWorked);
    $("#table-rows").append("<tr>" + "<td>" + employee + "</td><td>" + role + "</td><td>" + startDate + "</td><td>" + monthsWorked + "</td><td>" + monthlyRate + "</td><td>" + total + "</td></tr>");
                                 
});