window.onscroll = () => {
    
    yOffset = window.pageYOffset

    if(yOffset > 0){
        document.getElementById('sidebar-toggle').classList.add('scrolling')
    } else{
        document.getElementById('sidebar-toggle').classList.remove('scrolling')
        
    }


}