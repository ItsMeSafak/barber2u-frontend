import { create, ReactTestInstance } from "react-test-renderer";
import { EURO_SYMBOL } from "../assets/constants";
import ServiceCard from "../components/card-service";
import Service from "../models/Service";

let instance: ReactTestInstance;
let serviceObject: Service;

describe("Init service card component", () => {
    beforeEach(() => {
        serviceObject = new Service("randomid", "Styling", "A fresh styling for the ladies", 23.50, 45, false);
        instance = create(
            <ServiceCard serviceDetail={serviceObject} />
        ).root;
    });

    it("Should contain correct star color", () => {
        expect(serviceObject.getActive).toBeFalsy();
        expect(instance.props.serviceDetail.getActive).toBeFalsy();
        expect(instance.findByProps({ className: "certificateOff" })).toBeDefined();
    });

    it("Should contain correct properties", () => {
        expect(instance.findByProps({ className: "header" }).children[0]).toContain(serviceObject.getName);
        expect(instance.findByProps({ className: "price" }).children).toEqual([EURO_SYMBOL, " ", serviceObject.getPrice.toFixed(2)]);
    });
})