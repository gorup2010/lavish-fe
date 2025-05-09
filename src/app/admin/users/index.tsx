import { RequestFail } from "@/components/error/error-message";
import { LoadingBlock } from "@/components/loading/loading-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { useAdminUsers } from "@/features/user/api/get-admin-users";
import { UserFilter, UserInAdminDto } from "@/types/api";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const columns: ColumnDef<UserInAdminDto>[] = [
  {
    accessorKey: "id",
    header: () => <></>,
    cell: () => <></>,
    maxSize: 0,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Link
            to={`${row.getValue("id")}`}
            className="font-medium hover:text-gray-500"
          >
            {row.getValue("username")}
          </Link>
        </div>
      );
    },
    size: 230,
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {row.getValue("firstname")}
        </div>
      );
    },
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {row.getValue("lastname")}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return <Badge variant={row.getValue("isActive") ? "default" : "destructive"}>{row.getValue("isActive") ? "Active" : "Inactive"}</Badge>;
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

export const AdminUsersPage = () => {
  const defaultData = useMemo(() => [], []);
  const defaultFilter = useMemo(
    () => ({ page: 0, size: 10, sortBy: "createdOn", sortOrder: "desc" }),
    []
  );
  const [filter, setFilter] = useState<UserFilter>(defaultFilter);
  const [username, setUsername] = useState("");

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
    if (username.trim().length !== 0) {
      setFilter((prev) => ({
        ...prev,
        username,
        page: 0,
      }));
    }
  }, [username]);

  const dataQuery = useAdminUsers({ filter });

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

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Users</h1>

      <div className="mb-3 h-10 w-full flex items-center gap-1">
        <Input
          placeholder="Search by username..."
          className="w-80"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Button onClick={handleNameChange}>Search</Button>
        <Button
          onClick={() => {
            setFilter(defaultFilter);
            setUsername("");
          }}
        >
          Reset
        </Button>
        <div className="flex-1"></div>
      </div>

      <DataTable
        table={table}
        columns={columns}
        sortColumn={["username", "createdOn"]}
        filterState={filter}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
