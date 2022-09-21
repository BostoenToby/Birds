<template>
    <ul class="grid grid-cols-4 w-full sm:w-auto text-center items-center text-xs space-x-3 font-medium sm:space-x-3 sm:text-sm">
                <li>
                    <Home class="h-6 sm:hidden mb-2 mx-auto"/>
                    <router-link class="px-3 py-6" to="/">
                        Home
                    </router-link>
                </li>
                <li>
                    <Feather class="h-6 sm:hidden mb-2 mx-auto"/>
                    <router-link class="px-3 py-6" to="/birds">
                        Birds
                    </router-link>
                </li>
                <li>
                    <Clipboard class="h-6 sm:hidden mb-2 mx-auto"/>
                    <router-link class="px-3 py-6" to="/observations">
                        Observations
                    </router-link>
                </li>
                <li>
                    <Scroll class="h-6 sm:hidden mb-2 mx-auto"/>
                    <router-link class="px-3 py-6" to="/log">
                        Log
                    </router-link>
                </li>
                <li class="hidden pl-6 sm:block">
                    <router-link class="px-3 py-6" to="/account" v-if="user">
                        {{user.displayName}}
                    </router-link>
                    <router-link class="px-3 py-6" to="/auth/login" v-else></router-link>
                </li>
            </ul>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { Home, Feather, Scroll, Clipboard } from 'lucide-vue-next'
    import useAuthentication from '../../composables/useAuthentication'

    export default defineComponent({
        components: {
            Home,
            Feather,
            Scroll,
            Clipboard,
        },  
        setup(){
            const { user } = useAuthentication()
            return {
                user
            }
        }
    })
</script>