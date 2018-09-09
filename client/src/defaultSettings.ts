import {
  SETTINGS_SOLUTION_ID,
  SETTINGS_FILE_ID,
  SETTINGS_JSON_LANGUAGE,
  ABOUT_FILE_ID,
} from './constants'

export const defaultSettings: ISettings = {
  editor: {
    theme: 'dark',
    font: { family: 'Menlo', size: 18, lineHeight: 24 },
    minimap: false,
    tabSize: 2,
    prettier: true,
    folding: true,
    linter: { mode: 'warning' },
  },
  hostSpecific: { officeOnline: { openEditorInNewTab: 'prompt' } },
  defaultActions: { applySettings: 'prompt', gistImport: 'prompt' },
}

const getSettingsFiles = (timestamp: number, settings?: ISettings): IFile[] => [
  {
    id: SETTINGS_FILE_ID,
    name: 'Settings',
    dateCreated: timestamp,
    dateLastModified: timestamp,
    language: SETTINGS_JSON_LANGUAGE,
    content:
      JSON.stringify(settings !== undefined ? settings : defaultSettings, null, 4) + '\n',
  },
  {
    id: ABOUT_FILE_ID,
    name: 'About',
    dateCreated: timestamp,
    dateLastModified: timestamp,
    language: 'plaintext',
    content: `Version 2.0.0`,
  },
]

const getSettingsSolution = (
  files: IFile[],
  timestamp: number,
): ISolutionWithFileIds => ({
  id: SETTINGS_SOLUTION_ID,
  name: 'User Settings',
  dateCreated: timestamp,
  dateLastModified: timestamp,
  host: 'ALL',
  files: files.map(f => f.id),
})

export const getSettingsSolutionAndFiles = (
  settings?: ISettings,
): {
  solution: ISolutionWithFileIds
  files: IFile[]
} => {
  const now = Date.now()
  const files = getSettingsFiles(now, settings)
  const solution = getSettingsSolution(files, now)
  return { solution, files }
}