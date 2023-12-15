import { obterDimensoesFase } from './distancias'

export default banco => {
  const dimensoesFase = obterDimensoesFase(banco)

  const posicaoTC = {
    x: dimensoesFase.largura / 2 - 120,
    y: dimensoesFase.altura / 2 - 26
  }

  return posicaoTC
}
