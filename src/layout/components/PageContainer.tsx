import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;            // Optional page title rendered above content
  subtitle?: string;
  actions?: React.ReactNode; // Optional header-level action buttons
}

/** Constrains page content width and renders an optional page heading row */
const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="page-container">
      {(title || actions) && (
        <div className="page-container-header">
          <div>
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="page-container-actions">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
