<script setup>
    import AppLayout from '@/layouts/AppLayout'
    import { onMounted, ref, reactive, watch, computed } from 'vue';
    import apiClient from '@/api';
    import PrimaryButton from '@/components/Basic/PrimaryButton'
    import DangerButton from '@/components/Basic/DangerButton'
    import SecondaryButton from '@/components/Basic/SecondaryButton'
    import TextInput from '@/components/Basic/TextInput'
    import Pagination from '@/components/Basic/Pagination'
    import { useRoute, useRouter } from 'vue-router';
    import store from '@/store';

    const user = store.getters.user;
    const route = useRoute();
    const router = useRouter();
    const storyData = ref(null);
    const searchForm = reactive({
        keyword: route.query?.keyword,
        own_type: route.query?.own_type,
        page: route.query?.page,
        per_page: route.query?.per_page
    });
    const fetchStory = async () => {
        try {
            const response = await apiClient.getStory(searchForm);
            router.push({ query: {
                    keyword: searchForm?.keyword,
                    own_type: searchForm?.own_type,
                    page: searchForm?.page,
                    per_page: searchForm?.per_page
                }, replace: true });
            if(response.data) {
                storyData.value = response.data;
                searchForm.page = response.data.current_page;
                searchForm.per_page = response.data.per_page;
            }
        } catch(error) {
            console.error("Error fetching stories:::", error);
        }
    }
    onMounted(() => {
        fetchStory();
    });

    const pageChange = (page, per_page) => {
        searchForm.page = page;
        searchForm.per_page = per_page;
        fetchStory();
    }

    const deleteStory = (id) => {
        if(confirm("Delete the story. Really?")) {
            apiClient.deleteStory(id);
            fetchStory();
        }
    }
</script>

<template>
    <app-layout title="Story List">
        <template #header>
            <h1 class="text-left font-bold text-3xl">Story List</h1>
        </template>

        <div>
            <div class="text-right flex justify-between px-10 items-center gap-4">
                <div class="flex gap-4 items-center">
                    <text-input @change="fetchStory" v-model="searchForm.keyword" placeholder="Search by title or content" class="w-64"/>

                    <select @change="fetchStory" v-model="searchForm.own_type" class="py-1 border border-black rounded pl-2">
                        <option :value="null">Own Type</option>
                        <option :value="1">All</option>
                        <option :value="2">Mine</option>
                    </select>
                </div>
                <div class="flex gap-4">
                    <primary-button v-if="user?.role === 1" @click="router.push('/story/create')">Create</primary-button>
                </div>
            </div>

            <div class="mt-12 px-10">
                <template v-if="storyData && storyData?.data?.length">
                    <div class="mt-4">
                        <Pagination :pagination="storyData" @page-change="pageChange">
                            <div class="grid grid-cols-4 w-full gap-6 justify-start items-start">
                                <template v-for="story in storyData?.data">
                                    <div class="bg-white rounded shadow p-4 h-full flex flex-col justify-between border-t-2 border-orange-600">
                                        <div class="">
                                            <div class="font-semibold text-lg">{{ story.title }}</div>
                                            <div class="mt-2 text-left">{{ story.content }}</div>
                                        </div>
                                        <div class="flex items-center justify-between mt-4 flex justify-between">
                                            <p class="italic">By: {{ story.user?.name }}</p>
                                            <div class="flex gap-4">
                                                <router-link :to="`/story/detail/${story.id}`" class="btn-update">Read</router-link>
                                                <button v-if="user?.role === 1" class="btn-delete" @click="deleteStory(story.id)">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </Pagination>
                    </div>
                </template>
            </div>
        </div>
    </app-layout>
</template>

<style>
    .btn-update {
        @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
    }

    .btn-delete {
        @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600;
    }
</style>