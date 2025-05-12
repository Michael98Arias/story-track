<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-header class="q-pa-md" elevated style="background-color: #f1f2ec; height: 77px;">
        <q-toolbar>
          <q-toolbar-title class="text-blue-10" style="font-family: 'Roboto Slab', serif;"></q-toolbar-title>
          <q-space />

          <q-btn class="q-ml-xl" flat color="secondary" icon="translate">
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable v-for="lang in dataHomePage.languages" :key="lang.code"
                  @click="changeLanguage(lang.code)">
                  <q-item-section>{{ lang.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <div v-if="authStore.isLoggedIn && authStore.isStandardUser" class="q-mr-lg">
            <q-btn flat color="secondary" icon="person" @click="showDrawer = true" />
          </div>

        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <UserDrawer v-model="showDrawer" />
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../stores/data-store';
import UserDrawer from 'src/components/UserDrawer.vue';

defineOptions({ name: 'MainLayout' });

const authStore = useAuthStore();
const showDrawer = ref(false);

const dataHomePage = reactive({
  languages: [
    { code: 'en-US', name: 'English' },
    { code: 'es', name: 'Spanish' },
  ],
  showMenu: false
})

const t = useI18n();
const changeLanguage = (langCode: string) => {
  t.locale.value = langCode;
  dataHomePage.showMenu = false;
};
</script>
