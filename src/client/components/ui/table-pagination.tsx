import { useLocation } from "react-router";
import { Pagination } from "./pagination";

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  pageParam?: string;
  buildPageUrl?: (page: number) => string;
};

function buildVisibleRange(current: number, total: number): number[] {
  const delta = 2;
  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function TablePagination({
  currentPage,
  totalPages,
  pageParam = "page",
  buildPageUrl,
}: TablePaginationProps) {
  const location = useLocation();

  function defaultPageUrl(page: number) {
    const params = new URLSearchParams(location.search);
    params.set(pageParam, String(page));
    return `${location.pathname}?${params.toString()}`;
  }

  const toUrl = buildPageUrl ?? defaultPageUrl;
  const visiblePages = buildVisibleRange(currentPage, totalPages);
  const showLeadingEllipsis = visiblePages[0] > 2;
  const showTrailingEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <>
      <p className="text-sm text-(--text-muted)">
        Exibindo {currentPage} de {totalPages} páginas
      </p>
      <Pagination.Root>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              to={currentPage > 1 ? toUrl(currentPage - 1) : undefined}
              disabled={currentPage === 1}
            />
          </Pagination.Item>

          {visiblePages[0] > 1 && (
            <Pagination.Item>
              <Pagination.Link to={toUrl(1)} isActive={currentPage === 1}>
                1
              </Pagination.Link>
            </Pagination.Item>
          )}

          {showLeadingEllipsis && (
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          )}

          {visiblePages.map((page) => (
            <Pagination.Item key={page}>
              <Pagination.Link to={toUrl(page)} isActive={page === currentPage}>
                {page}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          {showTrailingEllipsis && (
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          )}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <Pagination.Item>
              <Pagination.Link
                to={toUrl(totalPages)}
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </Pagination.Link>
            </Pagination.Item>
          )}

          <Pagination.Item>
            <Pagination.Next
              to={currentPage < totalPages ? toUrl(currentPage + 1) : undefined}
              disabled={currentPage === totalPages}
            />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination.Root>
    </>
  );
}

export { TablePagination };
