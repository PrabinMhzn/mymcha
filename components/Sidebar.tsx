// components/Sidebar.tsx
import React from "react";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface SidebarProps {
  filters: {
    category: string;
    priceRange: number[];
    size: string;
    artist: string;
  };
  categories: string[];
  sizes: string[];
  artists: string[];
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      priceRange: number[];
      size: string;
      artist: string;
    }>
  >;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  categories,
  sizes,
  artists,
  setFilters,
  isMobileOpen,
  onMobileClose,
}) => {
  const handleFilterChange = (
    key: keyof typeof filters,
    value: string | number[]
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:sticky lg:top-0 lg:translate-x-0 lg:h-screen`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button onClick={onMobileClose} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filters.category === cat}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="mr-3 form-radio text-blue-600"
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Price Range</h3>
            <Slider
              min={0}
              max={100}
              step={5}
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.size === size
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  onClick={() =>
                    handleFilterChange(
                      "size",
                      size === filters.size ? "All" : size
                    )
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Artist Filter */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Artist</h3>
            <select
              className="w-full p-2 border rounded-md bg-white text-gray-700"
              value={filters.artist}
              onChange={(e) => handleFilterChange("artist", e.target.value)}
            >
              {artists.map((artist) => (
                <option key={artist} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
