<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>

<template>
  <h1>{{ t('hello') }}</h1>
  <select v-model="locale">
    <option value="ja">Japanese</option>
    <option value="en">English</option>
  </select>
</template>
