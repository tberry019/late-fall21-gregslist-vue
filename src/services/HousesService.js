import { AppState } from "../AppState"
import { House } from "../models/House"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class HousesService {
  async getAllHouses() {
    const res = await api.get('api/houses')
    logger.log(res.data)
    AppState.houses = res.data
  }
  async getByid(id) {
    const res = await api.get('api/houses' + id)
    logger.log(res.data)
    AppState.activeHouse = res.data
  }

  async createHouse(newHouse) {
    const res = await api.post('api/houses', newHouse)
    logger.log(res.data)
    AppState.houses.push(new House(res.data))

  }

  async editHouse(updatedHouse) {
    const res = await api.put('api/houses/' + updatedHouse.id, updatedHouse)
    logger.log(res.data)
    AppState.activeHouse = new House(res.data)
  }

}

export const housesService = new HousesService()