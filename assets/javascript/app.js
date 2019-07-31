$(document).ready(function () {
    let score = 0;
    let answerOrOOT = false;

    let C = Math.floor(Math.random() * characters.length);
    lukeTestInfo = {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.co/api/planets/1/",
        "films": [
            "https://swapi.co/api/films/2/",
            "https://swapi.co/api/films/6/",
            "https://swapi.co/api/films/3/",
            "https://swapi.co/api/films/1/",
            "https://swapi.co/api/films/7/"
        ],
        "species": [
            "https://swapi.co/api/species/1/"
        ],
        "vehicles": [
            "https://swapi.co/api/vehicles/14/",
            "https://swapi.co/api/vehicles/30/"
        ],
        "starships": [
            "https://swapi.co/api/starships/12/",
            "https://swapi.co/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.co/api/people/1/"
    };


    questions = [{
            q: `How tall is ${characters[C].name} (in cm)?`,
            a: `${characters[C].height} cm`,
            choices: [`${characters[C].height} cm`, `${characters[Math.floor(Math.random()*characters.length)].height} cm`, `${characters[Math.floor(Math.random()*characters.length)].height} cm`, `${characters[Math.floor(Math.random()*characters.length)].height} cm`]
        },
        {
            q: `What is ${characters[C].name}'s mass (in kg)?`,
            a: `${characters[C].mass}`,
            choices: [`${characters[C].mass} kg`, `${characters[Math.floor(Math.random()*characters.length)].mass} kg`, `${characters[Math.floor(Math.random()*characters.length)].mass} kg`, `${characters[Math.floor(Math.random()*characters.length)].mass} kg`]
        },
        {
            q: `What color is ${characters[C].name}'s hair?`,
            a: `${characters[C].hair_color}`,
            choices: [`${characters[C].hair_color}`, `${characters[Math.floor(Math.random()*characters.length)].hair_color}`, `${characters[Math.floor(Math.random()*characters.length)].hair_color}`, `${characters[Math.floor(Math.random()*characters.length)].hair_color}`]
        },
        {
            q: `What color is ${characters[C].name}'s skin?`,
            a: `${characters[C].skin_color}`,
            choices: [`${characters[C].skin_color}`, `${characters[Math.floor(Math.random()*characters.length)].skin_color}`, `${characters[Math.floor(Math.random()*characters.length)].skin_color}`, `${characters[Math.floor(Math.random()*characters.length)].skin_color}`]
        },
        {
            q: `During which year (BBY or ABY) was ${characters[C].name} born?`,
            a: `${characters[C].birth_year}`,
            choices: [`${characters[C].birth_year}`, `${characters[Math.floor(Math.random()*characters.length)].birth_year}`, `${characters[Math.floor(Math.random()*characters.length)].birth_year}`, `${characters[Math.floor(Math.random()*characters.length)].birth_year}`]
        },
        {
            q: `What is ${characters[C].name}'s gender?`,
            a: `${characters[C].gender}`,
            choices: [`${characters[C].gender}`, "female"] //testing to make sure it can handle less than 4 answers appropriately
        },
        {
            q: `How many Star Wars films is ${characters[C].name} in?`,
            a: `${characters[C].films.length}`,
            choices: [`${characters[C].films.length}`, `${characters[C].films.length+2}`, `${characters[C].films.length-1}`, `${characters[C].films.length+1}`]
        },
        {
            q: `What programming language do the Hutts use?`,
            a: `JabbaScript`,
            choices: [`JabbaScript`, `Java`, `C#`, `JavaScript`]
        },
    ];

    let Q = -1; //this is to hold the Index of the questions object's array

    initializerFunction();

    function nextQuestion() {
        Q++;
        answerOrOOT = false;
        if (Q > questions.length - 1) {
            endGame();
        } else {
            questionPageLayout();
            resetTimer();
        }
    }
    //function that will generate all of our new buttons and will be executed whenever there is a new question;
    function questionPageLayout() {
        $("#buttonContainer").empty();
        $("#message").empty();

        $("#message").text(`Question ${Q+1}: ${questions[Q].q}`);

        shuffle(questions[Q].choices);
        for (let i = 0; i < questions[Q].choices.length; i++) {
            //let div = $("<div>");

            let button = $("<button>").attr("type", "button");

            button.attr("data-answer", questions[Q].choices[i]);
            button.addClass("btn btn-light btn-lg btn-block");
            button.text(questions[Q].choices[i]);
            // div.append(button);
            button.on("click", function () {
                const ref = $(this).attr("data-answer"); //ref is going to grab our data-answer
                console.log("this is the data-answer: " + ref);

                const html = $(this).html();
                console.log("this is the html: " + html);
                console.log("this is the questions[Q].a: " + questions[Q].a);

                if (!answerOrOOT) {
                    answerOrOOT = true;
                    console.log(answerOrOOT);
                    if (button.text() == questions[Q].a) {

                        $(this).removeClass("btn-light").addClass("btn-success");
                        //TODO: add reset
                        answerCorrect();
                    } else {
                        $(this).removeClass("btn-light").addClass("btn-danger");
                        answerIncorrect();
                        //TODO: add reset
                    }
                }
            });
            $("#buttonContainer").append(button);

        }
    }

    //////////////////////////////////////////////////TIMER BELOW (DO NOT CHANGE)//////////
    ///////////////////////////////////////////////////////////////////////////////////////
    const resetTime = 15;

    var timeRemaining = resetTime;

    var intervalID;



    $("#startBtn").on("click", run);
    $("#stopBtn").on("click", stop);
    $("#runBtn").on("click", run);
    $("#resetBtn").on("click", resetTimer);

    function run() {
        clearInterval(intervalID);
        intervalID = setInterval(decrement, 1000);
    }

    function decrement() {
        timeRemaining--;
        $("#timer").html("<h1 class='display-1'>" + timeRemaining + "</h1>");
        if (timeRemaining === 0) {
            answerOrOOT = true;
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
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////WAIT TIMER///////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var resetWaitTime = 5;
    var waitTime = resetWaitTime;
    var intervalIDWait;

    function runWaitTime() {
        clearInterval(intervalIDWait);
        intervalIDWait = setInterval(decWait, 1000);
    }

    function decWait() {
        waitTime--;
        $("#timer").html(`<h1 class='display-1'>Next question in:
        ${waitTime}</h1>`)
        if (waitTime === 0) {
            resetWaitTimer();
            stopWaitTimer();
            nextQuestion();
        }
    }

    function resetWaitTimer() {
        waitTime = resetWaitTime;
        runWaitTime();
    }

    function stopWaitTimer() {
        clearInterval(intervalIDWait);
    }


    ///////////////////////////////////////////////////////////////////////////////////////


    //TODO: CREATE ANSWERED CORRECTLY FUNCTION
    //should use reset without penalizing (ie should give you points/numbercorrect++)
    function answerCorrect() {
        $("#message").html("You are correct!");
        score++;
        stop();
        runWaitTime();

    }

    //TODO: CREATE ANSWERED INCORRECTLY FUNCTION
    //should use reset while penalizing (ie should not give you points)
    function answerIncorrect() {
        $("#message").html(`Sorry, the correct answer is <b>${questions[Q].a}</b>.`);
        stop();
        runWaitTime();
    }

    //TODO: CREATE OUT OF TIME FUNCTION
    //should use reset while penalizing (ie should not give you points... but will display a different message than incorrect function)
    function outOfTime() {
        $("#message").html(`Out of time... The correct answer is <b>${questions[Q].a}</b>`);
        stop();
        runWaitTime();
    }

    function endGame() {
        stop();
        $("#timer").text("00");
        $("#buttonContainer").empty();
        $("#message").empty();
        $("#message").html(`You answered <b>${score}</b> correctly out of <b>${questions.length}</b>`);
        const backBtn = $(`<button id="backBtn" class="btn btn-primary btn-lg btn-block">Back</button>`);
        backBtn.on("click", function () {
            initializerFunction();

        });
        $("#buttonContainer").append(backBtn);


    }

    function startGame() {
        Q = -1; //assignment of Q to -1 needs to be before nextQuestion
        nextQuestion();
    }

    function initializerFunction() {
        const startBtn = $(`<button type="button" id="startBtn" class="btn btn-primary btn-lg btn-block LRM">START</button>`);
        startBtn.on("click", function () {
            startGame();
        });
        $("#buttonContainer").empty().append(startBtn);
        $("#message").empty();
        score = 0;

    }

    $("#startBtn").on("click", function () {
        startGame();
    });

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