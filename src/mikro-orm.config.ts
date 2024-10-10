import { defineConfig } from '@mikro-orm/sqlite';

export default defineConfig({
    debug: true, // Should log
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'ash-todo-app.sqlite',
  // this is inferred as you import `defineConfig` from sqlite package
  // driver: SqliteDriver,
});

// { // Configuration options here - https://mikro-orm.io/docs/configuration
//     entities: ['./dist/entities'],
//     entitiesTs: ['./src/entities'], // TODO - how can we eventually split entities by module? Can we seperate DB obj by module too?
//     dbName: 'my-db-name.sqlite3', // TODO - move out of here. Add to config.
//     driver: SqliteDriver,
//   }