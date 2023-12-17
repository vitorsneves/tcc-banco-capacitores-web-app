import { obterNumeroFase } from '../operacoesBanco'

import balanceador from './balanceador'

export const obterTrocas = (banco, configuracoes) => {
  const {
    tipoDeBalanceamento,
    faseDeBalanceamento,
    rebalancoRapido,
    maximoDePermutacoes
  } = configuracoes

  let trocas = []

  let trocaAtual = { banco: banco }

  for (let passo = 0; passo < maximoDePermutacoes; passo++) {
    trocaAtual = balanceador(trocaAtual.banco, {
      tipoDeBalanceamento,
      rebalancoRapido,
      fase: obterNumeroFase(faseDeBalanceamento)
    })

    if (!trocaAtual.coordenadas) break

    trocas.push(trocaAtual)
  }

  return trocas
}
