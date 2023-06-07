import { Model } from 'objection';
import { DbTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { Workshop } from '../models.js';

class User extends AbstractModel {
  static get tableName() {
    return DbTableName.USERS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ['email', 'username', 'password', 'role'],
      properties: {
        ...baseSchema.properties,
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        fullName: { type: 'string' },
        phoneNumber: { type: 'string' },
        role: { type: 'string', enum: ['User', 'Admin', 'Service Provider'], default: 'User' }
      }
    };
  }

  static get relationMappings() {
    return {
      workshops: {
        relation: Model.ManyToManyRelation,
        modelClass: Workshop,
        join: {
          from: `${DbTableName.USERS}.id`,
          through: {
            from: `${DbTableName.SERVICE_PROVIDERS}.userId`,
            to: `${DbTableName.SERVICE_PROVIDERS}.workshopId`
          },
          to: `${DbTableName.WORKSHOPS}.id`
        }
      }
    };
  }
}

export { User };
