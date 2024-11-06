import React from "react";
import AppList from "./components/AppList";
import AppRecommendation from "./components/AppRecommendation";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
        <AppRecommendation />
        <AppList />
      </div>
    </div>
  );
};

export default App;
