<template>
  <div class="profile container-fluid">
    <div class="row mt-3 justify-content-center">
      <div class="col-md-6 elevation-2 ms-2 text-center">
        <h1>{{ profile.name }}</h1>
        <img class="rounded mt-2" :src="profile.picture" alt="" />
        <p>{{ profile.email }} | </p>
        <p class="mdi mdi-school" v-if="profile.graduated"></p>
        <h3>{{profile.bio}}</h3>
        <h6>
        {{profile.github}} Test | {{profile.linkedin}} Test | {{profile.class}} Test
        </h6>
      </div>
    </div>
    <div class="row ms-1 mt-3">
      <div class="col-md-8">
        <CreatePost v-if="account.id == profile.id"/>
        <ProfilePost/>
      </div>
      <div class="col-md-4">
        <Addition/>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-md-12">
        <button class="btn btn-outline-primary selectable me-2" @click="prevPage" v-if="posts.newer">Prev</button>
        <button class="btn btn-outline-primary selectable ms-2" @click="nextPage" v-if="posts.older">Next</button>
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
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          logger.log('Profilepage', route.params.id)
          await profileService.getProfile(route.params.id);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
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

<style scoped>
img {
  max-width: 100px;
}
</style>