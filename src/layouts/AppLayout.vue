<script setup>
    defineProps({
        title: String,
    });

</script>

<template>
    <div class="w-full">
        <Head :title="title" />
        <div class="min-h-screen bg-gray-100">
            <div class="flex flex-nowrap">
                <div class="w-full h-16 text-left">
                    <nav>
                        <router-link to="/">Home</router-link> |
                        <router-link to="/story">Story</router-link>
                    </nav>
                </div>
            </div>
            <div class="flex flex-nowrap">
                <div class="page-main-body overflow-auto w-full bg-white">
                    <header v-if="$slots.header" class="">
                        <div class="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <slot name="header" />
                        </div>
                    </header>
                    <!-- Page Content -->
                    <main class="h-full">
                        <slot />
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    .page-main-body {
        max-height: calc(100vh - 70px);
        min-height: calc(100vh - 70px);
    }
    body {
        overflow: hidden;
    }
    .left-22 {
        left: 5.6rem;
    }
</style>
