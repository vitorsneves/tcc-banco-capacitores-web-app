import { Handle, Position } from 'reactflow'
import { useDisclosure } from '@mantine/hooks'
import { Group, Image } from '@mantine/core'
import EditorDeCapacitor from './EditorCapacitor'
import TextoBlocoCapacitor from './TextoBlocoCapacitor'
import imagemCapacitor from '../../assets/capacitor.svg'

const handleSuperiorStyle = {
  left: 30,
  top: 5,
  background: 'transparent'
}

const handleInferiorStyle = {
  left: 30,
  bottom: 5,
  background: 'transparent'
}

const obterTipoHandleSuperior = coordenadas =>
  coordenadas[3] === 0 ? 'source' : 'target'

const obterTipoHandleInferior = coordenadas =>
  coordenadas[3] === 0 ? 'target' : 'source'

export default ({
  data: { capacitor, coordenadas, atualizarCoordenadasFixas }
}) => {
  const [editorAberto, { open: abrirEditor, close: fecharEditor }] =
    useDisclosure(false)

  return (
    <>
      <Handle
        type={obterTipoHandleSuperior(coordenadas)}
        position={Position.Top}
        style={handleSuperiorStyle}
        isConnectable={false}
      />
      <EditorDeCapacitor
        editorAberto={editorAberto}
        fecharEditor={fecharEditor}
        capacitor={capacitor}
        coordenadas={coordenadas}
        atualizarCoordenadasFixas={atualizarCoordenadasFixas}
      />
      <Group h='60' gap='4' onClick={abrirEditor}>
        <Image h='100%' w='auto' src={imagemCapacitor} />
        <TextoBlocoCapacitor
          capacitor={capacitor}
          coordenadas={coordenadas}
        />
      </Group>
      <Handle
        type={obterTipoHandleInferior(coordenadas)}
        position={Position.Bottom}
        style={handleInferiorStyle}
        isConnectable={false}
      />
    </>
  )
}
