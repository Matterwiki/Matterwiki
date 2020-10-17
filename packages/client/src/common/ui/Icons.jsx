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
    FaFileCode,
    FaLink,
    FaCheck,
    FaUnlink,
    FaImage,
    FaExternalLinkAlt,
} from 'react-icons/fa'

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
    FaBold,
    FaItalic,
    FaUnderline,
    FaCode,
    FaHeading,
    FaQuoteLeft,
    FaListOl,
    FaListUl,
    FaStrikethrough,
    FaFileCode,
    FaLink,
    FaCheck,
    FaUnlink,
    FaImage,
    FaExternalLinkAlt,
].reduce((acc, icon) => {
    return { ...acc, [icon.name]: icon }
}, {})

export default Icons
