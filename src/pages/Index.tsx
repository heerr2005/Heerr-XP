import { useState } from "react";
import { BootScreen } from "@/components/BootScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { Desktop } from "@/components/Desktop";

const Index = () => {
  const [stage, setStage] = useState<'boot' | 'login' | 'desktop'>('boot');

  const handleShutdown = () => {
    setStage('login');
  };

  return (
    <>
      {stage === 'boot' && (
        <BootScreen onBootComplete={() => setStage('login')} />
      )}
      {stage === 'login' && (
        <LoginScreen onLogin={() => setStage('desktop')} />
      )}
      {stage === 'desktop' && (
        <Desktop onShutdown={handleShutdown} />
      )}
    </>
  );
};

export default Index;
