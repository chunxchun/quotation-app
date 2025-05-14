"use client";

import "./App.css";

import { Toaster } from "@/components/ui/sonner";
import { DailyTabs } from "./components/DailyTabs";

function App() {
  return (
    <>
      {/* <RequestQuotationForm /> */}
     
      <DailyTabs />
      <Toaster />

    </>
  );
}

export default App;
