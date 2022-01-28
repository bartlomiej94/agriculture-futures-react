export type Address = {
    street: string
    house_number: string
    city: string
    postcode: string
    country: string
};

export type UserCredentials = {
    email: string
    password: string
};

export type UserDetails = {
    id: string
    salutation: string
    first_name: string
    last_name: string
    birthdate: string
    nationality: string
    address: Address
    is_seller: boolean
};