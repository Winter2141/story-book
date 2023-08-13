<script setup>
    import Checkbox from '@/components/Basic/Checkbox.vue';
    import InputError from '@/components/Basic/InputError.vue';
    import InputLabel from '@/components/Basic/InputLabel.vue';
    import PrimaryButton from '@/components/Basic/PrimaryButton.vue';
    import TextInput from '@/components/Basic/TextInput.vue';
    import GuestLayout from '@/layouts/GuestLayout'
    import store from '@/store'
    import {reactive, watch} from 'vue';
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const { dispatch } = store;

    const form = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = () => {
        dispatch("register", form)
    };
    watch(() => store.getters.message, () => {
        if(store.getters.message === 'registered') {
            router.push("/login");
            alert("Registered");
        } else {
            form.errors = store.getters.message;
        }
    })
</script>

<template>
    <GuestLayout>
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="name" value="Name" />
                <TextInput
                        id="name"
                        v-model="form.name"
                        type="text"
                        class="mt-1 block w-full"
                        required
                        autofocus
                        autocomplete="name"
                />
                <InputError class="mt-2" :message="form.errors?.name" />
            </div>

            <div class="mt-4">
                <InputLabel for="email" value="Email" />
                <TextInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="mt-1 block w-full"
                        required
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
                <router-link to="/login" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Already registered?
                </router-link>

                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Register
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
