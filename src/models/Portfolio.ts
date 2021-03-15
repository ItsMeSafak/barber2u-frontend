import PortfolioItem from "./PortfolioItem";

/**
 * The portfolio is a model that consists of an id and protfolio items
 */
export default class Portfolio {
    id: number;

    items: PortfolioItem[];

    /**
     * 
     * @param {number} id Id of the portfolio.
     * @param {PortfolioItem[]} items A list of portfolio items.
     */
    constructor(id: number, items: PortfolioItem[]) {
        this.id = id;
        this.items = items;
    }
}
