const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {
    document.body.classList.toggle("dark-mode");

    // save preference
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
        toggle.textContent = "☀️";
    }else{
        localStorage.setItem("theme","light");
        toggle.textContent = "🌙";
    }
};

// load saved theme
window.onload = () => {
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        toggle.textContent = "☀️";
    }
};
const text = "Computer Science Student | Python Developer | Web Developer";
let i = 0;

function typeEffect(){
    if(i < text.length){
        document.getElementById("typing").textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
}

typeEffect();
