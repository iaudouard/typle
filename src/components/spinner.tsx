import Lottie from "react-lottie";
import animationData from "~/lotties/loading.json";

export default function Spinner() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <Lottie options={defaultOptions} height={50} width={50} />
    </div>
  );
}
