import { Handle, Position } from 'reactflow'
import { useDisclosure } from '@mantine/hooks'
import { Group } from '@mantine/core'
import EditorDeCapacitor from './EditorCapacitor'
import TextoBlocoCapacitor from './TextoBlocoCapacitor'
import ImagemCapacitor from '../../assets/capacitor.jsx'
import { obterCorCapacitor } from '../../utils/operacoesBanco.js'

const handleSuperiorStyle = {
  //antes era left:30
  left: 36,
  top: 5,
  background: 'transparent',
  borderColor: 'transparent'
}

const handleInferiorStyle = {
  //antes era right:30
  left: 36,
  bottom: 5,
  background: 'transparent',
  borderColor: 'transparent'
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
      {/*antes era h='60'*/}
      <Group
        h='72'
        gap='4'
        style={{ borderRadius: '4px' }}
        bg={
          capacitor.mudouDeLugar
            ? 'rgba(240, 62, 62, 0.1)'
            : 'transparent'
        }
        onClick={abrirEditor}
      >
        <ImagemCapacitor
          h='100%'
          fill={obterCorCapacitor(capacitor)}
        />
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
