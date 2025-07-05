export interface Item {
  name: string
  url: string
  description?: string
}

export interface SubSubSection {
  name: string
  items: Item[]
}

export interface SubSection {
  name: string
  items: Item[]
  subSubSections: SubSubSection[]
}

export interface Section {
  name: string
  items: Item[]
  subSections: SubSection[]
}

function parseItems(items: string[]) {
  if (items == null) {
    return []
  }

  return items
    .join('\n')
    .split('- ')
    .filter(Boolean)
    .map((item) => {
      const [link, description] = item.split(/\n/).filter(Boolean)
      const match = link.match(/\[(?<name>[^\]]+)\]\((?<url>[^)]+)\)/)
      const name = match?.groups?.name ?? ''
      const url = match?.groups?.url ?? ''

      return {
        name,
        url,
        description,
      }
    })
}

export function parseMarkdown(content: string): Section[] {
  const sections = content
    .split(/\n## /)
    .filter(section => section.trim() !== '')
    .map((section) => {
      const [name, ...subSections] = section.split(/\n### /).filter(Boolean)
      const [sectionName, ...items] = name.split(/\n/).filter(Boolean)
      const sectionItems = parseItems(items)

      if (subSections.length === 0) {
        return {
          name: sectionName,
          items: sectionItems,
          subSections: [],
        }
      } else {
        return {
          name: sectionName,
          items: sectionItems,
          subSections: subSections.map((subSection) => {
            const [subSectionName, ...subSubSections] = subSection.split(/\n#### /).filter(Boolean)
            const [subName, ...subItems] = subSectionName.split(/\n/).filter(Boolean)
            const subSectionItems = parseItems(subItems)

            if (subSubSections.length === 0) {
              return {
                name: subName.trim(),
                items: subSectionItems,
                subSubSections: [],
              }
            } else {
              return {
                name: subName.trim(),
                items: subSectionItems,
                subSubSections: subSubSections.map((subSubSection) => {
                  const [subSubSectionName, ...subSubItems] = subSubSection.split(/\n/).filter(Boolean)
                  return {
                    name: subSubSectionName.trim(),
                    items: parseItems(subSubItems),
                  }
                }),
              }
            }
          }),
        }
      }
    })

  return sections
}
