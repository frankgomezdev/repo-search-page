interface PageProps {
    currentPage: number;
    perPage: number;
    totalCount: number;
    onPageChange: (p: number) => void;
}

function Pagination({ currentPage, perPage, totalCount, onPageChange }: PageProps) {
  const numberOfPages = Math.ceil(totalCount / perPage);
  const allPages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    allPages.push(i);
  }
  const lastPage =
    allPages[allPages.length - 1] > 100 ? 100 : allPages[allPages.length - 1];
  const startIndex = currentPage - 3 > 1 ? currentPage - 3 : 1;
  const endIndex = Math.min(currentPage + 2, lastPage);
  const middlePages = allPages.slice(startIndex, endIndex);
  const visiblePages = [...new Set([1, ...middlePages, lastPage])];


  return (
    <ul className="flex gap-3 my-3 justify-center">
      {visiblePages.map((page, index) => {
        const isCurrentPage = currentPage === page;
        const buttonClass = isCurrentPage
          ? "cursor-pointer rounded-xl py-3 px-3 font-bold bg-blue-400 text-white"
          : "cursor-pointer rounded-xl py-3 px-3 hover:bg-gray-400";

        const nextPage = visiblePages[index + 1];
        const showEllipsis = nextPage - page > 1;

        return (
          <li key={page}>
            <button onClick={() => onPageChange(page)} className={buttonClass}>
              {page}
            </button>
            {showEllipsis && <span>...</span>}
          </li>
        );
      })}
    </ul>
  );
}

export default Pagination;
