import { usersSeed } from '../seed-data/users-seed.js';
import { workshopImagesSeed, workshopsSeeds } from '../seed-data/workshops-seed.js';
import { carsSeeds } from '../seed-data/cars-seed.js';
import { servicesSeeds } from '../seed-data/services-seed.js';

const TableName = {
  USERS: 'users',
  WORKSHOPS: 'workshops',
  IMAGES: 'images',
  CARS: 'cars',
  SERVICES: 'services'
};

const ColumnName = {
  IMAGE_ID: 'image_id',
  WORKSHOP_ID: 'post_id',
  ADMIN_ID: 'admin_id'
};

const getRandomIndex = length => Math.floor(Math.random() * length);
const mapLinks = images => images.map(image => image.link);

export async function seed(knex) {
  try {
    await knex.transaction(async trx => {
      await trx(TableName.USERS).del();
      await trx(TableName.WORKSHOPS).del();
      await trx(TableName.IMAGES).del();
      await trx(TableName.CARS).del();
      await trx(TableName.SERVICES).del();

      // Add predefined images, services, cars
      await trx(TableName.IMAGES).insert(workshopImagesSeed);
      await trx(TableName.CARS).insert(carsSeeds);
      await trx(TableName.SERVICES).insert(servicesSeeds);

      const workshopImages = await trx(TableName.IMAGES)
        .select('id')
        .whereIn('link', mapLinks(workshopImagesSeed));

      // Add users.
      const usersMappedSeed = usersSeed.map(user => ({
        ...user
      }));
      const users = await trx(TableName.USERS).insert(usersMappedSeed).returning('*');

      // Add posts.
      const workshopMappedSeed = workshopsSeeds.map((workshop, idx) => ({
        ...workshop,
        [ColumnName.ADMIN_ID]: users[getRandomIndex(users.length)].id,
        [ColumnName.IMAGE_ID]: workshopImages[idx] ? workshopImages[idx].id : null
      }));
      const workshops = await trx(TableName.WORKSHOPS).insert(workshopMappedSeed).returning('*');

      // // Add service providers
      // const serviceProviderMappedSeed = workshopsSeeds.map((workshop, idx) => ({
      //   ...workshop,
      //   [ColumnName.ADMIN_ID]: users[getRandomIndex(users.length)].id,
      //   [ColumnName.IMAGE_ID]: workshopImages[idx] ? workshopImages[idx].id : null
      // }));
      // const workshops = await trx(TableName.WORKSHOPS).insert(workshopMappedSeed).returning('*');
    });
  } catch (error) {
    console.log(`Seeding error: ${error}`);
  }
}
