export interface Requirements {
    type: string;
    name: string;
}
export const requirements: Array<Requirements> = [
    {
        type: 'Lowercase',
        name: '1 Lowercase Character',
    },
    {
        type: 'Uppercase',
        name: '1 Uppercase Character',
    },
    {
        type: 'Number',
        name: '1 Number',
    },
    {
        type: 'Special',
        name: '1 Special Character',
    },
    {
        type: 'Length',
        name: '8 Characters Minimum',
    },
    {
        type: 'Match',
        name: 'Both Passwords Match',
    },
];