"use client";
import { useQuery } from "@tanstack/react-query";
import FishCard from "./FishCard";
import { getKoiFishList, KoiFish, FilterData, PaginationInfo } from "@/lib/api/koifishApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

interface KoiFishListProps {
  filters: Partial<FilterData>;
  page: number;
  setPage: (page: number) => void;
}

export default function KoiFishList({ filters, page, setPage }: KoiFishListProps) {
  const { data, isLoading, error } = useQuery<
    { items: KoiFish[]; pagination: PaginationInfo | null },
    Error
  >({
    queryKey: ["koiFishes", filters, page],
    queryFn: () => getKoiFishList({ ...filters, PageNumber: page, status: ["AVAILABLE"] }),
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi khi tải: {error.message}</div>;

  const koiFishes = data?.items || [];
  const pagination = data?.pagination;

  console.log(pagination?.CurrentPage);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {koiFishes.map((fish) => (
          <FishCard
            key={fish.id}
            id={fish.id}
            name={fish.name}
            image={fish.imageUrl}
            price={fish.price}
            size={fish.size}
          />
        ))}
      </div>
      {pagination && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(Math.max(1, page - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(pagination.TotalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setPage(index + 1)} isActive={page === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(Math.min(pagination.TotalPages, page + 1))}
                className={page === pagination.TotalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
