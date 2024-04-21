<script setup>
import { ref, onMounted, watch } from 'vue'
import TodoItem from './components/TodoItem.vue';

const todos = ref([])
const input_content = ref('')
const input_category = ref(null)

/**
 * Add a new todo to the list
 * Checks if the input is empty or the category is not selected
 */
function addTodo() {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return
  }

  todos.value.push({
    id: todos.value.length + 1,
    content: input_content.value,
    shortContent: input_content.value.length > 20 ? input_content.value.slice(0, 20) + '...' : input_content.value,
    category: input_category.value,
    done: false
  })

  input_content.value = ''
  input_category.value = null
}

/**
 * Toggle the done status of a todo
 * @param {*} todo Todo to be toggled
 */
function toggleDoneTodo(todo) {
  todo.done = !todo.done
}

/**
 * Remove a todo from the list
 * @param {*} todo Todo to be removed
 */
function removeTodo(todo) {
  todos.value = todos.value.filter(t => t !== todo)
}

/**
 * Watch for changes in todos and name and save them to localStorage
 */
watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

/**
 * Load todos and name from localStorage
 */
onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
  <main class="flex justify-center">
    <div class="flex flex-col md:flex-row gap-10">
      <!-- Create a TODO form -->
      <section class="text-center bg-gray-200 rounded-lg shadow-lg shadow-gray-500 mt-5">
        <h3 class="bg-blue-600 text-white font-bold rounded-t-lg pt-2 pb-1">CREATE A TODO</h3>
        <form class="ml-3 mr-3" @submit.prevent="addTodo">
          <!-- Todo content field -->
          <h4 class="mt-2 mb-1 font-semibold">What's on your todo list?</h4>
          <input class="mb-5 rounded-lg p-1 w-full bg-slate-50" type="text" placeholder="e.g. Buy groceries" v-model="input_content" />
          <!-- Todo category field -->
          <h4 class="font-semibold">Pick a category</h4>
          <div class="flex justify-center gap-10">
            <label class="flex">
              <input class="mr-2" type="radio" name="category" value="business" v-model="input_category" />
              <div>Business</div>
            </label>
            <label class="flex">
              <input class="mr-2" type="radio" name="category" value="personal" v-model="input_category" />
              <div>Personal</div>
            </label>
          </div>
          <!-- Todo submit button -->
          <input class="bg-slate-50 hover:bg-blue-600 hover:text-white hover:shadow-none hover:font-semibold p-2 shadow-md shadow-gray-500 rounded-lg mt-4 mb-5 transition-all ease-in-out" type="submit" value="Add Todo">
        </form>
      </section>
      <!-- Todo list -->
      <section class="text-center bg-gray-200 rounded-lg shadow-lg shadow-gray-500 mt-5 pb-2">
        <h3 class="bg-blue-600 text-white font-bold rounded-t-lg pt-2 pb-1">TODO LIST</h3>
        <div class="p-5" style="width: 280px">
          <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggleDoneTodo="toggleDoneTodo(todo)" @removeTodo="removeTodo(todo)" />
        </div>
      </section>
    </div>
  </main>
</template>