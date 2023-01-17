import "./main.css";
import "./roulette/roulette.js";
import "./roulette/roulette.css";






 let days = document.querySelectorAll('.day');

    for (let i = 0; i < days.length; i++) {

        days[i].addEventListener('click', daysPassed);
     
    }
    function daysPassed(e) {

        this.classList.toggle('dayBorder');
        
    }
