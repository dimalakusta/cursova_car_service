const TableName = {
  USERS: 'users',
  IMAGES: 'images',
  WORKSHOPS: 'workshops',
  ORDERS: 'orders',
  CARS: 'cars',
  SERVICES: 'services',
  ORDERS_TO_SERVICES: 'orders_to_services',
  WORKSHOPS_TO_SERVICES: 'workshops_to_services',
  SERVICE_PROVIDERS: 'service_providers'
};

const ColumnName = {
  CREATED_AT: 'created_at',
  NAME: 'name',
  DESCRIPTION: 'description',
  ADDRESS: 'address',
  WEBSITE: 'website',
  PHONE_NUMBER: 'phoneNumber',
  ADMIN_ID: 'adminId',
  IMAGE_ID: 'imageId',
  WORKSHOP_ID: 'workshopId',
  USER_ID: 'userId',
  EMAIL: 'email',
  ID: 'id',
  LINK: 'link',
  TITLE: 'title',
  PRICE: 'price',
  BRAND: 'brand',
  MODEL: 'model',
  NOTE_BY_PROVIDER: 'note_by_provider',
  YEAR_OF_PRODUCTION: 'yearOfProduction',
  LICENSE_PLATE_NUMBER: 'licensePlateNumber',
  VISIT_DATE: 'visitDate',
  STATUS: 'status',
  PASSWORD: 'password',
  FULL_NAME: 'full_name',
  UPDATED_AT: 'updated_at',
  USERNAME: 'username',
  ROLE: 'role',
  ORDER_ID: 'order_id',
  SERVICE_ID: 'service_id'
};

export async function up(knex) {
  await knex.schema.createTable(TableName.USERS, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.EMAIL).notNullable().unique();
    table.string(ColumnName.USERNAME).notNullable().unique();
    table.string(ColumnName.PASSWORD).notNullable();
    table.string(ColumnName.FULL_NAME);
    table.string(ColumnName.PHONE_NUMBER);
    table.string(ColumnName.ROLE).notNullable().default('User');
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.WORKSHOPS, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).notNullable().unique();
    table.text(ColumnName.DESCRIPTION).notNullable();
    table.string(ColumnName.ADDRESS).notNullable().unique();
    table.string(ColumnName.WEBSITE).notNullable().unique();
    table.string(ColumnName.PHONE_NUMBER).notNullable().unique();
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.IMAGES, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.LINK).notNullable();
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.ORDERS, table => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.DESCRIPTION).notNullable();
    table.string(ColumnName.MODEL).notNullable();
    table.string(ColumnName.NOTE_BY_PROVIDER);
    table.integer(ColumnName.YEAR_OF_PRODUCTION).notNullable();
    table.string(ColumnName.LICENSE_PLATE_NUMBER).notNullable();
    table.dateTime(ColumnName.VISIT_DATE).notNullable();
    table.string(ColumnName.STATUS).notNullable().default('Requested');
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.CARS, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.BRAND).notNullable().unique();
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.ORDERS_TO_SERVICES, table => {
    table.increments(ColumnName.ID).primary();
    table.integer(ColumnName.ORDER_ID).notNullable();
    table.integer(ColumnName.SERVICE_ID).notNullable();
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.SERVICE_PROVIDERS, table => {
    table.increments(ColumnName.ID).primary();
    table.integer(ColumnName.WORKSHOP_ID).notNullable();
    table.integer(ColumnName.USER_ID).notNullable().unique();
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.WORKSHOPS_TO_SERVICES, table => {
    table.increments(ColumnName.ID).primary();
    table.integer(ColumnName.WORKSHOP_ID).notNullable();
    table.integer(ColumnName.SERVICE_ID).notNullable();
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.SERVICES, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.TITLE).notNullable();
    table.integer(ColumnName.PRICE).notNullable();
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists(TableName.USERS);
  await knex.schema.dropTableIfExists(TableName.WORKSHOPS);
  await knex.schema.dropTableIfExists(TableName.IMAGES);
  await knex.schema.dropTableIfExists(TableName.ORDERS);
  await knex.schema.dropTableIfExists(TableName.CARS);
  await knex.schema.dropTableIfExists(TableName.SERVICES);
  await knex.schema.dropTableIfExists(TableName.ORDERS_TO_SERVICES);
  await knex.schema.dropTableIfExists(TableName.WORKSHOPS_TO_SERVICES);
}
