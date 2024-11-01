<script setup lang="ts">
const props = defineProps<{
  customClass?: string;
  source: string;
}>();
</script>
<template>
  <img
    :src="props.source"
    alt=""
    draggable="false"
  >
</template>

<style scoped lang="scss"></style>
