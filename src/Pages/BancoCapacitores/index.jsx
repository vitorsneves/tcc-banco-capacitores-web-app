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

  const marcarCapacitoresQueTrocaram = (trocas, trocaFinal) => {
    for (let troca = 0; troca < trocaFinal; troca++) {
      const { coordenadas } = trocas.valores[troca]
      trocarCapacitores(coordenadas[0], coordenadas[1])
    }
  }

  const trocarCapacitores = (
    coordenadaPrimeiro,
    coordenadaSegundo
  ) => {
    const [fase1, ramo1, grupo1, capa1] = coordenadaPrimeiro
    const [fase2, ramo2, grupo2, capa2] = coordenadaSegundo

    setBanco(bancoAntigo => {
      let bancoNovo = clonar(bancoAntigo)
      let primeiroCapacitor = bancoNovo[fase1][ramo1][grupo1][capa1]
      let segundoCapacitor = bancoNovo[fase2][ramo2][grupo2][capa2]

      primeiroCapacitor.coordenadasAntigas = coordenadaPrimeiro
      primeiroCapacitor.mudouDeLugar = true

      segundoCapacitor.coordenadasAntigas = coordenadaSegundo
      segundoCapacitor.mudouDeLugar = true

      bancoNovo[fase1][ramo1][grupo1][capa1] = segundoCapacitor
      bancoNovo[fase2][ramo2][grupo2][capa2] = primeiroCapacitor

      console.log(bancoNovo)

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
            <BotaoBalanceamento
              banco={banco}
              marcarCapacitoresQueTrocaram={
                marcarCapacitoresQueTrocaram
              }
            />
            <BotaoNightMode />
          </Group>
        </Panel>
        <Panel position='top-right'>
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
