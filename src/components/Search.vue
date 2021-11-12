<template>
  <div class="row mt-4 justify-content-center">
    <div class="col-md-6 text-center">
      <form @submit.prevent="search" class="input-group">
        <input
          @submit="search"
          v-model="searchText"
          class="form-control"
          placeholder="search title of posts"
          type="text"
        />
        <button class="btn btn-outline-primary">search</button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { postsService } from '../services/PostsService';
export default {
  setup() {
    const searchText = ref("");
    return {
      searchText,
      async search() {
        try {
          await postsService.getPosts("?name=" + searchText.value);
          logger.log(this.searchText);
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>



<style lang="scss" scoped>
</style>