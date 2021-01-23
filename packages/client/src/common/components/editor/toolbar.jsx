import React from 'react'
import { Box, ButtonGroup } from '@chakra-ui/react'
import {
    HeadingToolbar,
    ToolbarMark,
    ToolbarElement,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE,
    MARK_STRIKETHROUGH,
    MARK_CODE,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
} from '@udecode/slate-plugins'

import { Icons } from '@/common/ui'

function ButtonContainer(props) {
    return (
        <ButtonGroup
            spacing="24px"
            sx={{
                display: 'flex',
                borderRight: '1px',
                borderColor: 'border',
                padding: 2,
            }}
            {...props}
        />
    )
}

export default function EditorToolbar() {
    return (
        <Box
            sx={{
                overflow: 'auto',
                borderBottom: '1px solid gray',
                borderColor: 'border',
                backgroundColor: 'gray.50',
            }}>
            <HeadingToolbar
                styles={{
                    root: {
                        margin: 0,
                        padding: 0,
                    },
                }}>
                <ButtonContainer>
                    <ToolbarElement
                        type={ELEMENT_H1}
                        icon={<Icons.MdLooksOne />}
                    />
                    <ToolbarElement
                        type={ELEMENT_H2}
                        icon={<Icons.MdLooksTwo />}
                    />
                    <ToolbarElement
                        type={ELEMENT_H3}
                        icon={<Icons.MdLooks3 />}
                    />
                    <ToolbarElement
                        type={ELEMENT_BLOCKQUOTE}
                        icon={<Icons.MdFormatQuote />}
                    />

                    <ToolbarElement
                        type={ELEMENT_CODE_BLOCK}
                        icon={<Icons.BiCodeBlock />}
                    />
                </ButtonContainer>
                <ButtonContainer>
                    <ToolbarMark
                        type={MARK_BOLD}
                        icon={<Icons.MdFormatBold />}
                    />
                    <ToolbarMark
                        type={MARK_ITALIC}
                        icon={<Icons.MdFormatItalic />}
                    />

                    <ToolbarMark
                        type={MARK_UNDERLINE}
                        icon={<Icons.MdFormatUnderlined />}
                    />
                    <ToolbarMark
                        type={MARK_STRIKETHROUGH}
                        icon={<Icons.MdStrikethroughS />}
                    />
                    <ToolbarMark type={MARK_CODE} icon={<Icons.MdCode />} />
                </ButtonContainer>
            </HeadingToolbar>
        </Box>
    )
}
