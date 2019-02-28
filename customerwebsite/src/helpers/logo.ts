const CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`;

export const getLogo = (): string => {
    switch (CLIENT_ID){
        case "23": return "/images/Logo.png";
        case "447": return "/images/LogoUniWales.png";
        default: return "/images/Logo.png";
    }   
};