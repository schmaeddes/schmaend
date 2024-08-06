class Water extends Material {

    constructor(name) {
        super(name);
        this.color = "hsl(200, 100%, 80%)"
    }

    getNextPixel(pixel, gridMatrix) {
        let leftPixel = gridMatrix.getPixelByPosition(pixel.getBotLeft())
        let rightPixel = gridMatrix.getPixelByPosition(pixel.getBotRight())

        // if (leftPixel === false) {
        //     leftPixel = { filled: true }
        // }
        //
        // if (rightPixel === false) {
        //     rightPixel = { filled: true }
        // }

        if (leftPixel.filled && rightPixel.filled) {
            let left
            let right

            if (Math.floor(Math.random() * 2)) {
                left = gridMatrix.getPixelByPosition(leftPixel.getLeft())
                right = gridMatrix.getPixelByPosition(rightPixel.getLeft())
            } else {
                left = gridMatrix.getPixelByPosition(rightPixel.getLeft())
                right = gridMatrix.getPixelByPosition(leftPixel.getLeft())
            }

            while(right) {
                console.log("KEEE")

                if (right === false || right.material.name === "sand" ) {
                    break
                }

                if (!right.filled) {
                    return right
                }

                right = gridMatrix.getPixelByPosition(right.getRight())
            }

            while(left) {

                if (left === false || left.material.name === "sand" ) {
                    break
                }

                if (!left.filled) {
                    return left
                }

                left = gridMatrix.getPixelByPosition(left.getLeft())
            }




            return false


            // while (left.filled && left.position.row !== 0 && left.material === typeof Water) {
            //
            //     left = gridMatrix.getPixelByPosition(left.getLeft())
            //     if (left === undefined) {
            //         return false
            //     }
            // }
            // return left
            // } else {
            //     let right = gridMatrix.getPixelByPosition(rightPixel.getLeft())
            //
            //     if (right === undefined) {
            //         return false
            //     }
            //
            //     while (right.filled && right.position.row !== 59 && right.material === typeof Water) {
            //         right = gridMatrix.getPixelByPosition(right.getLeft())
            //     }
            //     return right
            // }
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
