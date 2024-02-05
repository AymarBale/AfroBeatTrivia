
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
document.addEventListener('DOMContentLoaded', function () {
    var divArray = ['choice_1', 'choice_2', 'choice_3', 'choice_4'];
    divArray.forEach(function (divId) {
        var div = document.getElementById(divId);
        div.addEventListener('click', stopAudioAndTimer);
    });
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

function playRandomSound() {
    const randomFile = getRandomFileFromList(fileList);
    const audioElement = document.getElementById('audioPlayer');

    // Set the source dynamically
    const audioSource = './MusicData/' + randomFile;
    audioElement.src = audioSource;

    var playPromise;
    if (audioElement) {
        startCountdown()
        playPromise = audioElement.play();
        callOtherNames(randomFile, getRandomFileFromList(fileList), getRandomFileFromList(fileList), getRandomFileFromList(fileList), randomFile)
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

function stopAudioAndTimer() {
    console.log("in")
    var audioElement = document.getElementById('audioPlayer');

    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0; // Reset audio to the beginning

        // Clear the countdown interval
        clearInterval(countdownInterval);
    }

    // Reset countdown and win message
    document.getElementById('seconds').innerHTML = '';
    document.getElementById('countdown').innerHTML = '';
    document.getElementById('win_msg').textContent = '';
}

function callOtherNames(choice0, choice1, choice2, choice3, correctAnswer) {
    var myDiv1 = document.getElementById('choice_1');
    var myDiv2 = document.getElementById('choice_2');
    var myDiv3 = document.getElementById('choice_3');
    var myDiv4 = document.getElementById('choice_4');

    // Create an array with the div elements
    var divArray = [myDiv1, myDiv2, myDiv3, myDiv4];

    // Randomly shuffle the array (Fisher-Yates algorithm)
    for (var i = divArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [divArray[i], divArray[j]] = [divArray[j], divArray[i]];
    }

    // Assign the answer variable to one of the shuffled div elements
    divArray[0].textContent = choice0;
    divArray[1].textContent = choice1;
    divArray[2].textContent = choice2;
    divArray[3].textContent = choice3;

    // Add click event listeners to each div
    divArray.forEach(function (div) {
        div.addEventListener('click', function () {
            // Compare clicked div's text content with correctAnswer
            if (div.textContent === correctAnswer) {
                win();
            } else {
                lose();
            }
        });
    });
}

function win() {
    var winMsg = document.getElementById('win_msg');
    if (winMsg) {
        winMsg.textContent = 'You win!';
    }
}

function lose() {
    var winMsg = document.getElementById('win_msg');
    if (winMsg) {
        winMsg.textContent = 'You lose. Try again.';
    }
}

function startCountdown() {
    const countdownDate = new Date().getTime() + 5000; // 10 seconds from now

    function updateCountdown() {
        const currentDate = new Date().getTime();
        const difference = countdownDate - currentDate;

        const seconds = Math.floor(difference / 1000);

        document.getElementById('seconds').innerHTML = seconds;

        if (seconds <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Countdown expired!";
        }
    }

    updateCountdown(); // Initial update before the interval starts
    countdownInterval = setInterval(updateCountdown, 1000);
}
