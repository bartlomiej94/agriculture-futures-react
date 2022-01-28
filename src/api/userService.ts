import { client, q } from "./db";
import { UserCredentials, UserDetails } from "../types/api";

export const getAllCredentials = () => client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_credentials"))))
    .then(res => {

    })
    .catch(error => console.error("API Error: ", error.message));

export const getCredentialsIdByEmail = (email: string) => client
    .query(q.Paginate(q.Match(q.Index("credentials_by_email"), email)))
    .then(res => {
        return res['data'].map(r => r.value.id)[0] || null;
    })
    .catch(error => console.error("API Error: ", error.message));

export const registerUser = (data: UserCredentials) => client
    .query(
        q.Create(q.Collection("credentials"), {
            data: {
                email: data.email,
                password: data.password,
            }
        })
    )
    .then(res => res['ref'].value.id)
    .catch(error => console.error("API Error: ", error.message));

export const createUserInstance = (data: UserDetails) => client
    .query(
        q.Create(q.Collection("users"), {
            data: {
                id: data.id,
                salutation: data.salutation,
                first_name: data.first_name,
                last_name: data.last_name,
                birthdate: data.birthdate,
                nationality: data.nationality,
                address: data.address,
                is_seller: data.is_seller,
            }
        })
    )
    .then(res => res['ref'].value.id)
    .catch(error => console.error("API Error: ", error.message));

export const getCredentialsByEmail = async (email: string) => {
    const id = await getCredentialsIdByEmail(email);

    if (!id) {
        return null;
    };

    return client.query(
        q.Get(q.Ref(q.Collection('credentials'), id))
    )
    .then((res) => res['data'])
    .catch((err) => console.error('Error: %s', err))
};