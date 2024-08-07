class Sand extends Material {

    constructor(name) {
        super(name);
        this.color = [44, 100, 85]
    }

    getNextPixel(pixel, gridMatrix) {
        let leftPixel = gridMatrix.getPixelByPosition(pixel.getBotLeft())
        let rightPixel = gridMatrix.getPixelByPosition(pixel.getBotRight())

        if (leftPixel === false) {
            leftPixel = { filled: true }
        }

        if (rightPixel === false) {
            rightPixel = { filled: true }
        }

        if (!leftPixel.filled && rightPixel.filled) {
            return leftPixel
        }

        if (leftPixel.filled && !rightPixel.filled) {
            return rightPixel
        }

        if (!leftPixel.filled && !rightPixel.filled) {
            if (Math.floor(Math.random() * 2)) {
                return leftPixel
            } else {
                return rightPixel
            }
        }

        return false
    }
}