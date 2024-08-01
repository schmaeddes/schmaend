sandrea = document.getElementById("sandrea")

gridSize = 60

let gridMatrix = createGrid()
loop()

async function loop() {
    while (true) {
        gridMatrix = createNextFrame(gridMatrix)

        sandrea.innerHTML = renderGrid(gridMatrix)
        await Sleep(1)
    }
}

function createNextFrame(gridMatrix) {
    let newGridMatrix = createGrid()

    let left;
    let right;
    for (let row = 0; row < gridMatrix.length; row++) {
        for (let column = 0; column < gridMatrix[0].length; column++) {
            if (gridMatrix[row][column]) {

                // Beneath is free
                if (row < gridMatrix.length - 1 && !gridMatrix[row + 1][column]) {
                    newGridMatrix[row][column] = false;
                    newGridMatrix[row + 1][column] = true;

                    continue
                }

                if (row < gridMatrix.length - 1 && gridMatrix[row + 1][column]) {
                    newGridMatrix[row][column] = false;

                    left = gridMatrix[row + 1][column - 1]
                    right = gridMatrix[row + 1][column + 1]

                    if (column === 0 && !right) {
                        newGridMatrix[row + 1][column + 1] = true
                        continue
                    }

                    if (column === gridMatrix.length - 1 && !left) {
                        newGridMatrix[row + 1][column - 1] = true
                        continue
                    }

                    // go right
                    if (column !== gridMatrix.length - 1 && left && !right) {
                        newGridMatrix[row + 1][column + 1] = true
                        continue
                    }

                    // go left
                    if (column !== 0 && !left && right) {
                        newGridMatrix[row + 1][column - 1] = true
                        continue
                    }

                    // randomize
                    if (!left && !right) {
                        if (Math.floor(Math.random() * 2)) {
                            newGridMatrix[row + 1][column + 1] = true
                        } else {
                            newGridMatrix[row + 1][column - 1] = true
                        }

                        continue
                    }
                }

                // Beneath is bottom
                newGridMatrix[row][column] = true;
            }
        }
    }

    return newGridMatrix
}

function renderGrid(grid) {
    let newGrid = ""
    let weightRow = createWeighRow()

    let hslColor;
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {

            if (grid[row][column]) {
                    hslColor = getHslColor(weightRow[column])
                if (row + 1 < grid.length && grid[row + 1][column]) {
                    weightRow[column]++
                    newGrid += '<div class="box" style="background-color: hsl(44, 100%, ' + hslColor + '%)"></div>'
                } else {
                    newGrid += '<div class="box" style="background-color: hsl(44, 100%, ' + hslColor + '%)"></div>'
                }
            } else {
                newGrid += '<div class="box" onmousemove="colorize(\'' + row + '\', \'' + column + '\')"></div>'
            }
        }
    }

    return newGrid
}

function colorize(row, column) {
    gridMatrix[row][column] = true
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function createGrid() {
    let grid = []
    for (let i = 1; i <= gridSize; i++) {
        grid.push(createRow())
    }
    return grid
}

function createRow() {
    let row = []
    for (let i = 1; i <= gridSize; i++) {
        row.push(false)
    }
    return row
}

function createWeighRow() {
    let row = []
    for (let i = 1; i <= gridSize; i++) {
        row.push(3)
    }
    return row
}

function getHslColor(weight) {
    if (weight >= 15) {
        return 30
    }
    return 100 - weight * 5
}