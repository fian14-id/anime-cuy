'use client'
import { useHydration } from "@/app/hooks/useHydration";
import { Suspense } from "react";

const Time = ({date}) => {
    const hydrated = useHydration()
    return (
        <Suspense fallback={<p>Loading time...</p>} key={hydrated ? 'local' : 'utc'}>
            <time dateTime={new Date(date).toISOString()}>
                {new Date(date).toLocaleDateString("en-GB")}
                {hydrated ? '' : '(UTC)'}
            </time>
        </Suspense>
    )
}

export default Time