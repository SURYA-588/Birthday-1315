
import React, { useState } from 'react';
import LandingPage from './components/LandingPage.tsx';
import QuestionPage from './components/QuestionPage.tsx';
import SurprisePage from './components/SurprisePage.tsx';
import { AppStep } from './types.ts';
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');

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
      <Analytics />
    </div>
  );
};

export default App;
