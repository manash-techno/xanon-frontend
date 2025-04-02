import { Suspense, lazy, ComponentType } from "react";
import PageLoader from "@/components/PageLoader.tsx";

// HOC for lazy loading with a fallback loader
export const lazyLoader = <P extends object>(
    importFn: () => Promise<{ default: ComponentType<P> }>
) => {
    const Component = lazy(importFn);
    return (
        <Suspense fallback={<PageLoader />}>
            <Component />
        </Suspense>
    );
};
