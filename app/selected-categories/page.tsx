"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "../components/atoms/typography";
import clsx from "clsx";
import { categoryDetails } from "@/config/category-suggestions";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import Modal from "../components/layouts/modal";
import Image from "next/image";
import Link from "next/link";

const SelectedCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [selectedGoals, setSelectedGoals] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoriesParam = queryParams.get("categories");
    if (categoriesParam) {
      const decodedCategories = JSON.parse(decodeURIComponent(categoriesParam));
      setCategories(decodedCategories);
    }
  }, []);

  useEffect(() => {
    const hasSelectedGoals = Object.values(selectedGoals).some(
      (goals) => goals.length > 0
    );
    setIsDisabled(!hasSelectedGoals);
  }, [selectedGoals]);

  const handleAccordionToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleGoalToggle = (category: string, goal: string) => {
    const categoryGoals = selectedGoals[category] || [];
    if (categoryGoals.includes(goal)) {
      setSelectedGoals({
        ...selectedGoals,
        [category]: categoryGoals.filter((g) => g !== goal),
      });
    } else if (categoryGoals.length < 2) {
      setSelectedGoals({
        ...selectedGoals,
        [category]: [...categoryGoals, goal],
      });
    }
  };

  const handleSaveGoals = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen bg-main-bg p-6 flex flex-col items-center">
        <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
          <Typography
            variant="h1"
            weight="extraBold"
            family="montserrat"
            color="black"
            spacing="text-center mb-4"
          >
            Your Selected Categories
          </Typography>

          <Typography
            variant="p"
            weight="regular"
            family="lato"
            color="black"
            opacity="md"
            spacing="text-center mb-6"
          >
            Kindly select TWO goals you'd like to achieve under each category
          </Typography>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const categorySuggestions = categoryDetails[category];

              return (
                <div
                  key={category}
                  className="border-b divide-y border-gray-200"
                >
                  <button
                    onClick={() => handleAccordionToggle(index)}
                    className={clsx(
                      "w-full text-left p-4 font-semibold flex items-center justify-between",
                      activeIndex === index
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-black"
                    )}
                  >
                    <Typography
                      variant="p"
                      weight="regular"
                      family="lato"
                      color={activeIndex === index ? "white" : "black"}
                      spacing="flex-1 text-left"
                    >
                      {category}
                    </Typography>
                  </button>

                  {activeIndex === index && (
                    <div className="py-4 px-6 bg-gray-50">
                      <ul className="space-y-2">
                        {categorySuggestions.map((suggestion, index) => {
                          const isGoalSelected =
                            selectedGoals[category]?.includes(suggestion);
                          const isMaxReached =
                            selectedGoals[category]?.length === 2 &&
                            !isGoalSelected;

                          return (
                            <li key={index} className="flex items-center">
                              <button
                                id={`${category}-${suggestion}`}
                                onClick={() =>
                                  handleGoalToggle(category, suggestion)
                                }
                                disabled={isMaxReached}
                                className={clsx(
                                  "mr-2",
                                  isMaxReached
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                )}
                              >
                                {isGoalSelected ? (
                                  <MdOutlineCheckBox size={24} />
                                ) : (
                                  <MdOutlineCheckBoxOutlineBlank size={24} />
                                )}
                              </button>

                              <Typography
                                variant="h4"
                                weight="regular"
                                family="lato"
                                color="black"
                                opacity={isMaxReached ? "md" : "none"}
                              >
                                {suggestion}
                              </Typography>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setShowSuccessModal(true)}
            className={clsx(
              isDisabled
                ? "opacity-40 bg-main-bg text-darkGray cursor-not-allowed"
                : "bg-primary text-white hover:bg-[#1a2836]",

              "mt-6 w-full py-3  font-semibold rounded-lg shadow-md "
            )}
            disabled={isDisabled}
          >
            Save Goals
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <Modal>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3">
            <Image
              src="/assets/images/check.gif"
              alt="check"
              width={90}
              height={90}
            />

            <Typography
              variant="h3"
              weight="bold"
              family="montserrat"
              color="black"
            >
              Success!
            </Typography>

            <Typography
              variant="p"
              weight="regular"
              family="lato"
              color="black"
              opacity="md"
            >
              Your goals have been successfully saved.
            </Typography>

            <Link
              href="/dashboard"
              // onClick={() => setShowSuccessModal(false)}
              className="w-full text-center py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-[#1a2836]"
            >
              Close
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SelectedCategories;
