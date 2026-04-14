import { useQuery } from "@tanstack/react-query";
import RepoCard, { type Repository } from "./RepoCard";
import "../index.css";
import { useState } from "react";
import Pagination from "./Pagination";

interface GitHubResponse {
  items: Repository[];
  total_count: number;
}

interface SearchParams {
  searchInput: string;
  page: number;
  perPage: number;
  sortBy: string;
}

const fetchRepo = async (params: SearchParams) => {
  const urlParams = new URLSearchParams({
    q: params.searchInput,
    page: params.page.toString(),
    per_page: params.perPage.toString(),
    sort: params.sortBy === "best-match" ? "" : params.sortBy,
  });
  const response = await fetch(
    `https://api.github.com/search/repositories?${urlParams}`,
  );
  if (!response.ok) {
    throw new Error("Unable to fetch repositories.");
  }
  return response.json();
};

function GithubRepoSearch() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("best-match");
  const [searchInput, setSearchInput] = useState("");
  const params = { searchInput, page, perPage, sortBy };
  const {
    data: repositoryData,
    isLoading,
    isError,
    error,
  } = useQuery<GitHubResponse>({
    queryKey: ["repositories", params],
    queryFn: () => fetchRepo(params),
    enabled: searchInput !== "",
  });

  const handleSubmit = (formData: FormData) => {
    setSearchInput(formData.get("searchInput") as string);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full max-w-4xl mx-auto">
      <h1 className="text-5xl">Github Repository Search</h1>
      <form className="flex flex-col" action={handleSubmit}>
        <input
          name="searchInput"
          defaultValue={searchInput}
          type="text"
          placeholder="Search for repositories.."
          className="w-full border border-gray-900 bg-gray-100 p-2 mb-2 rounded"
        />
        <div className="flex gap-3 w-full">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Items per page
            </span>
            <select
              value={perPage}
              className="outline-none bg-transparent text-sm"
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Sort by
            </span>
            <select
              value={sortBy}
              className="outline-none bg-transparent text-sm"
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="best-match">Best Match</option>
              <option value="stars">Stars</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error has occurred: {error.message}</p>}
      {repositoryData?.items?.map((repository) => (
        <RepoCard key={repository.id} repository={repository} />
      ))}
      {repositoryData && (
        <Pagination
          currentPage={page}
          perPage={perPage}
          totalCount={repositoryData.total_count}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default GithubRepoSearch;
