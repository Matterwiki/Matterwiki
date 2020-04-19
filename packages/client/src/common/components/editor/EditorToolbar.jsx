/* eslint-disable react/prop-types */
import React from 'react'
import { Flex } from '@chakra-ui/core'
import { useSlate } from 'slate-react'

import { IconButton, Icons, Button } from '../../ui'

import { toggleMark, isMarkActive, toggleBlock, isBlockActive } from './utils'

const getToolbarBtnStyles = isActive => ({
    variant: 'ghost',
    variantColor: 'gray',
    color: isActive ? 'primary.500' : 'text',
})

function EditorIconButton({ icon, text, onMouseDown, isActive }) {
    const props = {
        onMouseDown,
        ...getToolbarBtnStyles(isActive),
    }

    if (text)
        return (
            <Button {...props} fontSize="1rem">
                {text}
            </Button>
        )
    return <IconButton icon={icon} {...props} />
}

function MarkButton({ format, icon }) {
    const editor = useSlate()
    const isActive = isMarkActive(editor, format)

    return (
        <EditorIconButton
            icon={icon}
            isActive={isActive}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        />
    )
}

function BlockButton({ format, icon, text }) {
    const editor = useSlate()
    const isActive = isBlockActive(editor, format)

    return (
        <EditorIconButton
            icon={icon}
            text={text}
            isActive={isActive}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        />
    )
}

function ButtonContainer(props) {
    return (
        <Flex
            flexWrap="nowrap"
            borderRight="1px"
            borderColor="gray.200"
            padding={2}
            {...props}
        />
    )
}

export default function EditorToolbar() {
    return (
        <Flex
            overflow="auto"
            flexWrap="nowrap"
            borderBottom="1px"
            borderColor="gray.200"
            backgroundColor="gray.50">
            <ButtonContainer>
                <MarkButton format="bold" icon={Icons.FaBold} />
                <MarkButton format="italic" icon={Icons.FaItalic} />
                <MarkButton format="underline" icon={Icons.FaUnderline} />
                <MarkButton
                    format="strikethrough"
                    icon={Icons.FaStrikethrough}
                />
                <MarkButton format="code" icon={Icons.FaCode} />
            </ButtonContainer>
            <ButtonContainer>
                <BlockButton format="heading-one" text="h1" />
                <BlockButton format="heading-two" text="h2" />
                <BlockButton format="block-quote" icon={Icons.FaQuoteLeft} />
                <BlockButton format="numbered-list" icon={Icons.FaListOl} />
                <BlockButton format="bulleted-list" icon={Icons.FaListUl} />
            </ButtonContainer>
        </Flex>
    )
}
