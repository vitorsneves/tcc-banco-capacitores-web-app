import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'

import BancoCapacitores from './Pages/BancoCapacitores'

export default () => {
  return (
    <MantineProvider defaultColorScheme='auto'>
      <BancoCapacitores />
    </MantineProvider>
  )
}
