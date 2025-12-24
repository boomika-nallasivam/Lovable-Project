import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TimeWasterProvider } from "@/contexts/TimeWasterContext";
import Page1WhyAreYouHere from "./pages/Page1WhyAreYouHere";
import Page2TimeWasting from "./pages/Page2TimeWasting";
import Page3PointlessActions from "./pages/Page3PointlessActions";
import Page4PickACard from "./pages/Page4PickACard";
import Page5FinalReport from "./pages/Page5FinalReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TimeWasterProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page1WhyAreYouHere />} />
            <Route path="/time-wasting" element={<Page2TimeWasting />} />
            <Route path="/pointless-actions" element={<Page3PointlessActions />} />
            <Route path="/pick-a-card" element={<Page4PickACard />} />
            <Route path="/final-report" element={<Page5FinalReport />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TimeWasterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
