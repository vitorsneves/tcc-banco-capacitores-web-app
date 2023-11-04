import { coordenadasParaId } from '../../utils/conversorID'
import { obterDimensoesBanco } from '../../utils/operacoesBanco'
import { obterLetraFase } from '../../utils/operacoesBanco'

const passoHorizontal = 200
const passoVertical = 95

const passoHorizontalCentral = 60
const passoVerticalCentral = 140

const paddingVertical = 40
const paddingHorizontal = 20

export default (banco, atualizarCapacitor) => {
  const dimensaoBanco = obterDimensoesBanco(banco)

  let capacitores = gerarFaseNode(dimensaoBanco)

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

const gerarFaseNode = dimensaoBanco => {
  const quantidadeGrupos = dimensaoBanco[2]
  const quantidadePorGrupo = dimensaoBanco[3]

  const retanguloFase = {
    largura:
      paddingHorizontal +
      passoHorizontalCentral +
      2 * quantidadePorGrupo * passoHorizontal,
    altura:
      paddingVertical +
      passoVerticalCentral +
      2 * quantidadeGrupos * passoVertical
  }

  let nodesDeFase = [
    {
      id: 'A',
      type: 'light',
      data: { label: 'Fase A' },
      position: { x: 0, y: 0 },
      style: {
        width: retanguloFase.largura,
        height: retanguloFase.altura,
        backgroundColor: 'rgba(255, 0, 0, 0.2)'
      },
      draggable: false
    },
    {
      id: 'B',
      type: 'light',
      data: { label: 'Fase B' },
      position: { x: retanguloFase.largura + passoVertical, y: 0 },
      style: {
        width: retanguloFase.largura,
        height: retanguloFase.altura,
        backgroundColor: 'rgba(0, 255, 0, 0.2)'
      },
      draggable: false
    },
    {
      id: 'C',
      type: 'light',
      data: { label: 'Fase C' },
      position: {
        x: 2 * (retanguloFase.largura + passoVertical),
        y: 0
      },
      style: {
        width: retanguloFase.largura,
        height: retanguloFase.altura,
        backgroundColor: 'rgba(0, 0, 255, 0.2)'
      },
      draggable: false
    }
  ]

  return nodesDeFase
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
    draggable: false,
    parentNode: obterLetraFase(coordenadas[0])
  }
}

const obterCoordenadaXCapacitor = (coordenadas, dimensaoBanco) => {
  const quantidadePorGrupo = dimensaoBanco[3]
  const [, ramo, , numero] = coordenadas
  let coordenadaX = paddingHorizontal

  if (ramo === 1 || ramo === 3) {
    coordenadaX +=
      quantidadePorGrupo * passoHorizontal + passoHorizontalCentral
  }

  coordenadaX += numero * passoHorizontal

  return coordenadaX
}

const obterCoordenadaYCapacitor = (coordenadas, dimensaoBanco) => {
  const quantidadeGrupos = dimensaoBanco[2]
  const [, ramo, grupo] = coordenadas
  let coordenadaY = paddingVertical

  if (ramo === 2 || ramo === 3) {
    coordenadaY +=
      quantidadeGrupos * passoVertical + passoVerticalCentral
  }

  coordenadaY += grupo * passoVertical

  return coordenadaY
}
