<template>
  <div class="px-6">
    <main class="mx-auto max-w-6xl">
      <div class="flex items-center justify-between">
        <h1
          v-if="title"
          class="font-theme text-5xl font-bold"
        >
          {{ title }}
        </h1>
        <slot name="header-actions">
          
        </slot>
      </div>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
export default {
    props: ({
      title: {
        type: String,
        required: false,
      },
    }),

    setup(props: any){
        return{ 
            title: props.title
        }
    }

}
</script>
