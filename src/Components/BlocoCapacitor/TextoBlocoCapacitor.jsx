import { Stack, Text } from '@mantine/core'

const obterLetraFase = fase => {
  switch (fase) {
    case 0:
      return 'A'
    case 1:
      return 'B'
    case 2:
      return 'C'
  }
}

export default ({ capacitor, coordenadas }) => {
  const { numeroSerie, capacitanciaMedida } = capacitor
  const [fase, ramo, grupo, numero] = coordenadas

  return (
    <Stack h='100%' gap='0' justify='center'>
      <Text>{`${capacitanciaMedida.toFixed(2)} µF`}</Text>
      <Text>{`(${obterLetraFase(fase)}, ${ramo + 1}, ${grupo + 1}, ${
        numero + 1
      })`}</Text>
    </Stack>
  )
}
