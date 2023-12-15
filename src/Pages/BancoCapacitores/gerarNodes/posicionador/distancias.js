import { obterDimensoesBanco } from '../../../../utils/operacoesBanco'

export const PASSO_HORIZONTAL = 200
export const PASSO_VERTICAL = 95

export const PASSO_HORIZONTAL_CENTRAL = 60
export const PASSO_VERTICAL_CENTRAL = 140

export const PADDING_VERTICAL = 40
export const PADDING_HORIZONTAL = 20

export const obterDimensoesFase = banco => {
  const dimensaoBanco = obterDimensoesBanco(banco)

  const quantidadeGrupos = dimensaoBanco[2]
  const quantidadePorGrupo = dimensaoBanco[3]

  return {
    largura:
      PADDING_HORIZONTAL +
      PASSO_HORIZONTAL_CENTRAL +
      2 * quantidadePorGrupo * PASSO_HORIZONTAL,
    altura:
      PADDING_VERTICAL +
      PASSO_VERTICAL_CENTRAL +
      2 * quantidadeGrupos * PASSO_VERTICAL
  }
}
