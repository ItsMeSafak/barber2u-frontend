import { PortfolioItem } from "./PortfolioItem";

export class Portfolio {
    id: number;

    items: PortfolioItem[];

    constructor(id: number, items: PortfolioItem[]) {
        this.id = id;
        this.items = items;
    }
}
