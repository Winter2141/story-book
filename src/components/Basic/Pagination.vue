<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <div>
                <label for="per_page" class="mr-2">Items per Page:</label>
                <select v-model="pageCount" id="per_page" @change="changePerPage" class="border px-2 py-1 rounded">
                    <option v-for="option in per_pageOptions" :key="option" :value="option">{{ option }}</option>
                </select>
            </div>
            <div class="mt-4" v-if="last_page > 1">
                <ul class="flex space-x-2">
                    <li>
                        <button @click="goToPage(1)" :disabled="current_page === 1" class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">First</button>
                    </li>
                    <li>
                        <button @click="prevPage" :disabled="current_page === 1" class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">Prev</button>
                    </li>
                    <template v-for="pageNumber in displayPageNumbers" :key="pageNumber">
                        <li>
                            <button @click="goToPage(pageNumber)" :class="pageNumber === current_page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'" class="px-2 py-1 rounded hover:bg-blue-600">
                                {{ pageNumber }}
                            </button>
                        </li>
                    </template>
                    <li>
                        <button @click="nextPage" :disabled="current_page >= last_page" class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">Next</button>
                    </li>
                    <li>
                        <button @click="goToPage(last_page)" :disabled="current_page >= last_page" class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">Last</button>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="paginatedItems.length === 0" class="text-center">No items found.</div>
        <template v-else>
            <slot/>
        </template>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';

    const props = defineProps({
        pagination: Object
    })

    const emit = defineEmits(['page-change'])
    const current_page = ref(props.pagination.current_page)
    const per_page = ref(props.pagination.per_page)
    const total = ref(props.pagination.total)
    const last_page = ref(props.pagination.last_page)
    const paginatedItems = props.pagination.data;
    const per_pageOptions = [10, 20, 30, 40, 50];
    const pageCount = ref(per_page);

    const renderDisplayNumbers = () => {
        const fixedPageCount = 1; // Number of pages to display before and after the current page
        const middlePage = Math.max(fixedPageCount, Math.min(last_page.value - fixedPageCount + 1, current_page.value));

        const pageNumbers = [];

        if (middlePage > fixedPageCount + 1) {
            pageNumbers.push('...');
        }

        for (let i = middlePage - fixedPageCount; i <= middlePage + fixedPageCount; i++) {
            if (i > 0 && i <= last_page.value) {
                pageNumbers.push(i);
            }
        }
        if (middlePage < last_page.value - fixedPageCount) {
            pageNumbers.push('...');
        }

        return pageNumbers;
    }
    const displayPageNumbers = ref(renderDisplayNumbers());



    const goToPage = (page) => {
        if (page >= 1 && page <= last_page.value) {
            emit('page-change', page, pageCount.value);
        }
    };

    const prevPage = () => {
        if (current_page.value > 1) {
            goToPage(current_page.value - 1);
        }
    };

    const nextPage = () => {
        if (current_page.value < last_page.value) {
            goToPage(current_page.value + 1);
        }
    };

    const changePerPage = () => {
        goToPage(1);
    };

    watch(() => props.pagination, () => {
        current_page.value = props.pagination.current_page
        per_page.value = props.pagination.per_page
        total.value = props.pagination.total;
        last_page.value = props.pagination.last_page;
        displayPageNumbers.value = renderDisplayNumbers();
    }, { immediate: true });
</script>
