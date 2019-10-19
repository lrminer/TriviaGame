$(document).ready(() => {
  let score = 0;
  let answered = false;
  let outOfTime = false;

  function reRoll() {
    const C = Math.floor(characters.length * Math.random());
    return C;
  }

  questions = [
    {
      q: `How tall is ${characters[C].name} (in cm)?`,
      a: `${characters[C].height} cm`,
      choices: [
        `${characters[C].height} cm`,
        `${characters[Math.floor(Math.random() * characters.length)].height} cm`,
        `${characters[Math.floor(Math.random() * characters.length)].height} cm`,
        `${characters[Math.floor(Math.random() * characters.length)].height} cm`
      ]
    },
    {
      q: `What is ${characters[C].name}'s mass (in kg)?`,
      a: `${characters[C].mass} kg`,
      choices: [
        `${characters[C].mass} kg`,
        `${characters[Math.floor(Math.random() * characters.length)].mass} kg`,
        `${characters[Math.floor(Math.random() * characters.length)].mass} kg`,
        `${characters[Math.floor(Math.random() * characters.length)].mass} kg`
      ]
    },
    {
      q: `What color is ${characters[C].name}'s hair?`,
      a: `${characters[C].hair_color}`,
      choices: [
        `${characters[C].hair_color}`,
        `${characters[Math.floor(Math.random() * characters.length)].hair_color}`,
        `${characters[Math.floor(Math.random() * characters.length)].hair_color}`,
        `${characters[Math.floor(Math.random() * characters.length)].hair_color}`
      ]
    },
    {
      q: `What color is ${characters[C].name}'s skin?`,
      a: `${characters[C].skin_color}`,
      choices: [
        `${characters[C].skin_color}`,
        `${characters[Math.floor(Math.random() * characters.length)].skin_color}`,
        `${characters[Math.floor(Math.random() * characters.length)].skin_color}`,
        `${characters[Math.floor(Math.random() * characters.length)].skin_color}`
      ]
    },
    {
      q: `During which year (BBY or ABY) was ${characters[C].name} born?`,
      a: `${characters[C].birth_year}`,
      choices: [
        `${characters[C].birth_year}`,
        `${characters[Math.floor(Math.random() * characters.length)].birth_year}`,
        `${characters[Math.floor(Math.random() * characters.length)].birth_year}`,
        `${characters[Math.floor(Math.random() * characters.length)].birth_year}`
      ]
    },
    {
      q: `What is ${characters[C].name}'s gender?`,
      a: `${characters[C].gender}`,
      choices: [`male`, "female"]
    },
    {
      q: `How many Star Wars films is ${characters[C].name} in?`,
      a: `${characters[C].films.length}`,
      choices: [
        `${characters[C].films.length}`,
        `${characters[C].films.length + 2}`,
        `${characters[C].films.length - 1}`,
        `${characters[C].films.length + 1}`
      ]
    },
    {
      q: `What programming language do the Hutts use?`,
      a: `JabbaScript`,
      choices: [`JabbaScript`, `Java`, `C#`, `JavaScript`]
    }
  ];

  let Q = 0;

  function nextQuestion() {
    answered = false;
    outOfTime = false;
    if (Q > questions.length - 1) {
      endGame();
    } else {
      questionPageLayout();
      resetTimer();
    }
    Q++;
  }

  const endGame = () => {};
  const questionPageLayout = () => {
      $('#buttonContainer').empty();
        $('#message').empty().text(`Question ${Q}: ${questions[Q].q}`)
  };
  const resetTimer = () => {};
});
