import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/core'

import { Icons, ButtonGroup } from '@/common/ui'

import MarkButton from './MarkButton'
import BlockButton from './BlockButton'
import LinkButton from './link-button/'
import ImageButton from './ImageButton'
import { NODE_TYPES } from '../constants'

function ButtonContainer(props) {
    return (
        <ButtonGroup
            display="flex"
            borderRight="1px"
            borderColor="border"
            padding={2}
            {...props}
        />
    )
}

export default function EditorToolbar({ imageUploadHandler }) {
    return (
        <Flex
            overflow="auto"
            borderBottom="1px"
            borderColor="border"
            backgroundColor="gray.50">
            <ButtonContainer>
                <MarkButton format={NODE_TYPES.BOLD} icon={Icons.FaBold} />
                <MarkButton format={NODE_TYPES.ITALIC} icon={Icons.FaItalic} />
                <MarkButton
                    format={NODE_TYPES.UNDERLINED}
                    icon={Icons.FaUnderline}
                />
                <MarkButton
                    format={NODE_TYPES.STRIKETHROUGH}
                    icon={Icons.FaStrikethrough}
                />
                <MarkButton format="code" icon={Icons.FaCode} />
            </ButtonContainer>
            <ButtonContainer>
                <BlockButton format={NODE_TYPES.HEADING_ONE} text="h1" />
                <BlockButton format={NODE_TYPES.HEADING_TWO} text="h2" />
                <BlockButton format={NODE_TYPES.HEADING_THREE} text="h3" />
                <BlockButton
                    format={NODE_TYPES.BLOCK_QUOTE}
                    icon={Icons.FaQuoteLeft}
                />
                <BlockButton
                    format={NODE_TYPES.NUMBERED_LIST}
                    icon={Icons.FaListOl}
                />
                <BlockButton
                    format={NODE_TYPES.BULLETED_LIST}
                    icon={Icons.FaListUl}
                />
                <BlockButton
                    format={NODE_TYPES.CODE_BLOCK}
                    icon={Icons.FaFileCode}
                />
            </ButtonContainer>
            <ButtonContainer>
                <LinkButton />
                <ImageButton imageUploadHandler={imageUploadHandler} />
            </ButtonContainer>
        </Flex>
    )
}

EditorToolbar.propTypes = {
    imageUploadHandler: PropTypes.func.isRequired,
}
