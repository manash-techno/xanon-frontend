import { ComponentType, useEffect } from "react";

interface PageMetaOptions {
    title: string;
    description?: string;
}

export function withPageMeta<P>(
    Component: ComponentType<P>,
    meta: PageMetaOptions
): ComponentType<P> {
    const WrappedComponent = (props: P) => {
        useEffect(() => {
            document.title = meta.title;

            if (meta.description) {
                let tag = document.querySelector("meta[name='description']");
                if (!tag) {
                    tag = document.createElement("meta");
                    tag.setAttribute("name", "description");
                    document.head.appendChild(tag);
                }
                tag.setAttribute("content", meta.description);
            }
        }, []);

        return <Component {...props} />;
    };

    return WrappedComponent as ComponentType<P>;
}
