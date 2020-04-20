import { Editor, Transforms } from 'slate'
import { LIST_TYPES, NODE_TYPES } from './constants'

export function isMarkActive(editor, format) {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

export function toggleMark(editor, format) {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export function isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })

    return !!match
}

export function toggleBlock(editor, format) {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    })

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

export function isLinkActive(editor) {
    const [link] = Editor.nodes(editor, {
        match: n => n.type === NODE_TYPES.LINK,
    })
    return !!link
}

export function unwrapLink(editor) {
    Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}

export function wrapLink(editor, url) {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

export function insertLink(editor, url) {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}
