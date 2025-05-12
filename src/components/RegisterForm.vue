<template>
    <q-card>
        <q-card-section>
            <q-form @submit.prevent="register">
                <q-input v-model="form.username" color="secondary" filled
                    :label="t('mainLayout.registerPage.form.username')"
                    :placeholder="t('mainLayout.registerPage.form.usernamePlaceholder')" class="q-mb-md"
                    @update:model-value="isUsernameValid(form.username)" />

                <q-input v-model="form.email" color="secondary" filled type="email"
                    :label="t('mainLayout.registerPage.form.email')"
                    :placeholder="t('mainLayout.registerPage.form.emailPlaceholder')" class="q-mb-md"
                    @update:model-value="isEmailValid(form.email)" />

                <q-input v-model="form.firstName" color="secondary" filled
                    :label="t('mainLayout.registerPage.form.firstName')"
                    :placeholder="t('mainLayout.registerPage.form.firstNamePlaceholder')" class="q-mb-md"
                    @update:model-value="isFirstNameValid(form.firstName)" />

                <q-input v-model="form.lastName" color="secondary" filled
                    :label="t('mainLayout.registerPage.form.lastName')"
                    :placeholder="t('mainLayout.registerPage.form.lastNamePlaceholder')" class="q-mb-md"
                    @update:model-value="isLastNameValid(form.lastName)" />

                <q-input v-model="form.password" color="secondary" filled :type="showPassword ? 'text' : 'password'"
                    :label="t('mainLayout.registerPage.form.password')"
                    :placeholder="t('mainLayout.registerPage.form.passwordPlaceholder')" class="q-mb-md"
                    @update:model-value="isPasswordValid(form.password)">
                    <template v-slot:append>
                        <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="togglePassword" />
                    </template>
                </q-input>
                <q-banner class="q-mt-md"
                    :class="{ 'bg-grey-3': getProgress() < 100, 'bg-green-4': getProgress() === 100 }">
                    <div class="q-mb-sm">
                        <span>{{ t('mainLayout.registerPage.validationProgress') }}</span>
                        <q-linear-progress :value="getProgress()" color="secondary" size="sm" />
                    </div>
                    <ul>
                        <li :class="{ 'text-green': rules.username, 'text-grey': !rules.username }">{{
                            t('mainLayout.registerPage.validation.username') }}</li>
                        <li :class="{ 'text-green': rules.email, 'text-grey': !rules.email }">{{
                            t('mainLayout.registerPage.validation.email') }}</li>
                        <li :class="{ 'text-green': rules.firstName, 'text-grey': !rules.firstName }">{{
                            t('mainLayout.registerPage.validation.firstName') }}</li>
                        <li :class="{ 'text-green': rules.lastName, 'text-grey': !rules.lastName }">{{
                            t('mainLayout.registerPage.validation.lastName') }}</li>
                        <li :class="{ 'text-green': rules.password, 'text-grey': !rules.password }">{{
                            t('mainLayout.registerPage.validation.password') }}</li>
                    </ul>
                </q-banner>
            </q-form>
        </q-card-section>

        <q-card-actions align="center">
            <q-btn color="secondary" :label="t('mainLayout.registerPage.buttons.register')" :disable="!isFormValid"
                @click="register" />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { useRegister } from 'src/composables/useRegister';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { form, showPassword, togglePassword, isFormValid, register, rules, getProgress,
    isUsernameValid, isEmailValid, isFirstNameValid, isLastNameValid, isPasswordValid } = useRegister();
</script>
