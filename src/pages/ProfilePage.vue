<template>
  <div class="profile container-fluid">
    <div class="row mt-3 justify-content-center">
      <div class="col-md-4 elevation-2 ms-2 text-center">
        <!-- <h1>{{ profile.name }}</h1> -->
        <img class="rounded mt-2" :src="profile.picture" alt="" />
        <p>{{ profile.email }}</p>
        <h3>{{profile.bio}}</h3>
      </div>
    </div>
    <div class="row ms-1 mt-3">
      <div class="col-md-8">
        <CreatePost v-if="account.id"/>
        <ProfilePost/>
      </div>
      <div class="col-md-4">
        <Addition/>
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
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>