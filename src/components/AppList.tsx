import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopFreeApps } from "../store/appSlice";
import { RootState } from "../store/store";
import { Avatar, Card, Pagination } from "antd";

const AppList: React.FC = () => {
  const dispatch = useDispatch();
  const { topFreeApps, isLoading } = useSelector(
    (state: RootState) => state.apps
  );
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTopFreeApps());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 計算當前頁要顯示的應用
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApps = topFreeApps.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Top Free Applications
      </h2>
      <div className="flex flex-col items-center flex-wrap gap-4 justify-center">
        {currentApps.map((app: any, index: number) => {
          const globalIndex = startIndex + index + 1;

          return (
            <Card
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4  truncate "
              loading={isLoading}
              key={globalIndex}
            >
              <div className="flex items-center">
                <p className="text-base mr-4">{globalIndex}</p>
                <Avatar
                  src={app["im:image"][2].label}
                  alt={app["im:name"].label}
                  className="mr-4"
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
        })}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={topFreeApps.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AppList;
