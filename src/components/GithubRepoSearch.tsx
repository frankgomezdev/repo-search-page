import { useQuery } from "@tanstack/react-query";

interface GitHubResponse {
 items: Repository[];
}

type Repository = {
id: number;
 full_name: string;
 description: string;
 stargazers_count: number;
 updated_at: string;
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
        <div className="container">
            <h1>Github Repository Search</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>No repositories found!</p>}
            <ul>
                {repositoryData?.items?.map((repository) => (
                    <li key={repository.id}>{repository.full_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default GithubRepoSearch;