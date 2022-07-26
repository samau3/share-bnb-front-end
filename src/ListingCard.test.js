import React from "react";
import { render } from "@testing-library/react";
import ListingCard from "./ListingCard";
import { MemoryRouter } from "react-router";


it("renders without crashing", function () {
    render(<MemoryRouter>
        <ListingCard />
    </MemoryRouter>);
});