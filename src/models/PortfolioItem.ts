import { Style } from "./Style";

export class PortfolioItem {

    id: number;

    style: Style;

    image: string;

    constructor(id: number, style: Style, image: string) {
        this.id = id;
        this.style = style;
        this.image = image;
    }
}

