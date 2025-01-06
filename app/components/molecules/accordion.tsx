import React, { useState } from "react";
import { useRouter } from "next/router";

type AccordionProps = {
  category: string;
  suggestions: string[];
  defaultOpen?: boolean;
  onAddSuggestion: (category: string, suggestion: string) => void;
};

const Accordion = (props: AccordionProps) => {
  const { category, suggestions, defaultOpen = false, onAddSuggestion } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [customSuggestion, setCustomSuggestion] = useState("");

  const handleAddSuggestion = () => {
    if (customSuggestion.trim()) {
      onAddSuggestion(category, customSuggestion.trim());
      setCustomSuggestion("");
    }
  };

  return (
    <div className="border rounded-lg mb-4">
      <button
        className="w-full text-left p-4 bg-gray-100 font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {category}
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          <ul className="list-disc list-inside mb-4">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-700">
                {suggestion}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              placeholder="Add your suggestion..."
              value={customSuggestion}
              onChange={(e) => setCustomSuggestion(e.target.value)}
            />
            <button
              onClick={handleAddSuggestion}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
