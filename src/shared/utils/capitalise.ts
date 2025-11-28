export const capitalise = (str: string) => {
    if (str.trim().length === 0) return
    return str.charAt(0).toUpperCase() + str.slice(1)
}