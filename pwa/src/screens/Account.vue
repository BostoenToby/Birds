<template>
    <h1>Hi, {{user?.displayName}}</h1>
</template>

<script setup lang="ts">
    // als setup bij script staat is alles dat erna komt in de setup function gepropt
    import useAuthentication from '../composables/useAuthentication';

    const { user } = useAuthentication()
</script>