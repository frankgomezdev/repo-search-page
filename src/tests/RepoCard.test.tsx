import { render, screen } from "@testing-library/react";
import RepoCard from "../components/RepoCard";
import { expect } from "vitest";

describe("repo card functionality", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    const mockRepository = {
            id: 12345,
            html_url: "https://github.com/frankgomezdev/repo-search-page",
            full_name: "repo-search-page",
            description: "abcd",
            stargazers_count: 2,
            updated_at: "2026-04-06T09:00:00Z",
            topics: ["react", "javascript", "css", "html"],
        }
    it("renders the full name of the repository", () => {
        render(<RepoCard repository={mockRepository}/>)
        expect(screen.getByText("repo-search-page")).toBeInTheDocument()
    });

    it("renders the description of the repository", () => {
        render(<RepoCard repository={mockRepository}/>)
        expect(screen.getByText("abcd")).toBeInTheDocument()
    });

    it("renders the topics of the repository", () => {
        render(<RepoCard repository={mockRepository}/>)
        expect(screen.getByText("react")).toBeInTheDocument()
    });

    it("renders the star count of the repository", () => {
        render(<RepoCard repository={mockRepository}/>)
        expect(screen.getByText("2 stars")).toBeInTheDocument()
    });

    it("renders the date and time of the last update within repository", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-06T12:00:00Z"));

        render(<RepoCard repository={mockRepository}/>)
        expect(screen.getByText("Updated about 3 hours ago")).toBeInTheDocument()
    });
});