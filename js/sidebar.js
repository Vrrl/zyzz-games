
document.getElementById('sidebar-toggle').addEventListener("click", () => {
    document.getElementById("sidebar").classList.add("active")
})

document.getElementById("content").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("active")

})