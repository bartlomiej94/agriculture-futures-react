import { client, q } from "./db";

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

export const registerUser = (email: string, password: string) => client
    .query(
        q.Create(q.Collection("credentials"), {
            data: {
                email,
                password,
            }
        })
    )
    .then(res => res['ref'].value.id)
    .catch(error => console.error("API Error: ", error.message));