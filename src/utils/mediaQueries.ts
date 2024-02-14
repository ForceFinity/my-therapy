import { useMediaQuery } from "react-responsive"

export const useMedia = () => {
    return {
        isMobile: useMediaQuery({ query: '(max-width: 480px)' }),
        isLaptop: useMediaQuery({ query: '(min-width: 1024px)' }),
        isLarge: useMediaQuery({query: '(min-width: 1440px)'})
    }
}