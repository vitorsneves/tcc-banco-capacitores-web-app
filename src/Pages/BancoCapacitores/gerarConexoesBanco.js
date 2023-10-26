import { coordenadasParaId } from '../../utils/conversorID'
import { obterDimensoesBanco } from '../../utils/operacoesBanco'

const edgeStyle = { stroke: '#000', strokeWidth: '3px' }

export default banco => {
  const dimensoesBanco = obterDimensoesBanco(banco)

  return banco
    .map((_, fase) => gerarConexoesFase(banco, fase, dimensoesBanco))
    .flat()
}

const gerarConexoesFase = (banco, fase, dimensoesBanco) => {
  return banco[fase]
    .map((_, index) => gerarConexoesRamo(fase, index, dimensoesBanco))
    .flat()
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
