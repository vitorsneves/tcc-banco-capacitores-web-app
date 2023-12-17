import ReactFlow, { Panel, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import gerarNodes from './gerarNodes/gerarNodes'
import gerarConexoesBanco from './gerarConexoesBanco/gerarConexoesBanco'
import bancoEquatorial from './gerarBanco/bancoEquatorial'
import BlocoCapacitor from '../../Components/BlocoCapacitor'
import BlocoTC from '../../Components/BlocoTC'
import { useState, useMemo } from 'react'
import { Card, Container, Group } from '@mantine/core'
import clonar from '../../utils/clonar'
import BotaoBalanceamento from '../../Components/BotaoBalanceamento'
import BotaoNightMode from '../../Components/BotaoNightMode'
import DisplayDeCorrentes from '../../Components/DisplayDeCorrentes'
import calculaCorrentesDeTodasAsFases from '../../utils/algoritmoBalanceamento/balanceador/calculadoraDoBanco'
import { bancoWebAppParaBancoAlgoritmo } from '../../utils/operacoesBanco'

const nodeTypes = { capacitor: BlocoCapacitor, tc: BlocoTC }

export default () => {
  const [banco, setBanco] = useState(bancoEquatorial)

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
    <Container h='100vh' p='0' fluid>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={gerarNodes(banco, atualizarCapacitor)}
        edges={conexoes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Panel position='top-left'>
          <Group>
            <BotaoBalanceamento banco={banco} />
            <BotaoNightMode />
          </Group>
        </Panel>
        <Panel position='bottom-left'>
          <Card shadow='lg' radius='md' withBorder={true}>
            <DisplayDeCorrentes
              correntes={calculaCorrentesDeTodasAsFases(
                bancoWebAppParaBancoAlgoritmo(banco)
              )}
              size={'md'}
            />
          </Card>
        </Panel>
        <Background />
      </ReactFlow>
    </Container>
  )
}
