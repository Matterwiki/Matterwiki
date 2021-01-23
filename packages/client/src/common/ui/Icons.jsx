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
    FaListOl,
    FaListUl,
    FaFileCode,
    FaLink,
    FaCheck,
    FaUnlink,
    FaImage,
    FaExternalLinkAlt,
} from 'react-icons/fa'

import {
    MdLooksOne,
    MdLooksTwo,
    MdLooks3,
    MdFormatBold,
    MdFormatItalic,
    MdCode,
    MdStrikethroughS,
    MdFormatUnderlined,
    MdFormatQuote,
} from 'react-icons/md'

import { BiCodeBlock } from 'react-icons/bi'

/**
 * Icons used in the app.
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

    FaListOl,
    FaListUl,
    FaFileCode,
    FaLink,
    FaCheck,
    FaUnlink,
    FaImage,
    FaExternalLinkAlt,
    MdLooksOne,
    MdLooksTwo,
    MdLooks3,
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdCode,
    MdStrikethroughS,
    MdFormatQuote,
    BiCodeBlock,
].reduce((acc, icon) => {
    return { ...acc, [icon.name]: icon }
}, {})

export default Icons
