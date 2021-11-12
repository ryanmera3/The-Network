<template>
  <div class="container-fluid">
    <Search />
    <div class="row">
      <div class="col-md-8">
        <Post />
      </div>
      <div class="col-md-4">
        <Addition />
      </div>

      </div>
    </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

    Addition
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
