import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class AdditionalsService {
  async getAdditionals(){
    const res = await api.get('api/ads')
    logger.log(res.data)
    AppState.additional = res.data
}
}

export const additionalsService = new AdditionalsService()