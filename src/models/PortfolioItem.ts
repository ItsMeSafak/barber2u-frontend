import CardItem from "./CardItem";
import Style from "./Style";

/**
 * The portfolio item is a model that consists of an id, style and image.
 */
export default class PortfolioItem implements CardItem {
    id: number;
    style: Style;
    image: string;

    // eslint-disable-next-line require-jsdoc
    constructor(id: number, style: Style, image: string) {
        this.id = id;
        this.style = style;
        this.image = image;
    }
}
