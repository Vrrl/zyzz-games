import { selected } from "./api.js";
var selectedGamePlatform = 2;
var selectedGameCategory = 0;
var countElements = 0;

const element = document.getElementById("card"); //MUDAR AQUI

const pc = document.getElementById("pc");
const browser = document.getElementById("browser");
const all = document.getElementById("all");
const home = document.getElementById("home")
const pvp = document.getElementById("pvp")
const mmofps = document.getElementById("mmofps")
const survival = document.getElementById("survival")
const card = document.getElementById("card")
const fighting = document.getElementById("fighting")
const shooting = document.getElementById("shooting")
let dataLoad = {}

window.setSelectedGameOpc = async function (opc) {
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
  dataLoad = await selected(selectedGamePlatform, selectedGameCategory)
  putElementsOnScreen(dataLoad);
};

window.setSelectedGameCategory = async function (opc) {
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

window.putElementsOnScreen = (data = dataLoad) => {
  spliting(data.slice(countElements, countElements + 6));
  countElements += 6;
}

function spliting(data) {
  for (let i in data) {
    const cloning = element.cloneNode(true);
    cloning.addEventListener("click", () => {
      handleFovourites(data[i].id)
    })
    cloning.getElementsByTagName('h4')[0].innerHTML = data[i].title
    cloning.getElementsByTagName('p')[0].innerHTML = data[i].short_description
    cloning.getElementsByTagName('div')[0].setAttribute("style", `background-image: linear-gradient(180deg, rgba(21, 26, 33, 0.25) 0% ,rgba(21, 26, 33, 0.95) 80%, #151A21 100%), url(${data[i].thumbnail}); `);
    document.getElementById("section").appendChild(cloning);
  }
}

drawSelectedGameOpc();

function handleFovourites(id){
  const favourites = localStorage.getItem("favourites")
  let listFav = JSON.parse(favourites) ?? []

  if(listFav.includes(id)){
    for(let i in listFav){
      if(listFav[i] === id){
        listFav.splice(i, 1)
      }
    }
  } else{
    listFav.push(id)
  }
  
  localStorage.setItem("favourites", JSON.stringify(listFav))
  console.log(listFav)

}