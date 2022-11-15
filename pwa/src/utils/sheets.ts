// @ts-nocheck
// This is only used by our developers and was originally js

import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import usei18n from '../composables/usei18n'

const { AVAILABLE_LOCALES } = usei18n()

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets.readonly',
]
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(
  process.cwd(),
  '/src/utils/token.json',
)
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  '/src/utils/mct-birds-translations.json',
)
console.log(CREDENTIALS_PATH)

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content: Buffer = await fsPromises.readFile(
      TOKEN_PATH,
    )
    const credentials = JSON.parse(content.toString())
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
  const content = await fsPromises.readFile(
    CREDENTIALS_PATH,
  )
  const keys = JSON.parse(content.toString())
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fsPromises.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function generateMessagesForLocales(auth: any) {
  const sheets = google.sheets({ version: 'v4', auth })

  AVAILABLE_LOCALES.map(async (locale) => {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId:
        '1XtHJVf7jJGY-im3M6Au8gW-A_J32BW5pAsEo8VLucpg',
      range: locale,
    })
    const rows = res.data.values

    if (!rows || rows.length === 0) {
      console.log('No data found.')
      return
    }

    rows!.shift()

    const translations = { [locale]: {} }
    for (const row of rows) {
      // @ts-ignore
      translations[locale][row[0]] = row[2]
    }

    await fsPromises.writeFile(
      path.join(process.cwd(), `/src/locales/${locale}.json`), JSON.stringify(translations)),
    // translations[locale] = rows!.map((row) => ({[row[0]]: row[2]}))

    console.log(translations)
  })
}

authorize()
  .then(generateMessagesForLocales)
  .catch(console.error)
