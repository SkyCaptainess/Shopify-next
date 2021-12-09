import React from 'react';

interface AnnouncementBarProps {
  children: React.ReactNode;
}

const AnnouncementBar = ({ children }: AnnouncementBarProps) => {
  return (
    <div className="py-2 bg-primary">
      <div className="container mx-auto ">{children}</div>
    </div>
  );
};

export default AnnouncementBar;
