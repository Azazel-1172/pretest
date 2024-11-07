import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopFreeApps } from "../store/appSlice";
import { RootState } from "../store/store";
import { Avatar, Card, Pagination, Spin } from "antd";

interface AppListProps {
  searchQuery: string;
}

const AppList: React.FC<AppListProps> = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { topFreeApps, isLoading } = useSelector(
    (state: RootState) => state.apps
  );
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTopFreeApps());
  }, [dispatch]);

  const filteredApps = topFreeApps.filter((app: any) => {
    const name = app["im:name"].label.toLowerCase();
    const summary = app.summary.label.toLowerCase();
    const title = app.title.label.toLowerCase();
    return (
      name.includes(searchQuery) ||
      summary.includes(searchQuery) ||
      title.includes(searchQuery)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApps = filteredApps.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-left">應用列表</h2>
      <div className="flex flex-col items-center flex-wrap gap-4 justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-48 w-full">
            <Spin size="large" />
          </div>
        ) : (
          currentApps.map((app: any, index: number) => {
            const globalIndex = startIndex + index + 1;
            return (
              <Card className="w-full truncate" key={globalIndex}>
                <div className="flex items-center">
                  <p className="text-base mr-4">{globalIndex}</p>
                  <Avatar
                    src={app["im:image"][2].label}
                    alt={app["im:name"].label}
                    className="mr-2"
                  />
                  <Card.Meta
                    title={
                      <span className="block text-base font-medium overflow-hidden whitespace-nowrap truncate">
                        {app["im:name"].label}
                      </span>
                    }
                    description={<p>{app.category.attributes.label}</p>}
                  />
                </div>
              </Card>
            );
          })
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredApps.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AppList;
