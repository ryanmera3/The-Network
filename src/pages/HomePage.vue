<template>
  <div class="container-fluid">
    <Search />
    <div class="row">
      <div class="col-md-8">
        <CreatePost v-if="account.id"/>
        <Post />

      </div>
      
      <div class="col-md-4">
        <Addition />
      </div>

      </div>
    <div class="row text-center">
      <div class="col-md-12">
        <button class="btn btn-outline-primary selectable me-2" @click="prevPage" >Prev</button>
        <button class="btn btn-outline-primary selectable ms-2" @click="nextPage" >Next</button>
      </div>
    </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profileService } from "../services/ProfileService";
import {postsService} from "../services/PostsService"
import { useRoute } from "vue-router";
export default {
  name: "Home",
  setup() {
    let page = 1
    return {
      page,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(()=> AppState.posts),
      async nextPage(){
         try {
           page++
          await postsService.page('?page=' + page)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message)
        }
      },
      async prevPage(){
        try {
          page--
          await postsService.page('?page=' + page)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message)
        }
      }
    };
  },
};
</script>


<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
