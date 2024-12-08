const { writeFileSync, existsSync, readFileSync } = require('fs')
const { updateOrCreateSegment } = require('@ulisesgascon/text-tags-manager')
const path = require('path')

const checks = require('../data/checks.json')
const listStartTag = '<!-- LIST:START -->'
const listEndTag = '<!-- LIST:END -->'

const projectStatus = ['incubating', 'active', 'retiring']
const implementationPriority = ['expected', 'deferrable', 'recommended']
const data = {}
const files = {}
// @TODO: Move this function to a shared file
const capitalizeWords = str => str.split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ')
// @TODO: Move this function to a shared file
const replaceMetadata = (fileContent, metadata) => {
  return fileContent.replace(/---[^]*?---/, metadata)
}

// Basic structure of the data object
projectStatus.forEach(status => {
  data[status] = {}
  files[status] = ''
  implementationPriority.forEach(priority => {
    data[status][priority] = []
  })
})

// Populate the data object
checks
  // @TODO: Remove this sort when the checks.json is sorted when generated in the dashboard script
  .sort((a, b) => a.id - b.id)
  .forEach(item =>
    projectStatus.forEach(status => {
      const statusKey = `level_${status}_status`
      const statusData = item[statusKey]?.toLowerCase()
      if (implementationPriority.includes(statusData)) {
        data[status][statusData].push(item)
      }
    })
  )

const addHeader = () => `
| Section | Item | Priority Group | Details |
| --- | --- | --- | --- |`
const addRow = (item) => `| ${item.section_number}. ${capitalizeWords(item.section_name)} | ${item.title} | ${item.priority_group} | [details](/details/${item.code_name}) |`

// Prepare the markdown files
projectStatus.forEach((status, index) => {
  const metadata = `---
sidebar_position: ${index + 1}
id: ${status}
title: ${status.charAt(0).toUpperCase() + status.slice(1)}
slug: /implementations/${status}
---`.trim()
  const listContent = implementationPriority.map(priority => {
    if (data[status][priority].length === 0) return ''

    return `
## ${priority.charAt(0).toUpperCase() + priority.slice(1)}
${addHeader()}
${data[status][priority].map(addRow).join('\n')}
`
  }).join('\n')

  let fileContent = `${metadata}

${listStartTag}
${listContent}
${listEndTag}
`
  const updateContent = (currentContent) => {
    fileContent = currentContent
    replaceMetadata(fileContent, metadata)
    fileContent = updateOrCreateSegment({
      original: fileContent,
      replacementSegment: listContent,
      startTag: listStartTag,
      endTag: listEndTag
    })
  }

  const destination = path.join(process.cwd(), `docs/implementation/${status}.mdx`)
  const fileExists = existsSync(destination)
  if (fileExists) {
    const currentFileContent = readFileSync(destination, 'utf8')
    updateContent(currentFileContent)
  }
  writeFileSync(destination, fileContent)
})
