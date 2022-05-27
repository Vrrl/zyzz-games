window.onscroll = () => {
    
    yOffset = window.pageYOffset
    if(yOffset > 550) yOffset = 550


    distance = yOffset / 2.5;
    
    document.getElementById('banner-bg').style.top = distance + 'px'

    blur = (yOffset / 70) + 4

    document.getElementById('banner-bg').style.filter = `blur(${blur}px)`
    document.getElementById('banner-bg').style.webkitFilter = `blur(${blur}px)`


}