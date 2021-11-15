<template>
  <form @submit.prevent="editProfile">

  <div class="about text-center">
    <img class="rounded mt-2" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <input type="text" v-model="name" id="name" :placeholder="account.name">
    <div>
      <input class="m-2" type="text" v-model="github" id="github" placeholder="github...">
    </div>
    <div>
    <textarea class="m-2" rows="3" cols="50" id="bio" v-model="bio" placeholder="bio..."></textarea>
    </div>
    <button class="btn btn-warning m-2 ">Edit profile</button>

  </div>
  </form>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { profileService } from "../services/ProfileService";
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
