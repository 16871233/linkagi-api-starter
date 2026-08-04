import { readFile } from 'node:fs/promises'

for (const file of process.argv.slice(2)) {
  const config = JSON.parse(await readFile(file, 'utf8'))
  if (Object.hasOwn(config.settings ?? {}, 'apiKey')) {
    throw new Error(`${file}: remove apiKey before generating a public link`)
  }
  const encoded = Buffer.from(JSON.stringify(config), 'utf8').toString('base64')
  console.log(`${file}\nchatbox://provider/import?config=${encoded}\n`)
}
