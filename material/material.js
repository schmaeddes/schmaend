class Material {

    constructor(name) {
        this.name = name
        this.color = [0, 0, 100]
    }

    getNextPixel(pixel, gridMatrix){}

    getColor(layer) {
        if (layer === 0) {
            return `hsl(${this.color[0]}, ${this.color[1]}%, ${this.color[2]}%)`
        } else if (layer < 15) {
            const percent = this.color[2] - layer * 3
            return `hsl(${this.color[0]}, ${this.color[1]}%, ${percent}%)`
        }
    }
}