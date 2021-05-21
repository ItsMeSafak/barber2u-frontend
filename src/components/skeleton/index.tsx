import React from "react";

import { SkeletonProps, Skeleton as SkeletonAntD } from "antd";

/**
 * This component is used to render skeletons.
 *
 * @returns {JSX}
 */
const Skeleton: React.FC<SkeletonProps> = (props) => {
    const { loading, children } = props;

    return (
        <SkeletonAntD active loading={loading}>
            {!loading && children}
        </SkeletonAntD>
    );
};

export default Skeleton;
