import { obterDimensoesFase } from './distancias'
import { PASSO_VERTICAL } from './distancias'

export default (banco, fase) => ({
  x: obterCoordenadaXFase(banco, fase),
  y: obterCoordenadaYFase(banco, fase)
})

const obterCoordenadaXFase = (banco, fase) => {
  const dimensoesFase = obterDimensoesFase(banco)

  return fase * (dimensoesFase.largura + PASSO_VERTICAL)
}

const obterCoordenadaYFase = (banco, fase) => 0
