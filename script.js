console.log("Welcome to Spotify");

let songindex = 0;
let audioElement = new Audio('./Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let Progressbar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    { songName: "Aaj Ki Raat", filepath: "./Songs/1.mp3", coverPath: "./Cover/1.jpeg" },
    { songName: "Aayi Nai", filepath: "./Songs/2.mp3", coverPath: "./Cover/2.jpeg" },
    { songName: "Millionaire", filepath: "./Songs/3.mp3", coverPath: "./Cover/3.jpeg" },
    { songName: "Cutie Tenu Mai Samjha", filepath: "./Songs/4.mp3", coverPath: "./Cover/4.jpeg" },
    { songName: "Tera Hun Yara", filepath: "./Songs/5.mp3", coverPath: "./Cover/5.jpeg" },
    { songName: "Dua Kijiye", filepath: "./Songs/6.mp3", coverPath: "./Cover/6.jpeg" },
    { songName: "Paon ki Jutti", filepath: "./Songs/7.mp3", coverPath: "./Cover/7.jpeg" },
    { songName: "Teri Baaton Mein Aisa", filepath: "./Songs/8.mp3", coverPath: "./Cover/8.jpeg" },
    { songName: "Tauba Tauba", filepath: "./Songs/9.m4a", coverPath: "./Cover/9.jpeg" },
    { songName: "Ishq", filepath: "./Songs/10.mp3", coverPath: "./Cover/10.jpeg" }
];

// Set initial song details on the UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = Songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update progress bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    Progressbar.value = progress;
});

Progressbar.addEventListener('change', () => {
    audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};

const updateUI = () => {
    masterSongName.innerText = Songs[songindex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = Songs[songindex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        updateUI();
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = Songs.length - 1; // Move to the last song if at the beginning
    } else {
        songindex -= 1; // Move to the previous song
    }
    audioElement.src = Songs[songindex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateUI();
});

document.getElementById('previous').addEventListener('click', () => {
    if (songindex >= Songs.length - 1) {
        songindex = 0; // Loop back to the first song
    } else {
        songindex += 1; // Move to the next song
    }
    audioElement.src = Songs[songindex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateUI();
});
