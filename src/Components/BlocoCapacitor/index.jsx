import { Handle, Position } from 'reactflow'
import { useDisclosure } from '@mantine/hooks'
import { Group } from '@mantine/core'
import EditorDeCapacitor from './EditorCapacitor'
import TextoBlocoCapacitor from './TextoBlocoCapacitor'
import ImagemCapacitor from '../../assets/capacitor.jsx'
import { calcularDesvio } from '../../utils/operacoesBanco.js'

const handleSuperiorStyle = {
  left: 30,
  top: 5,
  background: 'transparent',
  borderColor: 'transparent'
}

const handleInferiorStyle = {
  left: 30,
  bottom: 5,
  background: 'transparent',
  borderColor: 'transparent'
}

const obterCorCapacitor = capacitor => {
  return '#212529'

  const { capacitanciaPlaca, capacitanciaMedida } = capacitor
  const desvio = calcularDesvio(capacitanciaPlaca, capacitanciaMedida)

  if (desvio >= 10) return '#ff8787'

  if (desvio < 10 && desvio > 5) return '#ffa94d'

  return '#212529'
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
