import { Model } from 'objection';
import { DbTableName } from '../../../common/enums/enums.js';
import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { Workshop as WorkshopModel } from '../workshop/workshop.model.js';
import { User as UserModel } from '../user/user.model.js';
import { Car as CarModel } from '../cars/cars.model.js';
import { Service as ServiceModel } from '../service/service.model.js';
import { ServiceProvider as ServiceProviderModel } from '../service-provider/service-provider.model.js';

class Order extends AbstractModel {
  static get tableName() {
    return DbTableName.ORDERS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: [
        'description',
        'model',
        'yearOfProduction',
        'licensePlateNumber',
        'visitDate',
        'status',
        'carId',
        'workshopId'
      ],
      properties: {
        ...baseSchema.properties,
        name: { type: 'string' },
        description: { type: 'string' },
        model: { type: 'string' },
        yearOfProduction: { type: 'integer' },
        licensePlateNumber: { type: 'string' },
        visitDate: { type: 'string' },
        noteByProvider: { type: 'string' },
        status: {
          type: 'string',
          enum: ['Requested', 'Accepted', 'Rejected', 'Completed'],
          default: 'Requested'
        },
        carId: { type: ['integer', 'null'] },
        workshopId: { type: ['integer', 'null'] },
        userId: { type: ['integer', 'null'] },
        serviceProviderId: { type: ['integer', 'null'] }
      }
    };
  }

  static get relationMappings() {
    return {
      workshop: {
        relation: Model.HasOneRelation,
        modelClass: WorkshopModel,
        join: {
          from: `${DbTableName.ORDERS}.workshopId`,
          to: `${DbTableName.WORKSHOPS}.id`
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'username', 'fullName', 'phoneNumber'),
        join: {
          from: `${DbTableName.ORDERS}.userId`,
          to: `${DbTableName.USERS}.id`
        }
      },
      serviceProvider: {
        relation: Model.HasOneRelation,
        modelClass: ServiceProviderModel,
        // filter: query => query.select('id', 'username', 'fullName', 'phoneNumber'),
        join: {
          from: `${DbTableName.ORDERS}.serviceProviderId`,
          to: `${DbTableName.SERVICE_PROVIDERS}.id`
        }
      },
      services: {
        relation: Model.ManyToManyRelation,
        modelClass: ServiceModel,
        join: {
          from: `${DbTableName.ORDERS}.id`,
          through: {
            from: `${DbTableName.ORDERS_TO_SERVICES}.orderId`,
            to: `${DbTableName.ORDERS_TO_SERVICES}.serviceId`
          },
          to: `${DbTableName.SERVICES}.id`
        }
      },
      car: {
        relation: Model.HasOneRelation,
        modelClass: CarModel,
        filter: query => query.select('id', 'brand'),
        join: {
          from: `${DbTableName.ORDERS}.carId`,
          to: `${DbTableName.CARS}.id`
        }
      }
    };
  }
}

export { Order };
