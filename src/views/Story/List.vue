<script setup>
    import AppLayout from '@/layouts/AppLayout'
    import { onMounted, ref, reactive } from 'vue';
    import store from '@/store'


    const { dispatch } = store;
    const storyList = ref([]);
    const searchForm = reactive({
        keyword: null
    })
    const fetchStory = () => {
        dispatch("fetchStory", searchForm);
    }
    onMounted(() => {
        fetchStory();
    })
</script>

<template>
    <app-layout title="Story List">

    </app-layout>
</template>

<style scoped>

</style>