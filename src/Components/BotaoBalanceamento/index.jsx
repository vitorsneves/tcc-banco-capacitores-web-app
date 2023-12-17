import { IconScale } from '@tabler/icons-react'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ActionIcon, LoadingOverlay, Box } from '@mantine/core'
import FormularioBalanceamento from './FormularioBalanceamento'
import { obterTrocas } from '../../utils/algoritmoBalanceamento'
import { useState } from 'react'
import { bancoWebAppParaBancoAlgoritmo } from '../../utils/operacoesBanco'
import SeletorDeOndeParar from './SeletorDeOndeParar'

export default ({ banco }) => {
  const [
    formularioAberto,
    { open: abrirFormulario, close: fecharFormulario }
  ] = useDisclosure(false)

  const [carregando, setCarregando] = useState(false)

  const [
    seletorAberto,
    { open: abrirSeletor, close: fecharSeletor }
  ] = useDisclosure(false)

  const [trocas, setTrocas] = useState([])

  const realizarBalanceamento = configuracoes => {
    setCarregando(true)
    setTimeout(async () => {
      const bancoAlgoritmo = bancoWebAppParaBancoAlgoritmo(banco)
      setTrocas(obterTrocas(bancoAlgoritmo, configuracoes))

      abrirSeletor()
      fecharFormulario()
      setCarregando(false)
    }, 20)
  }

  return (
    <>
      <ActionIcon
        onClick={abrirFormulario}
        variant='default'
        radius='xl'
        size='xl'
      >
        <IconScale size='32' />
      </ActionIcon>
      <Modal
        opened={formularioAberto}
        onClose={fecharFormulario}
        title='Balanceamento'
      >
        <Box pos='relative'>
          <LoadingOverlay
            visible={carregando}
            overlayProps={{ radius: 'sm' }}
            loaderProps={{ color: 'red' }}
          />
          <FormularioBalanceamento
            realizarBalanceamento={realizarBalanceamento}
          />
        </Box>
      </Modal>
      <Modal
        opened={seletorAberto}
        onClose={fecharSeletor}
        title='Selecione um ponto de parada'
      >
        <SeletorDeOndeParar trocas={trocas} />
      </Modal>
    </>
  )
}
