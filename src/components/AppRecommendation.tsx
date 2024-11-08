import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopGrossingApps } from "../store/appSlice";
import { RootState } from "../store/store";
import { Spin } from "antd";
import { AppDispatch } from "../store/store";

interface AppRecommendationProps {
  searchQuery: string;
}

const AppRecommendation: React.FC<AppRecommendationProps> = ({
  searchQuery,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { topGrossingApps, isLoading } = useSelector(
    (state: RootState) => state.apps
  );

  useEffect(() => {
    dispatch(fetchTopGrossingApps());
  }, [dispatch]);

  const filteredApps = searchQuery
    ? topGrossingApps.filter((app: any) => {
        const name = app["im:name"].label.toLowerCase();
        const summary = app.summary.label.toLowerCase();
        const title = app.title.label.toLowerCase();
        return (
          name.includes(searchQuery) ||
          summary.includes(searchQuery) ||
          title.includes(searchQuery)
        );
      })
    : topGrossingApps;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-left">推薦應用</h2>
      <div className="flex overflow-x-auto space-x-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48 w-full">
            <Spin size="large" />
          </div>
        ) : (
          filteredApps.map((app: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 p-2 flex flex-col items-center"
            >
              <img
                src={app["im:image"][2].label}
                alt={app["im:name"].label}
                className="w-20 h-20 object-cover rounded-lg mb-4"
              />
              <div className="w-full">
                <h3 className="text-sm font-semibold break-words">
                  {app["im:name"].label}
                </h3>
                <p className="text-sm text-gray-500">
                  {app.category.attributes.label}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppRecommendation;
