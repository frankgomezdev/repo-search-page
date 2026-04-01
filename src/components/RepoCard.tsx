import "../index.css";

export type Repository = {
  id: number;
  html_url: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
};

function RepoCard({ repository }: { repository: Repository }) {
  return (
    <div className="flex flex-col w-full border border-gray-200 p-4 rounded ">
      <a href={repository.html_url} className="hover:underline text-blue-700 text-xl mb-2">
        {repository.full_name}
      </a>
      <p className="text-base">{repository.description}</p>
      <div className="mt-3">
        {repository.topics.map((topic) => (
          <span className="bg-gray-500 text-sm text-white p-1 mr-1 rounded leading-8">
            {topic}
          </span>
        ))}
      </div>
      <div className="text-gray-500 text-xs flex gap-2 mt-3">
        <span>{repository.stargazers_count} stars</span>
        <span>{repository.updated_at}</span>
      </div>
    </div>
  );
}

export default RepoCard;
