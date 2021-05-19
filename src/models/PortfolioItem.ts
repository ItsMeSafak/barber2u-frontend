import Style from "./enums/Style";

/**
 * The portfolio item is a model that consists of an id, style and image.
 */
export default class PortfolioItem {
    private id: number;
    private style: Style;
    private image: string;

    // eslint-disable-next-line require-jsdoc
    constructor(id: number, style: Style, image: string) {
        this.id = id;
        this.style = style;
        this.image = image;
    }

    // eslint-disable-next-line require-jsdoc
    get getId(): number {
        return this.id;
    }

    // eslint-disable-next-line require-jsdoc
    get getStyle(): Style {
        return this.style;
    }

    // eslint-disable-next-line require-jsdoc
    get getImage(): string {
        return this.image;
    }
}
