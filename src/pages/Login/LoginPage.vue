<template>
    <q-page class="fullscreen-page">
        <q-card class="centered-card">
            <q-card-section>
                <q-tabs v-model="tab" class="text-secondary" align="center">
                    <q-tab name="login" icon="login" :label="t('mainLayout.loginPage.titles.main')" />
                    <q-tab name="register" icon="person_add" :label="t('mainLayout.registerPage.titles.main')" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="login">
                        <LoginForm />
                    </q-tab-panel>
                    <q-tab-panel name="register">
                        <RegisterForm />
                    </q-tab-panel>
                </q-tab-panels>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LoginForm from '../../components/LoginForm.vue';
import RegisterForm from '../../components/RegisterForm.vue';

const { t } = useI18n();
const tab = ref<'login' | 'register'>('login');
</script>

<style lang="scss" src="../../css/LoginPage.scss" scoped />
