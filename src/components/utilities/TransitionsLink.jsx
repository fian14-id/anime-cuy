"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const TransitionsLink = ({ children, href, ...props }) => {
    const router = useRouter()
    const handleLink = () => {
        router.back()
    }
  return (
    <Link href={href} {...props} onClick={href === "back" ? handleLink : undefined}>{children}</Link>
  )
}

export default TransitionsLink