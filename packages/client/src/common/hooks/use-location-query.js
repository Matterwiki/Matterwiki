import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Gets the query string params and makes it into an object
 */
export default function useLocationQuery() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useState({})

    useEffect(() => {
        const result = new URLSearchParams(location.search)
        for (const entry of result) {
            const [key, value] = entry
            result[key] = value
        }

        setSearchParams(result)
    }, [location])

    return searchParams
}
