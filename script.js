let data = [];
let random = [];
let imageFront = document.querySelector(".digi-front")

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

  console.log(data)
  console.log(random)
  random = random.concat(random)

  createBoard(random)

}


function createBoard(random) {
  let cardContainer = document.querySelectorAll('.card')

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

}
