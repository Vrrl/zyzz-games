window.onscroll = () => {
    yOffset = window.pageYOffset

    // BANNER ANIMATIONS
    
    if(yOffset > 550) yOffset = 550

    distance = yOffset / 2.5;
    
    document.getElementById('banner-bg').style.top = distance + 'px'

    blur = (yOffset / 70) + 4

    document.getElementById('banner-bg').style.filter = `blur(${blur}px)`
    document.getElementById('banner-bg').style.webkitFilter = `blur(${blur}px)`

    // SIDEBAR ANIMATIONS

    if(yOffset > 0){
        document.getElementById('sidebar-toggle').classList.add('scrolling')
    } else{
        document.getElementById('sidebar-toggle').classList.remove('scrolling')
        
    }

}