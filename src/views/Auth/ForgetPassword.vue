<script setup>
    import GuestLayout from '@/layouts/GuestLayout.vue';
    import InputError from '@/components/Basic/InputError.vue';
    import InputLabel from '@/components/Basic/InputLabel.vue';
    import PrimaryButton from '@/components/Basic/PrimaryButton.vue';
    import SecondaryButton from '@/components/Basic/SecondaryButton.vue';
    import TextInput from '@/components/Basic/TextInput.vue';
    import { reactive } from 'vue'

    defineProps({
        status: {
            type: String,
        },
    });

    const form = reactive({
        email: '',
    });

    const submit = () => {
    };

    const goBack = () => {
        history.back();
    }
</script>

<template>
    <GuestLayout>
        <Head title="Forgot Password" />

        <div class="mb-4 text-sm text-gray-600">
            Enter the email you use to login and a link will
            be send to your email to reset your password.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                        id="email"
                        type="email"
                        class="mt-1 block w-full"
                        v-model="form.email"
                        required
                        autofocus
                        autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors?.email" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <SecondaryButton :class="{ 'opacity-25': form.processing }" class="mr-2" @click="goBack" :disabled="form.processing">
                    Back
                </SecondaryButton>
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Reset Password
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
