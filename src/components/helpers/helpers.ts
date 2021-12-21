export const scrollTo = (to: number) => {
    window.scrollTo({
        top: to,
        behavior: "smooth"
    });
};