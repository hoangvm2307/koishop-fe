"use client";

import React from "react";
import DataTableSkeleton from "@/components/dataTableSkelenton";
import { columns } from "./columns";
import { DataTable } from "../account/data-table"; 
import { toast } from "@/hooks/use-toast";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useGetUserOrders } from "@/hooks/order.hook";

function OrderPage() {
  const { orders, isLoading, error, fetchOrders } = useGetUserOrders();

  console.log("orders", orders);

  return (
    <ContentLayout title="Orders">
      <div className="bg-shade-1-100% text-shade-2-100% space-y-4 rounded-[8px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            <p className="text-muted-foreground">
              Manage orders...
              <button
                onClick={fetchOrders}
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
          <DataTable columns={columns} data={orders} />
        )}
      </div>
    </ContentLayout>
  );
}

export default OrderPage;