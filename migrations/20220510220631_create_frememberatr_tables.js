exports.up = function(knex) {
    return knex.schema
    .createTable('profiles', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('about').notNullable();
        table.string('profilePicture').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('user_likes', (table) => {
        table.increments('id').notNullable().primary();
        table.string('likes').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("profiles")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('user_dislikes', (table) => {
        table.increments('id').notNullable().primary();
        table.string('dislikes').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("profiles")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('user_friends', (table) => {
        table.increments('id').notNullable().primary();
        table.string('friends').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("profiles")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('user_friend_requests', (table) => {
        table.increments('id').notNullable().primary();
        table.string('friend_requests').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table    
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("profiles")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("user_likes")
    .dropTable("user_dislikes")
    .dropTable("user_friends")
    .dropTable("user_friend_requests")
    .dropTable("profiles")
};
