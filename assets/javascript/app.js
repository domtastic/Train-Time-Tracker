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

  // Initial values
  let trainName = "";
  let destination = "";
  let firstTrain = 0;
  let frequency = 0;

  //   ref.on(
  //     "child_added",
  //     function(snapshot) {
  //       // Log everything that's coming out of snapshot
  //       console.log(snapshot.val());
  //       // Change the HTML to reflect

  //       trainName = snapshot.val().trainName;
  //       destination = snapshot.val().destination;
  //       firstTrain = snapshot.val().firstTrain;
  //       frequency = snapshot.val().frequency;
  //       let currentTime = moment();

  //       console.log(trainName);
  //       console.log(destination);
  //       console.log(firstTrain);
  //       console.log(frequency);
  //       console.log(currentTime);

  //  intial = to the  current date, with the time of day given from the first train input
  // take the string of the hours and minutes from firstTrain and split by :
  // add the first index to hours, and second index to seconds
  // add hours and seconds to current date

  // let initalTrain = moment().hour()
  // let nextArrival
  // let minsAway

  // let startTime = moment(firstTrain, "HH:mm");

  //     let print = `
  //   <tr>
  //         <td scope="row">${trainName}</td>
  //         <td>${destination}</td>
  //         <td>${frequency}</td>
  //         <td>${initialTrain}</td>
  //         <td>${minsAway}</td>
  //     </tr>`;
  //     $('#emp-table-body').append(print);
  // Handle the errors
  //     },
  //     function(errorObject) {
  //       console.log("Errors handled: " + errorObject.code);
  //     }
  //   );

  // Click event to add train info into database
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    let trainName = "Dom";
    let destination = "mopuntains";
    let firstTrain = "12:45";
    let frequency = 24;

    // trainName = $("#train-name")
    //   .val()
    //   .trim();
    // destination = $("#dest")
    //   .val()
    //   .trim();
    // firstTrain = $("#first-time")
    //   .val()
    //   .trim();
    // frequency = $("#freq")
    //   .val()
    //   .trim();

    ref.push({
      trainName,
      destination,
      firstTrain,
      frequency
    });
  });
});
