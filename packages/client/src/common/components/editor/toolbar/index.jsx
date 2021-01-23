import React from 'react'
import { Flex } from '@chakra-ui/react'
import {
    HeadingToolbar,
    ToolbarMark,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE,
    MARK_STRIKETHROUGH,
    MARK_CODE,
} from '@udecode/slate-plugins'

import { Icons, ButtonGroup } from '@/common/ui'

function ButtonContainer(props) {
    return (
        <ButtonGroup
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
        <Flex
            sx={{
                overflow: 'auto',
                borderBottom: '1px',
                borderColor: 'border',
                backgroundColor: 'gray.50',
            }}>
            <HeadingToolbar>
                <ButtonContainer>
                    <ToolbarMark type={MARK_BOLD} icon={<Icons.FaBold />} />
                    <ToolbarMark type={MARK_ITALIC} icon={<Icons.FaItalic />} />

                    <ToolbarMark
                        type={MARK_UNDERLINE}
                        icon={<Icons.FaUnderline />}
                    />
                    <ToolbarMark
                        type={MARK_STRIKETHROUGH}
                        icon={<Icons.FaStrikethrough />}
                    />
                    <ToolbarMark type={MARK_CODE} icon={<Icons.FaCode />} />
                </ButtonContainer>
            </HeadingToolbar>
        </Flex>
    )
}
