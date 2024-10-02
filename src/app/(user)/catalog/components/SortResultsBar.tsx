"use client";
import React, { useState } from "react";
import { ChevronDown, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const SortResultsBar = ({ totalResults = 907, resultsPerPage = 25 }) => {
  const [sortBy, setSortBy] = useState("Latest");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 shadow-sm">
      <div className="relative">
        <Button
          variant="ghost"
          className="flex items-center space-x-2  px-4 py-2 "
          onClick={() => {
            /* Implement dropdown toggle */
          }}
        >
          <span className="font-bold text-sm">SORT BY {sortBy.toUpperCase()}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        {/* Dropdown menu would go here */}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600 text-sm">
          Showing 1-{resultsPerPage} of {totalResults} results
        </span>
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-md ${
              viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-600"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-md ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-600"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortResultsBar;
