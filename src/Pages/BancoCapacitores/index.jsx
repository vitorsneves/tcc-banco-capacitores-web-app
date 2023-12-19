import ReactFlow, { Panel, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import gerarNodes from './gerarNodes/gerarNodes'
import gerarConexoesBanco from './gerarConexoesBanco/gerarConexoesBanco'
import bancoEquatorial from './gerarBanco/bancoEquatorial'
import BlocoCapacitor from '../../Components/BlocoCapacitor'
import BlocoTC from '../../Components/BlocoTC'
import { useState, useMemo } from 'react'
import clonar from '../../utils/clonar'
import BotaoBalanceamento from '../../Components/BotaoBalanceamento'
import BotaoNightMode from '../../Components/BotaoNightMode'
import DisplayDeCorrentes from '../../Components/DisplayDeCorrentes'
import calculaCorrentesDeTodasAsFases from '../../utils/algoritmoBalanceamento/balanceador/calculadoraDoBanco'
import BotaoAjuda from '../../Components/BotaoAjuda'
import {
  bancoWebAppParaBancoAlgoritmo,
  obterDimensoesBanco
} from '../../utils/operacoesBanco'
import { IconCheck, IconX, IconArrowBack } from '@tabler/icons-react'
import {
  Card,
  Container,
  Transition,
  Stack,
  ActionIcon,
  Group
} from '@mantine/core'

const nodeTypes = { capacitor: BlocoCapacitor, tc: BlocoTC }

export default () => {
  const [banco, setBanco] = useState(bancoEquatorial)
  const [trocasAConfirmar, setTrocasAConfirmar] = useState(false)

  const conexoes = useMemo(() => gerarConexoesBanco(banco), [])

  const atualizarCapacitor = (capacitor, coordenadas) => {
    const [fase, ramo, grupo, numero] = coordenadas
    setBanco(bancoAntigo => {
      let bancoNovo = clonar(bancoAntigo)
      bancoNovo[fase][ramo][grupo][numero] = capacitor
      return bancoNovo
    })
  }

  const confirmarTrocas = () => {
    if (!trocasAConfirmar) return
    setTrocasAConfirmar(false)

    setBanco(bancoAntigo => {
      let bancoNovo = clonar(bancoAntigo)

      bancoNovo.forEach(fase =>
        fase.forEach(ramo =>
          ramo.forEach(grupo =>
            grupo.forEach(capa => {
              capa.mudouDeLugar = false
            })
          )
        )
      )

      return bancoNovo
    })
  }

  const cancelarTrocas = () => {
    if (!trocasAConfirmar) return
    setTrocasAConfirmar(false)

    setBanco(bancoAntigo => {
      let bancoNovo = clonar(bancoAntigo)

      const dimensoes = obterDimensoesBanco(bancoNovo)

      for (let fase = 0; fase < dimensoes[0]; fase++)
        for (let ramo = 0; ramo < dimensoes[1]; ramo++)
          for (let grupo = 0; grupo < dimensoes[2]; grupo++)
            for (let capa = 0; capa < dimensoes[3]; capa++) {
              const capacitor = bancoNovo[fase][ramo][grupo][capa]
              if (capacitor.mudouDeLugar) {
                cancelarTrocaCapacitor(bancoNovo, capacitor, [
                  fase,
                  ramo,
                  grupo,
                  capa
                ])
                capa--
              }
            }

      return bancoNovo
    })
  }

  const cancelarTrocaCapacitor = (banco, capacitor, coordenadas) => {
    if (!capacitor.mudouDeLugar) return

    const [faseVelha, ramoVelha, grupoVelha, capaVelha] =
      capacitor.coordenadasAntigas

    const [faseNova, ramoNovo, grupoNovo, capaNovo] = coordenadas

    const capacitorQueMudou =
      banco[faseNova][ramoNovo][grupoNovo][capaNovo]

    const capacitorQueOcupaPosicaoAntiga =
      banco[faseVelha][ramoVelha][grupoVelha][capaVelha]

    capacitorQueMudou.mudouDeLugar = false

    banco[faseNova][ramoNovo][grupoNovo][capaNovo] =
      capacitorQueOcupaPosicaoAntiga
    banco[faseVelha][ramoVelha][grupoVelha][capaVelha] =
      capacitorQueMudou
  }

  const marcarCapacitoresQueTrocaram = (trocas, trocaFinal) => {
    setBanco(bancoAntigo => {
      let bancoNovo = clonar(bancoAntigo)

      for (let troca = 0; troca < trocaFinal; troca++) {
        const { coordenadas } = trocas.valores[troca]
        trocarCapacitores(bancoNovo, coordenadas[0], coordenadas[1])
      }
      setTrocasAConfirmar(true)

      return bancoNovo
    })
  }

  const trocarCapacitores = (
    banco,
    coordenadaPrimeiro,
    coordenadaSegundo
  ) => {
    const [fase1, ramo1, grupo1, capa1] = coordenadaPrimeiro
    const [fase2, ramo2, grupo2, capa2] = coordenadaSegundo

    let primeiroCapacitor = banco[fase1][ramo1][grupo1][capa1]
    let segundoCapacitor = banco[fase2][ramo2][grupo2][capa2]

    primeiroCapacitor.coordenadasAntigas = coordenadaPrimeiro
    primeiroCapacitor.mudouDeLugar = true

    segundoCapacitor.coordenadasAntigas = coordenadaSegundo
    segundoCapacitor.mudouDeLugar = true

    banco[fase1][ramo1][grupo1][capa1] = segundoCapacitor
    banco[fase2][ramo2][grupo2][capa2] = primeiroCapacitor
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
          <Stack>
            <BotaoBalanceamento
              banco={banco}
              marcarCapacitoresQueTrocaram={
                marcarCapacitoresQueTrocaram
              }
            />
            <Transition
              mounted={trocasAConfirmar}
              transition='slide-right'
              duration={400}
              timingFunction='ease'
            >
              {styles => (
                <>
                  <ActionIcon
                    style={styles}
                    variant='default'
                    radius='xl'
                    size='lg'
                    onClick={confirmarTrocas}
                  >
                    <IconCheck />
                  </ActionIcon>
                  <ActionIcon
                    style={styles}
                    variant='default'
                    radius='xl'
                    size='lg'
                    onClick={cancelarTrocas}
                  >
                    <IconX />
                  </ActionIcon>
                </>
              )}
            </Transition>
          </Stack>
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
        <Panel position='bottom-left'>
          <Stack>
            <BotaoNightMode />
            <BotaoAjuda />
            <ActionIcon size='lg' variant='default' radius='xl'>
              <IconArrowBack />
            </ActionIcon>
          </Stack>
        </Panel>
        <Background />
      </ReactFlow>
    </Container>
  )
}
