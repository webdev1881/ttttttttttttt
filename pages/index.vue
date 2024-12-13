<script lang="ts" setup>

import type { BoardDocument } from "~/types/Board";

useHead({
  title: "Boards",
});

const refresh = [ { name: "John Doe" } ]

console.log();

provide("refresh-boards", refresh);

const showCreateBoard = ref(false);
const selectedBoard = ref<BoardDocument | undefined>();

async function handleEdit(board: BoardDocument) {
  selectedBoard.value = board;
  showCreateBoard.value = true;
}

</script>
<template>

  <div class="wpr">

    <h1 class="tex-3xl font-semibold">Boards</h1>


      <UButton size="xs" @click="showCreateBoard = !showCreateBoard"
        >Create new board</UButton
      >


    <!-- Sidesheet  -->
    <USlideover v-model="showCreateBoard">
      <SlideoverHeader
        :title="selectedBoard ? 'Update board' : 'Create board'"
        :on-click="() => (showCreateBoard = false)"
      ></SlideoverHeader>

      <FormBoard
        :type="selectedBoard ? 'update' : 'create'"
        :initial-data="selectedBoard"
        :on-create="
          () => {
            showCreateBoard = false;
            // refresh();
          }
        "
      />
    </USlideover>
    <!-- ./ Sidesheet  -->

    <!-- List of boards -->
    <section class="grid grid-cols-2 lg:grid-cols-5 my-4 gap-4">
      <BoardCard
        v-for="board in refresh"
        :key="board.name"

        :on-edit="handleEdit"
      >{{board.name}}</BoardCard>
    </section>
    <!-- ./ List of boards -->
  </div>

</template>

<style></style>
