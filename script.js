// LISTA DE CANCIONES DE EJEMPLO (Audio royalty-free para demostración)
const songs = [
  {
    id: 1,
    title: "As It Was",
    artist: "Harry Styles",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Starboy",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Get Lucky",
    artist: "Daft Punk",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

let currentIndex = 0;
let isPlaying = false;

// ELEMENTOS DOM
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const currentCover = document.getElementById('currentCover');
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const searchInput = document.getElementById('searchInput');

// INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
  renderCards('favoritesGrid', songs);
  renderCards('releasesGrid', songs.slice().reverse());
  loadSong(songs[currentIndex]);

  // EVENTOS
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  
  audio.addEventListener('timeupdate', updateProgress);
  progressBar.addEventListener('input', setProgress);
  volumeBar.addEventListener('input', setVolume);
  
  searchInput.addEventListener('input', handleSearch);
});

// POBLAR CARDS
function renderCards(containerId, list) {
  const container = document.getElementById(containerId);
  container.innerHTML = list.map(song => `
    <div class="card" onclick="playSelectedSong(${song.id})">
      <div class="card-img-wrapper">
        <img src="${song.cover}" alt="${song.title}">
        <div class="card-play-btn"><i class="fa-solid fa-play"></i></div>
      </div>
      <div class="card-title">${song.title}</div>
      <div class="card-subtitle">${song.artist}</div>
    </div>
  `).join('');
}

// CARGAR CANCIÓN
function loadSong(song) {
  currentTitle.textContent = song.title;
  currentArtist.textContent = song.artist;
  currentCover.src = song.cover;
  audio.src = song.url;
}

// PLAY / PAUSE
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  isPlaying = !isPlaying;
}

// REPRODUCIR UNA CANCIÓN ESPECÍFICA
function playSelectedSong(id) {
  const index = songs.findIndex(s => s.id === id);
  if (index !== -1) {
    currentIndex = index;
    loadSong(songs[currentIndex]);
    isPlaying = false;
    togglePlay();
  }
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentIndex]);
  isPlaying = false;
  togglePlay();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(songs[currentIndex]);
  isPlaying = false;
  togglePlay();
}

// ACTUALIZAR BARRA DE PROGRESO
function updateProgress() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percent;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
  }
}

function setProgress() {
  const time = (progressBar.value * audio.duration) / 100;
  audio.currentTime = time;
}

function setVolume() {
  audio.volume = volumeBar.value / 100;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// BÚSQUEDA
function handleSearch(e) {
  const term = e.target.value.toLowerCase().trim();
  const filtered = songs.filter(s => 
    s.title.toLowerCase().includes(term) || 
    s.artist.toLowerCase().includes(term)
  );
  renderCards('favoritesGrid', filtered);
}
