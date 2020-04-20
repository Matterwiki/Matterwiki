import React, { useRef, useState } from 'react'
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
import { isLinkActive, insertLink } from '../../utils'

export default function LinkButton() {
    const editor = useSlate()
    const firstFieldRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const handleLinkRemove = () => {
        close()
    }

    const handleLinkAdd = url => {
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
                        onLinkRemove={handleLinkRemove}
                        onLinkAdd={handleLinkAdd}
                    />
                </FocusLock>
            </PopoverContent>
        </Popover>
    )
}
