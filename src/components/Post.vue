<template>
  <div class="post row ms-5 mt-4">
    <div class="card col-md-12 mt-2">
      <div class="row my-2">
        <div class="col-md-2">
      <img :src="account.picture" alt="" class="circular--square m-2">
        </div>
        <div class="col-md-10  m-0">
          <div class="row justify-content-between">
            <div class="col-md-12">
              <form @submit.prevent="createPost">
             <div class="form-group mt-2">
                  <textarea class="form-control my-2" id="exampleFormControlTextarea1" rows="3" v-model="state.editable.body" required placeholder="Post body"></textarea>
                  <textarea class="form-control my-2" id="exampleFormControlTextarea1" rows="3" v-model="state.editable.imgUrl" placeholder="Post Image"></textarea>

              </div>

            <div class="col-md-12 d-flex justify-content-end my-2 me-3">
              <button class="btn btn-outline-primary mdi mdi-arrow-right-thin-circle-outline selectable"></button>

            </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="post row ms-5 "
    v-for="p in post"
    :key="p.id"
  >
    <div class="card mt-2 col-md-12">
      <div class="row">
        <div class="col-md-12 ">
          <img :src="p.creator.picture" alt="" class="circular--landscape m-2">
          {{p.creator.name}}
        </div>
        <div class="col-md-12 p-0">
          <div class="p-3 pe-5">
          {{p.body}}
          <div>

          </div>
          <img :src="p.imgUrl" alt="" class="w-25">
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
export default {
  setup(){
    const state = reactive({
      editable: {},
    })
    onMounted(async () => {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message)
      }
    });
    return {
      state,
      post: computed(()=> AppState.posts),
      account: computed(()=> AppState.account),

      async createPost() {
        try {
          await postsService.createPost(state.editable)
          state.editable = {}
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