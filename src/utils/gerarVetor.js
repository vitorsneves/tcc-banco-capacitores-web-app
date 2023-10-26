const gerarVetor = (quantidadeElementos, funcaoGeradora) => {
  return Array.from(new Array(quantidadeElementos), funcaoGeradora)
}

export default gerarVetor
