import { AppState } from "../AppState"
import { Car } from "../models/Car"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CarsService {
  async getAllCars() {
    const res = await api.get('api/cars')
    logger.log(res.data)
    AppState.cars = res.data.map(c => new Car(c))
  }

  async getById(id) {
    const res = await api.get('api/cars/' + id)
    logger.log(res.data)
    AppState.activeCar = new Car(res.data)
  }

  async createCar(newCar) {
    const res = await api.post('api/cars', newCar)
    logger.log(res.data)
    AppState.cars.push(new Car(res.data))
  }

  async editCar(updatedCar) {
    const res = await api.put('api/cars/' + updatedCar.id, updatedCar)
    logger.log(res.data)
    AppState.activeCar = new Car(res.data)
  }

  async getComments(carId) {
    const res = await api.get(`api/cars/${carId}/comments`)
    logger.log(res.data)
    AppState.comments = res.data
  }

}

export const carsService = new CarsService()