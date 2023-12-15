import { obterDimensoesBanco } from '../../../../utils/operacoesBanco'
import {
  PASSO_HORIZONTAL,
  PASSO_VERTICAL,
  PASSO_HORIZONTAL_CENTRAL,
  PASSO_VERTICAL_CENTRAL,
  PADDING_VERTICAL,
  PADDING_HORIZONTAL
} from './distancias'

export default (banco, coordenadas) => {
  const dimensaoBanco = obterDimensoesBanco(banco)

  return {
    x: obterCoordenadaXCapacitor(coordenadas, dimensaoBanco),
    y: obterCoordenadaYCapacitor(coordenadas, dimensaoBanco)
  }
}

const obterCoordenadaXCapacitor = (coordenadas, dimensaoBanco) => {
  const quantidadePorGrupo = dimensaoBanco[3]
  const [, ramo, , numero] = coordenadas
  let coordenadaX = PADDING_HORIZONTAL

  if (ramo === 1 || ramo === 3) {
    coordenadaX +=
      quantidadePorGrupo * PASSO_HORIZONTAL + PASSO_HORIZONTAL_CENTRAL
  }

  coordenadaX += numero * PASSO_HORIZONTAL

  return coordenadaX
}

const obterCoordenadaYCapacitor = (coordenadas, dimensaoBanco) => {
  const quantidadeGrupos = dimensaoBanco[2]
  const [, ramo, grupo] = coordenadas
  let coordenadaY = PADDING_VERTICAL

  if (ramo === 2 || ramo === 3) {
    coordenadaY +=
      quantidadeGrupos * PASSO_VERTICAL + PASSO_VERTICAL_CENTRAL
  }

  coordenadaY += grupo * PASSO_VERTICAL

  return coordenadaY
}
