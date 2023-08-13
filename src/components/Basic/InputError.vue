<script setup>
defineProps({
    message: {
        default: null
    },
});
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-red-600">
            {{ (typeof message === 'object' && message?.length) ? message[0] : message }}
        </p>
    </div>
</template>
