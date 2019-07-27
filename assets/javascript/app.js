$(document).ready(function(){






let answers = ["Boot", "Shoe", "Sneaker", "Flippy floppy"];

let QAobj;


//function that will generate all of our new buttons and will be executed whenever there is a new question;
//I often question my page layout ;) hehehe
function questionPageLayout() {
    $("#buttonContainer").empty();
    shuffle(answers);
    for (let i = 0; i < answers.length; i++) {
        let div = $("<div>");
        let button = $("<button>").attr("type", "button");
        button.addClass("btn btn-light btn-lg btn-block");
        button.text(answers[i]);
        div.append(button);
        $("#buttonContainer").append(div);
    }
}

//TODO: write timer function 

function chooseQuestion() {
    const putInHere = $("#questionContainer");
    putInHere.empty();
    putInHere.text(answers); // TODO: change to QAobj[i].question
}

function makeStartButton () {
    const putInHere = $("#questionContainer");
    putInHere.empty();
    putInHere.text(answers); // TODO: change to QAobj[i].question
}



$("#startBtn").on("click", function(){
    chooseQuestion(); //possibly move this into the questionPageLayout function
    questionPageLayout();
    timer();
});






// questionPageLayout();






//from stackoverflow
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Used like so
  var arr = [2, 11, 37, 42];
  arr = shuffle(arr);
  console.log(arr);






});