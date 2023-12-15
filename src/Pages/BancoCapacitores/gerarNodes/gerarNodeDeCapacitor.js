import obterPosicaoCapacitor from './posicionador/posicionadorCapacitor'
import { coordenadasParaId } from '../../../utils/conversorID'
import { obterLetraFase } from '../../../utils/operacoesBanco'

export default (banco, atualizarCapacitor) => {
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
              banco,
              capacitor,
              coordenadas,
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
  banco,
  capacitor,
  coordenadas,
  atualizarCapacitor
) => {
  return {
    id: coordenadasParaId(coordenadas),
    position: obterPosicaoCapacitor(banco, coordenadas),
    type: 'capacitor',
    data: {
      capacitor,
      coordenadas,
      atualizarCoordenadasFixas: capacitor =>
        atualizarCapacitor(capacitor, coordenadas)
    },
    parentNode: obterLetraFase(coordenadas[0]),
    draggable: false
  }
}
