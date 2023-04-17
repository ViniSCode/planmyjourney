import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DynamicMap = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export function MapDynamic({ apiKey }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <DynamicMap apiKey={apiKey} />;
}

export default MapDynamic;
