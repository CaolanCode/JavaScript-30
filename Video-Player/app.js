const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip')
const ranges = player.querySelectorAll('.player__slider')
const fullScreen = player.querySelector('.full-screen')


function togglePlay(e) {
  video.paused ? video.play() : video.pause() 
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚'
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
}

function makeFullScreen(e) {
  if(document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    player.requestFullscreen()
  }
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
fullScreen.addEventListener('click', makeFullScreen)