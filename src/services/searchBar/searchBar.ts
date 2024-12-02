
export function SearchBarFilter<T>(list: T[], search: string, keys: (keyof T)[]): T[] {
    const lowercasedSearch = search.toLowerCase();

    return list.filter((item) =>
        keys.some((key) => {
            const value = item[key];
            if (value && typeof value === "string") {
                return value.toLowerCase().includes(lowercasedSearch);
            }
            return false;
        })
    );
}