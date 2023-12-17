import { obterDimensoesFase } from './posicionador/distancias'
import obterPosicaoFase from './posicionador/posicionadorFase'

import {
  obterLetraFase,
  obterCorFase
} from '../../../utils/operacoesBanco'

export default banco => {
  const dimensoesFase = obterDimensoesFase(banco)

  const style = {
    width: dimensoesFase.largura,
    height: dimensoesFase.altura,
    opacity: 0.2
  }

  return [0, 1, 2].map(fase => ({
    id: obterLetraFase(fase),
    type: 'group',
    position: obterPosicaoFase(banco, fase),
    style: {
      ...style,
      backgroundColor: obterCorFase(fase)
    },
    draggable: false
  }))
}
