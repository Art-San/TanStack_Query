import axios from 'axios'
import { IPost } from './post.types'

class PostService {
  // private URL = 'https://jsonplaceholder.typicode.com/posts'
  private URL = 'https://jsonplaceholder.typicode.com/posts'

  getPosts() {
    return axios.get<IPost[]>(this.URL)
  }

  getPostById(id: number) {
    return axios.get<IPost>(`${this.URL}/${id}`)
  }
}

export const postService = new PostService()
