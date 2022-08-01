export const mockLocalStorage = ((store) => {

    return {
        clear() {
            store = {};
        },

        getItem(key) {
            return store[key] || null;
        },

        setItem(key, value) {
            store[key] = value.toString();
        },

        removeItem(key) {
            delete store[key];
        },

        get length() {
            return Object.keys(store).length;
        },

        key(i) {
            const keys = Object.keys(store);
            return keys[i] || null;
        },
    };
});