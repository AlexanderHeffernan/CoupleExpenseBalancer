import { ref } from 'vue';

export const isLoading = ref(true);
export const currentPage = ref('home');
export const isAccountPageOpen = ref(false);

export function startLoading() {
    isLoading.value = true;
}

export function stopLoading() {
    isLoading.value = false;
}

export function changePage(page) {
    currentPage.value = page;
}

export function toggleAccountPage() {
    isAccountPageOpen.value = !isAccountPageOpen.value;
}