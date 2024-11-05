"use client";

import React from "react";
import DataTableSkeleton from "@/components/dataTableSkelenton";
import { columns } from "./columns"; 
import { DataTable } from "../account/data-table"; 
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useGetUsers } from "@/hooks/user.hook"; 

function UserPage() {
  const { data: users, isLoading, error, fetchUsers } = useGetUsers(); 

  return (
    <ContentLayout title="Users">
      <div className="bg-shade-1-100% text-shade-2-100% space-y-4 rounded-[8px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
              Manage users...
              <button
                onClick={fetchUsers} 
                className="ml-2 text-blue-500 hover:underline"
              >
                refresh
              </button>
            </p>
          </div>
        </div>
        {isLoading ? (
          <DataTableSkeleton columns={columns.length} rows={10} />
        ) : error ? (
          <div className="text-red-500">{error}</div> 
        ) : (
          <DataTable columns={columns} data={users} />
        )}
      </div>
    </ContentLayout>
  );
}

export default UserPage;