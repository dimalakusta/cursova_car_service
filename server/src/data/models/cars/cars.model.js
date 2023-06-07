import { DbTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';

class Car extends AbstractModel {
  static get tableName() {
    return DbTableName.CARS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['brand'],
      properties: {
        ...baseSchema.properties,
        brand: { type: 'string' }
      }
    };
  }
}

export { Car };
