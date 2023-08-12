<script setup>
    import InputError from '@/components/Basic/InputError.vue';
    import InputLabel from '@/components/Basic/InputLabel.vue';
    import PrimaryButton from '@/components/Basic/PrimaryButton.vue';
    import TextInput from '@/components/Basic/TextInput.vue';
    import GuestLayout from '@/layouts/GuestLayout'
    import { reactive } from 'vue'

    const props = defineProps({
        email: String,
        token: String,
        title: {
            type: String,
            default: "Reset Password"
        },
    });

    const form = reactive({
        token: props.token,
        email: props.email,
        password: '',
        password_confirmation: '',
    });

    const submit = () => {
    };
</script>

<template>
    <GuestLayout>
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="mt-1 block w-full"
                        required
                        autofocus
                        autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors?.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                        id="password"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-full"
                        required
                        autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors?.password" />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <TextInput
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        type="password"
                        class="mt-1 block w-full"
                        required
                        autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors?.password_confirmation" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ title }}
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
