import React, { useState, useMemo, useCallback } from 'react';
import { Config, Paper, QuestionCounts } from './types';
import { CHAPTERS, INITIAL_CONFIG, INITIAL_QUESTION_COUNTS } from './constants';
import { generateQuestions } from './services/geminiService';
import Header from './components/Header';
import ConfiguratorForm from './components/ConfiguratorForm';
import PaperPreview from './components/PaperPreview';
import PreviewPlaceholder from './components/PreviewPlaceholder';

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>(INITIAL_CONFIG);
  const [questionCounts, setQuestionCounts] = useState<QuestionCounts>(INITIAL_QUESTION_COUNTS);
  const [generatedPaper, setGeneratedPaper] = useState<Paper | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const availableChapters = useMemo(() => {
    return CHAPTERS[config.standard]?.[config.medium]?.[config.subject] || [];
  }, [config.standard, config.subject, config.medium]);

  const totalQuestions = useMemo(() => {
    return Object.values(questionCounts).reduce((sum: number, count: number) => sum + count, 0);
  }, [questionCounts]);

  const handleConfigChange = useCallback((field: keyof Omit<Config, 'chapter'>, value: string) => {
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig, [field]: value };

      if (field === 'standard' || field === 'subject' || field === 'medium') {
        newConfig.chapter = [];
      }
      
      return newConfig;
    });
  }, []);

  const handleChapterChange = useCallback((chapters: string[]) => {
    setConfig(prevConfig => ({ ...prevConfig, chapter: chapters }));
  }, []);

  const handleCountsChange = useCallback((type: keyof QuestionCounts, value: number) => {
    setQuestionCounts(prev => ({ ...prev, [type]: Math.max(0, value) }));
  }, []);

  const handleGeneratePaper = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedPaper(null);

    if (totalQuestions === 0) {
      setError("Please specify the number of questions to generate.");
      setIsLoading(false);
      return;
    }
    if (totalQuestions > 30) {
      setError("Please request a total of 30 questions or less to ensure performance.");
      setIsLoading(false);
      return;
    }
    if (config.chapter.length === 0) {
        setError("Please select at least one chapter.");
        setIsLoading(false);
        return;
    }

    try {
      const paper = await generateQuestions(config, questionCounts);
      setGeneratedPaper(paper);
    } catch (err) {
      console.error(err);
      setError("Failed to generate question paper. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="no-print">
            <ConfiguratorForm
              config={config}
              onConfigChange={handleConfigChange}
              onChapterChange={handleChapterChange}
              questionCounts={questionCounts}
              onCountsChange={handleCountsChange}
              availableChapters={availableChapters}
              onGenerate={handleGeneratePaper}
              isLoading={isLoading}
              totalQuestions={totalQuestions}
            />
          </div>

          <div className="print-container">
            {!isLoading && generatedPaper ? (
              <PaperPreview paper={generatedPaper} config={config} />
            ) : (
              <PreviewPlaceholder
                isLoading={isLoading}
                error={error}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
