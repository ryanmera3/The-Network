import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostsService {
  async getPosts(query = ''){
    const res = await api.get('api/posts/' + query)
    logger.log(res.data.posts)
    AppState.posts = res.data.posts
  }

  async createPost(postData){
    const res = await api.post('api/posts', postData)
    logger.log('Post Data', res.data)
    AppState.posts.unshift(res.data)
  }
}



export const postsService = new PostsService