const { writeFileSync } = require('fs')
const path = require('path')

const standards = require('../data/standards.json')

const addContent = (content) => {
  if (typeof content === 'string') {
    return content
  }

  return `[${content.description}](${content.url})`
}
// Prepare the markdown files
standards.forEach((item, index) => {
  const fileContent = `---
sidebar_position: ${index + 1}
id: ${item.slug}
title: ${item.title}
slug: /details/${item.slug}
---

# ${item.title}

## Use Case

- Incubating: ${item.incubating}
- Active: ${item.active}
- Retiring: ${item.retiring}

## Description

${item.description}

## Details

- C-SCRM: ${item['c-scrm']}
- Priority Group: ${item['priority group']}
- Mitre: ${addContent(item.mitre)}
- Sources: ${addContent(item.sources)}
- How To: ${addContent(item['how to'])}

`
  const detination = path.join(process.cwd(), `docs/details/${item.slug}.mdx`)
  writeFileSync(detination, fileContent)
})
