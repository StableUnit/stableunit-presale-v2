import React from "react";
import cn from "classnames";

import "./styles.scss";

interface GradientBorderProps {
    className?: string;
    borderRadius?: number;
    children?: React.ReactNode;
}

export const GradientBorder = React.forwardRef<HTMLDivElement, GradientBorderProps>(
    ({ className, children, borderRadius, ...props }, ref) => {
        const childrenWithProps = React.Children.map(children, (child) => {
            // Checking isValidElement is the safe way and avoids a TS error too.
            if (React.isValidElement(child)) {
                const newBorderRadius = borderRadius ? borderRadius - 1 : 0;
                return React.cloneElement(child, {
                    ...child.props,
                    style: { ...child.props.style, borderRadius: newBorderRadius },
                });
            }

            return child;
        });

        return (
            <div className={cn("gradient-border", className)} style={{ borderRadius }} {...props} ref={ref}>
                {childrenWithProps}
            </div>
        );
    }
);
