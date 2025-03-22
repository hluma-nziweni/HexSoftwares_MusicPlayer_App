
let playlist = [
    { title: "Luther", artist: "Kendrick Lamar (feat. SZA)", src: "kendrick-lamar-sza-luther.mp3" },
    { title: "Virgo's Groove", artist: "Beyonce", src: "09. VIRGO'S GROOVE.mp3" },
    { title: "Boys and Girls", artist: "Jaden", src: "17 Boys and Girls.mp3" },
    {title: "Thrift Shop", artist: "Macklemore & Ryan Lewis (feat. Wanz)", src:"MACKLEMORE & RYAN LEWIS Ft. WANZ – THRIFT SHOP_(Naijaflavour.com).mp3"},
    {title: "Godspeed", artist:"Frank Ocean", src: "Frank_Ocean_-_Godspeed_CeeNaija.com_.mp3"}
];

let music = document.getElementById("music");
let progress = document.getElementById("progress");
let pause_play = document.getElementById("pauseplay");
let next = document.getElementById("next");
let previous = document.getElementById("prev");
let Title = document.getElementById("song-title");
let Artist = document.getElementById("artist");
let PlaylistPreview = document.getElementById("playlist");
let PlaylistNav = document.getElementById("playpreview");
let back = document.getElementById("back");
let currentSongIndex = 0;

function load_song(index) {
    let song = playlist[index];
    music.src = song.src;
    Title.textContent = song.title;
    Artist.textContent = song.artist;
    music.load();
}

function pausePlay() {
    if (music.paused) {
        music.play().then(() => {
            updateButtonState();
        })} 
        else {
        music.pause();
        updateButtonState();
    }
}
function updateButtonState() {
    if (!music.paused) {
        return pause_play.innerHTML = '<i class="fa-solid fa-pause"></i>'; 
    } else {
        return pause_play.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}
music.addEventListener("play", updateButtonState);
music.addEventListener("pause", updateButtonState);

function prev_song() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    load_song(currentSongIndex);
    music.play();
}

function next_song() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    load_song(currentSongIndex);
    music.play();
}
pause_play.addEventListener("click", pausePlay);
next.addEventListener("click", next_song);
previous.addEventListener("click", prev_song);
progress.addEventListener("input", () => {
    music.currentTime = (progress.value / 100) * music.duration;
});
music.addEventListener("timeupdate", () => {
    if (!isNaN(music.duration) && music.duration > 0) {
        progress.value = (music.currentTime / music.duration) * 100;
    }
});
PlaylistNav.addEventListener("click", () => {
    PlaylistPreview.classList.toggle("visible");
});
function populatePlaylist() {
    PlaylistPreview.innerHTML = ""; 
    playlist.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            currentSongIndex = index;
            load_song(index);
            music.play();
        });
        PlaylistPreview.appendChild(li);
    });
}
back.addEventListener("click", () => {
    PlaylistPreview.classList.remove("visible");
});
load_song(currentSongIndex); populatePlaylist();