import React from "react";
import { render } from "@testing-library/react";
import Listing from "./Listing";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(<MemoryRouter>
        <Listing />
    </MemoryRouter>);
});
