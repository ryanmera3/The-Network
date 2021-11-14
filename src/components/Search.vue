<template>
  <div class="row mt-4 justify-content-center">
    <div class="col-md-6 text-center">
      <form @submit.prevent="search" class="input-group">
        <input
          @submit="search"
          v-model="searchText"
          class="form-control"
          placeholder="search body of posts"
          type="text"
        />
        <button class="btn btn-outline-primary">search</button>
      </form>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { postsService } from '../services/PostsService';
import { AppState } from "../AppState";
export default {
  setup() {
    const searchText = ref("");
    return {
      searchText,
      async search() {
        try {
          await postsService.getPosts("?query=" + searchText.value, "?creatorName" + searchText.value);
        } catch (error) {
          logger.error(error);
        }
      },
      account: computed(()=> AppState.account),
      profile: computed(()=> AppState.profile)
    };
  },
};
</script>



<style lang="scss" scoped>
</style>