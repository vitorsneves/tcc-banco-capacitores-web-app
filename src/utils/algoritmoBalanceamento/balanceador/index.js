import permutacoes from './permutacoes.js'
import calculaCorrentesDeTodasAsFases from './calculadoraDoBanco.js'
import { obterDimensoesBanco } from '../../operacoesBanco.js'

const balanceador = (
  banco,
  { tipoDeBalanceamento, rebalancoRapido, fase }
) => {
  let bancoAtual = JSON.parse(JSON.stringify(banco))
  let correntesIniciais = calculaCorrentesDeTodasAsFases(bancoAtual)
  let correntesAtuais = correntesIniciais
  let coordenadasAtuais = null

  const testarPermutacao = coordenadas => {
    let bancoNovo = trocarCapacitores(banco, coordenadas)
    let correntesNovas = calculaCorrentesDeTodasAsFases(bancoNovo)

    if (
      configuracaoEhMelhor(
        correntesAtuais,
        correntesNovas,
        correntesIniciais
      )
    ) {
      bancoAtual = bancoNovo
      correntesAtuais = correntesNovas
      coordenadasAtuais = coordenadas
    }
  }

  const obterPermutacoes = banco => {
    const permutador = permutacoes(obterDimensoesBanco(banco))
    let vetorPermutacoes = []

    if (tipoDeBalanceamento === 'Monofásico') {
      vetorPermutacoes = permutador.obterPermutacoesMonofasicas(fase)
    }

    if (tipoDeBalanceamento === 'Trifásico') {
      const piorFase = obterPiorFase(banco)
      vetorPermutacoes =
        permutador.obterPermutacoesTrifasicasComPiorFase(piorFase)
    }

    if (tipoDeBalanceamento === 'Trifásico completo') {
      vetorPermutacoes = permutador.obterPermutacoesTrifasicas()
    }

    if (rebalancoRapido)
      return filtarPermutacoesLentas(vetorPermutacoes)

    return vetorPermutacoes
  }

  const vetorPermutacoes = obterPermutacoes(banco)
  vetorPermutacoes.forEach(testarPermutacao)

  return {
    coordenadas: coordenadasAtuais,
    correntes: correntesAtuais,
    banco: bancoAtual
  }
}

const filtarPermutacoesLentas = permutacoes =>
  permutacoes.filter(permutacao =>
    permutacao.map(ehDoHackInferior).every(o => o)
  )

const ehDoHackInferior = ([, ramo, grupo]) =>
  (ramo === 2 || ramo === 3) && grupo !== 0

const obterPiorFase = banco => {
  const correntes = calculaCorrentesDeTodasAsFases(banco)
  const moduloCorrentes = correntes.map(corrente =>
    Math.abs(corrente)
  )
  const maiorCorrente = Math.max(...moduloCorrentes)
  const piorFase = moduloCorrentes.indexOf(maiorCorrente)

  return piorFase
}

const configuracaoEhMelhor = (
  correntesAtuais,
  correntesNovas,
  correntesIniciais
) => {
  const variacaoAtual = calcularVariacao(
    correntesIniciais,
    correntesAtuais
  )

  const variacaoNova = calcularVariacao(
    correntesIniciais,
    correntesNovas
  )

  const totalAtual = variacaoAtual.reduce((a, b) => a + b)
  const totalNova = variacaoNova.reduce((a, b) => a + b)

  return totalNova < totalAtual
}

const calcularVariacao = (correntesAtuais, correntesNovas) => {
  return correntesAtuais.map(
    (corrente, indice) =>
      Math.abs(correntesNovas[indice]) - Math.abs(corrente)
  )
}

const trocarCapacitores = (pontes, coord) => {
  let pontesNovas = JSON.parse(JSON.stringify(pontes))

  pontesNovas[coord[0][0]][coord[0][1]][coord[0][2]][coord[0][3]] =
    pontes[coord[1][0]][coord[1][1]][coord[1][2]][coord[1][3]]

  pontesNovas[coord[1][0]][coord[1][1]][coord[1][2]][coord[1][3]] =
    pontes[coord[0][0]][coord[0][1]][coord[0][2]][coord[0][3]]

  return pontesNovas
}

export default balanceador
