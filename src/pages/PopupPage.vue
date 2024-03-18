<template>
  <q-card class="card flex justify-center items-center">
    <h1 class="text-h6">Modal Example Popup</h1>
    <q-btn
      color="primary"
      label="Open Modal"
      @click="handleSendToBackgroundScript"
    />
  </q-card>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';

const $q = useQuasar();

const handleSendToBackgroundScript = async () => {
  await $q.bex.send('to.background', { open: true });
};
</script>

<style lang="scss" scoped>
.card {
  height: 100px;
  position: relative;
  border-radius: 5px;
}
</style>
