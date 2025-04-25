import {
  ColumnDef,
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductFilter } from "@/types/api";
import { Button } from "./button";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TanstackTable<TData>;
  sortColumn: string[];
  filterState: ProductFilter;
  onSortChange: (column: string) => void;
  onPageChange: (page: number) => void;
}

export const DataTable = <TData, TValue>({
  columns,
  table,
  sortColumn,
  filterState,
  onSortChange,
  onPageChange,
}: DataTableProps<TData, TValue>) => {
  const renderSortIndicator = (columnId: string) => {
    if (filterState.sortBy !== columnId) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return filterState.sortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div>
      <div className="mb-3 flex">
        <div>Total items: {table.getRowCount()}</div>
      </div>
      <div className="rounded-md border w-full mx-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // Add sort functionality to status and amount columns
                  const isSortable = sortColumn.includes(header.id);

                  return (
                    <TableHead key={header.id} className="p-2">
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center">
                          <div
                            className={
                              isSortable
                                ? "flex items-center cursor-pointer"
                                : ""
                            }
                            onClick={
                              isSortable
                                ? () => onSortChange(header.id)
                                : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {isSortable && renderSortIndicator(header.id)}
                          </div>
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: `${cell.column.getSize()}px` }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(table.getState().pagination.pageIndex - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(table.getState().pagination.pageIndex + 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  );
};
