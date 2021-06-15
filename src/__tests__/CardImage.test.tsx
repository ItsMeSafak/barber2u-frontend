import { create, ReactTestInstance } from "react-test-renderer";

import CardImage from "../components/card-image/index";

import { PLACEHOLDER_IMAGE } from "../assets/constants";

let container;
let instance: ReactTestInstance;

describe("Initialize CardImage component", () => {
    beforeEach(() => {
        container = create(
            <CardImage image={PLACEHOLDER_IMAGE} title="Test image card" />
        );
        instance = container.root;
    });

    afterEach(() => {
        container = null;
    });

    it("Should contain an instance of the component", () => {
        expect(instance).toBeTruthy();
    });

    it("Should contain the correct properties", () => {
        const { image, title, label, description, labelColor } = instance.props;
        expect(image).toEqual(PLACEHOLDER_IMAGE);
        expect(title).toBe("Test image card");
        expect(label).toBeFalsy();
        expect(description).toBeFalsy();
        expect(labelColor).toBeFalsy();
    });
});
