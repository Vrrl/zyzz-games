window.onscroll = () => {
    
    yOffset = window.pageYOffset

    if(yOffset > 0){
        document.getElementById('sidebar-toggle').classList.add('scrolling')
    } else{
        document.getElementById('sidebar-toggle').classList.remove('scrolling')
        
    }


}

document.getElementById('sidebar-toggle').addEventListener("click", () => {
    document.getElementById("sidebar").style.display = "block"
})

document.getElementById("content").addEventListener("click", () => {
    document.getElementById("sidebar").style.display = "none"
})