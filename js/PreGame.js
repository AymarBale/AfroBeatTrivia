const fileList = ['10 Toes.mp3', '1da Banton - No Wahala (Lyrics).mp3', 'Asake - Peace Be Unto You (official lyrics video) PBUY.mp3',
    'Asake Ft Burna Boy Sungba (Remix).mp3', 'AV - BIG THUG BOYS (LYRICS).mp3', 'Aya Nakamura - Cadeau feat Tiakola (Paroles).mp3',
    'Ayra Starr - Bloody Samaritan (Lyrics).mp3', 'Baddest Boy (Viral Video).mp3', 'Bank Alert [Official Video].mp3', 'Buga - Kizz Daniel ft Tekno.mp3',
    'Burna Boy - Last Last.mp3', 'Call Me Every Day (Audio).mp3', 'Camidoh - SUGARCANE remix (Offical Lyrics Video) ft King Promise Mayorkun & Darkoo.mp3',
    'Certified Loner (No Competition)\xa0.mp3', 'Dalie (Mixed).mp3', 'Dance for Me (Remix).mp3', 'Did You See (C Tangana Remix).mp3', 'Dorobucci.mp3',
    'Emiliana.mp3', 'Finesse.mp3', 'Fireboy DML & Asake - Bandana (Lyrics).mp3', 'Fireboy DML - Peru (Lyrics).mp3', 'Fireboy DML - Playboy (Lyrics).mp3',
    'For My Hand.mp3', 'Holy Father.mp3', 'i m a mess.mp3', 'Joeboy - Alcohol.mp3', 'Jolie madame.mp3', 'Jungeli ft Imen es Alonzo Lossa & Abou Debeing - Petit génie (AUDIO OFFICIEL).mp3',
    'Kikimoteleba - Tigini (lyrics).mp3', 'Kizz Daniel - Lie (Lyrics).mp3', 'Leg Over.mp3', 'Love Made Me Do It.mp3', 'Magic in the Air.mp3',
    'Mavins Crayon Ayra Starr LADIPOE Magixx & Boy Spyce - Overdose (Lyrics).mp3', 'Monalisa.mp3', 'OCEAN.mp3', 'Olakira - Maserati Remix [Official Video] Ft Davido.mp3',
    'Omah Lay - Woman (Lyrics).mp3', 'Oxlade - KU LO SA  A COLORS SHOW.mp3', 'P-Square - Collabo [Music Video] ft Don Jazzy Freeme TV.mp3', 'Personally (Official Video).mp3',
    'Rema Selena Gomez - Calm Down (Lyrics).mp3', 'Ruger - WeWe (Lyrics).mp3', 'Sekkle Down.mp3', 'Spinall feat Asake - Palazzo (Lyrics).mp3', 'UNAVAILABLE (Official Audio).mp3',
    'Understand (Lyric Video).mp3', 'Ya Dieu Dedans.mp3', 'Young Jonn - Dada (feat Davido) [Remix] (Lyrics).mp3', 'Young Jonn - Xtra Cool (Lyrics).mp3'];
var countdownInterval;
let answer;
let response;
let score = 0;
let scoreBoard;
let gameOver = false;
scoreBoard = document.createElement('h1');
scoreBoard.id = 'score';
scoreBoard.textContent = score + "/5";
document.addEventListener("DOMContentLoaded", function () {
    var myButton = document.getElementById("startBut");

    if (myButton) {
        myButton.scrollIntoView();
    }
});

function getRandomFileFromList(files) {
    if (files.length === 0) {
        console.error('The list of files is empty.');
        return null;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];

    return randomFile;
}

function giveChoice() {
    var title = document.getElementById("titleScreen");
    var but = document.getElementById("startBut");
    var choice = document.getElementById("mainWrap")
    title.remove();
    but.remove();
    createButtonDiv('Single Player');
    createButtonDiv('Multiplayer Player', false);
}

function createButtonDiv(content, isEnabled = true) {
    var container = document.createElement('div');
    container.className = 'button-container';

    var button = document.createElement('button');
    button.id = 'choice';
    button.className = 'choice-button';
    button.appendChild(document.createTextNode(content));
    button.addEventListener("click", startGame);

    // Set the 'disabled' attribute based on the isEnabled parameter
    if (!isEnabled) {
        button.setAttribute('disabled', 'true');
    }

    container.appendChild(button);
    document.getElementById('mainWrap').appendChild(container);
}

function musicalChoice(contents) {
    var container = document.createElement('div');
    container.className = 'button-containers';

    // Apply styles to the button container
    container.style.width = '90%';
    container.style.textAlign = 'center';

    // Create a grid container to arrange buttons in a square layout
    var gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    for (var i = 0; i < contents.length; i++) {
        var button = document.createElement('button');
        button.id = 'choice';  // Unique ID for each button
        button.className = 'choice-button';
        button.style.width = '90%';  // Apply width style to the choice button
        button.appendChild(document.createTextNode(contents[i]));
        button.addEventListener("click", function (event) {
            response = event.target.textContent;

            // Call evaluateAnswer with the desired parameters
            evaluateAnswer(answer, response);

        });
        gridContainer.appendChild(button);
    }

    container.appendChild(gridContainer);
    document.getElementById('mainWrap').appendChild(container);
}

function startGame() {
    const containerElement = document.querySelector('.container');

    // Add the width property to the container element
    containerElement.style.width = '90%';
    var elements = document.getElementsByClassName("button-container");

    // Convert the HTMLCollection to an array for easier iteration
    var elementsArray = Array.from(elements);

    // Remove each element
    elementsArray.forEach(function (element) {
        element.remove();
    });
    countDown()
}

function countDown() {
    var mainWrap = document.getElementById("mainWrap");

    // Create an h1 element
    var countdownElement = document.createElement('h1');
    countdownElement.id = 'countdown';

    // Append the h1 element to the mainWrap
    mainWrap.appendChild(countdownElement);

    // Start the countdown
    var count = 3;

    var countdownInterval = setInterval(function () {
        countdownElement.textContent = count;
        count--;
        if (count < 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            startRound()
        }
    }, 1000);
}

let roundCount = 0;

function startRound() {
    // Get the mainWrap element
    var mainWrap = document.getElementById('mainWrap');

    mainWrap.appendChild(scoreBoard)
    // Remove the previous evaluation result (h1 element with id 'evaluationResult')
    var previousEvaluationResult = mainWrap.querySelector('#evaluationResult');
    if (previousEvaluationResult) {
        previousEvaluationResult.remove();
    }

    if (roundCount < 5) {
        // Remove the previous button-container
        var previousContainer = mainWrap.querySelector('.button-containers');
        if (previousContainer) {
            previousContainer.remove();
        }

        // Create and append a progress bar
        const progressLabel = document.createElement('span');
        progressLabel.className = 'progress-label';
        progressLabel.textContent = '0';
        progressLabel.id = 'progressLabel'; // Add an ID to the progress label
        var progressBar = document.createElement('progress');
        progressBar.classList.add('html5');
        progressBar.max = 70;
        progressBar.addEventListener('change', function () {
            // Update the content of the span with the current value of the progress bar
            const label = document.getElementById('progressLabel');
            if (label) {

                label.textContent = progressBar.value;
            }
        });
        mainWrap.appendChild(progressLabel);
        mainWrap.appendChild(progressBar);


        // Increment the round count after displaying the buttons
        roundCount++;

        const randomFile = getRandomFileFromList(fileList);
        console.log(randomFile);
        answer = randomFile.replace(/\.mp3$/, '')
        var buttonContents = [
            randomFile.replace(/\.mp3$/, ''),
            getRandomFileFromList(fileList).replace(/\.mp3$/, ''),
            getRandomFileFromList(fileList).replace(/\.mp3$/, ''),
            getRandomFileFromList(fileList).replace(/\.mp3$/, '')
        ];
        playSound(randomFile)// ------------------------------------------------------->
        buttonContents = shuffleArray(buttonContents);
        musicalChoice(buttonContents);

        // Update the progress bar and remove both the buttons and progress bar
        let progressValue = 0;

        function updateProgressBar() {

            progressValue += 10;

            // ----------------------------------------------------->
            progressBar.value = progressValue;
            const changeEvent = new Event('change');
            progressBar.dispatchEvent(changeEvent);
            if (progressValue < 70) {
                setTimeout(updateProgressBar, 700);
            } else {
                progressBar.remove();
                progressLabel.remove();
                progressLabel.textContent = '0';
                var elements = document.getElementsByClassName("button-containers");
                var elementsArray = Array.from(elements);
                elementsArray.forEach(function (element) {
                    element.remove();
                });
                // Wait for 2 seconds before the next round
                setTimeout(function () {
                    // Remove the previous button-container after the timeout
                    var previousContainer = mainWrap.querySelector('.button-containers');
                    if (previousContainer) {
                        previousContainer.remove();
                    }

                    if (roundCount === 5) {
                        gameOver = true;

                        scoreBoard.textContent = "";
                        var result = document.createElement('h1');
                        result.id = 'finalScore';
                        result.textContent = score + "/5";
                        mainWrap.appendChild(result)
                        replay();

                    }
                    startRound();
                }, 1000);
            }
        }

        updateProgressBar();

    }
}

function replay() {
    var button = document.createElement('button');
    button.id = 'choice';  // Unique ID for each button
    button.className = 'choice-button';
    button.style.width = '90%';  // Apply width style to the choice button
    button.appendChild(document.createTextNode("replay"));
    button.addEventListener("click", function (event) {
        roundCount = 0;
        score = 0;
        startGame();
        button.remove();
        document.getElementById('finalScore').remove();
    });
    document.getElementById('mainWrap').appendChild(button);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    // Check for duplicate elements and replace them
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                array[j] = getRandomFileFromList(fileList).replace(/\.mp3$/, '');
            }
        }
    }

    return array;
}

function evaluateAnswer(answer, response) {
    var elements = document.getElementsByClassName("button-containers");
    var progressLabel = document.getElementsByClassName("progress-label")[0];
    var progressBar = document.getElementsByClassName('html5')[0];  // Corrected class name
    // Convert the HTMLCollection to an array for easier iteration
    var elementsArray = Array.from(elements);
    if (progressLabel && progressBar) {
        progressLabel.remove();
        progressBar.remove();
    }
    elementsArray.forEach(function (element) {
        element.remove();
    });
    // Create an h1 element
    var resultElement = document.createElement('h1');
    resultElement.id = 'evaluationResult';
    // Set the text content based on the comparison
    resultElement.textContent = (answer === response) ? 'Correct' : 'Wrong';
    score += (answer === response) ? 1 : 0;
    scoreBoard.textContent = score + "/5";
    // Append the h1 element to the mainWrap
    document.getElementById('mainWrap').appendChild(resultElement);
}
function playSound(randomFile) {
    const audioElement = document.getElementById('audioPlayer');

    // Set the source dynamically
    const audioSource = './MusicData/' + randomFile;
    audioElement.src = audioSource;

    var playPromise;
    if (audioElement) {
        playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                // Playback started successfully
                console.log('Audio playback started');
            }).catch(function (error) {
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
                console.error('Error during playback:', error);
            });
        }
    } else {
        console.error('Audio element not found');
    }
}

