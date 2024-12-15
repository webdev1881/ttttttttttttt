<script lang="ts" setup>

import type { BoardDocument } from "~/types/Board";

useHead({
  title: "Boards",
});

const boardStore = useBoardStore()

// const boards = [ { name: "John Doe" } ]
const boards = computed(() => boardStore.getBoards)

// const board = useStore()

// console.log(board.name);

provide("refresh-boards", boards);

const showCreateBoard = ref(false);
const selectedBoard = ref<BoardDocument | undefined>();

async function handleEdit(board: BoardDocument) {
  selectedBoard.value = board;
  showCreateBoard.value = true;
}

watchEffect(() => {
  if (!showCreateBoard.value) {
    selectedBoard.value = undefined;
  }
});

// onMounted(() => {
//   boardStore.getBoards
// })

</script>
<template>

  <div class="wpr">

    <h1 class="tex-3xl font-semibold">Boards</h1>


      <UButton size="xs" @click="showCreateBoard = !showCreateBoard"
        >Create new board</UButton
      >

      {{boards}}


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
            return  boards
            // refresh();
          }
        "
        :on-update="
          () => {
            showCreateBoard = false;
            selectedBoard = undefined;
            return  boards
          }
        "
      />
    </USlideover>
    <!-- ./ Sidesheet  -->

    <!-- List of boards -->
    <section class="grid grid-cols-2 lg:grid-cols-5 my-4 gap-4">
      <BoardCard
        v-for="board in boards"
        :key="board.id"
        :board="board"
        :on-edit="handleEdit"
      ></BoardCard>
    </section>
    <!-- ./ List of boards -->
  </div>

</template>

<style></style>
