// components/OverlayLoader.tsx
import React from 'react';

interface OverlayLoaderProps {
  loading: boolean;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default OverlayLoader;
