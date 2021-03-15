import PortfolioItem from "./PortfolioItem";

/**
 * The portfolio is a model that consists of an id and protfolio items
 */
export default class Portfolio {
    id: number;

    items: PortfolioItem[];

    // eslint-disable-next-line require-jsdoc
    constructor(id: number, items: PortfolioItem[]) {
        this.id = id;
        this.items = items;
    }
}
