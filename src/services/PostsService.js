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

  async deletePost(id){
    const res = await api.delete('api/posts/' + id)
    logger.log(res.data)
    AppState.posts.filter(p => p.id !== id)
    AppState.posts = AppState.posts
  }
  
  async page(query = ""){
    const res = await api.get('api/posts/' + query)
    logger.log(res.data)
    AppState.posts = res.data.posts
  }
}



export const postsService = new PostsService