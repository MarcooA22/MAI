import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

function getBase(): string {
  try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim()
    const repoName = remoteUrl.split('/').pop()?.replace(/\.git$/, '')
    return repoName ? `/${repoName}/` : '/'
  } catch {
    return '/'
  }
}

export default defineConfig({
  plugins: [react()],
  base: getBase(),
})
