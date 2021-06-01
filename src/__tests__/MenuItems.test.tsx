import React from "react";
import { BrowserRouter } from "react-router-dom";
import { create, ReactTestInstance } from "react-test-renderer";

import MenuItems from "../components/menu-items";
import customerNavbarMenu from "../assets/navbar/customer.json";

let container;
let instance: ReactTestInstance;

describe("Initialize MenuItems component", () => {
    beforeEach(() => {
        container = create(
            <BrowserRouter>
                <MenuItems menuType="navbar" menuItems={customerNavbarMenu} />
            </BrowserRouter>
        );
        instance = container.root;
    });

    afterEach(() => {
        container = null;
    });

    it("Should contain an instance of the component", () => {
        expect(instance).toBeTruthy();
    });

    it("Should be a navbar menu type", () => {
        expect(instance.findByType(MenuItems).props.menuType).toBe("navbar");
    });

    it("Should contain customer navbar menu items", () => {
        expect(instance.findByType(MenuItems).props.menuItems).toBeTruthy();
        expect(
            instance.findByType(MenuItems).props.menuItems.length
        ).toBeGreaterThan(0);
        expect(
            instance.findByType(MenuItems).props.menuItems.length
        ).toBeGreaterThanOrEqual(customerNavbarMenu.length);
        expect(instance.findByType(MenuItems).props.menuItems).toBe(
            customerNavbarMenu
        );
    });
});
