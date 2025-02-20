import { LoadingPage } from "@/components/utilities/LoadingAnimation";
import animationData from '@/assets/animations/nexanime.json';

// const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Loading() {
  return <LoadingPage animationData={animationData} />;
}