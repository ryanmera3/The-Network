<template>
<div
    class="addition row"
    v-for="a in additional"
    :key="a.title"
  >
    <div class="mt-2 col-md-12">
      <div class="row">
        <div class="col-md-12 ">
          <img :src="a.tall" alt="" class="ms-2 img-fluid">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import {additionalsService} from "../services/AdditionalsService"
import { AppState } from "../AppState"
export default {
  setup(){
    onMounted(async () => {
      try {
        await additionalsService.getAdditionals()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message)
      }
    });
    return {
      additional: computed(()=> AppState.additional),

    }
  }}
</script>


<style lang="scss" scoped>
  .img{
    height: 100%;
    width:50;
  }
</style>