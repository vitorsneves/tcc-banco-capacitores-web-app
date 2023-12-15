import {
  ActionIcon,
  useMantineColorScheme,
  Container
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

export default () => {
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      radius='xl'
      onClick={toggleColorScheme}
      variant='default'
    >
      <Container lightHidden>
        <IconSun />
      </Container>
      <Container darkHidden>
        <IconMoon />
      </Container>
    </ActionIcon>
  )
}
