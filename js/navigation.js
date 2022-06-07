import { selected, getMainGame } from "./api.js";
var selectedGamePlatform = 2;
var selectedGameCategory = 0;
var countElements = 0;
var favSelected = false

const element = document.getElementById("card"); //MUDAR AQUI

const pc = document.getElementById("pc");
const browser = document.getElementById("browser");
const all = document.getElementById("all");
const home = document.getElementById("home")
const pvp = document.getElementById("pvp")
const mmofps = document.getElementById("mmofps")
const survival = document.getElementById("survival")
const card = document.getElementById("carde")
const fighting = document.getElementById("fighting")
const shooting = document.getElementById("shooting")
const fav = document.getElementById("nav-fav")
let dataLoad = {}
let actualData = []

window.setSelectedGameOpc = async function (opc) {
  favSelected = false
  switch (opc) {
    case "pc":
      selectedGamePlatform = 0;
      break;
    case "browser":
      selectedGamePlatform = 1;
      break;
    case "all":
      selectedGamePlatform = 2;
      break;
    default:
      break;
  }
  drawSelectedGameOpc();
  cleanSection()
  countElements = 0
  dataLoad = await selected(selectedGamePlatform, selectedGameCategory)
  actualData = []
  putElementsOnScreen(dataLoad);
};

window.setSelectedGameCategory = async function (opc) {
  favSelected = false
  switch (opc) {
    case "home":
      selectedGameCategory = 0;
      break;
    case "pvp":
      selectedGameCategory = 1;
      break;
    case "mmofps":
      selectedGameCategory = 2;
      break;
    case "survival":
      selectedGameCategory = 3;
      break;
    case "card":
      selectedGameCategory = 4;
      break;
    case "fighting":
      selectedGameCategory = 5;
      break;
    case "shooting":
      selectedGameCategory = 6;
      break;
    default:
      break;
  }

  drawSelectedGameOpc();
  cleanSection()
  countElements = 0
  actualData = []
  dataLoad = await selected(selectedGamePlatform, selectedGameCategory)
  putElementsOnScreen(dataLoad);
};

function cleanSection(){
    const section = document.getElementById('section')
    while (section.lastChild) {
        section.removeChild(section.lastChild);
    }
}

function drawSelectedGameOpc() {
  if(favSelected){
    fav.style.color = "#F23B3B"
    pc.style.color = "white";
    browser.style.color = "white";
    all.style.color = "white";
    document.getElementById("big").style.display = "none"
    document.getElementById("btnLoadMore").style.display = "none"
  } else {
    document.getElementById("big").style.display = "block"
    document.getElementById("btnLoadMore").style.display = "block"
    fav.style.color = "white"
    pc.style.color = selectedGamePlatform === 0 ? "#F23B3B" : "white";
    browser.style.color = selectedGamePlatform === 1 ? "#F23B3B" : "white";
    all.style.color = selectedGamePlatform === 2 ? "#F23B3B" : "white";
    home.style.color = selectedGameCategory === 0 ? "#F23B3B" : "white";
    pvp.style.color = selectedGameCategory === 1 ? "#F23B3B" : "white";
    mmofps.style.color = selectedGameCategory === 2 ? "#F23B3B" : "white";
    survival.style.color = selectedGameCategory === 3 ? "#F23B3B" : "white";
    card.style.color = selectedGameCategory === 4 ? "#F23B3B" : "white";
    fighting.style.color = selectedGameCategory === 5 ? "#F23B3B" : "white";
    shooting.style.color = selectedGameCategory === 6 ? "#F23B3B" : "white";
  }
  
}

window.putElementsOnScreen = (data = dataLoad) => {
  if(countElements === 0){
    drawBigGame(data[0])
    countElements++
  }

  spliting(data.slice(countElements, countElements + 6));
  actualData = actualData.concat(data.slice(countElements, countElements + 6))
  countElements += 6;
}

async function drawBigGame(data){
  /* const gameData = await getMainGame(data.id)
  console.log(gameData) */
  const bannerBG = document.getElementById("banner-bg")
  const banner = document.getElementById("banner")
  bannerBG.style.backgroundImage = `linear-gradient(180deg, #151A21 0%, rgba(21, 26, 33, 0.65) 50%, #151A21 100%),url('${data.thumbnail}')`
  banner.getElementsByTagName("img")[0].src = data.thumbnail
  banner.getElementsByTagName("h2")[0].innerHTML = data.title
  banner.getElementsByTagName("p")[0].innerHTML = data.short_description
}

function spliting(data) {
  for (let i in data) {
    const cloning = element.cloneNode(true);
    cloning.getElementsByClassName('fav')[0].addEventListener("click", () => {
        handleFovourites(data[i])
    })

    cloning.getElementsByTagName('h4')[0].innerHTML = data[i].title
    cloning.getElementsByTagName('a')[0].addEventListener('click', ()=>{
      window.open(data[i].game_url)
    })
    cloning.getElementsByTagName('p')[0].innerHTML = data[i].short_description
    cloning.getElementsByTagName('div')[0].setAttribute("style", `background-image: linear-gradient(180deg, rgba(21, 26, 33, 0.25) 0% ,rgba(21, 26, 33, 0.95) 80%, #151A21 100%), url(${data[i].thumbnail}); `);
    
    if (data[i].platform == "PC (Windows)"){
      let img_platform = document.createElement("img")
      img_platform.src = "img/pc.svg"
      cloning.getElementsByClassName('platforms')[0].appendChild(img_platform)
    }
    
    if (data[i].platform == "Web Browser"){
      let img_platform = document.createElement("img")
      img_platform.src = "img/browser.svg"
      cloning.getElementsByClassName('platforms')[0].appendChild(img_platform)
    }
                    

    cloning.getElementsByTagName('span')[0].innerHTML = data[i].genre
    if(checkFav(data[i]))
      cloning.getElementsByClassName('fav')[0].src = "img/Star (1).svg"
    document.getElementById("section").appendChild(cloning);
  }
}

drawSelectedGameOpc();

function checkFav(data){
  const favourites = localStorage.getItem("favourites")
  let listFav = JSON.parse(favourites) ?? []

  if(listFav.filter(fav => fav.id === data.id).length > 0)
    return true
  return false
}

function handleFovourites(data){
  const favourites = localStorage.getItem("favourites")
  let listFav = JSON.parse(favourites) ?? []

  if(listFav.filter(fav => fav.id === data.id).length > 0){
    for(let i in listFav){
      if(listFav[i].id === data.id){
        listFav.splice(i, 1)
      }
    }
  } else{
    listFav.push(data)
  }
  localStorage.setItem("favourites", JSON.stringify(listFav))
  cleanSection()
  if(!favSelected)
    spliting(actualData)
  else
    spliting(listFav)
}


window.drawFavourites = () => {
  favSelected = true
  const favourites = localStorage.getItem("favourites")
  let listFav = JSON.parse(favourites) ?? []
  cleanSection()
  spliting(listFav);
  drawSelectedGameOpc()
}