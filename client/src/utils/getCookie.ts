export const getCookie = (name: string, isParse?: boolean) => {
    const cookie = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`)

    if (cookie) {
        if (isParse) {
            return JSON.parse(decodeURIComponent(cookie[1]))
        }

        return cookie[1]
    }
}
