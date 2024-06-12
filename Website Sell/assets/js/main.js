
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})


// Dark Mode Create
// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save the dark mode state in local storage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved dark mode state on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
});
// Set the date we're counting down to
let countDownDate = new Date().getTime() + 24 * 60 * 60 * 1000;

// Update the countdown every 1 second
let countdownFunction = setInterval(function() {

    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the countdown date
    let distance = countDownDate - now;

    // Time calculations for hours, minutes, and seconds
    let hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((distance % (60 * 1000)) / 1000);

    // Output the result in the respective elements
    document.getElementById("hours").innerHTML = hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    document.getElementById("minutes").innerHTML = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    document.getElementById("seconds").innerHTML = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    // If the countdown is finished, write some text
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);
document.addEventListener('DOMContentLoaded', () => {
   const newsletterForm = document.getElementById('newsletter-form');

   newsletterForm.addEventListener('submit', (e) => {
       e.preventDefault();
       const email = document.getElementById('newsletter-email').value;
       if (validateEmail(email)) {
           alert('Thank you for subscribing!');
           newsletterForm.reset();
       } else {
           alert('Please enter a valid email address.');
       }
   });

   const quickLinks = document.querySelectorAll('.quick-link');
   quickLinks.forEach(link => {
       link.addEventListener('click', (e) => {
           e.preventDefault();
           document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
       });
   });
});

function validateEmail(email) {
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email);
}
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const statusDisplay = document.querySelector("#status");
    const resetButton = document.querySelector("#reset");
    const cells = document.querySelectorAll(".cell");

    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    statusDisplay.innerHTML = currentPlayerTurn();

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
        if (currentPlayer === "O") {
            setTimeout(handleAIMove, 500);
        }
    };

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        cells.forEach(cell => cell.innerHTML = "");
    };

    const handleAIMove = () => {
        let availableCells = gameState.map((value, index) => value === "" ? index : null).filter(val => val !== null);
        let randomCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        let cell = document.querySelector(`.cell[data-index='${randomCellIndex}']`);
        handleCellPlayed(cell, randomCellIndex);
        handleResultValidation();
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", handleRestartGame);
});
document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                document.querySelectorAll(".faq-answer").forEach(item => item.style.maxHeight = null);
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
