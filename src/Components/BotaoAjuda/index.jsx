import { Modal, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHelp, IconHelpOff } from '@tabler/icons-react'

export default () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ActionIcon
        radius='xl'
        size='lg'
        variant='default'
        onClick={open}
      >
        <IconHelp />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title='Como a aplicação funciona?'
      >
        {/* Modal content */}
      </Modal>
    </>
  )
}
