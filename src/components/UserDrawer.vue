<template>
    <q-drawer v-model="modelValue" side="right" overlay bordered behavior="mobile">
        <q-toolbar class="q-px-md q-pt-sm">
            <q-toolbar-title>{{ t('mainLayout.profile.titles.profile') }}</q-toolbar-title>

            <q-btn v-if="$q.screen.width < 720" dense flat round icon="close" @click="modelValue = false"
                class="q-ml-auto" />
        </q-toolbar>

        <q-list class="q-pa-md">
            <div v-if="user" class="column items-center q-mb-md">
                <q-avatar size="90px">
                    <img :src="user.avatar">
                </q-avatar>
                <q-separator class="q-my-sm" />

                <div v-if="user.firstName && user.lastName" class="q-mb-md q-mt-sm text-center">
                    <div class="text-h6 q-mt-sm">{{ t('mainLayout.profile.titles.name') }}</div>
                    <div class="text-caption">{{ user.firstName + ' ' + user.lastName }}</div>
                </div>

                <div v-if="user.email" class="q-mb-md q-mt-sm text-center">
                    <div class="text-h6 q-mt-sm">{{ t('mainLayout.profile.titles.email') }}</div>
                    <div class="text-caption">{{ user.email }}</div>
                </div>

                <div v-if="user.username" class="q-mb-md q-mt-sm text-center">
                    <div class="text-h6 q-mt-sm">{{ t('mainLayout.profile.titles.username') }}</div>
                    <div class="text-caption">{{ user.username }}</div>
                </div>
            </div>

            <q-separator class="q-my-sm" />

            <q-item clickable @click="logout">
                <q-item-section avatar>
                    <q-icon name="logout" />
                </q-item-section>
                <q-item-section>{{ t('mainLayout.profile.buttons.logOut') }}</q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/data-store';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { useUserProfile } from 'src/composables/useUserProfile';
import type { UserLoginResponse } from 'src/interfaces/login.interface';

const { t } = useI18n();
const { user, loadProfile, signOut } = useUserProfile();
const modelValue = defineModel<boolean | null>({ default: false });
const authStore = useAuthStore();

watch(() => authStore.userStore, (newValue) => {
    if (newValue && Object.keys(newValue).length > 0) {
        loadProfile(newValue as UserLoginResponse);
    }
}, { immediate: true });

function logout() {
    signOut();
    modelValue.value = false;
}
</script>
