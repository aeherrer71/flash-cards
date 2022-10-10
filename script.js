let lastCardUrl = "";
let currentCardUrl = "";
let data = [];
let random = [];
let imageFront = document.querySelector(".digi-front")
let totalTime = 40;
let timeRemaining = document.querySelector("#time-remaining")
let shotClock;
let clickCount = 0;
let flipDisplay = document.querySelector('#flips')
let cardContainer = document.querySelectorAll('.card')
let reset = false;
let winningArr = [];
let cardToCheck = null;



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

  gamePlay(random)

}

function gamePlay(random) {
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

      if (reset === true) {
        window.location.reload();
      } else {
        overlays.classList.remove('visible')
        startCountdown()
      }
    })
  })
  cardContainer.forEach(cardContainer => {
    cardContainer.addEventListener('click', (e) => {
      cardTouched(e)
    })
  })
}

function gameOver() {
  clearInterval(shotClock)
  document.querySelector('#game-over-text').classList.add('visible')
  hideAll()
  reset = true;
}

function victory() {
  clearInterval(shotClock)
  document.querySelector('#victory-text').classList.add('visible')
  hideAll()
  reset = true;
}

function startCountdown() {
  displayAll()
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

function cardTouched(e) {

  let currentCardUrl = e.target.parentNode.parentNode.children[1].children[0].src
  let flipContainer = e.target.parentNode.parentNode

  if (flipContainer.dataset.flip === "false") {



    clickCount++;
    flipDisplay.innerText = clickCount;


    if (cardToCheck != null) {

      if (currentCardUrl === lastCardUrl) {

        showCard(flipContainer);
        winningArr.push(currentCardUrl)
        winningArr.push(lastCardUrl)
        console.log(winningArr)
        cardToCheck = null;

        if (winningArr.length == 16) {
          victory()
        }

      } else {

        showCard(flipContainer);

        setTimeout(() => {


          hideCard(flipContainer);
          hideCard(cardToCheck);
          cardToCheck = null;
        }, 400)
      }
    } else {

      flipContainer.classList.add("visible");
      flipContainer.dataset.flip = "true"
      lastCardUrl = currentCardUrl;
      cardToCheck = flipContainer;
    }
  }
}

function hideCard(card) {
  card.classList.remove('visible')
  card.dataset.flip = "false"
}

function showCard(card) {
  card.classList.add('visible')
  card.dataset.flip = "true"
}

function hideAll() {

  totalTime = 40;
  clickCount = 0
  timeRemaining.innerText = totalTime;
  flipDisplay.innerText = clickCount;
  cardContainer.forEach(cardContainer => {
    cardContainer.classList.remove('visible')

  })
}

function displayAll() {
  totalTime = 6;
  timeRemaining.innerText = 6

  cardContainer.forEach(cardContainer => {
    cardContainer.classList.add('visible')
    cardContainer.dataset.flip = 'false'
  })
  setTimeout(hideAll, 6000)
}

