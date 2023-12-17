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
  const [fase, ramo, grupo, numero] = coordenada

  return `(${obterLetraFase(fase)}, ${ramo + 1}, ${grupo + 1}, ${
    numero + 1
  })`
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
