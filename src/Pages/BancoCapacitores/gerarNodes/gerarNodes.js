import gerarNodeDeFase from './gerarNodeDeFase'
import gerarNodeDeCapacitor from './gerarNodeDeCapacitor'
import gerarNodeDeTc from './gerarNodeDeTc'

export default (banco, atualizarCapacitor) => {
  let nodes = []

  nodes.push(...gerarNodeDeFase(banco))

  nodes.push(...gerarNodeDeCapacitor(banco, atualizarCapacitor))

  nodes.push(...gerarNodeDeTc(banco))

  return nodes
}
