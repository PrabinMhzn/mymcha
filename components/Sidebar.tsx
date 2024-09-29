// components/Sidebar.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [expandedSections, setExpandedSections] = useState({
    priceRange: true,
    sizes: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md px-8 py-16 ${
        isMobileOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden lg:block"
      } lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto`}
    >
      <button
        onClick={onMobileClose}
        className="lg:hidden w-full text-left mb-4 font-semibold text-neutral-950"
      >
        Close Filters
      </button>

      {/* Price Range */}
      <div className="mb-6">
        <button
          className="flex justify-between items-center w-full text-left font-semibold mb-2"
          onClick={() => toggleSection("priceRange")}
        >
          Price Range
          {expandedSections.priceRange ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
        {expandedSections.priceRange && (
          <div>
            <input
              type="range"
              min="0"
              max="1000"
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
              <span>$0</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <button
          className="flex justify-between items-center w-full text-left font-semibold mb-2"
          onClick={() => toggleSection("sizes")}
        >
          Sizes
          {expandedSections.sizes ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
        {expandedSections.sizes && (
          <div className="space-y-2">
            {sizes.map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={filters.size === size}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, size: e.target.value }))
                  }
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Artists Dropdown */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Artists</p>
        <select
          value={filters.artist}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, artist: e.target.value }))
          }
          className="w-full border rounded-md py-2 px-3"
        >
          {artists.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          setFilters({
            category: "All",
            priceRange: [0, 1000],
            size: "All",
            artist: "All",
            search: "",
          })
        }
        className="w-full bg-neutral-950 text-white py-2 rounded-md font-semibold hover:bg-neutral-800 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default Sidebar;
