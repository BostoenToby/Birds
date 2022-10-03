<template>
    <header class="px-6 py-6">
        <nav class="max-w-6xl mx-auto flex items-center justify-between">
            <router-link class="outline-none focus-visible:ring-2 rounded-md" to="/">
                <Logo />
            </router-link>
            <AppNavigation class="hidden sm:flex"/>
        </nav>
    </header>
</template>

<script lang="ts">
    import Logo from '../generic/Logo.vue'
    import AppNavigation from '../generic/AppNavigation.vue'

    export default{
        components:{
            Logo,
            AppNavigation
        },

        setup(){}
    }
</script>