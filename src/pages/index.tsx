import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { GetServerSideProps } from "next";

interface Props {
  apiKey: string;
}

export default function Home({ apiKey }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      zoom={10}
      center={{lat: 44, lng: -80}}
      mapContainerClassName='map-container'
    >
    </GoogleMap>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const { apiKey } = await res.json();

  return {
    props: {
      apiKey,
    },
  };
}