import { IconScale } from '@tabler/icons-react'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ActionIcon } from '@mantine/core'
import FormularioBalanceamento from './FormularioBalanceamento'

export default () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ActionIcon
        onClick={open}
        variant='default'
        radius='xl'
        size='xl'
      >
        <IconScale size='32' />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title='Balanceamento'>
        <FormularioBalanceamento />
      </Modal>
    </>
  )
}
