import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'public'), // Укажите корневую директорию, если index.html находится не в корне проекта
});