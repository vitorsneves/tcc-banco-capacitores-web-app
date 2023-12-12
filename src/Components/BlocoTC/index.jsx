import imagemTC from '../../assets/TC.png'
import { Handle, Position } from 'reactflow'
import { Container, Image } from '@mantine/core'

const handleStyle = {
  top: 28,
  background: 'transparent',
  borderColor: 'transparent'
}

export default () => {
  return (
    <>
      <Handle
        type={'target'}
        position={Position.Left}
        isConnectable={false}
        style={{ ...handleStyle, left: 5 }}
      />
      <Image h='50' w='auto' src={imagemTC} />
      <Handle
        type={'source'}
        position={Position.Right}
        isConnectable={false}
        style={{ ...handleStyle, right: 5 }}
      />
    </>
  )
}
