import { IconScale } from '@tabler/icons-react'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ActionIcon, LoadingOverlay, Box } from '@mantine/core'
import FormularioBalanceamento from './FormularioBalanceamento'
import { obterTrocas } from '../../utils/algoritmoBalanceamento'
import { useState } from 'react'
import { bancoWebAppParaBancoAlgoritmo } from '../../utils/operacoesBanco'
import SeletorDeOndeParar from './SeletorDeOndeParar'

export default ({ banco, marcarCapacitoresQueTrocaram }) => {
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

  const computarBalaceamento = configuracoes => {
    setCarregando(true)
    setTimeout(async () => {
      const bancoAlgoritmo = bancoWebAppParaBancoAlgoritmo(banco)
      setTrocas({
        tipoDeBalanceamento: configuracoes.tipoDeBalanceamento,
        faseDeBalanceamento: configuracoes.faseDeBalanceamento,
        valores: obterTrocas(bancoAlgoritmo, configuracoes)
      })

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
        <IconScale style={{ width: '75%', height: '75%' }} />
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
            computarBalaceamento={computarBalaceamento}
          />
        </Box>
      </Modal>
      <Modal
        opened={seletorAberto}
        onClose={fecharSeletor}
        title='Resultado'
      >
        <SeletorDeOndeParar
          trocas={trocas}
          marcarCapacitoresQueTrocaram={marcarCapacitoresQueTrocaram}
          fecharSeletor={fecharSeletor}
        />
      </Modal>
    </>
  )
}
