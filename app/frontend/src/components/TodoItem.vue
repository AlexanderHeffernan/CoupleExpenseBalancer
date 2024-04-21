<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import { defineEmits } from 'vue'
defineProps([ 'todo'])
defineEmits(['toggleDoneTodo', 'removeTodo'])

var focused = ref(false);
</script>

<template>
    <div class="flex w-full mb-4 shadow-lg bg-white p-3 rounded-lg">
        <input class="mr-3" type="checkbox" :checked="todo.done" @click="$emit('toggleDoneTodo')" />
        <input readonly :value="focused ? todo.content : todo.shortContent" :class="{ 'line-through': todo.done }" @focus="focused = true" @blur="focused = false"/>
        <button class="font-bold text-red-500 hover:text-red-700" @click="$emit('removeTodo')">X</button>
    </div>
</template>