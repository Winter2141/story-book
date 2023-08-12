<template>
    <AppLayout>
        <div class="bg-gray-100 min-h-screen" v-if="story">
            <div class="container mx-auto px-4 py-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold mb-4">Story Detail</h2>

                    <div class="mb-4">
                        <h3 class="text-lg font-semibold">{{ story.title }}</h3>
                        <p class="text-gray-600">{{ formatDate(story.createdAt) }}</p>
                    </div>

                    <div class="mb-4">
                        <p>{{ story.content }}</p>
                    </div>

                    <div class="mb-4">
          <span class="px-2 py-1 text-sm rounded-full {{ getStatusColor(story.status) }}">
            {{ story.status ? "Draft" : "Published" }}
          </span>
                    </div>

                    <div class="flex gap-2 justify-center">
                        <router-link v-if="checkValidEdit()" :to="{ name: 'storyEdit', params: { id: story.id } }" class="text-blue-500 hover:underline">Edit Story</router-link>
                        <router-link :to="{ name: 'story' }" class="text-red-500 hover:underline">Back</router-link>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
    import AppLayout from '@/layouts/AppLayout'
    import { onMounted, ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import apiClient from "@/api";
    import store from '@/store';

    const user = store.getters.user;

    const router = useRouter();
    const route = useRoute();

    const story = ref(null);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const checkValidEdit = () => {
        if(story.value && user) {
            if(user?.role === 1 || (user?.role === 2 && user?.id === story.user_id)) {
                return true;
            }
            if(story.value?.user_relations?.length) {
                const vIndex = story.value.user_relations.findIndex(item => item.user_id === user.id);
                return vIndex !== -1;
            }
        }
        return false;
    }

    onMounted(() => {
        const storyId = route.params.id;
        const user = store.getters.user;
        if(storyId) {
            fetchStory(storyId)
        } else {

        }
    })

    const fetchStory = async (id) => {
        try {
            const response = await apiClient.getStoryById(id);
            if(response.data) {
                story.value = response.data;
            }
        } catch (error) {
            console.error("FETCH STORY ERROR::", error);
        }
    }

    const getStatusColor = (status) => {
        return status === 2 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white';
    };
</script>
