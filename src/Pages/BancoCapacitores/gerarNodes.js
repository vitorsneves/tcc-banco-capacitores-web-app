import { coordenadasParaId } from '../../utils/conversorID'
import { obterDimensoesBanco } from '../../utils/operacoesBanco'

const passoHorizontalMinimo = 200
const passoHorizontalCentral = 140
const passoVerticalMinimo = 95

export default (banco, atualizarCapacitor) => {
  const dimensaoBanco = obterDimensoesBanco(banco)

  let capacitores = []

  banco.forEach((fase, faseIndex) =>
    fase.forEach((ramo, ramoIndex) =>
      ramo.forEach((grupo, grupoIndex) =>
        grupo.forEach((capacitor, capacitorIndex) => {
          const coordenadas = [
            faseIndex,
            ramoIndex,
            grupoIndex,
            capacitorIndex
          ]

          capacitores.push(
            gerarCapacitorNode(
              capacitor,
              coordenadas,
              dimensaoBanco,
              atualizarCapacitor
            )
          )
        })
      )
    )
  )

  return capacitores
}

const gerarCapacitorNode = (
  capacitor,
  coordenadas,
  dimensaoBanco,
  atualizarCapacitor
) => {
  return {
    id: coordenadasParaId(coordenadas),
    position: {
      x: obterCoordenadaXCapacitor(coordenadas, dimensaoBanco),
      y: obterCoordenadaYCapacitor(coordenadas, dimensaoBanco)
    },
    type: 'capacitor',
    data: {
      capacitor,
      coordenadas,
      atualizarCoordenadasFixas: capacitor =>
        atualizarCapacitor(capacitor, coordenadas)
    },
    draggable: false
  }
}

const obterCoordenadaXCapacitor = (coordenadas, dimensaoBanco) => {
  const quantidadePorGrupo = dimensaoBanco[3]
  const [, ramo, , numero] = coordenadas

  if (ramo === 1 || ramo === 3) {
    return passoHorizontalCentral + numero * passoHorizontalMinimo
  } else {
    return (
      -1 *
      (passoHorizontalCentral +
        (quantidadePorGrupo - numero - 1) * passoHorizontalMinimo)
    )
  }
}

const obterCoordenadaYCapacitor = (coordenadas, dimensaoBanco) => {
  const quantidadeGrupos = dimensaoBanco[2]
  const [, ramo, grupo] = coordenadas

  if (ramo === 2 || ramo === 3) {
    return (grupo + 1) * passoVerticalMinimo
  } else {
    return -1 * (quantidadeGrupos - grupo) * passoVerticalMinimo
  }
}
