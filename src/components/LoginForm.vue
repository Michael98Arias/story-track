<template>
    <q-card>
        <q-card-section>
            <q-form @submit.prevent="login">
                <q-input v-model="formLogin.username" color="secondary" filled
                    :label="t('mainLayout.loginPage.form.username')"
                    :placeholder="t('mainLayout.loginPage.form.usernamePlaceholder')" />

                <q-input v-model="formLogin.password" color="secondary" filled
                    :type="showPassword ? 'text' : 'password'" :label="t('mainLayout.loginPage.form.password')"
                    :placeholder="t('mainLayout.loginPage.form.passwordPlaceholder')">
                    <template v-slot:append>
                        <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="togglePasswordVisibility" />
                    </template>
                </q-input>

                <q-banner v-if="error" class="bg-red text-white q-mt-md">
                    {{ error }}
                </q-banner>
            </q-form>
        </q-card-section>

        <q-card-actions align="center">
            <q-btn color="secondary" :label="t('mainLayout.loginPage.buttons.login')" :disable="!isFormValidLogin"
                @click="login" />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { useLogin } from 'src/composables/useLogin';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { formLogin, showPassword, togglePasswordVisibility, login, isFormValidLogin, error } = useLogin();
</script>