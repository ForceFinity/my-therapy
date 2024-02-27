export { Header } from "./templates/header"
export { Button } from "./molecules/button"
export { Input } from "./atoms/input"
export { Title } from "./molecules/title"
export { Wrapper } from "./atoms/wrapper"
export { TrueButton } from "./atoms/trueButton"

export const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobile: `(min-width: ${size.mobileS}) and (max-width: ${size.mobileL})`,
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  };
