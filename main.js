const gameBoardModule = (() => {
    let cellsIndex = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const spliceCells = (index) => {
        cellsIndex.splice(cellsIndex.indexOf(`${index}`), 1);
    }
    const winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,5,9],
    [3,5,7], [1,4,7], [2,5,8], [3,6,9]];
    return {cellsIndex, spliceCells};
})();

gameBoardModule;

const AIChoice = (() => {
    const setO = () => {
        let size = (gameBoardModule.cellsIndex.length) - 1;
        randomIndex  = Math.floor((Math.random() * size) + 1);
        randomElement = gameBoardModule.cellsIndex[randomIndex];
        console.log(randomIndex, randomElement);
        gameBoardModule.spliceCells(randomElement);
        symbolO = document.createElement('p');
        symbolO.textContent = 'O';
        const gridCells = document.querySelector("[data-index =" + "\"" + randomElement + "\""+ "]");
        gridCells.appendChild(symbolO);
        return randomElement;
    }

    return {setO};
})();

const GameFlow = () => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const setX = (e) => {
        symbolX = document.createElement('p');
        e.target.appendChild(symbolX);
        symbolX.textContent = 'X';
        let index = e.target.getAttribute('data-index');
        let thisCell = document.querySelector("[data-index =" + "\"" + index + "\""+ "]");
        thisCell.removeEventListener('click', setX);
        thisCell.style.cursor = 'not-allowed';
        gameBoardModule.spliceCells(index);
        if(gameBoardModule.cellsIndex.length > 1){
            let preventXonO = AIChoice.setO();
            thisCell = document.querySelector("[data-index =" + "\"" + preventXonO + "\""+ "]");
            thisCell.removeEventListener('click', setX);
            thisCell.style.cursor = 'not-allowed';
            
        } else {
            const section = document.querySelector('section');
            const replayButton = document.createElement('button');
            replayButton.textContent = 'Replay';
            replayButton.classList.add('replay-button');
            section.appendChild(replayButton);
        }

    }

    gridCells.forEach((gridCell) => gridCell.addEventListener('click', setX));

    return{setX};

};

const gameFlow  = GameFlow();
