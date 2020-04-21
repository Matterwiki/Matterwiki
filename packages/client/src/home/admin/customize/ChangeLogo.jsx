import React from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { Stack, Box } from '@chakra-ui/core'

import { FileUploadButton, Heading4, Spinner, ErrorAlert } from '@/common/ui'
import { LogoImage } from '@/common/components'
import { settingsApi } from '@/common/utils'

export default function ChangeLogo() {
    const { error, execute, loading } = useAsyncCallback(settingsApi.uploadLogo)

    const handleChange = async e => {
        e.preventDefault()
        await execute(e.target.files[0])
        window.location.reload()
    }

    if (loading) return <Spinner />
    if (error) return <ErrorAlert jsError={error} />

    return (
        <Stack spacing={5} borderBottom="1px" borderColor="border" padding={4}>
            <Heading4 fontWeight="bold">Wiki Logo</Heading4>
            <Stack spacing={3} isInline alignItems="center">
                <Box
                    width={32}
                    border="1px"
                    borderColor="border"
                    padding={3}
                    borderRadius="2px">
                    <LogoImage />
                </Box>

                <FileUploadButton
                    fieldName="logo"
                    label="Change logo"
                    accept=".png"
                    onChange={handleChange}
                />
            </Stack>
        </Stack>
    )
}
