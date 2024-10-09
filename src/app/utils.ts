export function formatDatetimeLocalDate(date: Date | undefined) {
    if (!date) {
        return undefined
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Construct the ISO-like string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}