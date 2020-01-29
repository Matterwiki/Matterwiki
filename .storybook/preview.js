import React from "react"
import { addDecorator } from "@storybook/react"
import { withConsole } from '@storybook/addon-console';
import { ThemeProvider } from "theme-ui"
import theme from "../src/client/ui/theme"

addDecorator(storyFn => {
    return (
        <ThemeProvider theme={theme}>
        {storyFn()}
        </ThemeProvider>
    )
})

addDecorator((storyFn, context) => {
    return withConsole()(storyFn)(context)
})