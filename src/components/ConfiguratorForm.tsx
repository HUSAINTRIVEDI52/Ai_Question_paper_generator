import React from 'react';
import { Config, QuestionCounts } from '../types';
import { STANDARDS, SUBJECTS, MEDIUMS, DIFFICULTIES } from '../constants';
import { ButtonSpinnerIcon } from './icons/SpinnerIcon';
import ChapterSelector from './ChapterSelector';
import { InfoIcon } from './icons/InfoIcon';

interface ConfiguratorFormProps {
  config: Config;
  onConfigChange: (field: keyof Omit<Config, 'chapter'>, value: string) => void;
  onChapterChange: (chapters: string[]) => void;
  questionCounts: QuestionCounts;
  onCountsChange: (type: keyof QuestionCounts, value: number) => void;
  availableChapters: string[];
  onGenerate: () => void;
  isLoading: boolean;
  totalQuestions: number;
}

const InputField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input id={id} {...props} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
    </div>
);

const SelectField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ label, id, options, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <select id={id} {...props} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-200 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md">
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);

const QuestionCountInput: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, ...props }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input type="number" min="0" max="30" {...props} className="w-20 px-2 py-1 text-center bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
    </div>
);

const SectionHeader: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
    <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
        {children}
    </div>
);


const ConfiguratorForm: React.FC<ConfiguratorFormProps> = ({ config, onConfigChange, onChapterChange, questionCounts, onCountsChange, availableChapters, onGenerate, isLoading, totalQuestions }) => {
  const isOverLimit = totalQuestions > 30;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
      
      <div className="space-y-6">
        <SectionHeader title="1. Paper Setup" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Institution Name" id="institutionName" value={config.institutionName} onChange={(e) => onConfigChange('institutionName', e.target.value)} placeholder="e.g., Sunrise Academy" />
          <InputField label="Total Marks" id="totalMarks" type="number" value={config.totalMarks} onChange={(e) => onConfigChange('totalMarks', e.target.value)} placeholder="e.g., 100" />
          <InputField label="Exam Date (Optional)" id="examDate" type="date" value={config.examDate} onChange={(e) => onConfigChange('examDate', e.target.value)} />
        </div>
      </div>

      <div className="space-y-6">
        <SectionHeader title="2. Question Paper Configuration" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField label="Standard" id="standard" value={config.standard} onChange={(e) => onConfigChange('standard', e.target.value)} options={STANDARDS} />
          <SelectField label="Subject" id="subject" value={config.subject} onChange={(e) => onConfigChange('subject', e.target.value)} options={SUBJECTS} />
          <SelectField label="Medium" id="medium" value={config.medium} onChange={(e) => onConfigChange('medium', e.target.value)} options={MEDIUMS} />
          <SelectField label="Difficulty" id="difficulty" value={config.difficulty} onChange={(e) => onConfigChange('difficulty', e.target.value as 'Easy' | 'Medium' | 'Hard')} options={DIFFICULTIES} />
        </div>
        <ChapterSelector 
            availableChapters={availableChapters}
            selectedChapters={config.chapter}
            onChange={onChapterChange}
        />
      </div>

      <div className="space-y-6">
        <SectionHeader title="3. Question Types">
             <div className={`text-sm font-medium ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
                Total: {totalQuestions} / 30
            </div>
        </SectionHeader>

        {isOverLimit && (
            <div className="flex items-start p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                <InfoIcon />
                <span className="ml-2">For best performance, please keep the total number of questions at 30 or less.</span>
            </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuestionCountInput label="✅ Multiple Choice" value={questionCounts.mcqs} onChange={(e) => onCountsChange('mcqs', parseInt(e.target.value, 10) || 0)} />
            <QuestionCountInput label="✏️ Short Answer" value={questionCounts.shortAnswer} onChange={(e) => onCountsChange('shortAnswer', parseInt(e.target.value, 10) || 0)} />
            <QuestionCountInput label="📝 Long Answer" value={questionCounts.longAnswer} onChange={(e) => onCountsChange('longAnswer', parseInt(e.target.value, 10) || 0)} />
            <QuestionCountInput label="🔲 Fill in the Blanks" value={questionCounts.fillInTheBlanks} onChange={(e) => onCountsChange('fillInTheBlanks', parseInt(e.target.value, 10) || 0)} />
            <QuestionCountInput label="🔄 True/False" value={questionCounts.trueFalse} onChange={(e) => onCountsChange('trueFalse', parseInt(e.target.value, 10) || 0)} />
        </div>
      </div>
      
      <div>
        <button
          onClick={onGenerate}
          disabled={isLoading || totalQuestions === 0 || isOverLimit}
          className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400 disabled:cursor-not-allowed transition-all duration-150 ease-in-out hover:scale-[1.02]"
        >
          {isLoading ? (
            <>
              <ButtonSpinnerIcon />
              Generating...
            </>
          ) : (
            'Generate Paper'
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfiguratorForm;