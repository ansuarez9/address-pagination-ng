export interface Address {
    "id": number | null;
    "nickname": string;
    "fullName": string;
    "address1": string;
    "address2"?: string;
    "city": string;
    "state": string;
    "zip": string;
    "selected": boolean;
}