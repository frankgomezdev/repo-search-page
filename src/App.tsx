import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import GithubRepoSearch from "./components/GithubRepoSearch";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GithubRepoSearch />
    </QueryClientProvider>
  );
}

export default App;
