import React, { useRef, useState } from 'react'
import _get from 'lodash/get'
import { useSlate } from 'slate-react'
import FocusLock from 'react-focus-lock'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/core'

import { Icons } from '@/common/ui'

import EditorIconButton from '../EditorIconButton'
import ManageLinkForm from './ManageLinkForm'
import {
    isLinkActive,
    insertLink,
    unwrapLink,
    setSelection,
    getLinkData,
} from '../../utils'

export default function LinkButton() {
    const firstFieldRef = useRef(null)
    const [url, setUrl] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const editor = useSlate()
    const selectionRef = useRef(editor.selection)

    const open = () => {
        setUrl(_get(getLinkData(editor), 'url') || null)
        selectionRef.current = editor.selection
        setIsOpen(true)
    }
    const close = () => {
        setSelection(editor, selectionRef.current)
        setIsOpen(false)
    }

    const handleLinkRemove = () => {
        unwrapLink(editor)
        close()
    }

    const handleLinkAdd = url => {
        setSelection(editor, selectionRef.current)
        insertLink(editor, url)
        close()
    }

    return (
        <Popover
            usePortal
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={open}
            onClose={close}
            placement="bottom"
            closeOnBlur={false}>
            <PopoverTrigger>
                <EditorIconButton
                    isActive={isLinkActive(editor)}
                    icon={Icons.FaLink}
                />
            </PopoverTrigger>
            <PopoverContent zIndex={4} padding={5}>
                <FocusLock returnFocus persistentFocus={false}>
                    <PopoverArrow background="white" />
                    <PopoverCloseButton />
                    <ManageLinkForm
                        firstFieldRef={firstFieldRef}
                        url={url}
                        onLinkRemove={handleLinkRemove}
                        onLinkAdd={handleLinkAdd}
                    />
                </FocusLock>
            </PopoverContent>
        </Popover>
    )
}
