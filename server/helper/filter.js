import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import removeBackground from './removebg.js'
import { fileURLToPath } from 'url'

function validateOptions(option) {
  const validOption = ['blackwhite', 'sepia', 'invert', 'normalize', 'removebg']
  if (!validOption.includes(option)) {
    return null
  }
  return option
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
async function createFilePaths(originalFilePath, filterOption) {
  try {
    const sourceImagePath = path.resolve(__dirname, originalFilePath)
    const destinationPathDir = path.resolve(__dirname, '../../uploads-filtered')

    // Create the filtered-images directory if it doesn't exist
    await fs.mkdir(destinationPathDir, { recursive: true })

    // Build file names
    const originalFileName = path.basename(sourceImagePath)
    const fileExtension = path.extname(sourceImagePath)
    const fileNameOnly = path.basename(originalFileName, fileExtension)

    const filteredImageFileName = `${fileNameOnly}-${filterOption}${fileExtension}`
    const filteredImageFilePath = path.join(destinationPathDir, filteredImageFileName)

    return {
      fileName: filteredImageFileName,
      filePath: filteredImageFilePath,
    }
  } catch (error) {
    console.error('Unable to create file path:', error)
    throw new Error(`Error in createFilePaths: ${error.message}`)
  }
}

export default async function applyImageFilter(filePath, filterOption) {
  // Validate option
  if (!validateOptions(filterOption)) {
    throw new Error(`Unsupported filter: ${filterOption}`)
  }

  const filterPathObj = await createFilePaths(filePath, filterOption)

  let img = sharp(filePath)

  switch (filterOption) {
    case 'blackwhite':
      img = img.grayscale()
      break

    case 'sepia':
      img = img.modulate({ saturation: 0.5 }).tint('#704210')
      break

    case 'invert':
      img = img.negate()
      break

    case 'normalize':
      img = img.normalise()
      break

    case 'removebg':
      try {
        const imageBufferArray = await removeBackground(filePath, filterPathObj.fileName)
        const imageBuffer = Buffer.from(imageBufferArray)
        await fs.writeFile(filterPathObj.filePath, imageBuffer)
        return filterPathObj
      } catch (error) {
        throw new Error('Unable at apply removebg filter')
      }
  }

  await img.toFile(filterPathObj.filePath)

  return filterPathObj
}
