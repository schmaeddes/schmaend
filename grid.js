class Grid {

    constructor (size, initMaterial) {
        this.arrayGrid = {};
        this.map = new Map()

        let pixelId = 1;
        let grid = []
        for (let rowId = 0; rowId < size; rowId++) {
            let row = []

            for (let column = 0; column < size; column++) {
                let dot = new Pixel(pixelId, {row: rowId, column: column}, initMaterial)
                row.push(dot)

                this.map.set(pixelId, dot)
                pixelId++
            }

            grid.push(row)
        }

        this.arrayGrid = grid
    }

    getPixelById(id) {
        return this.map.get(parseInt(id))
    }

    setPixelById(id, pixel) {
        this.map.set(id, pixel)
    }

    getPixelByPosition(position) {
        if (position.row < 0 || position.column < 0) {
            return false
        }

        if (position.row > gridSize - 1 || position.column > gridSize - 1) {
            return false
        }

        return this.arrayGrid[position.row][position.column]
    }
}