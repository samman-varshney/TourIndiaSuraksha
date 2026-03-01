import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

/** Wraps page content in a consistent scrollable padded container */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="page-layout">
      {children}
    </main>
  );
};

export default PageLayout;
