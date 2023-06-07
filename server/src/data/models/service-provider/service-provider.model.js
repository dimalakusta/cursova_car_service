import { Model } from 'objection';
import { DbTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { User as UserModel, Workshop as WorkshopModel } from '../models.js';

class ServiceProvider extends AbstractModel {
  static get tableName() {
    return DbTableName.SERVICE_PROVIDERS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['workshopId', 'userId'],
      properties: {
        ...baseSchema.properties,
        workshopId: { type: ['integer', 'null'] },
        userId: { type: ['integer', 'null'] }
      }
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DbTableName.SERVICE_PROVIDERS}.userId`,
          to: `${DbTableName.USERS}.id`
        }
      },
      workshop: {
        relation: Model.BelongsToOneRelation,
        modelClass: WorkshopModel,
        join: {
          from: `${DbTableName.SERVICE_PROVIDERS}.workshopId`,
          to: `${DbTableName.WORKSHOPS}.id`
        }
      }
    };
  }
}

export { ServiceProvider };
