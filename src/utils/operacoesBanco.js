import { useMantineColorScheme } from '@mantine/core'

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

export const obterNumeroFase = fase => {
  switch (fase) {
    case 'A':
      return 0
    case 'B':
      return 1
    case 'C':
      return 2
  }
}

export const bancoWebAppParaBancoAlgoritmo = bancoWeb => {
  const bancoAlgoritmo = bancoWeb.map(fase =>
    fase.map(ramo =>
      ramo.map(grupo =>
        grupo.map(
          capacitor => capacitor.capacitanciaMedida * Math.pow(10, -6)
        )
      )
    )
  )

  return bancoAlgoritmo
}

export const calcularDesvio = (placa, medida) =>
  ((medida - placa) / placa) * 100

export const coordenadaParaTexto = coordenada => {
  const [fase, ramo, grupo, numero] =
    coordProgramaParaCoordTCC(coordenada)

  return `(${fase}, ${ramo}, ${grupo}, ${numero})`
}

export const coordProgramaParaCoordTCC = coordenadaPrograma => {
  const coordenadaTCC = coordenadaPrograma.map(coord => coord + 1)

  coordenadaTCC[0] = obterLetraFase(coordenadaTCC[0] - 1)

  if (coordenadaTCC[1] > 2) {
    coordenadaTCC[1] -= 2
    coordenadaTCC[2] += 5
  }

  return coordenadaTCC
}

export const obterCorFase = fase => {
  const { colorScheme } = useMantineColorScheme()

  if (colorScheme === 'dark') {
    if (fase === 0) return '#ffe066'
    if (fase === 1) return '#8ce99a'
    return '#66d9e8'
  }

  if (fase === 0) return '#e67700'
  if (fase === 1) return '#2b8a3e'
  return '#0b7285'
}

export const obterCorCoordenadaTrocada = ehNova => {
  const { colorScheme } = useMantineColorScheme()

  if (colorScheme === 'dark') return ehNova ? '#8ce99a' : '#ffc078'

  return ehNova ? '#2f9e44' : '#e8590c'
}

export const obterCorCapacitor = capacitor => {
  const { capacitanciaPlaca, capacitanciaMedida } = capacitor
  const desvio = Math.abs(
    calcularDesvio(capacitanciaPlaca, capacitanciaMedida)
  )

  if (desvio >= 7) return '#c92a2a'

  if (desvio >= 5) return '#e8590c'

  if (desvio >= 2) return '#f08c00'

  return '#212529'
}
