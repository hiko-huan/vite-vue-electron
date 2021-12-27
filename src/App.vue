<template>
  <h2>Tool Get History Banking</h2>
  <button @click="handleOpenWebBank(BANKS.VCB)">Vietcombank</button>
  <button @click="handleOpenWebBank(BANKS.BIDV)">BIDV</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IPC_EVENT_BANK, BANKS } from "./helpers/constant";

export default defineComponent({
  data () {
    return {
      BANKS
    }
  },
  methods: {
    handleOpenWebBank (bank: string): void {
      const event = IPC_EVENT_BANK[bank]
      window.ipcRenderer.send(event);
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
