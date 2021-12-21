import { client, q } from "./db";

export const getUsers = client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_customers"))))
    .then(response => {
        console.log("res:", response);
    })
    .catch(error => console.error("API Error: ", error.message));