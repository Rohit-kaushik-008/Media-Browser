export function filterStatus(data, status) {

    if (!status) return [];

    return data.filter(
        item => item.status === status
    );
}