class Pixel {

    constructor (docId, position, initialMaterial) {
        this.filled = false
        this.falling = false
        this.docId = docId
        this.position = position
        this.docElement = document.getElementById(docId)
        // this.color = "white"
        this.material = air
    }

    setFilled() {
        this.filled = true
        this.docElement.style.backgroundColor = this.material.color
    }

    reset() {
        this.falling = false
        this.material = air
        this.filled = false
        this.docElement.style.backgroundColor = this.material.color
    }

    getLeft() {
        return {row: this.position.row, column: this.position.column - 1}
    }

    getRight() {
        return {row: this.position.row, column: this.position.column + 1}
    }

    getBotLeft() {
        return {row: this.position.row + 1, column: this.position.column - 1}
    }

    getBot() {
        if (this.position.row === 59) {
            return null
        }

        return {row: this.position.row + 1, column: this.position.column}
    }

    getBotRight() {
        return {row: this.position.row + 1, column: this.position.column + 1}
    }


}