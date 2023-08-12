<script setup>
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white border-b border-gray-100">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            </div>

            <!-- Responsive Navigation Menu -->
            <div
                    class="sm:hidden"
            >
                <div class="pt-2 pb-3 space-y-1">
                </div>
            </div>
        </nav>
        <div class="flex flex-col sm:justify-center items-center pt-6">
            <div>
            </div>
            <div
                    class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
            >
                <slot />
            </div>
        </div>
    </div>
</template>
