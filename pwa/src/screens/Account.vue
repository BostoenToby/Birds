<template>
    <h1>Hi, {{user?.displayName}}</h1>
    <button @click="handleLogOut">Log out</button>
</template>

<script lang="ts">
    // als setup bij script staat is alles dat erna komt in de setup function gepropt
    import useAuthentication from '../composables/useAuthentication';
    import { useRouter } from 'vue-router'

    export default {
        setup() {
            const { user, logout } = useAuthentication()
            const { replace } = useRouter()
            const handleLogOut = () => {
                logout().then(() => {
                return replace('/auth/login')
            })
            }

            return {
                user,

                handleLogOut,
            }
        }
    }
</script>