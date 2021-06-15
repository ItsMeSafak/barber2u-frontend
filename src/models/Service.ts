/**
 * The service is a model that consists of an id, style, description and a price.
 */
export default class Service {
    private id: string;
    private name: string;
    private description: string;
    private price: number;
    private time: number;
    private active?: boolean;

    constructor(
        id: string,
        name: string,
        description: string,
        price: number,
        time: number,
        active: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.time = time;
        this.active = active;
    }

    get getId(): string {
        return this.id;
    }

    get getName(): string {
        return this.name;
    }

    get getDescription(): string {
        return this.description;
    }

    get getPrice(): number {
        return this.price;
    }

    get getTime(): number {
        return this.time;
    }

    get getActive(): boolean | undefined {
        return this.active;
    }

    set setId(id: string) {
        this.id = id;
    }

    set setName(name: string) {
        this.name = name;
    }

    set setDescription(description: string) {
        this.description = description;
    }

    set setPrice(price: number) {
        this.price = price;
    }

    set setTime(time: number) {
        this.time = time;
    }

    set setActive(active: boolean | undefined) {
        this.active = active;
    }
}
