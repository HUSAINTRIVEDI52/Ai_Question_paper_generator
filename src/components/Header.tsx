import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm no-print">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center space-x-4">
        <LogoIcon />
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            AI Question Paper Generator
          </h1>
          <p className="text-sm text-gray-500">Powered by Gemini</p>
        </div>
      </div>
    </header>
  );
};

export default Header;