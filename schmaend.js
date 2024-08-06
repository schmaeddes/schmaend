sandrea = document.getElementById("sandrea")

let gridSize = 60
let actionArray = []
let gridMatrix

const air = new Material("air")
const sand = new Sand("sand")
const water = new Water("water")

let context = "sand"

function setContext(name) {
    context = name
}

setup()
loop()

async function setup() {
    createGridComponent(gridSize)
    gridMatrix = new Grid(60);
}

function createGridComponent(size) {
    let str = ""
    for (let id = 1; id <= (size * size); id++) {
        str += `<div class="box" id="${id}" style="background-color: white" onmousemove="addPixel(id)"></div>`
    }

    sandrea.innerHTML = str
}

function addPixel(id) {
    let pixel = gridMatrix.getPixelById(id)

    let sandPixel;

    if (!pixel.filled) {
        // pixel = new Sand(pixel.docId, pixel.position)
        // sandPixel.falling = true
        // sandPixel.filled = true
        //
        pixel.falling = true

        switch (context) {
            case "sand":
                pixel.material = sand
                break
            case "water":
                pixel.material = water
                break
        }

            pixel.setFilled(true)
            // gridMatrix.setPixelById(id, sandPixel)
            // pixel.setColor("blue")

            actionArray.push(pixel)
        // actionArray.push(sandPixel)

    }

}

async function loop() {
    while (true) {
        // gridMatrix = createNextFrame(gridMatrix)

        processPixels()

        // sandrea.innerHTML = renderGrid(gridMatrix)
        await Sleep(1)
    }
}

function processPixels() {
    let amount = actionArray.length

    for (let i = 0; i < amount; i++) {
        if (actionArray[i].falling) {
            if (actionArray[i].position.row === gridSize - 1) {
                actionArray[i].falling = false
                continue
            }

            let nextPixel = gridMatrix.getPixelByPosition(actionArray[i].getBot())

            if (nextPixel === false) {
                actionArray[i].falling = false
                continue
            }

            if (!nextPixel.falling && nextPixel.filled) {
                nextPixel = actionArray[i].material.getNextPixel(actionArray[i], gridMatrix)
            }

            if (nextPixel === false) {
                actionArray[i].falling = false
                continue
            }

            nextPixel.material = actionArray[i].material
            nextPixel.falling = true
            nextPixel.setFilled(true)

            actionArray[i].reset()
            actionArray[i] = nextPixel
        }
    }

    actionArray = actionArray.filter(function (e) {
        return e.falling !== false
    })
}

// function nextSchwixel(fromPixel) {
//
//     let leftPixel = gridMatrix.getPixelByPosition(fromPixel.getBotLeft())
//     let rightPixel = gridMatrix.getPixelByPosition(fromPixel.getBotRight())
//
//     if (leftPixel === undefined) {
//         leftPixel = { filled: true }
//     }
//
//     if (rightPixel === undefined) {
//         rightPixel = { filled: true }
//     }
//
//     if (!leftPixel.filled && rightPixel.filled) {
//         return leftPixel
//     }
//
//     if (leftPixel.filled && !rightPixel.filled) {
//         return rightPixel
//     }
//
//     if (!leftPixel.filled && !rightPixel.filled) {
//         if (Math.floor(Math.random() * 2)) {
//             return leftPixel
//         } else {
//             return rightPixel
//         }
//     }
//
//     return false
// }

// function createNextFrame(gridMatrix) {
//     let newGridMatrix = {}
//
//     let left;
//     let right;
//     for (let row = 0; row < gridMatrix.length; row++) {
//         for (let column = 0; column < gridMatrix[0].length; column++) {
//             if (gridMatrix[row][column]) {
//
//                 // Beneath is free
//                 if (row < gridMatrix.length - 1 && !gridMatrix[row + 1][column]) {
//                     newGridMatrix[row][column] = false;
//                     newGridMatrix[row + 1][column] = true;
//
//                     continue
//                 }
//
//                 if (row < gridMatrix.length - 1 && gridMatrix[row + 1][column]) {
//                     newGridMatrix[row][column] = false;
//
//                     left = gridMatrix[row + 1][column - 1]
//                     right = gridMatrix[row + 1][column + 1]
//
//                     if (column === 0 && !right) {
//                         newGridMatrix[row + 1][column + 1] = true
//                         continue
//                     }
//
//                     if (column === gridMatrix.length - 1 && !left) {
//                         newGridMatrix[row + 1][column - 1] = true
//                         continue
//                     }
//
//                     // go right
//                     if (column !== gridMatrix.length - 1 && left && !right) {
//                         newGridMatrix[row + 1][column + 1] = true
//                         continue
//                     }
//
//                     // go left
//                     if (column !== 0 && !left && right) {
//                         newGridMatrix[row + 1][column - 1] = true
//                         continue
//                     }
//
//                     // randomize
//                     if (!left && !right) {
//                         if (Math.floor(Math.random() * 2)) {
//                             newGridMatrix[row + 1][column + 1] = true
//                         } else {
//                             newGridMatrix[row + 1][column - 1] = true
//                         }
//
//                         continue
//                     }
//                 }
//
//                 // Beneath is bottom
//                 newGridMatrix[row][column] = true;
//             }
//         }
//     }
//
//     return newGridMatrix
// }

// function renderGrid(grid) {
//     let newGrid = ""
//     let weightRow = createWeighRow()
//
//     let hslColor;
//     for (let row = 0; row < grid.length; row++) {
//         for (let column = 0; column < grid[0].length; column++) {
//
//             if (grid[row][column]) {
//                 hslColor = getHslColor(weightRow[column])
//                 if (row + 1 < grid.length && grid[row + 1][column]) {
//                     weightRow[column]++
//                     newGrid += '<div class="box" style="background-color: hsl(44, 100%, ' + hslColor + '%)"></div>'
//                 } else {
//                     newGrid += '<div class="box" style="background-color: hsl(44, 100%, ' + hslColor + '%)"></div>'
//                 }
//             } else {
//                 newGrid += '<div class="box" onmousemove="colorize(\'' + row + '\', \'' + column + '\')"></div>'
//             }
//         }
//     }
//
//     return newGrid
// }

// function colorize(row, column) {
//     gridMatrix[row][column] = true
// }

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// function createGrid() {
//     let grid = []
//     for (let i = 1; i <= gridSize; i++) {
//         grid.push(createRow())
//     }
//     return grid
// }
//
// function createRow() {
//     let row = []
//     for (let i = 1; i <= gridSize; i++) {
//         row.push(false)
//     }
//     return row
// }

// function createWeighRow() {
//     let row = []
//     for (let i = 1; i <= gridSize; i++) {
//         row.push(3)
//     }
//     return row
// }

// function getHslColor(weight) {
//     if (weight >= 15) {
//         return 30
//     }
//     return 100 - weight * 5
// }