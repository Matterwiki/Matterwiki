import React from 'react'
import {
    FaBars,
    FaCog,
    FaEdit,
    FaFolder,
    FaQuestionCircle,
    FaPlus,
    FaRegEye,
    FaRegEyeSlash,
    FaRegPlusSquare,
    FaSignOutAlt,
    FaTerminal,
    FaTrashAlt,
    FaUpload,
    FaUserFriends,

    // Editor Icons
    FaBold,
    FaItalic,
    FaUnderline,
    FaCode,
    FaHeading,
    FaQuoteLeft,
    FaListOl,
    FaListUl,
    FaStrikethrough,
} from 'react-icons/fa'
import { Box } from '@chakra-ui/core'

const withBox = icon => props => <Box as={icon} size={4} {...props} />

/**
 * Icons used in the app. `withBox` gives it styling super powers! ⚡️
 */
const Icons = [
    FaBars,
    FaCog,
    FaEdit,
    FaFolder,
    FaPlus,
    FaQuestionCircle,
    FaRegEye,
    FaRegEyeSlash,
    FaRegPlusSquare,
    FaSignOutAlt,
    FaTerminal,
    FaTrashAlt,
    FaUpload,
    FaUserFriends,

    // Editor Icons
    FaBold,
    FaItalic,
    FaUnderline,
    FaCode,
    FaHeading,
    FaQuoteLeft,
    FaListOl,
    FaListUl,
    FaStrikethrough,
].reduce((acc, icon) => {
    acc[icon.name] = withBox(icon)
    return acc
}, {})

export default Icons
