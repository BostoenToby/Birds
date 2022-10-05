<template>
  <route-holder title="Add observation">
    <form @submit.prevent="submitForm">
      <div
        v-if="errorMessage"
        class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
      >
        <p class="text-sm text-red-600">
          {{ errorMessage }}
        </p>
        <button
          @click="errorMessage = ''"
          class="rounded-full p-3 ring-red-500 hover:bg-red-200 focus:outline-none focus:ring-1"
        >
          <X class="h-4 w-4 text-red-600" />
        </button>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="name"
        >
          <span class="mb-2 block">Name</span>
          <input
            v-model="observationInput.name"
            id="name"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="name"
          />
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="birdId"
        >
          <span class="mb-2 block">Bird specie</span>
          <select
            :disabled="loading"
            v-if="result"
            v-model="observationInput.birdId"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            name="birdId"
            id="birdId"
          >
            <option selected disabled value="">
              Pick a bird species
            </option>
            <option
              v-if="result"
              v-for="b of result.birds"
              :key="b.id"
              :value="b.id"
            >
              {{ b.name }}
            </option>
          </select>
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="locationId"
        >
          <span class="mb-2 block">Location</span>
          <select
            :disabled="loading"
            v-if="result"
            v-model="observationInput.locationId"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            name="locationId"
            id="locationId"
          >
            <option selected disabled value="">
              Pick a location
            </option>
            <option
              v-if="result"
              v-for="l of result.locations"
              :key="l.id"
              :value="l.id"
            >
              {{ l.name }}
            </option>
          </select>
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="description"
        >
          <span class="mb-2 block">Description</span>
          <textarea
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            v-model="observationInput.description"
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="weather"
        >
          <span class="mb-2 block">Weather</span>
          <input
            v-model="observationInput.weather"
            id="weather"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="weather"
          />
        </label>
      </div>

      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-600 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
      >
        <span v-if="!loading">Add observation</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>

      <p class="mt-3 text-center text-sm">
        <RouterLink
          to="/auth/register"
          class="rounded-md outline-none ring-neutral-300 hover:underline focus-visible:ring"
        >
          Don't have an account?
        </RouterLink>
      </p>
    </form>
  </route-holder>
</template>

<script lang="ts">
import {
  useMutation,
  useQuery,
} from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { reactive, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { Loader2, X } from 'lucide-vue-next'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import useAuthentication from '../../composables/useAuthentication'

export default {
  components: {
    RouteHolder,
    X,
    Loader2,
  },

  setup() {
    const { replace } = useRouter()
    const errorMessage: Ref<string> = ref('')
    const { user } = useAuthentication()

    // make form, link input values, add styling

    const observationInput = reactive({
      birdId: '',
      description: "it' a bird 🥴",
      locationId: '',
      name: 'new bird',
      userId: user.value!.uid,
      weather: 'sunny',
    })

    const ADD_OBSERVATION = gql`
      mutation createObservation(
        $createObservationInput: CreateObservationInput!
      ) {
        createObservation(createObservationInput: $createObservationInput) {
          id
          name
        }
      }
    `

    const INSERT_DATA = gql`
      query birds {
        birds {
          id
          name
        }

        locations {
          id
          name
        }
      }
    `

    const { result, loading, error } = useQuery(INSERT_DATA)
    const { mutate: addObservation } = useMutation(ADD_OBSERVATION, () => ({
      // Callback function for reactive data & variable name without $...
      variables: {
        createObservationInput: observationInput,
      },
    }))

    const submitForm = async() => {
        const observation = await addObservation().catch((err) => {
            errorMessage.value = err.message
        })

        console.log(observation)
    }

    return {
      observationInput,
      result,
      loading,
      error,
      errorMessage,
      submitForm,
    }
  },
}
</script>
