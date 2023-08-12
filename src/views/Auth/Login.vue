<script setup>
    import Checkbox from '@/components/Basic/Checkbox.vue';
    import GuestLayout from '@/layouts/GuestLayout.vue';
    import InputError from '@/components/Basic/InputError.vue';
    import InputLabel from '@/components/Basic/InputLabel.vue';
    import PrimaryButton from '@/components/Basic/PrimaryButton.vue';
    import TextInput from '@/components/Basic/TextInput.vue';
    import store from '@/store'
    import {reactive, watch} from 'vue';
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const { dispatch } = store;
    defineProps({
        canResetPassword: {
            type: Boolean,
        },
        status: {
            type: String,
        },
    });

    const form = reactive({
        email: '',
        password: '',
        remember: false,
        errors: null
    });

    const submit = () => {
        dispatch("login", form)
    };
    watch(() => store.getters.message, () => {
        form.errors = { "email": store.getters.message};
    })
    watch(() => store.getters.user, () => {
        console.log(store.getters.user?.role);
        router.push({ name: "story" });
    })
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

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

            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                        id="password"
                        type="password"
                        class="mt-1 block w-full"
                        v-model="form.password"
                        required
                        autocomplete="current-password"
                />

                <InputError class="mt-2" :message="form.errors?.password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-center flex-col gap-4 mt-2">
                <router-link
                        :to="{ name: 'forget-password' }"
                        class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Forgot your password?
                </router-link>

                <PrimaryButton class="ml-4 w-full justify-center" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Log in
                </PrimaryButton>
                <p class="text-sm">
                    Don't your have an account? <router-link class="underline" to="/register">register here</router-link>
                </p>
            </div>
        </form>
    </GuestLayout>
</template>
