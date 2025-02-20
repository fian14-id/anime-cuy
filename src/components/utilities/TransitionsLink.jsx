'use client';
import dynamic from "next/dynamic";
import Link from "next/link";
import animationData from '@/assets/animations/nexanime.json';
import { useRouter } from "next/navigation";

const Preloader = dynamic(
    () => import('@/components/utilities/LoadingAnimation').then(mod => mod.Preloader),
    { ssr: false }
  );

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
} 
const TransitionsLink = ({ children, href, ...props }) => {
    const router = useRouter()
    const handleLink = async(e) => {
        e.preventDefault();
        // const body = document.querySelector('body')
        // await sleep(500)
        // body?.classList.add("page-transition")
        router.push(href, { scroll: false })
        // await sleep(500)
        // body?.classList.remove("page-transition")
    }
  return (
    <Link href={href} {...props} onClick={handleLink}>{children}</Link>
  )
}

export default TransitionsLink