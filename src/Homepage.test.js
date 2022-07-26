import React from "react";
import { render } from "@testing-library/react";
import Homepage from "./Homepage";
import { MemoryRouter } from "react-router";


it("renders without crashing", function () {
    render(<MemoryRouter>
        <Homepage />
    </MemoryRouter>);
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <Homepage />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});