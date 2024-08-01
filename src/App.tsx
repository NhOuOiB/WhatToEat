import { useState } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function App() {
  return (
    <>
      <Button variant="ghost" className="">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Click me
      </Button>
    </>
  );
}

export default App;
