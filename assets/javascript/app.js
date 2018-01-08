$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7z1wFi05bMPfxOLkjSAiRC9JZZCoXjIU",
    authDomain: "train-tracker-f5537.firebaseapp.com",
    databaseURL: "https://train-tracker-f5537.firebaseio.com",
    projectId: "train-tracker-f5537",
    storageBucket: "train-tracker-f5537.appspot.com",
    messagingSenderId: "508957062146"
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  const ref = database.ref();
  const userRef = database.ref("users");

  // Initial values
  let trainName = "";
  let destination = "";
  let firstTrain = 0;
  let frequency = 0;

  ref.on(
    "child_added",
    function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      // Change the HTML to reflect

      trainName = snapshot.val().trainName;
      destination = snapshot.val().destination;
      firstTrain = snapshot.val().firstTrain;
      frequency = snapshot.val().frequency;

      console.log(trainName);
      console.log(destination);
      console.log(firstTrain);
      console.log(frequency);
      console.log(currentTime);

      let initalTrain;
      let nextArrival;
      let minsAway;
      let startTime;

      //         // Time is 3:30 AM
      var firstTime = firstTrain;
      //         // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);
      //         // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
      //         // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
      //         // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
      //         // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      //         // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      nextArrival = moment(nextTrain).format("hh:mm");

      let print = `
      <tr>
            <td scope="row">${trainName}</td>
            <td>${destination}</td>
            <td>${frequency}</td>
            <td>${nextArrival}</td>
            <td>${tMinutesTillTrain}</td>
        </tr>`;
      $("#train-table-body").append(print);
      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );

  //   // Click event to add train info into database
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    let trainName;
    let destination;
    let firstTrain;
    let frequency;

    trainName = $("#train-name")
      .val()
      .trim();
    destination = $("#dest")
      .val()
      .trim();
    firstTrain = $("#first-time")
      .val()
      .trim();
    frequency = $("#freq")
      .val()
      .trim();

    ref.push({
      trainName,
      destination,
      firstTrain,
      frequency
    });

    $("#train-name").val("");
    $("#dest").val("");
    $("#first-time").val("");
    $("#freq").val("");
  });
});
