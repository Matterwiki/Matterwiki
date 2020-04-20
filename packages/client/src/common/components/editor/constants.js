export const NODE_TYPES = {
    CODE: 'code',
    STRIKETHROUGH: 'strikethrough',
    BOLD: 'bold',
    ITALIC: 'italic',
    UNDERLINED: 'underlined',
    BLOCK_QUOTE: 'block-quote',
    CODE_BLOCK: 'code-block',
    HEADING_ONE: 'heading-one',
    HEADING_TWO: 'heading-two',
    HEADING_THREE: 'heading-three',
    NUMBERED_LIST: 'numbered-list',
    BULLETED_LIST: 'bulleted-list',
    LIST_ITEM: 'list-item',
    PARAGRAPH: 'paragraph',
    IMAGE: 'image',
    LINK: 'link',

    // TODO: table
    // TODO: emoji
}

export const LIST_TYPES = [NODE_TYPES.BULLETED_LIST, NODE_TYPES.NUMBERED_LIST]

export const DEFAULT_EDITOR_VALUE = [
    {
        type: NODE_TYPES.PARAGRAPH,
        children: [{ text: '' }],
    },
]

export const DEFAULT_NODE = NODE_TYPES.PARAGRAPH

export const PLACEHOLDER_TEXT = 'Once upon a time in Mordor..'
