<template>
    <div>
      <Conmon-Leader></Conmon-Leader>
      <router-view/>
    </div>
</template>

<script>
  import ConmonLeader from '../PublicLeader/ConmonLeader'

  export default {
        name: "KaoQin",
        components: {
          ConmonLeader,
        },
    }
</script>

<style scoped>

</style>
