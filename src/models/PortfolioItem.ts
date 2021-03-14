import Style from "./Style";

export default class PortfolioItem {
    id: number;

    style: Style;

    image: string;

    constructor(id: number, style: Style, image: string) {
        this.id = id;
        this.style = style;
        this.image = image;
    }
}
