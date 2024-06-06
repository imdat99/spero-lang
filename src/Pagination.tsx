import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from "components/ui/pagination";

interface PaginationProps {
  page: number;
  limit: number;
  totalData: number; // Add totalData prop
  onPageChange: (page: number) => void;
}

export function PaginationDemo(props: PaginationProps) {
  const { page, limit, totalData, onPageChange } = props;
  // Calculate the total number of pages based on the total data and limit
  const totalPages = Math.ceil(totalData / limit);

  return (
    <Pagination>
      <PaginationContent>
        {/* Render pagination items dynamically based on the total number of pages */}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index} onClick={() => {
            onPageChange(index + 1);
          }}>
            <PaginationLink isActive={index + 1 === Number(page)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
