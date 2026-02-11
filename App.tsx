
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.tsx';
import QuestionPage from './components/QuestionPage.tsx';
import SurprisePage from './components/SurprisePage.tsx';
import { AppStep } from './types.ts';
import { inject } from '@vercel/analytics';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');

  useEffect(() => {
    // Initialize Vercel Analytics safely
    inject();
  }, []);

  const handleEnter = () => {
    setStep('question');
  };

  const handleYes = () => {
    setStep('surprise');
  };

  return (
    <div className="min-h-screen">
      {step === 'landing' && <LandingPage onEnter={handleEnter} />}
      {step === 'question' && <QuestionPage onYes={handleYes} />}
      {step === 'surprise' && <SurprisePage />}
    </div>
  );
};

export default App;
