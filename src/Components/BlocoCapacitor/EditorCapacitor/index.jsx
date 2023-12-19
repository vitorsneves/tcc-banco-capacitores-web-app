import { Modal, Stack } from '@mantine/core'
import CoordenadasEditor from './CoordenadasEditor'
import FormularioEditor from './FormularioEditor'
import { obterCorCoordenadaTrocada } from '../../../utils/operacoesBanco'

const renderizarCoordenadas = (capacitor, coordenadas) => {
  if (capacitor.mudouDeLugar)
    return (
      <>
        <CoordenadasEditor
          coordenadas={capacitor.coordenadasAntigas}
          texto='Coordenadas Antigas'
          cor={obterCorCoordenadaTrocada(false)}
        />
        <CoordenadasEditor
          coordenadas={coordenadas}
          texto='CoordenadasNovas'
          cor={obterCorCoordenadaTrocada(true)}
        />
      </>
    )

  return (
    <CoordenadasEditor
      coordenadas={coordenadas}
      texto='Coordenadas'
    />
  )
}

export default ({
  editorAberto,
  fecharEditor,
  capacitor,
  coordenadas,
  atualizarCoordenadasFixas
}) => {
  return (
    <Modal
      onClose={fecharEditor}
      opened={editorAberto}
      title='Editar dados do capacitor'
      centered
    >
      <Stack>
        {renderizarCoordenadas(capacitor, coordenadas)}
        <FormularioEditor
          capacitor={capacitor}
          atualizarCoordenadasFixas={atualizarCoordenadasFixas}
          fecharEditor={fecharEditor}
        />
      </Stack>
    </Modal>
  )
}
