import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ['client/dist/*']},
  { files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  pluginVue.configs["flat/essential"],
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ['**/*.vue'], rules: { 'vue/multi-word-component-names': ['error', { ignores: ['Loading', 'Logo', 'Navbar', 'History'] }] } },
]);
