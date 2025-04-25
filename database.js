import * as SQLite from "expo-sqlite";

// const db = async () => await SQLite.openDatabaseAsync("little-lemon");
const db = SQLite.openDatabaseSync('little_lemon');

export async function createTable() {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS menuitems (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              category TEXT,
              image TEXT,
              name TEXT NOT NULL,
              description TEXT,
              price REAL
            );
        `);
        // console.log('menuitems table created');
    } catch (error) {
        console.log("createTable",error);
    }
}

export async function getMenuItems() {
    try {
        const allRows = await db.getAllAsync("select * from menuitems");
        return allRows;
    } catch (error) {
        console.log("getMenuItems",error);
        return [];
    }
}

export function saveMenuItems(menuItems) {
    menuItems.map(async (item, index) => {
        try {
            const result = await db.runAsync('INSERT INTO menuitems (category, image, name, description, price) VALUES (?, ?, ?, ?, ?)', item.category, item.image, item.name, item.description, item.price);
            // console.log("data inserted",result.lastInsertRowId,result.changes);
        } catch (error) {
            console.log("saveMenuItems",error);
        }
    })
}

export async function filterByQueryAndCategories(query,activeCategories) {
    const placeholders = activeCategories.map(() => "?").join(", "); // Generates "?, ?, ?"
    const params = [`%${query}%`, ...activeCategories];
    // const params = [...activeCategories];
    // console.log("placeholders",placeholders);
    // console.log("params",params);
    try {
        const allRows = await db.getAllAsync(`select * from menuitems where name like ? and category IN (${placeholders})`,params);
        return allRows;
    } catch (error) {
        console.log("error",error);
        return [];
    }
}
