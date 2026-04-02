import { useQuery } from "@tanstack/react-query";
import RepoCard, { type Repository } from "./RepoCard";
import "../index.css"
import { useState } from "react";

interface GitHubResponse {
 items: Repository[];
}

const fetchRepo = async(searchInput: string) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchInput}`);
    if(!response.ok){
        throw new Error('Unable to fetch repositories.')
    }
    return response.json();
}

function GithubRepoSearch() {
    const [searchInput, setSearchInput] = useState("");
    const { data: repositoryData, isLoading, isError } = useQuery<GitHubResponse>({
        queryKey: ['repositories', searchInput],
        queryFn: () => fetchRepo(searchInput),
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
                    className="w-full border border-gray-900 bg-gray-100 p-2 mb-3 rounded"
                />
            </form>
            {isLoading && <p>Loading...</p>}
            {isError && <p>No repositories found!</p>}
                {repositoryData?.items?.map((repository) => (
                    <RepoCard key={repository.id} repository={repository} />
                ))}
        </div>
    )
}

export default GithubRepoSearch;