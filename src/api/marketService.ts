import { client, q } from "./db";

export const getAllIndexesOrAssets = async (dateRange?: number, isIndex?: boolean) => {
    let indexes, mapped;

    // DEMO ONLY. So that we don't have to mock 50+ futures.
    if (dateRange > 2) dateRange = 2;

    const categories = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection(isIndex ? "indexes" : "assets"))),
            q.Lambda("X", q.Get(q.Var("X")))
        )
    ).then(res => {
        indexes = res["data"].map((item) => item.data);
        for (let i = 0; i < indexes.length; i++) indexes[i]["id"] = res["data"][i].ref.id;
        return indexes.map(idx => idx.category.value.id);
    });

    await client.query(
        q.Map(
            categories,
            q.Lambda("x", q.Get(q.Ref(q.Collection("categories"), q.Var("x"))))
        )
    ).then(r => {
        const idPrefix = isIndex ? "indexes_" : "assets_"
        mapped = indexes.map((idx, i) => (
            {
                id: idPrefix + idx.id,
                name: idx.name,
                icon: idx.icon,
                price: idx.data[dateRange].price,
                change: idx.data[dateRange].change,
                volume: idx.data[dateRange].volume,
                type: idx.type,
                category: r[i].data.name
            }
        ));
    });

    return mapped;
};

export const getMarketObjectById = async (collection: string, id: string) => {
    const data = await client.query(
        q.Get(q.Ref(q.Collection(collection), id))
    ).then(res => res["data"]);

    const category = await client.query(
        q.Get(q.Ref(q.Collection("categories"), data.category.value.id))
    ).then(res => res["data"].name)

    data["categoryName"] = category;

    return data;
};