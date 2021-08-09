export const clx = (...args: any[]) => args.filter(arg => !!arg).join(" ");

export const formatDate = (date: string, locale: string) => {
    return new Date(date).toLocaleDateString(locale, { day: 'numeric', year: 'numeric', month: 'short' });
}