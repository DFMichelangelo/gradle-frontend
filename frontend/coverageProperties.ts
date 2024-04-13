import { configDefaults } from 'vitest/config'
export const excludedFiles = [
  ...configDefaults.exclude,
]

export const includedFiles = [
  'src',
]

export function filesForSonarQube(files: string[]) {
  return files
    .map((file) => {
      if (
        !file.endsWith('"/**/*"') &&
        !file.endsWith('}') &&
        !file.endsWith('.tsx') &&
        !file.endsWith('.ts') &&
        !file.endsWith('.js') &&
        !file.endsWith('.cjs')
      )
        return file + '/**/*'
      return file
    })
    .map((file) => (file.startsWith('**/') ? file : '**/' + file))
    .join(',')
}
export const excludedFilesForSonarQube = () => filesForSonarQube(excludedFiles)
// export const includedFilesForSonarQube = () => filesForSonarQube(includedFiles)
