import Style from "./Style";

/**
 * The portfolio item is a model that consists of an id, style and image.
 */
export default class PortfolioItem {
    id: number;
    style: Style;
    image: string;

    /**
     *
     * @param {number} id Id of a portfolio item.
     * @param {Style} style Style of the portfolio item.
     * @param {string} image Image of the portfolio item.
     */
    constructor(id: number, style: Style, image: string) {
        this.id = id;
        this.style = style;
        this.image = image;
    }
}
