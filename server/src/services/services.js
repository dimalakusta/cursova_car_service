import {
  user as userRepository,
  workshop as workshopRepository,
  car as carRepository,
  order as orderRepository,
  service as serviceRepository,
  orderToService as orderToServiceRepository,
  workshopToService as workshopToServiceRepository,
  serviceProvider as serviceProviderRepository
} from '../data/repositories/repositories.js';
import { Auth } from './auth/auth.service.js';
import { User } from './user/user.service.js';
import { Workshop } from './workshop/workshop.service.js';
import { Car } from './car/car.service.js';
import { Order } from './order/order.service.js';
import { Service } from './service/service.service.js';
import { OrderToService } from './order-to-service/order-to-service.service.js';
import { ServiceProvider } from './service-provider/service-provider.service.js';

const auth = new Auth({
  userRepository
});

const user = new User({
  userRepository
});

const workshop = new Workshop({
  workshopRepository
});

const car = new Car({
  carRepository
});

const service = new Service({
  serviceRepository,
  workshopToServiceRepository
});

const orderToService = new OrderToService({
  orderToServiceRepository
});

const order = new Order({
  orderRepository,
  orderToServiceService: orderToService,
  userRepository
});

const serviceProvider = new ServiceProvider({
  serviceProviderRepository
});

export { auth, user, workshop, car, order, service, orderToService, serviceProvider };
