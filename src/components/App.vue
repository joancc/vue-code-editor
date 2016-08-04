<style lang="sass" scoped>
</style>

<template>
  <div>
    <sandbox></sandbox>
  </div>

</template>

<script>
  import Sandbox from './Sandbox.vue';

  import store from '../vuex/store'

  export default{
      props: {

      },
      data() {
          return {
          };
      },
      methods: {
      },
      ready(){
      },
      components:{
        Sandbox
      },
      store
  }
</script>
