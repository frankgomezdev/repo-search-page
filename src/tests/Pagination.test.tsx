import { render, screen, fireEvent } from "@testing-library/react";
import { expect } from "vitest";
import Pagination from "../components/Pagination";

describe("pagination component functionality", () => {
    const Page = {
        currentPage: 3,
        perPage: 10,
        totalCount: 500,
        onPageChange : vi.fn()
    }
    it("renders the correct amount of pages", () => {
        render(<Pagination {...Page} />)
        expect(screen.getAllByRole("button").length).toEqual(6)
    });

    it("calls onPageChange", () => {
       render(<Pagination {...Page} />)
       const button = screen.getByRole("button", {name: "4"});
       fireEvent.click(button);
       expect(Page.onPageChange).toHaveBeenCalledWith(4);
    });
})