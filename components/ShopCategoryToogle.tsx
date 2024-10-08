import React from "react";

interface CategoryToggleProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category
              ? "bg-neutral-950 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryToggle;
