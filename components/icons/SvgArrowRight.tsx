import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export default function SvgArrowRight(props: SvgProps) {
    return (
        <Svg
            width={17}
            height={13}
            fill="none"
            {...props}
        >
            <Path
                fill="#000"
                d="m16.384 5.464-.001-.001-5.04-5.015a.965.965 0 0 0-1.36 1.367l3.383 3.367H.965a.964.964 0 1 0 0 1.93h12.401l-3.384 3.366a.964.964 0 1 0 1.361 1.368l5.04-5.016a.965.965 0 0 0 0-1.366Z"
            />
        </Svg>
    )
}