export function getFirstAndLastName(fullName: string) {
    if (!fullName) return '';

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    return `${firstName} ${lastName}`;
}


export function getInitials(fullName: string) {
    if (!fullName) return '';

    const nameParts = fullName.trim().split(/\s+/);
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';

    return `${firstInitial}${lastInitial}`;
}