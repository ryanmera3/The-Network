<template>
  
  <div
    class="post row ms-5 "
    v-for="p in post"
    :key="p.id"
  >
    <div class="card mt-2 col-md-12" v-if="p.creatorId == profile.id">
      <div class="row" >
        <div class="col-md-12" >
          <img :src="p.creator?.picture" alt="" class="circular--landscape m-2" @click="profileLink(p.creatorId)">
          {{p.creator?.name}} || {{p.createdAt}} || {{p.likeIds?.length}}❤ || 
        </div>
        <div class="col-md-12 p-0">
          <div class="p-3 pe-5">
          {{p.body}}
          </div>
          <img :src="p.imgUrl" alt="" class="w-25 p-3">
          <div class="justify-content-end d-flex p-3">
            <button class="btn btn-danger mdi mdi-arrow-right-thin-circle-outline selectable" v-if="p.creatorId == account.id" @click="deletePost(p.id)">Delete</button>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import {postsService } from "../services/PostsService"
import { AppState } from "../AppState"
import { profileService } from "../services/ProfileService"
import {useRouter, useRoute} from "vue-router"
export default {
  setup(){
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      editable: {},
    })
    onMounted(async () => {
      try {
        if(route.name == "Profile")
        await postsService.getPosts('?id' + route.params.id )
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message)
      }
    });
    return {
      state,
      post: computed(()=> AppState.posts),
      account: computed(()=> AppState.account),
      profile: computed(()=> AppState.profile),
      async createPost() {
        try {
          await postsService.createPost(state.editable)
          state.editable = {}
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message)
        }
      },
      async deletePost(id) {
        try {
          await postsService.deletePost(id)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message)
        }
      },
      async profileLink(id){
        try {
          if(id){

            await profileService.getProfile(id)
          router.push({path: '/profile/' + id})
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message)
        }
      }
    }
  }}
</script>


<style lang="scss" scoped>

.circular--landscape {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
}

.circular--landscape img {
  width: auto;
  height: 100%;
  margin-left: -50px;
}

.circular--square {
  width: 75px;
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
}

.circular--square {
  border-radius: 50%;
}

.flex-grow{
  flex-grow: 1;
}
</style>