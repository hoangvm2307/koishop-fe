// src/app/(admin)/admin/consignments/page.tsx
"use client";

import React from "react";
import DataTableSkeleton from "@/components/dataTableSkelenton";
import { columns } from "./columns"; // Import the columns for the data table
import { DataTable } from "../account/data-table"; 
import { toast } from "@/hooks/use-toast";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useGetConsignments } from "@/hooks/consignment.hook";
import { Consignment } from "@/models/consignment";

function ConsignmentPage() {
  const { consignments, isLoading, error, fetchConsignments } = useGetConsignments(); 

  return (
    <ContentLayout title="Consignments">
      <div className="bg-shade-1-100% text-shade-2-100% space-y-4 rounded-[8px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Consignments</h2>
            <p className="text-muted-foreground">
              Manage consignments...
              <button
                onClick={fetchConsignments} // Refresh consignments on button click
                className="ml-2 text-blue-500 hover:underline"
              >
                refresh
              </button>
            </p>
          </div>
        </div>
        {isLoading ? (
          <DataTableSkeleton columns={columns.length} rows={10} /> // Show loading skeleton while fetching
        ) : error ? (
          <div className="text-red-500">{error}</div> // Show error message if fetching fails
        ) : (
          <DataTable columns={columns} data={consignments as Consignment[]} /> // Render the data table with consignments
        )}
      </div>
    </ContentLayout>
  );
}

export default ConsignmentPage; // Exporting the ConsignmentPage component