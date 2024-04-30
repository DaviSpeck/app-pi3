export function formatMoneyValue(value: number): string {
    
    let formatted_value = value.toString().replace('.', ',');

    const parts = formatted_value.split(',');

    if (parts.length === 1) {
        formatted_value += ',00';
    } else {
        parts[1] = parts[1].padEnd(2, '0').slice(0, 2);
        formatted_value = parts.join(',');
    }

    return 'R$ '+formatted_value;
}
