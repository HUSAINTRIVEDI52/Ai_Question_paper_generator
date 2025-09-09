import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { XIcon } from './icons/XIcon';

interface ChapterSelectorProps {
  availableChapters: string[];
  selectedChapters: string[];
  onChange: (selected: string[]) => void;
}

const ChapterSelector: React.FC<ChapterSelectorProps> = ({ availableChapters, selectedChapters, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  const handleToggleChapter = (chapter: string) => {
    const newSelection = selectedChapters.includes(chapter)
      ? selectedChapters.filter(c => c !== chapter)
      : [...selectedChapters, chapter];
    onChange(newSelection);
  };

  const handleSelectAll = () => onChange(availableChapters);
  const handleClearAll = () => {
    onChange([]);
    setIsOpen(false); // Close dropdown after clearing
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label htmlFor="chapter-selector" className="block text-sm font-medium text-gray-700">Chapter(s)</label>
      <button
        id="chapter-selector"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={availableChapters.length === 0}
        className="mt-1 relative w-full bg-white border border-gray-200 rounded-md shadow-sm pl-3 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-50 disabled:cursor-not-allowed flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          {selectedChapters.length === 0 && <span className="text-gray-500 px-1">Select Chapter(s)</span>}
          {selectedChapters.slice(0, 2).map(chapter => (
             <span key={chapter} className="bg-sky-100 text-sky-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <span className="truncate max-w-[120px] sm:max-w-[100px] md:max-w-[150px]">{chapter}</span>
                <button
                    type="button"
                    aria-label={`Remove ${chapter}`}
                    className="ml-1.5 -mr-0.5 flex-shrink-0 text-sky-600 hover:text-sky-800 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-sky-100 focus:ring-sky-500"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleChapter(chapter);
                    }}
                >
                    <XIcon />
                </button>
            </span>
          ))}
          {selectedChapters.length > 2 && (
            <span className="text-sm font-medium text-gray-600 bg-slate-100 px-2 py-1 rounded-full">
                +{selectedChapters.length - 2} more
            </span>
          )}
        </div>
        <span className="flex items-center pointer-events-none">
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && availableChapters.length > 0 && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 border border-gray-200">
          <div className="p-2 border-b border-gray-200 flex justify-between">
            <button onClick={handleSelectAll} className="text-sm font-medium text-sky-600 hover:text-sky-800 px-2 py-1 rounded hover:bg-sky-50 transition-colors">Select All</button>
            <button onClick={handleClearAll} className="text-sm font-medium text-sky-600 hover:text-sky-800 px-2 py-1 rounded hover:bg-sky-50 transition-colors">Clear All</button>
          </div>
          <ul
            className="max-h-60 rounded-b-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
          >
            {availableChapters.map((chapter, index) => (
              <li
                key={index}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 transition-colors ${
                    selectedChapters.includes(chapter)
                      ? 'bg-sky-100 text-sky-900'
                      : 'text-gray-900 hover:bg-sky-50'
                }`}
                onClick={() => handleToggleChapter(chapter)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedChapters.includes(chapter)}
                    readOnly
                    tabIndex={-1}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span className={`ml-3 block truncate ${selectedChapters.includes(chapter) ? 'font-semibold' : 'font-normal'}`}>{chapter}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChapterSelector;