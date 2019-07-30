$(document).ready(function () {
    let score = 0;
    let answerOrOOT = false;

    // const questions = [{
    //         q: "The sky is blue.",
    //         a: "t",

    //         choices: ["t", "f", "f", "f"]
    //     },

    //     {
    //         q: "There are 365 days in a year.",
    //         a: "t",

    //         choices: ["t", "f", "f", "f"]

    //     },
    //     {
    //         q: "There are 42 ounces in a pound.",
    //         a: "f",

    //         choices: ["f", "t", "t", "t"]

    //     },
    //     {
    //         q: "The Declaration of Independence was created in 1745.",
    //         a: "f",

    //         choices: ["f", "t", "t", "t"]

    //     },
    //     {
    //         q: "Bananas are vegetables.",
    //         a: "f",

    //         choices: ["f", "t", "t", "t"]

    //     }
    // ];


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

    // let results;

    // var myResponse;
    // $.ajax({
    //                 url: 'PageMethod/GetData',
    //                 method: 'post',
    //                 dataType: 'json',
    //                 data: JSON.stringify({ dataId: "xxx" }),
    //                 contentType: 'application/json',
    //                 success: function (data) {
    //                     myResponse = data.d.responseText;
    //                 },
    //                 error: function (ex) {
    //                     alert(ex.responseText);
    //                 }
    //             });

    // function searchSWAPI() {
    //     const baseURL = "https://swapi.co/api/people/";
    //     const characterName = $("#queryCharacterName").val();
    //     let queryURL = baseURL + characterName;
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response);
    //         results = response.results;
    //         console.log(results);
    //         for (let i = 0; i <results.length; i++){
    //             console.log(results[i]);
    //         }

    //     });
    // }

    // searchSWAPI();
    // console.log("here are the results " + results);

    questions = [{
            q: `What is ${lukeTestInfo.name}'s height (in cm)?`,
            a: `${lukeTestInfo.height}`,
            choices: [`${lukeTestInfo.height}`, "200", "100", "150"]
        },
        {
            q: `What is ${lukeTestInfo.name}'s mass (in kg)?`,
            a: `${lukeTestInfo.mass}`,
            choices: [`${lukeTestInfo.mass}`, "78", "79", "80"]
        },
        {
            q: `What is ${lukeTestInfo.name}'s hair color?`,
            a: `${lukeTestInfo.hair_color}`,
            choices: [`${lukeTestInfo.hair_color}`, "black", "red", "green"]
        },
        {
            q: `What is ${lukeTestInfo.name}'s skin color?`,
            a: `${lukeTestInfo.skin_color}`,
            choices: [`${lukeTestInfo.skin_color}`, "dark", "blue", "yellow"]
        },
        {
            q: `What is ${lukeTestInfo.name}'s birth year?`,
            a: `${lukeTestInfo.birth_year}`,
            choices: [`${lukeTestInfo.birth_year}`, "20BBY", "20ABY", "19ABY"]
        },
        {
            q: `What is ${lukeTestInfo.name}'s gender?`,
            a: `${lukeTestInfo.gender}`,
            choices: [`${lukeTestInfo.gender}`, "female"] //testing to make sure it can handle less than 4 answers appropriately
        },
        {
            q: `How many Star Wars films is ${lukeTestInfo.name} in?`,
            a: `${lukeTestInfo.films.length}`,
            choices: [`${lukeTestInfo.films.length}`, `${lukeTestInfo.films.length+2}`, `${lukeTestInfo.films.length-1}`, `${lukeTestInfo.films.length+1}`]
        },
        {
            q: `What programming language do the Hutts use?`,
            a: `JabbaScript`,
            choices: [`JabbaScript`, `Java`, `C#`, `JavaScript`]
        },



    ];
    // console.log(questionsTest);
    console.log(lukeTestInfo.name);
    console.log(lukeTestInfo.height);
    console.log(lukeTestInfo.mass);
    console.log(lukeTestInfo.hair_color);
    console.log(lukeTestInfo.skin_color);
    console.log(lukeTestInfo.birth_year);
    console.log(lukeTestInfo.gender);
    console.log(lukeTestInfo.homeworld);

    console.log(questions[0]);

    let answers = []; //convert this into an object with questions and a, b, c, and d;

    let QAobj;
    let Q = -1; //this is to hold the Index of the questions object's array
    let QHistory = []; //might delete later; was intended for use with questions given in random order.
    let questionDone = false;


    initializerFunction();

    function nextQuestion() {
        Q++;
        console.log("Q: " + Q);
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
        $("#question").empty();

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
            $("#buttonContainer").append(div);

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
    ////////////////////////RESET TIMER///////////////////////////////////////////////////////////////////
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
        $("#message").text("You are correct");
        score++;
        //      nextQuestion();
        stop();
        runWaitTime();

    }

    //TODO: CREATE ANSWERED INCORRECTLY FUNCTION
    //should use reset while penalizing (ie should not give you points)
    function answerIncorrect() {
        $("#message").text(`Sorry, the correct answer is ${questions[Q].a}`);
        stop();
        runWaitTime();
    }

    //TODO: CREATE OUT OF TIME FUNCTION
    //should use reset while penalizing (ie should not give you points... but will display a different message than incorrect function)
    function outOfTime() {
        $("#message").text(`Out of time... The correct answer is ${questions[Q].a}`);
        stop();
        runWaitTime();
    }

    function endGame() {
        stop();
        $("#timer").text("00");
        $("#buttonContainer").empty();
        $("#question").empty();
        $("#message").html(`You answered <b>${score}</b> correctly out of <b>${questions.length}</b>`);
        const backBtn = $(`<button id="backBtn" class="btn btn-primary btn-lg btn-block">Back</button>`);
        backBtn.on("click", function () {
            initializerFunction();
            /////////////////////////////////////////////////////////////////////
            //The back button basically reloads the screen, but doesnt actually. Its main purpose is to execute the initizer function.
            //Through the initializerFunction we are able to reset all of the state. Hopefully this can be used to tie back to a query page as the initializer instead of just the start button.
            /////////////////////////////////////////////////////////////////////

        });
        $("#buttonContainer").append(backBtn);


    }

    function startGame() {
        // searchSWAPI();
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
    //////////////////////////////////////////////////////////////////////////this is for testing. remove later//////////////////////////////////////////////////////////////////////////////////////////////////////
    $("button").on("click", function () {
        ref = $(this).attr("data-answer");
        console.log(ref);
        html = $(this).html();
        console.log(html);
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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