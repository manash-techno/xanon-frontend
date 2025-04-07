import {Suspense, lazy, ComponentType, JSX} from "react";
import PageLoader from "@/components/PageLoader.tsx";

export const lazyLoader = <P extends object>(
    importFn: () => Promise<{ default: React.ComponentType<P> }>,
    wrapper?: (Comp) => (props: unknown) => JSX.Element
) => {
    const Component = lazy(importFn);
    const Wrapped = wrapper ? (wrapper(Component) as ComponentType<P>) : Component;

    return (
        <Suspense fallback={<PageLoader />}>
            <Wrapped />
        </Suspense>
    );
};
