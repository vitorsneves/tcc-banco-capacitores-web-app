import { coordenadasParaId } from '../../../utils/conversorID'
import {
  obterDimensoesBanco,
  obterLetraFase
} from '../../../utils/operacoesBanco'

const edgeStyle = {
  strokeWidth: 3,
  stroke: '#000000'
}

export default banco => {
  const dimensoesBanco = obterDimensoesBanco(banco)

  return banco
    .map((_, fase) => gerarConexoesFase(banco, fase, dimensoesBanco))
    .flat()
}

const gerarConexoesFase = (banco, fase, dimensoesBanco) => {
  let conexoes = []

  conexoes.push(gerarConexaoComTcDaFase(dimensoesBanco, fase))

  conexoes.push(
    banco[fase].map((_, index) =>
      gerarConexoesRamo(fase, index, dimensoesBanco)
    )
  )

  return conexoes.flat(Infinity)
}

const gerarConexaoComTcDaFase = (dimensoesBanco, fase) => {
  const [fases, ramos, grupos, capacitores] = dimensoesBanco

  let conexoesTC = []

  const ultimoPrimeiroRamo = [fase, 0, grupos - 1, capacitores - 1]
  const penultimoSegundoRamo = [fase, 1, grupos - 1, 0]
  const segundoDoTerceiroRamo = [fase, 2, 0, capacitores - 1]
  const primeiroQuartoRamo = [fase, 3, 0, 0]

  conexoesTC.push(
    gerarConexao(ultimoPrimeiroRamo, segundoDoTerceiroRamo)
  )

  conexoesTC.push(gerarConexaoComTc(ultimoPrimeiroRamo, fase, false))

  conexoesTC.push(gerarConexaoComTc(penultimoSegundoRamo, fase, true))

  conexoesTC.push(
    gerarConexao(primeiroQuartoRamo, penultimoSegundoRamo)
  )

  return conexoesTC
}

const gerarConexoesRamo = (fase, ramo, dimensoesBanco) => {
  const [, , gruposPorRamo, capacitoresPorGrupo] = dimensoesBanco

  let conexoes = []

  for (let numero = 1; numero < capacitoresPorGrupo; numero++) {
    conexoes.push(
      gerarConexao([fase, ramo, 0, 0], [fase, ramo, 0, numero])
    )
  }

  for (let grupo = 1; grupo < gruposPorRamo; grupo++)
    conexoes.push(
      gerarConexao(
        [fase, ramo, grupo, 0],
        [fase, ramo, grupo, capacitoresPorGrupo - 1]
      )
    )

  for (let grupo = 0; grupo < gruposPorRamo - 1; grupo++)
    conexoes.push(
      gerarConexao([fase, ramo, grupo + 1, 0], [fase, ramo, grupo, 0])
    )

  for (let grupo = 0; grupo < gruposPorRamo - 1; grupo++)
    for (let numero = 1; numero < capacitoresPorGrupo; numero++)
      conexoes.push(
        gerarConexao(
          [fase, ramo, grupo, numero],
          [fase, ramo, grupo + 1, numero]
        )
      )

  for (let numero = 1; numero < capacitoresPorGrupo; numero++) {
    conexoes.push(
      gerarConexao(
        [fase, ramo, gruposPorRamo - 1, numero],
        [fase, ramo, gruposPorRamo - 1, 0]
      )
    )
  }

  return conexoes
}

const gerarConexao = (coordenadasFonte, coordenadasTarget) => {
  const idSource = coordenadasParaId(coordenadasFonte)
  const idTarget = coordenadasParaId(coordenadasTarget)
  const idConexao = idSource.concat('-->', idTarget)

  return {
    id: idConexao,
    source: idSource,
    target: idTarget,
    type: 'step',
    style: edgeStyle
  }
}

const gerarConexaoComTc = (coordenadasFonte, faseTC, TCEhSource) => {
  const idCapacitor = coordenadasParaId(coordenadasFonte)
  const idTC = obterIDTc(faseTC)
  const idConexao = idCapacitor.concat('-->', idTC)

  return {
    id: idConexao,
    source: TCEhSource ? idTC : idCapacitor,
    target: TCEhSource ? idCapacitor : idTC,
    type: 'step',
    style: edgeStyle
  }
}

const obterIDTc = fase => `TC-fase-${obterLetraFase(fase)}`
