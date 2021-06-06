import { Input } from "antd";
import { create, ReactTestInstance } from "react-test-renderer";
import GenericForm from "../components/forms/generic-form";

let instance: ReactTestInstance;
let inputData: Array<{
    name: string;
    icon: string;
    placeholder?: string;
    value?: string | number | string[] | undefined;
    type?: string;
    editable?: boolean;
    rules?: Array<{
        required: boolean;
        message: string;
    }>;
}>;

describe("Generic form tests", () => {
    beforeEach(() => {
        // The Jest documentation has an official workaround
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        inputData = [
            {
                name: "First name",
                icon: "user",
                value: "John"
            }

        ];

        instance = create(<GenericForm
            formName="Sample form"
            data={inputData} />
        ).root;
    });

    it("Should have correct form data", () => {
        expect(instance.props.formName).toEqual("Sample form");
        expect(instance.props.data).toEqual(inputData);
    });

    it("Should have correct form input field data", () => {
        expect(instance.findByType(Input).props.defaultValue).toBe("John");
    });

    it("Should have correct form input field data when changed", () => {
        inputData.fill(
            {
                name: "Last name",
                icon: "user",
                value: "Doe"
            }
        );

        instance =
            create(<GenericForm
                formName="Sample form"
                data={inputData} />
            ).root;

        expect(instance.findByType(Input).props.defaultValue).toBe("Doe");
    });
})