/**
 * 解析时兼容 Typora 将 $$ 写在正文后或列表缩进中的数学块写法。
 * 只替换 unified parser 的输入，不修改磁盘上的 Markdown 原文。
 */
function isFenceStart(line) {
  return /^\s{0,3}(\x60{3,}|~{3,})/.test(line)
}

function isInsideInlineCode(line, index) {
  return line.slice(0, index).split(String.fromCharCode(96)).length % 2 === 0
}

function hasFutureMarker(lines, index) {
  return lines.slice(index + 1).some((line) => line.includes('$$'))
}

function normalizeTyporaMath(source) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n')
  const normalized = []
  let inFence = false
  let inMath = false

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    if (isFenceStart(line)) {
      inFence = !inFence
      normalized.push(line)
      continue
    }

    if (inFence) {
      normalized.push(line)
      continue
    }

    if (inMath) {
      if (/^\s*\$\$\s*$/.test(line)) {
        normalized.push('$$')
        inMath = false
      } else {
        normalized.push(line.replace(/^ {1,3}/, ''))
      }
      continue
    }

    if (line.trim() === '$$' && hasFutureMarker(lines, index)) {
      normalized.push('$$')
      inMath = true
      continue
    }

    if (line.trim() === '$$') {
      normalized.push('')
      continue
    }

    const markerIndex = line.indexOf('$$')
    if (markerIndex !== -1 && hasFutureMarker(lines, index) && !isInsideInlineCode(line, markerIndex)) {
      const before = line.slice(0, markerIndex).trimEnd()
      const after = line.slice(markerIndex + 2).trimStart()

      if (before) normalized.push(before)
      normalized.push('$$')
      if (after) normalized.push(after)
      inMath = true
      continue
    }

    normalized.push(line)
  }

  return normalized.join('\n')
}

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
const remarkTyporaMath = function () {
  const parser = this.parser

  if (!parser) {
    throw new Error('remarkTyporaMath must run after remark-parse is configured')
  }

  this.parser = (document) => parser(normalizeTyporaMath(String(document)))

  return (_tree, _file) => {}
}

export default remarkTyporaMath
