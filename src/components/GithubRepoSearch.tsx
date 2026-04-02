import { useQuery } from "@tanstack/react-query";
import RepoCard, { type Repository } from "./RepoCard";
import "../index.css"
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
}

const fetchRepo = async(params: SearchParams) => {
    const urlParams = new URLSearchParams({
        q: params.searchInput,
        page: params.page.toString(),
        per_page: params.perPage.toString(),
    })
    const response = await fetch(`https://api.github.com/search/repositories?q=${urlParams}`);
    if(!response.ok){
        throw new Error('Unable to fetch repositories.')
    }
    return response.json();
}

function GithubRepoSearch() {
    const [page, setPage] = useState(1);
    const perPage = 10;
    const [searchInput, setSearchInput] = useState("");
    const params = {searchInput, page, perPage}
    const { data: repositoryData, isLoading, isError, error } = useQuery<GitHubResponse>({
        queryKey: ['repositories', params],
        queryFn: () => fetchRepo(params),
        enabled: searchInput !== "",
    })

    const handleSubmit = (formData: FormData) => {
        setSearchInput(formData.get("searchInput") as string);
    }

    return(
        <div className="flex flex-col gap-4 items-center justify-center w-full max-w-4xl mx-auto">
            <h1 className="text-5xl">Github Repository Search</h1>
            <form action={handleSubmit}>
                <input
                    name="searchInput"
                    type="text"
                    placeholder="Search for repositories.."
                    className="w-full border border-gray-900 bg-gray-100 p-2 mb-2 rounded"
                />
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
    )
}

export default GithubRepoSearch;