/* eslint-disable react/prop-types */
import React from 'react'
import { Stack, Flex } from '@chakra-ui/core'
import { useSlate } from 'slate-react'

import { IconButton, Icons, Button } from '../../ui'

import { toggleMark, isMarkActive, toggleBlock, isBlockActive } from './utils'

const toolbarBtnStyles = {
    variant: 'ghost',
    variantColor: 'gray',
}

function EditorIconButton({ icon, onMouseDown: handleMouseDown, isActive }) {
    return (
        <IconButton
            icon={icon}
            active={isActive}
            onMouseDown={handleMouseDown}
            {...toolbarBtnStyles}
        />
    )
}

function MarkButton({ format, icon }) {
    const editor = useSlate()
    return (
        <EditorIconButton
            icon={icon}
            isActive={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        />
    )
}

function BlockButton({ format, icon, text }) {
    const editor = useSlate()

    const blockButtonProps = {
        isActive: isBlockActive(editor, format),
        onMouseDown(event) {
            event.preventDefault()
            toggleBlock(editor, format)
        },
    }

    if (text) {
        return (
            <Button {...blockButtonProps} {...toolbarBtnStyles}>
                {text}
            </Button>
        )
    }

    return <EditorIconButton icon={icon} {...blockButtonProps} />
}

function ButtonContainer(props) {
    return (
        <Flex borderRight="1px" borderColor="gray.200" padding={2} {...props} />
    )
}

export default function EditorToolbar() {
    return (
        <Stack
            isInline
            borderBottom="1px"
            borderColor="gray.200"
            backgroundColor="gray.50">
            <ButtonContainer>
                <MarkButton format="bold" icon={Icons.FaBold} />
                <MarkButton format="italic" icon={Icons.FaItalic} />
                <MarkButton format="underline" icon={Icons.FaUnderline} />
                <MarkButton format="code" icon={Icons.FaStrikethrough} />
                <MarkButton format="code" icon={Icons.FaCode} />
            </ButtonContainer>
            <ButtonContainer>
                <BlockButton format="heading-one" text="h1" />
                <BlockButton format="heading-two" text="h2" />
                <BlockButton format="block-quote" icon={Icons.FaQuoteLeft} />
                <BlockButton format="numbered-list" icon={Icons.FaListOl} />
                <BlockButton format="bulleted-list" icon={Icons.FaListUl} />
            </ButtonContainer>
        </Stack>
    )
}
