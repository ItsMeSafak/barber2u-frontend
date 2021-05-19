import PortfolioItem from "./PortfolioItem";

/**
 * The portfolio is a model that consists of an id and protfolio items
 */
export default class Portfolio {
    private id: number;
    private items: PortfolioItem[];

    // eslint-disable-next-line require-jsdoc
    constructor(id: number, items: PortfolioItem[]) {
        this.id = id;
        this.items = items;
    }

    // eslint-disable-next-line require-jsdoc
    get getId(): number {
        return this.id;
    }

    // eslint-disable-next-line require-jsdoc
    get getItems(): PortfolioItem[] {
        return this.items;
    }
}
