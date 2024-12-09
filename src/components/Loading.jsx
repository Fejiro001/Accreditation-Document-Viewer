import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full mt-10">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#12355B"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loading;
