import PortfolioItem from "./PortfolioItem";

export default class Portfolio {
    id: number;

    items: PortfolioItem[];

    constructor(id: number, items: PortfolioItem[]) {
        this.id = id;
        this.items = items;
    }
}
