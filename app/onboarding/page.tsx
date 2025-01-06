"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Typography from "../components/atoms/typography";
import clsx from "clsx";
// import Typography from "@/components/Typography";

const categories = [
  { name: "Career and Finances", emoji: "💼" },
  { name: "Health and Wellness", emoji: "🧘‍♂️" },
  { name: "Relationship and Family", emoji: "👨‍👩‍👧‍👦" },
  { name: "Spirituality and Religion", emoji: "🙏" },
  { name: "Personal Growth and Development", emoji: "🌱" },
  { name: "Recreation and Leisure", emoji: "🏖️" },
  { name: "Community and Contribution", emoji: "🤝" },
  { name: "Environment and Lifestyle", emoji: "🌍" },
];

const SelectCategories = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (selectedCategories.length < 2) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleContinue = () => {
    if (selectedCategories.length === 2) {
      const encodedCategories = encodeURIComponent(
        JSON.stringify(selectedCategories)
      );
      router.push(`/selected-categories?categories=${encodedCategories}`);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main-bg p-6">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <Typography
          variant="h1"
          weight="extraBold"
          family="montserrat"
          color="black"
          spacing="text-center mb-4"
        >
          Select Your Categories
        </Typography>

        <Typography
          variant="p"
          weight="regular"
          family="lato"
          color="black"
          opacity="md"
          spacing="text-center mb-6"
        >
          Choose two aspects of your life to focus on.
        </Typography>

        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleSelect(category.name)}
              className={clsx(
                "w-full p-4 border rounded-lg text-center font-semibold flex items-center justify-between",
                selectedCategories.includes(category.name)
                  ? "bg-primary text-white"
                  : selectedCategories.length >= 2
                  ? "bg-secondary text-gray-400 cursor-not-allowed opacity-30"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              disabled={
                selectedCategories.length >= 2 &&
                !selectedCategories.includes(category.name)
              }
            >
              <Typography
                variant="p"
                weight="regular"
                family="lato"
                color={
                  selectedCategories.includes(category.name) ? "white" : "black"
                }
                spacing="flex-1 text-left"
              >
                {category.emoji} {category.name}
              </Typography>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="mt-6 w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-[#2d3e4e] disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={selectedCategories.length !== 2}
        >
          <Typography
            variant="p"
            weight="bold"
            family="montserrat"
            color="white"
          >
            Continue
          </Typography>
        </button>
      </div>
    </div>
  );
};

export default SelectCategories;
