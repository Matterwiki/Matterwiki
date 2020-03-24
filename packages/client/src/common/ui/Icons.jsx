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
    FaUserFriends,
} from 'react-icons/fa'
import { Box } from '@chakra-ui/core'

const withBox = icon => props => <Box as={icon} size={4} {...props} />

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
    FaUserFriends: withBox(FaUserFriends),
}
