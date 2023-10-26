import { Modal, Stack } from '@mantine/core'
import CoordenadasEditor from './CoordenadasEditor'
import FormularioEditor from './FormularioEditor'

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
        <CoordenadasEditor coordenadas={coordenadas} />
        <FormularioEditor
          capacitor={capacitor}
          atualizarCoordenadasFixas={atualizarCoordenadasFixas}
          fecharEditor={fecharEditor}
        />
      </Stack>
    </Modal>
  )
}
