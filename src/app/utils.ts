export function formatDatetimeLocalDate(date: Date | number | undefined) {
    if (!date) {
        return undefined
    }

    if (typeof date === 'number') {
        return date
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    // Construct the ISO-like string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

export function currentDateNoSeconds() {
    const date = new Date()
    date.setSeconds(0,0)
    return date
}
