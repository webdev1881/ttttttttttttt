<script lang="ts" setup>
import type { BoardDocument } from "~/types/Board";

interface Props {
  type: "create" | "update";
  initialData?: Partial<BoardDocument>;
  onUpdate?: (data?: any) => void;
  onCreate?: (data?: any) => void;
}

const boardStore = useBoardStore()

const porps = withDefaults(defineProps<Props>(), {
  type: "create",
});

const isLoading = ref(false);
const formState = reactive<Partial<BoardDocument>>({
  name: undefined,
  // coverImage: undefined,
});

watchEffect(() => {
  if (porps.type === "update" && porps.initialData) {
    formState.name = porps.initialData.name;

  }

  if (porps.type === "create") {
    formState.name = undefined;

  }
});

async function handleSubmit() {
  if (porps.type === "update" ) {
    porps.onUpdate?.(porps.initialData);
    boardStore.update(porps.initialData, formState.name);
    return
  }
  porps.onCreate?.(porps.initialData);
  // console.log(porps.initialData);
  // localStorage.setItem("name", formState.name);
  boardStore.setBoard({id: Date.now(), name: formState.name});

  
}


</script>
<template>

  <UForm
    :state="formState"
    class="p-4"
    @submit="handleSubmit"
    >
    <UFormGroup class="mb-4" name="name" label="Board Name">
      <UInput v-model="formState.name" type="text" placeholder="Board name" />
    </UFormGroup>

    {{ initialData }}

    <!-- <UFormGroup class="mb-4" name="coverImage" label="Select cover image">
      <ImagePicker v-model="formState.coverImage" />
    </UFormGroup> -->

    <UButton type="submit" color="primary" block :loading="isLoading">
      {{ type === "create" ? "Create board" : "Update board" }}
    </UButton>
  </UForm>
  
</template>

<style></style>
