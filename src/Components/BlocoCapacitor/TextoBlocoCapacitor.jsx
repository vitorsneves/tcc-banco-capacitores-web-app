import { Stack, Text } from '@mantine/core'
import { obterLetraFase } from '../../utils/operacoesBanco'

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
