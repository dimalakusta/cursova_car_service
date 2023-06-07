import { DbTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';

class OrderToService extends AbstractModel {
  static get tableName() {
    return DbTableName.ORDERS_TO_SERVICES;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['orderId', 'serviceId'],
      properties: {
        ...baseSchema.properties,
        orderId: { type: ['integer', 'null'] },
        serviceId: { type: ['integer', 'null'] }
      }
    };
  }
}

export { OrderToService };
