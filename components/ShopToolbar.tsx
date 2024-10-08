import React from "react";
import { Filter, Grid, List, ChevronDown } from "lucide-react";

interface ToolbarProps {
  productCount: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onOpenMobileSidebar: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  productCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onOpenMobileSidebar,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <button
        className="lg:hidden w-full sm:w-auto bg-neutral-950 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-neutral-800 transition-colors"
        onClick={onOpenMobileSidebar}
      >
        <Filter className="mr-2" size={20} /> Filters
      </button>
      <h2 className="text-xl font-semibold">{productCount} Products</h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            className="appearance-none border rounded-md py-2 pl-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-950"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            size={16}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid" ? "bg-gray-200" : ""
            }`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-gray-200" : ""
            }`}
            aria-label="List view"
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
