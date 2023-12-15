import TC from '../../assets/TC.jsx'
import { Handle, Position } from 'reactflow'

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
      <TC h={50} fill={'#212529'} />
      <Handle
        type={'source'}
        position={Position.Right}
        isConnectable={false}
        style={{ ...handleStyle, right: 5 }}
      />
    </>
  )
}
