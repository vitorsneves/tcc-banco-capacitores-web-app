import ReactFlow, { Background } from 'reactflow'
import 'reactflow/dist/style.css'
import gerarNodes from './gerarNodes'
import gerarConexoesBanco from './gerarConexoesBanco'
import gerarBanco from './gerarBancoAleatorio'
import BlocoCapacitor from '../../Components/BlocoCapacitor'
import { useState, useMemo } from 'react'
import { Container } from '@mantine/core'
import clonar from '../../utils/clonar'

const nodeTypes = { capacitor: BlocoCapacitor }

export default () => {
  const [banco, setBanco] = useState(gerarBanco(4, 10, 4))

  const conexoes = useMemo(() => gerarConexoesBanco(banco), [])

  const atualizarCapacitor = (capacitor, coordenadas) => {
    const [fase, ramo, grupo, numero] = coordenadas
    setBanco(bancoAntigo => {
      let bancoNovo = clonar(bancoAntigo)
      bancoNovo[fase][ramo][grupo][numero] = capacitor
      return bancoNovo
    })
  }

  return (
    <Container fluid h='100vh'>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={gerarNodes(banco, atualizarCapacitor)}
        edges={conexoes}
        fitView
      >
        <Background variant='cross' />
      </ReactFlow>
    </Container>
  )
}
