$(document).ready(function () {
    let score = 0;
    let questionsLeft = 5;
    const questions = [{
            q: "The sky is blue.",
            a: "t",

            choices: ["t", "f", "f", "f"]
        },

        {
            q: "There are 365 days in a year.",
            a: "t",

            choices: ["t", "f", "f", "f"]

        },
        {
            q: "There are 42 ounces in a pound.",
            a: "f",

            choices: ["f", "t", "t", "t"]

        },
        {
            q: "The Declaration of Independence was created in 1745.",
            a: "f",

            choices: ["f", "t", "t", "t"]

        },
        {
            q: "Bananas are vegetables.",
            a: "f",

            choices: ["f", "t", "t", "t"]

        }
    ];
    console.log(questions[0]);

    let answers = []; //convert this into an object with questions and a, b, c, and d;

    let QAobj;
    let Q = -1; //this is to hold the Index of the questions object's array
    let QHistory = [];
    let questionDone = false;

    function nextQuestion() {
        Q++;
        console.log("Q: " + Q);
        questionPageLayout();
        resetTimer();

    }


    //function that will generate all of our new buttons and will be executed whenever there is a new question;
    function questionPageLayout() {
        $("#buttonContainer").empty();
        $("#question").empty();
        if (Q > questions.length) {
            $("#message").text(`You answered ${score} correctly out of ${questions.length}`);
        } else {
            $("#question").text(`Question ${Q+1}: ${questions[Q].q}`);

            shuffle(questions[Q].choices);
            for (let i = 0; i < questions[Q].choices.length; i++) {
                let div = $("<div>");
                let button = $("<button>").attr("type", "button");

                button.attr("data-answer", questions[Q].choices[i]);
                button.addClass("btn btn-light btn-lg btn-block");
                button.text(questions[Q].choices[i]);
                div.append(button);
                button.on("click", function () {
                    const ref = $(this).attr("data-answer"); //ref is going to grab our data-answer
                    console.log("this is the data-answer: " + ref);

                    const html = $(this).html();
                    console.log("this is the html: " + html);
                    console.log("this is the questions[Q].a: " + questions[Q].a);

                    if (button.text() == questions[Q].a) {

                        $(this).removeClass("btn-light").addClass("btn-success");
                        //TODO: add reset
                        answerCorrect();
                    } else {
                        $(this).removeClass("btn-light").addClass("btn-danger");
                        answerIncorrect();
                        //TODO: add reset
                    }
                });
                $("#buttonContainer").append(div);
            }
        }
    }

    //TODO: write timer function 
    ///////////////////////////////////////////////////////////////////////////////////////
    const resetTime = 20;
    var timeRemaining = resetTime;
    var intervalID;
    $("#stop").on("click", stop);
    $("#startBtn").on("click", run);

    function run() {
        clearInterval(intervalID);
        intervalID = setInterval(decrement, 1000);
    }



    function decrement() {
        timeRemaining--;
        $("#timer").html("<h1 class='display-1'>" + timeRemaining + "</h1>");
        if (timeRemaining === 0) {
            stop();
            outOfTime();
            console.log("Time's Up!");
        }
    }

    function resetTimer() {
        timeRemaining = resetTime;
        run();
    }

    function stop() {
        clearInterval(intervalID);
        resetTimer();
    }
    ///////////////////////////////////////////////////////////////////////////////////////


    //TODO: CREATE ANSWERED CORRECTLY FUNCTION
    //should use reset without penalizing (ie should give you points/numbercorrect++)
    answerCorrect = function () {
        $("#message").text("You are correct");
        score++;
        nextQuestion();

    };

    //TODO: CREATE ANSWERED INCORRECTLY FUNCTION
    //should use reset while penalizing (ie should not give you points)
    answerIncorrect = function () {
        $("#message").text(`Sorry, the correct answer is ${questions[Q].a}`);
        nextQuestion();
    };

    //TODO: CREATE OUT OF TIME FUNCTION
    //should use reset while penalizing (ie should not give you points... but will display a different message than incorrect function)
    outOfTime = function () {
        $("#message").text(`Out of time... The correct answer is ${questions[Q].a}`);
        nextQuestion();

    };





    function makeStartButton() {
        const putInHere = $("#questionContainer");
        putInHere.empty();
        putInHere.text(answers); // TODO: change to QAobj[i].question
    }

    // this only works on elements native to the html page not elements inserted into the DOM
    $("button").on("click", function () {
        ref = $(this).attr("data-answer"); //ref is going to grab our data-answer
        console.log(ref);
        html = $(this).html();
        console.log(html);
    });


    $("#startBtn").on("click", function () {
        nextQuestion();
    });







    // questionPageLayout();






    //from stackoverflow
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

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











});