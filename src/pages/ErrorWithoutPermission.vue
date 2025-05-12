<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">503</div>

      <div class="text-h2" style="opacity: 0.4">
        {{ t('error.withoutPermission') }}
      </div>

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated no-caps :label="t('error.labelButton')"
        @click="redirectUser" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRedirectByAuth } from 'src/composables/useRedirectByAuth';
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'ErrorWithoutPermission' });

const { t } = useI18n();
const { redirectUser } = useRedirectByAuth();
</script>
