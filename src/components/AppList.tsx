import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopFreeApps } from "../store/appSlice";
import { RootState } from "../store/store";
import { Avatar, Card, Spin, Pagination } from "antd";
import { AppDispatch } from "../store/store";

interface AppListProps {
  searchQuery: string;
}

const AppList: React.FC<AppListProps> = ({ searchQuery }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { topFreeApps, isLoading } = useSelector(
    (state: RootState) => state.apps
  );
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTopFreeApps());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            card.classList.add("animate-slideIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".app-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [topFreeApps, currentPage]);

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
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-left">應用列表</h2>
      <div className="flex flex-col items-center flex-wrap gap-4 justify-center">
        {isLoading && currentPage === 1 ? (
          <div className="flex justify-center items-center h-48 w-full">
            <Spin size="large" />
          </div>
        ) : (
          currentApps.map((app: any, index: number) => {
            const globalIndex = startIndex + index + 1;
            return (
              <Card className="app-card w-full truncate" key={globalIndex}>
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
      <div ref={loaderRef} className="h-10 flex justify-center items-center">
        {isLoading && filteredApps.length > itemsPerPage && (
          <Spin size="small" />
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
