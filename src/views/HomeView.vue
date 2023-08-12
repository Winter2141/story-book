<script setup>
  import AppLayout from '@/layouts/AppLayout'
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import store from '@/store'; // Adjust the path to your auth module

  const router = useRouter();
  const { dispatch } = store;
  const user = store.getters.user;

  const publicStoryCount = ref(10); // Replace with your actual story count
  const privateStoryCount = ref(5); // Replace with your actual story count
  const totalOwnedStoryCount = computed(() => publicStoryCount.value + privateStoryCount.value);

  const logout = () => {
    dispatch('logout');
    router.push({ name: "login" })
  }
  const getRoleDescription = (role) => {
    if (role === 1) {
      return 'Has all permissions (create, update, delete, read) to stories.';
    } else if (role === 2) {
      return 'Can read and update their own stories, can only read published stories that are owned by other users.';
    } else {
      return 'Role details not available.';
    }
  };
</script>
<template>
  <AppLayout>
    <div class="home">
      <div class="bg-gray-100 min-h-screen">
        <div class="container mx-auto px-4 py-8">

          <div class="my-6 text-right">
            <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" @click="logout">Logout</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-xl font-semibold mb-4">Welcome, {{ user.name }}</h2>

              <div class="flex items-center text-gray-600">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <p class="text-sm">Email: {{ user.email }}</p>
              </div>
              <div class="flex items-center mt-4 text-gray-600">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                </svg>
                <p class="text-sm">Role: {{ user.role === 1 ? 'Admin' : 'Normal User' }}</p>
              </div>
              <div class="mt-4">
                <h4 class="text-md font-semibold mb-1">Role Details:</h4>
                <p class="text-gray-600">{{ getRoleDescription(user.role) }}</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Story Counts</h3>
<!--                <router-link :to="{ name: 'edit-profile' }" class="text-blue-500 hover:underline">Edit Profile</router-link>-->
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                  <p class="text-sm uppercase font-semibold mb-2">Public Stories</p>
                  <p class="text-2xl">{{ publicStoryCount }}</p>
                </div>

                <div class="bg-green-500 text-white p-4 rounded-lg shadow-md">
                  <p class="text-sm uppercase font-semibold mb-2">Private Stories</p>
                  <p class="text-2xl">{{ privateStoryCount }}</p>
                </div>

                <div class="bg-yellow-500 text-white p-4 rounded-lg shadow-md col-span-2 md:col-span-1">
                  <p class="text-sm uppercase font-semibold mb-2">Total Owned Stories</p>
                  <p class="text-2xl">{{ totalOwnedStoryCount }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
