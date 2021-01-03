import React from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { Stack, Box } from '@chakra-ui/react'

import {
    Heading,
    Spinner,
    ErrorAlert,
    FileUploadWrapper,
    Button,
    Icons,
} from '@/common/ui'
import { LogoImage } from '@/common/components'
import { settingsApi } from '@/common/utils'

export default function ChangeLogo() {
    const { error, execute, loading } = useAsyncCallback(settingsApi.uploadLogo)

    const handleChange = async ([logo]) => {
        await execute(logo)
        // TODO: This is definitely crude. But it is easier than managing this URL in state!
        window.location.reload()
    }

    if (loading) return <Spinner />

    return (
        <Stack spacing={5} borderBottom="1px" borderColor="border" padding={4}>
            <Heading size="lg" fontWeight="bold">
                Wiki Logo
            </Heading>
            {error ? <ErrorAlert jsError={error} /> : null}
            <Stack spacing={3} isInline alignItems="center">
                <Box
                    width={32}
                    border="1px"
                    borderColor="border"
                    padding={3}
                    borderRadius="2px">
                    <LogoImage />
                </Box>

                <FileUploadWrapper
                    fieldName="logo"
                    accept=".png"
                    onChange={handleChange}
                    render={handleClick => (
                        <Button onClick={handleClick} leftIcon={Icons.FaUpload}>
                            Change logo
                        </Button>
                    )}
                />
            </Stack>
        </Stack>
    )
}

//
