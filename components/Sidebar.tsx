import React from "react";
import { X } from "lucide-react";

interface SidebarProps {
  filters: {
    category: string;
    priceRange: [number, number];
    size: string;
    artist: string;
    search: string;
  };
  sizes: string[];
  artists: string[];
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      priceRange: [number, number];
      size: string;
      artist: string;
      search: string;
    }>
  >;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  sizes,
  artists,
  setFilters,
  isMobileOpen,
  onMobileClose,
}) => {
  return (
    <div
      className={`${
        isMobileOpen ? "fixed inset-0 z-50 bg-white" : ""
      } lg:block`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center lg:hidden">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onMobileClose} aria-label="Close filters">
            <X size={24} />
          </button>
        </div>

        {/* Price Range Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value)],
              }))
            }
            className="w-full"
          />
          <div className="flex justify-between">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Size</h3>
          <select
            value={filters.size}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, size: e.target.value }))
            }
            className="w-full p-2 border rounded"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Artist Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Artist</h3>
          <select
            value={filters.artist}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, artist: e.target.value }))
            }
            className="w-full p-2 border rounded"
          >
            {artists.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
