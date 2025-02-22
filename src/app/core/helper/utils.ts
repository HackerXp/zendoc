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


export function getFileIcon(extension: string): string {
    const icons: Record<string, string> = {
        pdf: 'icon-pdf',
        doc: 'icon-word',
        docx: 'icon-word',
        xls: 'icon-xls',
        xlsx: 'icon-xls',
        ppt: 'icon-power-point',
        pptx: 'icon-power-point',
        jpg: 'icon-image-geral',
        jpeg: 'icon-image-geral',
        png: 'icon-image-geral',
        gif: 'icon-image-geral',
        svg: 'icon-image-geral',
    };

    // Remove o ponto e transforma em minúsculas
    const ext = extension.replace('.', '').toLowerCase();
    return icons[ext] || 'icon-geral';
}
