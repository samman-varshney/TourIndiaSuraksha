import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './header';
import PageLayout from './PageLayout';

/** Full application shell — renders sidebar on the left, header + content on the right */
const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-layout-body">
        <Header />
        <PageLayout>
          {/* Child route element is rendered here via React Router Outlet */}
          <Outlet />
        </PageLayout>
      </div>
    </div>
  );
};

export default MainLayout;
