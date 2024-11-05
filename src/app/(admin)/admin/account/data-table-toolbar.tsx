"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "../components/table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Set filter value for both 'name' and 'userName' columns
    table.getColumn("name")?.setFilterValue(value);
    table.getColumn("userName")?.setFilterValue(value);
  };

  const nameFilterValue = (table.getColumn("name")?.getFilterValue() as string) ?? "";
  const userNameFilterValue = (table.getColumn("userName")?.getFilterValue() as string) ?? "";

  const combinedFilterValue = nameFilterValue || userNameFilterValue;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search"
          value={combinedFilterValue} // Use the combined filter value
          onChange={handleSearchChange} // Use the new handler
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Clear Filter
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}