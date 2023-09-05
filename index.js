// Data
    // Maps
const easy = [
    ["white", "white", "white", "black1", "white", "white", "white"],
    ["white", "black0", "white", "white", "white", "black2", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["black", "white", "white", "black", "white", "white", "black"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "black", "white", "white", "white", "black2", "white"],
    ["white", "white", "white", "black3", "white", "white", "white"]
];
const medium = [
    ["white", "white", "black0", "white", "black", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["black", "white", "black", "white", "black3", "white", "black"],
    ["white", "white", "white", "black1", "white", "white", "white"],
    ["black2", "white", "black", "white", "black", "white", "black"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "black", "white", "black2", "white", "white"]
];
const hard = [
    ["white", "black", "white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "black3", "white", "black2", "white", "black"],
    ["white", "black0", "black", "white", "white", "white", "white", "black", "white", "white"],
    ["white", "white", "white", "white", "black", "white", "white", "white", "white", "white"],
    ["white", "black1", "white", "white", "black", "black1", "black", "white", "white", "white"],
    ["white", "white", "white", "black", "black", "black", "white", "white", "black3", "white"],
    ["white", "white", "white", "white", "white", "black", "white", "white", "white", "white"],
    ["white", "white", "black1", "white", "white", "white", "white", "black0", "black", "white"],
    ["black3", "white", "black", "white", "black0", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white", "black0", "white"],

];
let currentMap = null;
let gameMatrix = null;
let previousResults = [];

let timer = null;
let elapsedTime = 0;


// Buttons
const menuButtons = [];

const startGameButton = document.querySelector('#startGameButton');
menuButtons.push(startGameButton);
const continueButton = document.querySelector('#continueButton');
menuButtons.push(continueButton);
const chooseMapButton = document.querySelector('#chooseMapButton');
menuButtons.push(chooseMapButton);
const playerNameButton = document.querySelector('#playerNameButton');
menuButtons.push(playerNameButton);
const previousResultsButton = document.querySelector('#previousResultsButton');
menuButtons.push(previousResultsButton);
const descreptionButton = document.querySelector('#descreptionButton');
menuButtons.push(descreptionButton);

const closeButton = document.querySelector('.close');
const restartButton = document.querySelector('#restartButton')

// Panels
const panels = [];
const main = document.querySelector('#main');
const gamePanel = document.querySelector('#gamePanel');
panels.push(gamePanel);
const chooseMapPanel = document.querySelector('#chooseMapPanel');
panels.push(chooseMapPanel);
const playerNamePanel = document.querySelector('#playerNamePanel');
panels.push(playerNamePanel);
const previousResultsPanel = document.querySelector('#previousResultsPanel');
panels.push(previousResultsPanel);
const gameDescreptionPanel = document.querySelector('#gameDescreptionPanel');
panels.push(gameDescreptionPanel);
const gameEndPanel = document.querySelector('#gameEndPanel');
panels.push(gameEndPanel);

// Other divs
const easyDiv = document.querySelector('#easy');
const mediumDiv = document.querySelector('#medium');
const hardDiv = document.querySelector('#hard');
const menu = document.querySelector('#menu');
const gameTableDiv = document.querySelector('#gameTable');
const playerNameSpan = document.querySelector('#playerName');
const timeSpan = document.querySelector('#time');

// Input
const playerNameInput = document.querySelector('#playerNameInput');

// Utility
function SecondsToTime(seconds) {
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
}

function StartTimer() {
    timer = setInterval(function (e) {
        timeSpan.innerText = SecondsToTime(elapsedTime++);
        localStorage.setItem('elapsedTime', elapsedTime);
    }, 1000);
}
function StopTimer() {
    clearInterval(timer);
}

function GetCoords(td) {
    const obj = {
        x: null,
        y: null
    }

    const tr = td.parentNode;
    obj.x = tr.sectionRowIndex;
    obj.y = td.cellIndex;
    return obj;
  }

// UI Functions
function SaveGameExists() {
    return localStorage.getItem('saveGame') !== null;
}

function PlayerNameExists() {
    return localStorage.getItem('playerName') !== null;
}

function PreviousResultsExist() {
    return localStorage.getItem('previousResults') !== null;
}

function HideBackground() {
    main.style.filter = "brightness(5%)";
    closeButton.hidden = false;
    for (const button of menuButtons) {
        button.disabled = true;
    }
}

function ShowGameEndPanel() {
    StopTimer();
    gamePanel.style.filter = "brightness(2%)";
    gameEndPanel.hidden = false;
    
    gameEndPanel.innerHTML = "";
    const h1 = document.createElement('h1');

    let playerName;
    if (PlayerNameExists()) {
        playerName = " " + localStorage.getItem('playerName').toUpperCase();
    } else {
        playerName = "";
    }

    h1.innerText = `GRATULÁLOK${playerName}, SIKERESEN TELJESÍTETTED A FELADATOT! 👏`;
    const p = document.createElement('p');
    p.innerText = `ELTELT IDŐ: ${SecondsToTime(elapsedTime)}`;
    p.style.fontSize = "calc(1.375rem + 1.5vw)";
    const button = document.createElement('button');
    button.innerText = "ÚJRAPRÓBÁLOM";
    button.style.fontSize = "calc(1.375rem + 1.5vw)";

    gameEndPanel.appendChild(h1);
    gameEndPanel.appendChild(p);
    gameEndPanel.appendChild(button);

    button.addEventListener('click', function() {
        gameEndPanel.hidden = true;
        restartButton.click();
    });
}

function AddResult() {
    const table = document.querySelector('#previousResults');
    table.innerHTML = "";
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <th>NÉV</th>
        <th>PÁLYA</th>
        <th>IDŐ</th>
    `;
    table.appendChild(tr);

    let playerName;
    if (PlayerNameExists()) {
        playerName = localStorage.getItem('playerName').toUpperCase();
    } else {
        playerName = "GUEST";
    }

    let mapName;
    switch (localStorage.getItem('currentMap')) {
        case 'easy':
            mapName = "KÖNNYŰ 7x7";
            break;
        case 'medium':
            mapName = "HALADÓ 7x7";
            break;
        case 'hard':
            mapName = "EXTRÉM 10x10";
            break;

    }

    if (previousResults.length === 10) {
        previousResults.pop();
    }
    previousResults.unshift({
        playerName: playerName,
        mapName: mapName,
        time: SecondsToTime(elapsedTime)
    });

    localStorage.setItem('previousResults', JSON.stringify(previousResults));

    for (const result of previousResults) {
        const tr = document.createElement('tr');

        const name = document.createElement('td');
        const map = document.createElement('td');
        const time = document.createElement('td');
        name.innerText = result.playerName;
        map.innerText = result.mapName;
        time.innerText = result.time;

        tr.appendChild(name);
        tr.appendChild(map);
        tr.appendChild(time);

        table.appendChild(tr);
    }
}

function CreateGameTable(matrix) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrix[0].length; j++) {
            const col = document.createElement('td');

            switch (matrix[i][j]) {
                case "white":
                    col.classList = "white";
                    col.innerText = '';
                    break;
                case "black":
                    col.classList = "black";
                    col.innerText = '';
                    break;
                case "black0":
                    col.classList = "black";
                    col.innerText = '0';
                    if (CorrectEnvironment(i, j)) col.classList.add("correct");
                    break;
                case "black1":
                    col.classList = "black";
                    col.innerText = '1';
                    if (CorrectEnvironment(i, j)) col.classList.add("correct");
                    break;
                case "black2":
                    col.classList = "black";
                    col.innerText = '2';
                    if (CorrectEnvironment(i, j)) col.classList.add("correct");
                    break;
                case "black3":
                    col.classList = "black";
                    col.innerText = '3';
                    if (CorrectEnvironment(i, j)) col.classList.add("correct");
                    break;
                case "light":
                    col.classList = "light";
                    col.innerText = '';
                    break;
                case "lightbulb":
                    col.classList = "light";
                    col.innerText = '💡';
                    if (IsLightenUp(i, j)) col.classList.add("error");
                    break;
            }

            row.appendChild(col);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    return table;
}

function RefreshGamePanel() {
    // tábla legenerálása és megjelenítése
    gameTableDiv.innerHTML = "";
    gameTableDiv.appendChild(CreateGameTable(gameMatrix));

    if (CorrectSolution()) {
        ShowGameEndPanel();
        AddResult();

        localStorage.removeItem('saveGame');
        continueButton.disabled = true;
    }
}

// Game functions
function CorrectSolution() {
    for (let i = 0; i < gameMatrix.length; i++) {
        for (let j = 0; j < gameMatrix[0].length; j++) {
            if (gameMatrix[i][j] === "black0" || gameMatrix[i][j] === "black1" || gameMatrix[i][j] === "black2" || gameMatrix[i][j] === "black3") {
                if (!CorrectEnvironment(i, j)) return false;
            }
            else if (gameMatrix[i][j] === "lightbulb") {
                if (IsLightenUp(i, j)) return false;
            }
            else if (gameMatrix[i][j] === "white") return false;
        }
    }

    return true;
}

function CorrectEnvironment(x, y) { 
    let count = 0;
    
    switch (x) {
        case 0:
            switch (y) {
                case 0:
                    count += gameMatrix[x + 1][y] === 'lightbulb';
                    count += gameMatrix[x][y + 1] === 'lightbulb';;
                    return count === parseInt(gameMatrix[x][y].slice(-1));
                case gameMatrix[0].length - 1:
                    count += gameMatrix[x + 1][y] === 'lightbulb';;
                    count += gameMatrix[x][y - 1] === 'lightbulb';;
                    return count === parseInt(gameMatrix[x][y].slice(-1));
                default:
                    count += gameMatrix[x + 1][y] === 'lightbulb';;
                    count += gameMatrix[x][y - 1] === 'lightbulb';;
                    count += gameMatrix[x][y + 1] === 'lightbulb';;
                    return count === parseInt(gameMatrix[x][y].slice(-1));
            }
        case gameMatrix.length - 1:
            switch (y) {
                case 0:
                    count += gameMatrix[x - 1][y] === 'lightbulb';;
                    count += gameMatrix[x][y + 1] === 'lightbulb';;
                    return count === parseInt(gameMatrix[x][y].slice(-1));
                case gameMatrix[0].length - 1:
                    count += gameMatrix[x - 1][y] === 'lightbulb';;
                    count += gameMatrix[x][y - 1] === 'lightbulb';;
                    return count === parseInt(gameMatrix[x][y].slice(-1));
                default:
                    count += gameMatrix[x - 1][y] === 'lightbulb';;
                    count += gameMatrix[x][y - 1] === 'lightbulb';;
                    count += gameMatrix[x][y + 1] === 'lightbulb';;
                    return count === parseInt(gameMatrix[x][y].slice(-1));
            }
        default:
            count += gameMatrix[x - 1][y] === 'lightbulb';;
            count += gameMatrix[x + 1][y] === 'lightbulb';;
            count += gameMatrix[x][y - 1] === 'lightbulb';;
            count += gameMatrix[x][y + 1] === 'lightbulb';;
            return count === parseInt(gameMatrix[x][y].slice(-1));
            break;   
    }
}

function IsLightenUp(x, y) {
    let i = x, j = y;
     // left

    while (j > 0 && (gameMatrix[i][j - 1] === "light" || gameMatrix[i][j - 1] === "lightbulb")) {
        j--;
        if (gameMatrix[i][j] === "lightbulb") return true;
    }

    i = x;
    j = y;

    // right

    while (j < gameMatrix[0].length - 1 && (gameMatrix[i][j + 1] === "light" || gameMatrix[i][j + 1] === "lightbulb")) {
        j++;
        if (gameMatrix[i][j] === "lightbulb") return true;
    }

    i = x;
    j = y;

    // up

    while (i > 0 && (gameMatrix[i - 1][j] === "light" || gameMatrix[i - 1][j] === "lightbulb")) {
        i--;
        if (gameMatrix[i][j] === "lightbulb") return true;
    }

    i = x;
    j = y;

    // down

    while (i < gameMatrix.length - 1 && (gameMatrix[i + 1][j] === "light" || gameMatrix[i + 1][j] === "lightbulb")) {
        i++;
        if (gameMatrix[i][j] === "lightbulb") return true;
    }

    return false;
}

function LightUpEnvironment(x, y) {
    gameMatrix[x][y] = "lightbulb";

    let i = x, j = y;

    // left

    while (j > 0 && (gameMatrix[i][j - 1] === "white" || gameMatrix[i][j - 1] === "light" || gameMatrix[i][j - 1] === "lightbulb")) {
        j--;
        if (gameMatrix[i][j] !== "lightbulb") {
            gameMatrix[i][j] = "light";
        }
    }

    i = x;
    j = y;

    // right

    while (j < gameMatrix[0].length - 1 && (gameMatrix[i][j + 1] === "white" || gameMatrix[i][j + 1] === "light" || gameMatrix[i][j + 1] === "lightbulb")) {
        j++;
        if (gameMatrix[i][j] !== "lightbulb") {
            gameMatrix[i][j] = "light";
        }
    }

    i = x;
    j = y;

    // up

    while (i > 0 && (gameMatrix[i - 1][j] === "white" || gameMatrix[i - 1][j] === "light" || gameMatrix[i - 1][j] === "lightbulb")) {
        i--;
        if (gameMatrix[i][j] !== "lightbulb") {
            gameMatrix[i][j] = "light";
        }
    }

    i = x;
    j = y;

    // down

    while (i < gameMatrix.length - 1 && (gameMatrix[i + 1][j] === "white" || gameMatrix[i + 1][j] === "light" || gameMatrix[i + 1][j] === "lightbulb")) {
        i++;
        if (gameMatrix[i][j] !== "lightbulb") {
            gameMatrix[i][j] = "light";
        }
    }
}

function DarkenEnvironment(x, y) {
    gameMatrix[x][y] = "light";
    
    let i = x, j = y;
    // left

    while (j > 0 && gameMatrix[i][j - 1] === "light") {
        j--;
        if (!IsLightenUp(i, j)) {
            gameMatrix[i][j] = "white";
        }
    }

    i = x;
    j = y;

    // right

    while (j < gameMatrix[0].length - 1 && gameMatrix[i][j + 1] === "light") {
        j++;
        if (!IsLightenUp(i, j)) {
            gameMatrix[i][j] = "white";
        }
    }

    i = x;
    j = y;

    // up

    while (i > 0 && gameMatrix[i - 1][j] === "light") {
        i--;
        if (!IsLightenUp(i, j)) {
            gameMatrix[i][j] = "white";
        }
    }

    i = x;
    j = y;

    // down

    while (i < gameMatrix.length - 1 && gameMatrix[i + 1][j] === "light") {
        i++;
        if (!IsLightenUp(i, j)) {
            gameMatrix[i][j] = "white";
        }
    }

    if (!IsLightenUp(x, y)) {
        gameMatrix[x][y] = "white";
    }
}








// Event listeners
    // Game table event listener
gameTableDiv.addEventListener('click', function (e) {
    if (e.target.matches('td')) {
        const coords = GetCoords(e.target);
        switch (gameMatrix[coords.x][coords.y]) {
            case "white":
            case "light":
                LightUpEnvironment(coords.x, coords.y);
                break;
            case "lightbulb":
                DarkenEnvironment(coords.x, coords.y);
                break;
        }

        localStorage.setItem('saveGame', JSON.stringify(gameMatrix));
        RefreshGamePanel();
    }
})

    // Close button event listener
closeButton.addEventListener('click', function (e) {
    main.hidden = false;
    main.style.filter = "brightness(100%)";
    gamePanel.style.filter = "brightness(100%)";
    for (const panel of panels) {
        panel.hidden = true;
    }
    closeButton.hidden = true;
    menu.hidden = false;
    for (const button of menuButtons) {
        if (button === continueButton) {
            SaveGameExists() ? button.disabled = false : button.disabled = true;
        }
        else {
            button.disabled = false;
        }
    }

    StopTimer();
})

    // Start button event listener
startGameButton.addEventListener('click', function (e) {
    HideBackground();
    main.hidden = true;
    gamePanel.hidden = false;

    gameMatrix = JSON.parse(JSON.stringify(currentMap));
    RefreshGamePanel();

    // játékosnév megjelenítése
    playerNameSpan.innerText = PlayerNameExists() ? localStorage.getItem('playerName').toLocaleUpperCase() : "GUEST";

    // számláló indítása
    StopTimer();
    elapsedTime = 0;
    StartTimer();
})

    // Continue button event listener
continueButton.addEventListener('click', function (e) {
    HideBackground();
    menu.hidden = true;
    gamePanel.hidden = false;

    playerNameSpan.innerText = PlayerNameExists() ? localStorage.getItem('playerName').toLocaleUpperCase() : "GUEST";

    RefreshGamePanel();
    StartTimer();
});

    // Restart buttons event listeners
restartButton.addEventListener('click', function (e) {
    gamePanel.style.filter = "brightness(100%)";
    gamePanel.hidden = false;

    gameMatrix = JSON.parse(JSON.stringify(currentMap));
    RefreshGamePanel();

    // számláló indítása
    StopTimer();
    elapsedTime = 0;
    StartTimer();
})

    // Choose map button event listener
chooseMapButton.addEventListener('click', function (e) {
    HideBackground();
    chooseMapPanel.hidden = false;
})

    // Choose map panel event listeners
easyDiv.addEventListener('click', function (e) {
    currentMap = JSON.parse(JSON.stringify(easy));

    this.classList.add('active');
    mediumDiv.classList.remove('active');
    hardDiv.classList.remove('active');
    localStorage.setItem('currentMap', 'easy');

    closeButton.click();
})

mediumDiv.addEventListener('click', function (e) {
    currentMap = JSON.parse(JSON.stringify(medium));
    this.classList.add('active');
    easyDiv.classList.remove('active');
    hardDiv.classList.remove('active');
    localStorage.setItem('currentMap', 'medium');

    closeButton.click();
})

hardDiv.addEventListener('click', function (e) {
    currentMap = JSON.parse(JSON.stringify(hard));
    this.classList.add('active');
    easyDiv.classList.remove('active');
    mediumDiv.classList.remove('active');
    localStorage.setItem('currentMap', 'hard');

    closeButton.click();
})

    // Player name button event listener 
playerNameButton.addEventListener('click', function (e) {
    HideBackground();
    playerNamePanel.hidden = false;
})

    // Player input name event listener
playerNameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && playerNameInput.value !== "") {
        localStorage.setItem('playerName', playerNameInput.value);
        const reportDiv = document.querySelector('#reportDiv');
        reportDiv.innerHTML = `ÜDV ${playerNameInput.value.toUpperCase()}!`;
        reportDiv.hidden = false;
    }
})

previousResultsButton.addEventListener('click', function (e) {
    HideBackground();
    previousResultsPanel.hidden = false;
})

    // Descreption button event listener
descreptionButton.addEventListener('click', function (e) {
    HideBackground();
    gameDescreptionPanel.hidden = false;
})

// On page load
if (SaveGameExists()) {
    continueButton.disabled = false;
    gameMatrix = JSON.parse(localStorage.getItem('saveGame'));

    elapsedTime = parseInt(localStorage.getItem('elapsedTime'));
    timeSpan.innerHTML = SecondsToTime(elapsedTime);
}
else {
    continueButton.disabled = true;
}

if (PlayerNameExists()) {
    playerNameInput.value = localStorage.playerName;
    reportDiv.innerHTML = `ÜDV ${localStorage.playerName.toUpperCase()}!`;
    reportDiv.hidden = false;
}

switch (localStorage.currentMap) {
    case 'easy':
        easyDiv.classList.toggle('active');
        currentMap = JSON.parse(JSON.stringify(easy));
        break;
    case 'medium':
        mediumDiv.classList.toggle('active');
        currentMap = JSON.parse(JSON.stringify(medium));
        break;
    case 'hard':
        hardDiv.classList.toggle('active');
        currentMap = JSON.parse(JSON.stringify(hard));
        break;
    default:
        easyDiv.classList.toggle('active');
        currentMap = JSON.parse(JSON.stringify(easy));
        localStorage.setItem('currentMap', 'easy');
        break;
}

if (PreviousResultsExist()) {
    previousResults = JSON.parse(localStorage.getItem('previousResults'));
    
    const table = document.querySelector('#previousResults');
    table.innerHTML = "";
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <th>NÉV</th>
        <th>PÁLYA</th>
        <th>IDŐ</th>
    `;
    table.appendChild(tr);

    for (const result of previousResults) {
        const tr = document.createElement('tr');

        const name = document.createElement('td');
        const map = document.createElement('td');
        const time = document.createElement('td');
        name.innerText = result.playerName;
        map.innerText = result.mapName;
        time.innerText = result.time;

        tr.appendChild(name);
        tr.appendChild(map);
        tr.appendChild(time);

        table.appendChild(tr);
    }
}