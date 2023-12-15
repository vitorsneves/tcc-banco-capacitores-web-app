export const obterDimensoesBanco = banco => {
  const qntFases = banco.length
  const qntRamos = banco[0].length
  const qntGrupos = banco[0][0].length
  const qntCapacitores = banco[0][0][0].length

  const dimensoes = [qntFases, qntRamos, qntGrupos, qntCapacitores]

  return dimensoes
}

export const obterLetraFase = fase => {
  switch (fase) {
    case 0:
      return 'A'
    case 1:
      return 'B'
    case 2:
      return 'C'
  }
}

export const calcularDesvio = (placa, medida) =>
  ((medida - placa) / placa) * 100
