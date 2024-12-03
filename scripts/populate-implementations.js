const { writeFileSync } = require('fs')
const path = require('path')

const standards = require('../data/standards.json')

const projectStatus = ['incubating', 'active', 'retiring']
const implementationPriority = ['expected', 'deferrable', 'recommended']
const data = {}
const files = {}

// Basic structure of the data object
projectStatus.forEach(status => {
  data[status] = {}
  files[status] = ''
  implementationPriority.forEach(priority => {
    data[status][priority] = []
  })
})

// Populate the data object
standards.forEach(item =>
  projectStatus.forEach(status => {
    const statusData = item[status]?.toLowerCase()
    if (implementationPriority.includes(statusData)) {
      data[status][statusData].push(item)
    }
  })
)

const addHeader = () => `
| Section | Item | Priority Group | Details |
| --- | --- | --- | --- |`
const addRow = (item) => `| ${item.section} | ${item.title} | ${item['priority group']} | [details](/details/${item.slug}) |`

// Prepare the markdown files
projectStatus.forEach((status, index) => {
  let fileContent = `---
sidebar_position: ${index + 1}
id: ${status}
title: ${status.charAt(0).toUpperCase() + status.slice(1)}
slug: /implementations/${status}
---

`

  fileContent += implementationPriority.map(priority => {
    if (data[status][priority].length === 0) return ''

    return `
## ${priority.charAt(0).toUpperCase() + priority.slice(1)}
${addHeader()}
${data[status][priority].map(addRow).join('\n')}
    `
  }).join('\n')

  const detination = path.join(process.cwd(), `docs/implementation/${status}.mdx`)
  writeFileSync(detination, fileContent)
})
