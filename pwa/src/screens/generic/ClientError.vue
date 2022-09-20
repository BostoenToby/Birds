<template>
    <h1>Not found</h1>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    // zorgt dat je geen error krijgt of de pagina wel echt bestaat --> maak het echt een component
    export default defineComponent({
        name: 'ClientError' // Match in bundled files
    })
</script>