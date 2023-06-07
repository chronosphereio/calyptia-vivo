export const destructureSrcFromLogo = (logo: string | ({ src: string } & Record<string, unknown>)) => {
    return typeof logo == 'string' ? logo : logo.src;
};