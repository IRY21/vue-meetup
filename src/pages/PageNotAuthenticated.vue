<template>
  <div class="container">
    <ErrorView 
      :title="'Ooooops, you are not authenticated, please authorize'"
      :status="'401'"
      :navigateToPage="'PageLogin'"
      :navigateToText="'Navigate to Login Page'"
    />
  </div>
</template>

<script>
  import ErrorView from '@/components/ErrorView'

  export default {
    components: {
      ErrorView
    }
  }
</script>

<style scoped>
  
</style>