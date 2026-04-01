import { useQuery } from "@tanstack/react-query";
import RepoCard, { type Repository } from "./RepoCard";
import "../index.css"

interface GitHubResponse {
 items: Repository[];
}

const fetchRepo = async() => {
    const response = await fetch('https://api.github.com/search/repositories?q=nextjs');
    if(!response.ok){
        throw new Error('Unable to fetch repositories.')
    }
    return response.json();
}

function GithubRepoSearch() {
    const { data: repositoryData, isLoading, isError } = useQuery<GitHubResponse>({
        queryKey: ['repositories'],
        queryFn: fetchRepo
    })

    return(
        <div className="flex flex-col gap-4 items-center justify-center w-full max-w-4xl mx-auto">
            <h1 className="text-5xl">Github Repository Search</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>No repositories found!</p>}
                {repositoryData?.items?.map((repository) => (
                    <RepoCard key={repository.id} repository={repository} />
                ))}
        </div>
    )
}

export default GithubRepoSearch;