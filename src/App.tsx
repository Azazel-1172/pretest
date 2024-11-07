import React, { useState } from "react";
import AppList from "./components/AppList";
import AppRecommendation from "./components/AppRecommendation";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full  lg:w-1/2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <AppRecommendation searchQuery={searchQuery} />
          <AppList searchQuery={searchQuery} />
        </div>
      </div>
    </>
  );
};

export default App;
