<template>
    <AppLayout>
        <div class="bg-white min-h-screen">
            <div class="container mx-auto px-4 py-8">
                <div class="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                    <h2 class="text-xl font-semibold mb-4">{{ editing ? 'Edit' : 'Create' }} Story</h2>

                    <form @submit.prevent="saveStory">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-600">Title</label>
                            <text-input v-model="story.title" type="text" id="title" name="title" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>

                            <input-error :message="story.errors?.title[0]" class="mt-2"/>
                        </div>

                        <div class="mb-4">
                            <label for="content" class="block text-sm font-medium text-gray-600">Content</label>
                            <textarea v-model="story.content" id="content" name="content" rows="4" class="mt-1 h-96 border border-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>

                            <input-error :message="story.errors?.content[0]" class="mt-2"/>
                        </div>

                        <div class="mb-4">
                            <label for="status" class="block text-sm font-medium text-gray-600">Status</label>
                            <select v-model="story.status" id="status" name="status" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option :value="1">Draft</option>
                                <option :value="2">Published</option>
                            </select>
                        </div>

                        <div class="flex gap-4 justify-center">
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{{ editing ? 'Save' : 'Create' }}</button>
                            <button type="button" @click="goBack" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
    import AppLayout from '@/layouts/AppLayout'
    import { ref, onMounted, reactive } from 'vue';
    import TextInput from '@/components/Basic/TextInput';
    import InputError from '@/components/Basic/InputError';
    import { useRouter, useRoute } from 'vue-router';
    import apiClient from '@/api'
    const router = useRouter();
    const route = useRoute();
    const editing = ref(false);
    const story = reactive({
        title: '',
        content: '',
        status: 1, // Default status,
        errors: null
    });

    const fetchStory = async (id) => {
        try {
            const response = await apiClient.getStoryById(id);
            if(response.data) {
                Object.assign(story, response.data);
                editing.value = true;
            }
        } catch (error) {
            console.error("FETCH STORY ERROR::", error);
        }
    }
    onMounted(() => {
        const storyId = route.params?.id;
        if(storyId) {
            fetchStory(storyId)
        }
    });
    const saveStory = async () => {
        const response = ref(null);
        try {
            if(editing.value && story.id) {
                response.value = await apiClient.updateStory(story, story.id)
            } else {
                response.value = await apiClient.createStory(story)
            }
            router.push('/story'); // Redirect back to dashboard after saving
        } catch (error) {
            console.log('POST STORY ERROR:::', error);
            if(error?.response?.data?.errors) {
                story.errors = error?.response?.data?.errors;
                console.log(story.errors, 'story.errors')
            }
        }
    };

    const goBack = () => {
        history.back();
    }
</script>
