<script lang="ts" setup>
import type { BoardDocument } from "~/types/Board";

interface Props {
  type: "create" | "update";
  initialData?: Partial<BoardDocument>;
  onUpdate?: (data?: any) => void;
  onCreate?: (data?: any) => void;
}

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
    // formState.coverImage = porps.initialData.coverImage;
  }

  if (porps.type === "create") {
    formState.name = undefined;
    // formState.coverImage = undefined;
  }
});

async function handleSubmit() {
  console.log(formState.name);
  localStorage.setItem("name", formState.name);
  porps.onCreate?.(formState.name);
  
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

    <!-- <UFormGroup class="mb-4" name="coverImage" label="Select cover image">
      <ImagePicker v-model="formState.coverImage" />
    </UFormGroup> -->

    <UButton type="submit" color="primary" block :loading="isLoading">
      {{ type === "create" ? "Create board" : "Update board" }}
    </UButton>
  </UForm>
  
</template>

<style></style>
