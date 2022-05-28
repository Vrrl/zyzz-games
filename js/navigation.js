import { selected } from "./api.js";
var selectedGamePlatform = 2;
var countElements = 0;

const element = document.getElementById("card"); //MUDAR AQUI

const pc = document.getElementById("pc");
const browser = document.getElementById("browser");
const all = document.getElementById("all");
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
  dataLoad = await selected(selectedGamePlatform)
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
}

window.putElementsOnScreen = (data = dataLoad) => {
  spliting(data.slice(countElements, countElements + 6));
  countElements += 6;
}

function spliting(data) {
  for (let i in data) {
    const cloning = element.cloneNode(true);
    cloning.getElementsByTagName('h4')[0].innerHTML = data[i].title
    cloning.getElementsByTagName('p')[0].innerHTML = data[i].short_description
    cloning.getElementsByTagName('div')[0].setAttribute("style", `background-image: linear-gradient(180deg, rgba(21, 26, 33, 0.25) 0% ,rgba(21, 26, 33, 0.95) 80%, #151A21 100%), url(${data[i].thumbnail}); `);
    document.getElementById("section").appendChild(cloning);
  }
}

drawSelectedGameOpc();
