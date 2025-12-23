// Audio object
let audioElement = new Audio();



let isPlaying = false;
let songIndex = 0;

// DOM elements

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressbar');
let masterSongName = document.getElementById('masterSongName');

// songs data
let songs = [
    { songName: "Memories", filePath: "songs/Memories-of-Spring(chosic.com).mp3" },
    { songName: "jingle bells", filePath: "songs/Jingle-Bells-3(chosic.com).mp3" },
    { songName: "Sundari ke pyar Mein", filePath: "songs/Sundari Ke Pyar Mein.mp3" },
    { songName: "Bade din huye", filePath: "songs/Bade Din Huye.mp3" },

    { songName: "Bheegi Saree", filePath: "songs/Bheegi Saree.mp3" },
    { songName: "Ek Chatur Naar", filePath: "songs/Ek Chatur Naar Title Track.mp3" },
    { songName: "Fakira", filePath: "songs/Fakira.mp3" },
    { songName: "jeena", filePath: "songs/Jeena Nahi.mp3" },
    { songName: "pardesiya", filePath: "songs/Pardesiya.mp3" }
];




// Reset all play icons
// makes all songs paly icons show "play"
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el) => {
        el.classList.remove('fa-pause');
        el.classList.add('fa-play');
    });
};

//paly the songs from list
// Song list click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', () => {

        // makeAllPlays();
        // songIndex = i;


        // if (audioElement.src.includes(songs[i].filePath) && !audioElement.paused) {
        //     // pause if same song clicked
        //     audioElement.pause();
        //     element.classList.remove('fa-pause');
        //     element.classList.add('fa-play');
        //     masterPlay.classList.remove('fa-pause');
        //     masterPlay.classList.add('fa-play');
        // } else {

if (songIndex === i && !audioElement.paused) {
            // pause same song
            audioElement.pause();
            element.classList.replace('fa-pause', 'fa-play');
            masterPlay.classList.replace('fa-pause', 'fa-play');
        } else {
            // play new song
            makeAllPlays();
            songIndex = i;


            // play new song
            audioElement.src = songs[i].filePath;
            audioElement.currentTime = 0;
            audioElement.play();

            element.classList.remove('fa-play');
            element.classList.add('fa-pause');

            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');

            masterSongName.innerText = songs[i].songName;
        }
    });
});


// Bottom play button  and pause button
masterPlay.addEventListener('click', () => {

    if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.replace("fa-play","fa-pause");
        
    } else {
        audioElement.pause();
        masterPlay.classList.replace("fa-pause","fa-play");
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {

    if (!isNaN(audioElement.duration)) {
     let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
           // (audioElement.currentTime / audioElement.duration) * 100;
});    

//seek song
myProgressBar.addEventListener('input', () => {
   // if (!isNaN(audioElement.duration)) {
        audioElement.currentTime =
            (myProgressBar.value / 100) * audioElement.duration;
    
});

//song seacrh
let searchInput = document.getElementById("searchInput");
let songItems = Array.from(document.getElementsByClassName("songItem"));

searchInput.addEventListener("input", () => {

    let query = searchInput.value.toLowerCase();

    songItems.forEach((item) => {

        let songName = item.querySelector("span").innerText.toLowerCase();

        if (songName.includes(query)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
});
