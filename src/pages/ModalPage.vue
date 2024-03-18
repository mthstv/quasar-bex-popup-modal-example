<template>
  <q-layout>
    <q-page-sticky position="bottom-right" :offset="windowPos">
      <q-card flat class="my-card">
        <q-card-header
          style="display: flex; cursor: move; height: 20px; margin-top: -5px"
          v-touch-pan.prevent.mouse="moveWindow"
        ></q-card-header>
        <q-card-section class="flex column">
          <h2 class="text-center mb-5">This is a modal on an iframe</h2>
          <q-btn
            color="primary"
            label="Close Modal"
            @click="handleSendToBackgroundScript"
          />
        </q-card-section>
      </q-card>
    </q-page-sticky>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const windowPos = ref([18, 18]);
const draggingWindow = ref(false);
const $q = useQuasar();

const moveWindow = (ev: any) => {
  draggingWindow.value = ev.isFirst !== true && ev.isFinal !== true;

  windowPos.value = [
    windowPos.value[0] - ev.delta.x,
    windowPos.value[1] - ev.delta.y,
  ];
};

const handleSendToBackgroundScript = async () => {
  await $q.bex.send('to.background', { open: false });
};
</script>
<style lang="scss" scoped>
.my-card {
  border-top: 10px solid lightblue;
  width: 100%;
  max-width: 480px;
  min-width: 480px;
  height: auto;
  border-radius: 10px;
}
</style>
