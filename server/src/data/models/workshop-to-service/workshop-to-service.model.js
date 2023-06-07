import { DbTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';

class WorkshopToService extends AbstractModel {
  static get tableName() {
    return DbTableName.WORKSHOPS_TO_SERVICES;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['workshopId', 'serviceId'],
      properties: {
        ...baseSchema.properties,
        workshopId: { type: ['integer', 'null'] },
        serviceId: { type: ['integer', 'null'] }
      }
    };
  }
}

export { WorkshopToService };
