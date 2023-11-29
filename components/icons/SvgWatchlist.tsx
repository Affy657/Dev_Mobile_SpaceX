import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const WATCHLIST_FILLED = 'M15 4.5V17.498C15 18.058 14.692 18.5659 14.196 18.8259C13.976 18.9409 13.738 18.999 13.499 18.999C13.2 18.999 12.902 18.909 12.645 18.731L7.78201 15.364C7.61201 15.245 7.38401 15.245 7.21301 15.364L2.354 18.731C1.894 19.05 1.30099 19.0849 0.803986 18.8259C0.307986 18.5659 0 18.057 0 17.498V4.5C0 2.019 2.019 0 4.5 0H10.5C13.5 0 15 1.49951 15 4.5Z'
const WATCHLIST_UNFILLED = 'M15 2.00098H9C6.243 2.00098 4 4.24398 4 7.00098V19.999C4 20.745 4.41099 21.424 5.07199 21.77C5.73199 22.116 6.52501 22.0669 7.13901 21.6429L11.998 18.276L16.862 21.6429C17.204 21.8789 17.601 21.999 18 21.999C18.317 21.999 18.636 21.923 18.929 21.77C19.59 21.423 20 20.745 20 19.999V7.00098C20 4.24398 17.757 2.00098 15 2.00098ZM18 19.999L13.137 16.632C12.796 16.397 12.397 16.278 11.998 16.278C11.599 16.278 11.2 16.396 10.859 16.632L6 19.999V7.00098C6 5.34698 7.346 4.00098 9 4.00098H15C16.654 4.00098 18 5.34698 18 7.00098V19.999Z'

interface SvgWatchlistProps {
  filled: boolean
}

export default function SvgWatchlist ({ filled }: Readonly<SvgWatchlistProps>): React.ReactNode {
  return (
        <Svg
            width={24}
            height={24}
            fill="white"
        >
            <Path
                fill="white"
                d={filled ? WATCHLIST_FILLED : WATCHLIST_UNFILLED}
            />
        </Svg>
  )
}
