import { RequestFail } from "@/components/error/error-message";
import { LoadingBlock } from "@/components/loading/loading-block";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { useAdminCategories } from "@/features/category/api/get-admin-categories";
import {} from "@/features/product/api/get-admin-products";
import { CategoryFilter, CategoryInAdminDto } from "@/types/api";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const columns: ColumnDef<CategoryInAdminDto>[] = [
  {
    accessorKey: "id",
    header: () => <></>,
    cell: () => <></>,
    maxSize: 0,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ml-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-2"
      />
    ),
    size: 5,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "thumbnailImg",
    header: () => <></>,
    cell: ({ row }) => {
      return (
        <div>
          <img
            src={row.getValue("thumbnailImg")}
            alt={row.getValue("name")}
            className="mx-auto h-8 w-8 rounded-full"
          />
        </div>
      );
    },
    size: 30,
  },
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Link
            to={`${row.getValue("id")}`}
            className="font-medium hover:text-gray-500"
          >
            {row.getValue("name")}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      const utcDate = new Date(row.getValue("createdOn"));
      return utcDate.toLocaleString();
    },
  },
];

export const AdminCategoriesPage = () => {
  const defaultData = useMemo(() => [], []);
  const defaultFilter = useMemo(
    () => ({ page: 0, size: 10, sortBy: "createdOn", sortOrder: "desc" }),
    []
  );
  const [filter, setFilter] = useState<CategoryFilter>(defaultFilter);
  const [name, setName] = useState("");

  const handlePageChange = (page: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, page }));
  };

  const handleSortChange = (column: string) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder:
        prev.sortBy === column && prev.sortOrder === "desc" ? "asc" : "desc",
      page: 0,
    }));
  };

  const handleNameChange = useCallback(() => {
    if (name.trim().length !== 0) {
      setFilter((prev) => ({
        ...prev,
        name,
        page: 0,
      }));
    }
  }, [name]);

  const dataQuery = useAdminCategories({ filter });

  const table = useReactTable({
    data: dataQuery.data?.data ?? defaultData,
    columns,
    rowCount: dataQuery.data?.total,
    state: {
      pagination: {
        pageIndex: filter.page ?? 0,
        pageSize: filter.size ?? 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  if (dataQuery.isLoading) {
    return <LoadingBlock />;
  }

  if (dataQuery.isError) {
    return (
      <RequestFail retryRequest={dataQuery.refetch} error={dataQuery.error} />
    );
  }

  const printSelectedIds = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => (row.original as any).id);
    console.log("Selected IDs:", selectedIds);
    alert("Selected IDs: " + selectedIds.join(", "));
  };

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Categories</h1>

      <div className="mb-3 h-10 w-full flex items-center gap-1">
        <Input
          placeholder="Search by name..."
          className="w-80"
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleNameChange}>Search</Button>
        <Button onClick={() => setFilter(defaultFilter)}>Reset</Button>
        <div className="flex-1"></div>
        {table.getSelectedRowModel().rows.length > 0 && (
          <Button onClick={printSelectedIds} className="bg-red-600">
            Delete ({table.getSelectedRowModel().rows.length})
          </Button>
        )}
        <Button className="self-end">
          <Link to="new">Add Category</Link>
        </Button>
      </div>

      <DataTable
        table={table}
        columns={columns}
        sortColumn={["name", "createdOn"]}
        filterState={filter}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
