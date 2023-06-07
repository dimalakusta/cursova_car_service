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
  ID: 'id',
  IMAGE_ID: 'image_id',
  WORKSHOP_ID: 'workshop_id',
  ADMIN_ID: 'admin_id',
  USER_ID: 'user_id',
  SERVICE_PROVIDER_ID: 'service_provider_id',
  CAR_ID: 'car_id',
  SERVICE_ID: 'service_id',
  ORDER_ID: 'order_id'
};

const RelationRule = {
  CASCADE: 'CASCADE',
  SET_NULL: 'SET NULL'
};

export async function up(knex) {
  await knex.schema.alterTable(TableName.WORKSHOPS, table => {
    table
      .integer(ColumnName.IMAGE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.IMAGES)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.ADMIN_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });

  await knex.schema.alterTable(TableName.ORDERS, table => {
    table
      .integer(ColumnName.WORKSHOP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.WORKSHOPS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.SERVICE_PROVIDER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.SERVICE_PROVIDERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.CAR_ID)
      .references(ColumnName.ID)
      .inTable(TableName.CARS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });

  await knex.schema.alterTable(TableName.SERVICES, table => {
    table
      .integer(ColumnName.ORDER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.ORDERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.WORKSHOP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.WORKSHOPS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
}

export async function down(knex) {
  await knex.schema.alterTable(TableName.WORKSHOPS, table => {
    table.dropColumn(ColumnName.IMAGE_ID);
    table.dropColumn(ColumnName.ADMIN_ID);
  });

  await knex.schema.alterTable(TableName.ORDERS, table => {
    table.dropColumn(ColumnName.WORKSHOP_ID);
    table.dropColumn(ColumnName.USER_ID);
    table.dropColumn(ColumnName.SERVICE_PROVIDER_ID);
    table.dropColumn(ColumnName.CAR_ID);
  });

  await knex.schema.alterTable(TableName.SERVICES, table => {
    table.dropColumn(ColumnName.ORDER_ID);
    table.dropColumn(ColumnName.WORKSHOP_ID);
  });
}
