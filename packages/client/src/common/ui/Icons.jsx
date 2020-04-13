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
} from 'react-icons/fa'
import { Box } from '@chakra-ui/core'

const withBox = icon => props => <Box as={icon} size={4} {...props} />

/**
 * Icons used in the app. `withBox` gives it styling super powers! ⚡️
 */
export default {
    FaBars: withBox(FaBars),
    FaCog: withBox(FaCog),
    FaEdit: withBox(FaEdit),
    FaFolder: withBox(FaFolder),
    FaPlus: withBox(FaPlus),
    FaQuestionCircle: withBox(FaQuestionCircle),
    FaRegEye: withBox(FaRegEye),
    FaRegEyeSlash: withBox(FaRegEyeSlash),
    FaRegPlusSquare: withBox(FaRegPlusSquare),
    FaSignOutAlt: withBox(FaSignOutAlt),
    FaTerminal: withBox(FaTerminal),
    FaTrashAlt: withBox(FaTrashAlt),
    FaUpload: withBox(FaUpload),
    FaUserFriends: withBox(FaUserFriends),
}
