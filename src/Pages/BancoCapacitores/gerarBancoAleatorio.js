import gerarVetor from '../../utils/gerarVetor'

const QUANTIDADE_DE_FASES = 3

export default (ramos, grupos, quantidadePorGrupo) =>
  gerarVetor(QUANTIDADE_DE_FASES, () =>
    gerarFase(ramos, grupos, quantidadePorGrupo)
  )

const gerarFase = (ramos, grupos, quantidadePorGrupo) =>
  gerarVetor(ramos, () => gerarRamo(grupos, quantidadePorGrupo))

const gerarRamo = (grupos, quantidadePorGrupo) =>
  gerarVetor(grupos, () => gerarGrupo(quantidadePorGrupo))

const gerarGrupo = quantidadePorGrupo =>
  gerarVetor(quantidadePorGrupo, gerarCapacitor)

const gerarCapacitor = () => {
  const numeroSerie = Math.round(30000 * Math.random())
  const capacitanciaPlaca = 100 * Math.random()
  const capacitanciaMedida = 100 * Math.random()

  return {
    numeroSerie,
    capacitanciaPlaca,
    capacitanciaMedida
  }
}
