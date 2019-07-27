let answers = ["Boot", "Shoe", "Sneaker", "Flippy floppy"];
// function questionPageLayout() {
//     answers.forEach(function() {
//         const div = $("<div>");
//         let button = $("<button>").attr("type", "button");
//         button.addClass("btn btn-light btn-lg btn-block").text(answers[i]);
//         div.append(button);
//         $("#buttonContainer").append(div);
//     })
// }


function questionPageLayout() {
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
questionPageLayout();




// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {

//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;

//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }

//     return array;
//   }

//   // Used like so
//   var arr = [2, 11, 37, 42];
//   arr = shuffle(arr);
//   console.log(arr);