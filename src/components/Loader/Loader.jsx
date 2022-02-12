import { Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Oval
      ariaLabel="loading-indicator"
      height={80}
      width={80}
      strokeWidth={5}
      color="#303f9f"
      secondaryColor="cornflowerblue"
      wrapperClass="Loader"
    />
  );
}
