var selectedGamePlatform = 2

const pc = document.getElementById("pc")
const browser = document.getElementById("browser")
const all = document.getElementById("all")

function setSelectedGameOpc(opc){
    switch(opc){
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
    drawSelectedGameOpc()
}

function drawSelectedGameOpc(){
    pc.style.color = selectedGamePlatform === 0 ? "#F23B3B" : "white"
    browser.style.color = selectedGamePlatform === 1 ? "#F23B3B" : "white"
    all.style.color = selectedGamePlatform === 2 ? "#F23B3B" : "white"
}
drawSelectedGameOpc()