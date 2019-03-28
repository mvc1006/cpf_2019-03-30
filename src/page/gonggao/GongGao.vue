<template>
  <div>
    <Conmon-Leader></Conmon-Leader>
    <router-view/>
  </div>
</template>

<script>
  import ConmonLeader from '../PublicLeader/ConmonLeader'
  export default {
        name: "GongGao",
        components: {
          ConmonLeader,
        },
    }
</script>

<style lang="less" scoped>

</style>
