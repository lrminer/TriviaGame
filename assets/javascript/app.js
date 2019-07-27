$(document).ready(function () {
    let score = 0;
    const questions = [{
            q: "The sky is blue.",
            a: "t",
            b: "f",
            c: "f",
            d: "f",
        },
        {
            q: "There are 365 days in a year.",
            a: "t",
            b: "f",
            c: "f",
            d: "f",
        },
        {
            q: "There are 42 ounces in a pound.",
            a: "f",
            b: "t",
            c: "t",
            d: "t",
        },
        {
            q: "The Declaration of Independence was created in 1745.",
            a: "f",
            b: "t",
            c: "t",
            d: "t",
        },
        {
            q: "Bananas are vegetables.",
            a: "f",
            b: "t",
            c: "t",
            d: "t",
        }
    ];

    let answers = []; //convert this into an object with questions and a, b, c, and d;

    let QAobj;

    function randomQuestion() {
        const q = Math.floor(Math.random()*questions.length);
        console.log(questions[q].q);
    }
    randomQuestion ();
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
    ///////////////////////////////////////////////////////////////////////////////////////
    const resetTime= 30;
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
            console.log("Time's Up!");
        }
    }

    function reset() {
        timeRemaining = resetTime;
        run();
    }

    function stop() {
        clearInterval(intervalID);
        questionPageLayout();
        reset();
    }
    ///////////////////////////////////////////////////////////////////////////////////////


//TODO: CREATE ANSWERED CORRECTLY FUNCTION
//should use reset without penalizing (ie should give you points/numbercorrect++)


//TODO: CREATE ANSWERED INCORRECTLY FUNCTION
//should use reset while penalizing (ie should not give you points)


//TODO: CREATE OUT OF TIME FUNCTION
//should use reset while penalizing (ie should not give you points... but will display a different message than incorrect function)
































    function chooseQuestion() {
        const putInHere = $("#questionContainer");
        putInHere.empty();
        putInHere.text(answers); // TODO: change to QAobj[i].question
    }

    function makeStartButton() {
        const putInHere = $("#questionContainer");
        putInHere.empty();
        putInHere.text(answers); // TODO: change to QAobj[i].question
    }



    $("#startBtn").on("click", function () {
        chooseQuestion(); //possibly move this into the questionPageLayout function
        questionPageLayout();
        timer();
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

    // Used like so
    var arr = [2, 11, 37, 42];
    arr = shuffle(arr);
    console.log(arr);






});