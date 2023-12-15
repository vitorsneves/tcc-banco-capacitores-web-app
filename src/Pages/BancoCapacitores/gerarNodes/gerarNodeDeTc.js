import obterPosicaoTC from './posicionador/posicionadorTC'
import { obterLetraFase } from '../../../utils/operacoesBanco'

export default banco => {
  return [0, 1, 2].map(fase => ({
    id: `TC-fase-${obterLetraFase(fase)}`,
    position: obterPosicaoTC(banco),
    type: 'tc',
    draggable: false,
    parentNode: obterLetraFase(fase)
  }))
}
