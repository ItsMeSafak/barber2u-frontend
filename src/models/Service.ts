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

    // eslint-disable-next-line require-jsdoc
    get getId(): string {
        return this.id;
    }

    // eslint-disable-next-line require-jsdoc
    get getName(): string {
        return this.name;
    }

    // eslint-disable-next-line require-jsdoc
    get getDescription(): string {
        return this.description;
    }

    // eslint-disable-next-line require-jsdoc
    get getPrice(): number {
        return this.price;
    }

    // eslint-disable-next-line require-jsdoc
    get getTime(): number {
        return this.time;
    }

    // eslint-disable-next-line require-jsdoc
    get getActive(): boolean | undefined {
        return this.active;
    }

    // eslint-disable-next-line require-jsdoc
    set setId(id: string) {
        this.id = id;
    }

    // eslint-disable-next-line require-jsdoc
    set setName(name: string) {
        this.name = name;
    }

    // eslint-disable-next-line require-jsdoc
    set setDescription(description: string) {
        this.description = description;
    }

    // eslint-disable-next-line require-jsdoc
    set setPrice(price: number) {
        this.price = price;
    }

    // eslint-disable-next-line require-jsdoc
    set setTime(time: number) {
        this.time = time;
    }

    // eslint-disable-next-line require-jsdoc
    set setActive(active: boolean | undefined) {
        this.active = active;
    }
}
