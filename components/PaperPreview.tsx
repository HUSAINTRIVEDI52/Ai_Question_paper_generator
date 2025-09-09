import React, { useCallback, useState } from 'react';
import { Config, Paper, MCQ, TextQuestion, TrueFalseQuestion } from '../types';
import { PrintIcon } from './icons/PrintIcon';
import { CopyIcon } from './icons/CopyIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface PaperPreviewProps {
  paper: Paper;
  config: Config;
}

const PaperPreview: React.FC<PaperPreviewProps> = ({ paper, config }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handlePrint = () => {
    window.print();
  };
  
  const generateTextForCopy = useCallback(() => {
    let text = `${config.institutionName}\n\n`;
    text += `Standard: ${config.standard}\t\tSubject: ${config.subject}\n`;
    text += `Total Marks: ${config.totalMarks}\t\tDate: ${config.examDate || 'N/A'}\n\n`;
    text += `--------------------------------------------------\n\n`

    let questionNumber = 1;

    const addSection = (title: string, questions: any[] | undefined, formatFn: (q: any, i: number) => string) => {
        if (questions && questions.length > 0) {
            text += `--- ${title} ---\n\n`;
            questions.forEach(q => {
                text += formatFn(q, questionNumber);
                questionNumber++;
            });
            text += '\n';
        }
    };

    addSection("Multiple Choice Questions", paper.mcqs, (q: MCQ, i) => 
        `${i}. ${q.question}\n${q.options.map((opt, j) => `   ${String.fromCharCode(97 + j)}) ${opt}`).join('\n')}\n${showAnswers ? `Answer: ${q.answer}\n` : ''}\n`
    );
    addSection("Short Answer Questions", paper.shortAnswer, (q: TextQuestion, i) => 
        `${i}. ${q.question}\n${showAnswers ? `Answer: ${q.answer}\n` : ''}\n`
    );
    addSection("Long Answer Questions", paper.longAnswer, (q: TextQuestion, i) => 
        `${i}. ${q.question}\n${showAnswers ? `Answer: ${q.answer}\n` : ''}\n`
    );
    addSection("Fill in the Blanks", paper.fillInTheBlanks, (q: TextQuestion, i) => 
        `${i}. ${q.question}\n${showAnswers ? `Answer: ${q.answer}\n` : ''}\n`
    );
    addSection("True/False", paper.trueFalse, (q: TrueFalseQuestion, i) => 
        `${i}. ${q.question}\n${showAnswers ? `Answer: ${String(q.answer)}\n` : ''}\n`
    );

    return text;
  }, [paper, config, showAnswers]);

  const handleCopyToClipboard = () => {
    const textToCopy = generateTextForCopy();
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    });
  };

  const handleDownloadDocx = useCallback(() => {
    let questionNumber = 1;
    let contentHtml = `
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 20px; font-weight: bold; margin: 0;">${config.institutionName}</h1>
      </div>
      <div style="display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 8px 0; margin-bottom: 24px; font-size: 14px;">
        <p style="margin: 0;"><strong>Standard:</strong> ${config.standard}</p>
        <p style="margin: 0;"><strong>Subject:</strong> ${config.subject}</p>
        <p style="margin: 0;"><strong>Total Marks:</strong> ${config.totalMarks}</p>
        ${config.examDate ? `<p style="margin: 0;"><strong>Date:</strong> ${config.examDate}</p>` : ''}
      </div>
    `;
    
    const answerStyle = `font-size: 13px; color: #065f46; font-weight: 600; margin-top: 4px; background-color: #ecfdf5; padding: 4px 8px; border-radius: 4px; display: inline-block;`;

    const addSectionHtml = (title: string, questions: any[] | undefined, formatFn: (q: any) => string) => {
        if (questions && questions.length > 0) {
            contentHtml += `<h4 style="font-weight: bold; font-size: 16px; margin-bottom: 16px; margin-top: 24px;">${title}</h4>`;
            contentHtml += `<ol start="${questionNumber}" style="padding-left: 20px;">`;
            questions.forEach(q => {
                contentHtml += formatFn(q);
                questionNumber++;
            });
            contentHtml += `</ol>`;
        }
    };

    addSectionHtml("Multiple Choice Questions", paper.mcqs, (q: MCQ) => 
        `<li style="margin-bottom: 16px;">
            <p style="font-weight: 500; margin: 0 0 8px 0;">${q.question}</p>
            <ul style="list-style-type: none; padding-left: 10px; margin: 0;">
                ${q.options.map((opt, i) => `<li style="margin-bottom: 4px;">${String.fromCharCode(97 + i)}) ${opt}</li>`).join('')}
            </ul>
            ${showAnswers ? `<p style="${answerStyle}">Answer: ${q.answer}</p>` : ''}
        </li>`
    );
     addSectionHtml("Short Answer Questions", paper.shortAnswer, (q: TextQuestion) => 
        `<li style="margin-bottom: 16px;">
            <p style="font-weight: 500; margin: 0 0 8px 0;">${q.question}</p>
            ${showAnswers ? `<p style="${answerStyle}">Answer: ${q.answer}</p>` : ''}
        </li>`
    );
     addSectionHtml("Long Answer Questions", paper.longAnswer, (q: TextQuestion) => 
        `<li style="margin-bottom: 16px;">
            <p style="font-weight: 500; margin: 0 0 8px 0;">${q.question}</p>
            ${showAnswers ? `<p style="${answerStyle}">Answer: ${q.answer}</p>` : ''}
        </li>`
    );
     addSectionHtml("Fill in the Blanks", paper.fillInTheBlanks, (q: TextQuestion) => 
        `<li style="margin-bottom: 16px;">
            <p style="font-weight: 500; margin: 0 0 8px 0;">${q.question}</p>
            ${showAnswers ? `<p style="${answerStyle}">Answer: ${q.answer}</p>` : ''}
        </li>`
    );
     addSectionHtml("True/False", paper.trueFalse, (q: TrueFalseQuestion) => 
        `<li style="margin-bottom: 16px;">
            <p style="font-weight: 500; margin: 0 0 8px 0;">${q.question}</p>
            ${showAnswers ? `<p style="${answerStyle}">Answer: ${String(q.answer)}</p>` : ''}
        </li>`
    );

    const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Question Paper</title></head><body style="font-family: Arial, sans-serif; font-size: 14px; margin: 40px;">${contentHtml}</body></html>`;
    const blob = new Blob([fullHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Question_Paper_${config.subject.replace(' ', '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  }, [paper, config, showAnswers]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 no-print flex justify-between items-center bg-slate-50 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-800">Paper Preview</h3>
        <div className="flex items-center space-x-2">
          <label htmlFor="show-answers" className="flex items-center text-sm cursor-pointer p-2 rounded-md hover:bg-slate-200 transition-colors">
            <input type="checkbox" id="show-answers" className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" checked={showAnswers} onChange={() => setShowAnswers(!showAnswers)} />
            <span className="ml-2 text-gray-700 font-medium">Show Answers</span>
          </label>
           <button onClick={handleCopyToClipboard} title="Copy as Text" className="flex items-center p-2 border border-slate-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
            <CopyIcon /> <span className="ml-2 hidden sm:inline">{copyStatus === 'idle' ? 'Copy' : 'Copied!'}</span>
          </button>
           <button onClick={handleDownloadDocx} title="Download as DOCX" className="flex items-center p-2 border border-slate-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
            <DownloadIcon /> <span className="ml-2 hidden sm:inline">DOCX</span>
          </button>
          <button onClick={handlePrint} title="Print or Save as PDF" className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            <PrintIcon /> <span className="ml-2 hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>
      
      <div id="paper-content" className="p-8 prose prose-slate max-w-none">
        <header className="text-center mb-8 not-prose">
          <h1 className="text-2xl font-bold text-slate-800">{config.institutionName}</h1>
        </header>
        <div className="flex justify-between border-y border-slate-200 py-2 mb-6 text-sm not-prose">
          <p><strong>Standard:</strong> {config.standard}</p>
          <p><strong>Subject:</strong> {config.subject}</p>
          <p><strong>Total Marks:</strong> {config.totalMarks}</p>
          {config.examDate && <p><strong>Date:</strong> {config.examDate}</p>}
        </div>

        {paper.mcqs && paper.mcqs.length > 0 && (
          <section>
            <h4 className="font-bold text-lg mb-4">Multiple Choice Questions</h4>
            <ol className="list-decimal pl-5 space-y-4">
            {paper.mcqs.map((q, index) => (
                <li key={index} className="pl-2">
                  <p className="font-medium">{q.question}</p>
                  <ul className="list-none pl-2 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {q.options.map((opt, i) => <li key={i}>{String.fromCharCode(97 + i)}) {opt}</li>)}
                  </ul>
                  {showAnswers && <p className="text-sm text-emerald-700 font-semibold mt-2 not-prose bg-emerald-50 p-2 rounded inline-block">Answer: {q.answer}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}
        
        {paper.shortAnswer && paper.shortAnswer.length > 0 && (
          <section className="mt-6">
            <h4 className="font-bold text-lg mb-4">Short Answer Questions</h4>
            <ol start={(paper.mcqs?.length || 0) + 1} className="list-decimal pl-5 space-y-4">
              {paper.shortAnswer.map((q, index) => (
                <li key={index} className="pl-2">
                  <p className="font-medium">{q.question}</p>
                  {showAnswers && <p className="text-sm text-emerald-700 font-semibold mt-2 not-prose bg-emerald-50 p-2 rounded inline-block">Answer: {q.answer}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}
        
        {paper.longAnswer && paper.longAnswer.length > 0 && (
          <section className="mt-6">
            <h4 className="font-bold text-lg mb-4">Long Answer Questions</h4>
            <ol start={(paper.mcqs?.length || 0) + (paper.shortAnswer?.length || 0) + 1} className="list-decimal pl-5 space-y-4">
              {paper.longAnswer.map((q, index) => (
                <li key={index} className="pl-2">
                  <p className="font-medium">{q.question}</p>
                  {showAnswers && <p className="text-sm text-emerald-700 font-semibold mt-2 not-prose bg-emerald-50 p-2 rounded inline-block">Answer: {q.answer}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {paper.fillInTheBlanks && paper.fillInTheBlanks.length > 0 && (
            <section className="mt-6">
                <h4 className="font-bold text-lg mb-4">Fill in the Blanks</h4>
                 <ol start={(paper.mcqs?.length || 0) + (paper.shortAnswer?.length || 0) + (paper.longAnswer?.length || 0) + 1} className="list-decimal pl-5 space-y-4">
                    {paper.fillInTheBlanks.map((q, index) => (
                        <li key={index} className="pl-2">
                            <p className="font-medium">{q.question}</p>
                            {showAnswers && <p className="text-sm text-emerald-700 font-semibold mt-2 not-prose bg-emerald-50 p-2 rounded inline-block">Answer: {q.answer}</p>}
                        </li>
                    ))}
                </ol>
            </section>
        )}

        {paper.trueFalse && paper.trueFalse.length > 0 && (
            <section className="mt-6">
                <h4 className="font-bold text-lg mb-4">True or False</h4>
                 <ol start={(paper.mcqs?.length || 0) + (paper.shortAnswer?.length || 0) + (paper.longAnswer?.length || 0) + (paper.fillInTheBlanks?.length || 0) + 1} className="list-decimal pl-5 space-y-4">
                    {paper.trueFalse.map((q, index) => (
                        <li key={index} className="pl-2">
                            <p className="font-medium">{q.question}</p>
                            {showAnswers && <p className="text-sm text-emerald-700 font-semibold mt-2 not-prose bg-emerald-50 p-2 rounded inline-block">Answer: {String(q.answer)}</p>}
                        </li>
                    ))}
                </ol>
            </section>
        )}
      </div>
    </div>
  );
};

export default PaperPreview;