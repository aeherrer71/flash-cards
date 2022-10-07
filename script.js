let data = [];
let random = [];
let imageFront = document.querySelector(".digi-front")
let totalTime = 100;
let timeRemaining = document.querySelector("#time-remaining")
let shotClock;
let clickCount = 0;
let flipDisplay = document.querySelector('#flips')
let cardContainer = document.querySelectorAll('.card')
let visible = false;
let compareArr = [];
let winningArr = [];


const url = "https://digimon-api.vercel.app/api/digimon";


fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    renderResults(response)
  })

function renderResults(response) {

  data = response.slice(0)
  random = response.sort(() => Math.random() - Math.random()).slice(0, 8)
  random = random.concat(random)



  createBoard(random)

}

function createBoard(random) {

  let overlays = Array.from(document.getElementsByClassName('overlay-text'));

  shuffle(random)

  random.forEach((random, index) => {
    

    
    let htmlTemplate = `
    <div class="card-back card-face">
    <img class="digi-back" src="https://pbs.twimg.com/media/EcJJNZEX0AES_Wh.jpg">
    </div>
     <div class="card-front card-face">
    <img class="digi-front" src="${random.img}">
    </div>
    `;
    cardContainer[index].insertAdjacentHTML('afterbegin', htmlTemplate)
  })

  overlays.forEach(overlays => {
    overlays.addEventListener('click', () => {
      overlays.classList.remove('visible')
      startCountdown()
    })
  })
    cardContainer.forEach(cardContainer => {
      cardContainer.addEventListener('click', (e) => {

        flipper(e)
      

      })
    })
  

}

function gamePlay() {



}

function gameOver() {
  clearInterval(shotClock)
  document.querySelector('#game-over-text').classList.add('visible')
}

function victory() {
  clearInterval(shotClock)
  document.querySelector('#victory-text').classList.add('visible')
}

function startCountdown() {
  return shotClock = setInterval(() => {
    totalTime--;
    timeRemaining.innerText = totalTime;
    if (totalTime === 0) {
      gameOver()
    }
  }, 1000)
}

function shuffle(random) {
  let currentIndex = random.length
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [random[currentIndex], random[randomIndex]] = [random[randomIndex], random[currentIndex]];

  }
}

function flipper(e) {
  // console.log(e.target.parentNode.parentNode.dataset.flip)
  let flipContainer = e.target.parentNode.parentNode
  if (flipContainer.dataset.flip === "false") {
    flipContainer.dataset.flip = "true"
    clickCount++;
    flipDisplay.innerText = clickCount;
    e.path[2].classList.add('visible')
    compareArr.push(e.target.src)

    while (compareArr.length === 2) {
      if (compareArr[0] === compareArr[1] && compareArr.length === 2) {
        winningArr = [...[compareArr]]
        compareArr = []
      }
      else {
        e.path[2].classList.remove('visible')

      }
    }
  }
  }



/*
total time / time remaining  start clock

total flips

gameStateActive = false




*/
