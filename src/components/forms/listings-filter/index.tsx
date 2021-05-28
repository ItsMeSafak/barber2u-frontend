import React, { useState } from "react";

import { Button, Select, Form, Input, Slider } from "antd";


import styles from "./styles.module.scss";

/**
 * This component renders a filter form.
 * The form consists of input fields used to filter listings.
 *
 * @returns {JSX}
 */
const ListingsFilter: React.FC = () => {
    const [formValue, setFormValue] = useState<{
        city: string;
        rating: number;
        hairstyle: string;
    }>({
        city: "",
        rating: 0,
        hairstyle: ""
    });

    const inputFieldValues: Array<{
        name: string;
        placeholder: string;
    }> = [
            {
                name: "City",
                placeholder: "In which area are you looking?"
            }
        ];

    const marks = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5
    };

    /**
     * This function renders all the input fields for the settings form.
     *
     * @returns {JSX}
     */
    const renderInputFields = () =>
        inputFieldValues.map(({ name, placeholder }) => (
            <Form.Item key={name}>
                <h3>{name}</h3>
                <Input
                    name={name}
                    size="large"
                    placeholder={placeholder}
                />
            </Form.Item>
        ));

    return (
        <Form className={styles.filterForm}>
            {inputFieldValues && renderInputFields()}
            <Form.Item key={formValue.rating}>
                <h3>Minimum rating</h3>
                <Slider max={5} defaultValue={0} marks={marks} />
            </Form.Item>

            <Form.Item key={formValue.hairstyle}>
                <h3>Hairstyle</h3>
                <Select
                    showSearch
                    placeholder="What hairstyle are you going for?"
                    size="large"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.filterButton}
                    size="large"
                >
                    Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ListingsFilter;
