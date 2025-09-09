import React from 'react';
import { PageSpinnerIcon } from './icons/SpinnerIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { ErrorIcon } from './icons/ErrorIcon';

interface PreviewPlaceholderProps {
    isLoading: boolean;
    error: string | null;
}

const PreviewPlaceholder: React.FC<PreviewPlaceholderProps> = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white rounded-lg shadow-md p-6">
                <PageSpinnerIcon />
                <p className="text-lg font-medium text-gray-600 mt-4">Generating your paper...</p>
                <p className="text-sm text-gray-500 mt-1">This might take a moment.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                    <ErrorIcon />
                    <p className="text-red-600 font-semibold mt-4">An Error Occurred</p>
                    <p className="text-gray-600 mt-2">{error}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-slate-300">
            <div className="text-center">
                <DocumentIcon />
                <h3 className="text-xl font-semibold text-gray-700 mt-4">Question Paper Preview</h3>
                <p className="text-gray-500 mt-2">Your generated question paper will appear here.</p>
                <p className="text-gray-400 mt-1">Fill out the form and click "Generate Paper" to start.</p>
            </div>
        </div>
    );
};

export default PreviewPlaceholder;