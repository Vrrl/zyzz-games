
document.getElementById('sidebar-toggle').addEventListener("click", () => {
    document.getElementById("sidebar").style.display = "block"
})

document.getElementById("content").addEventListener("click", () => {
    document.getElementById("sidebar").style.display = "none"
})