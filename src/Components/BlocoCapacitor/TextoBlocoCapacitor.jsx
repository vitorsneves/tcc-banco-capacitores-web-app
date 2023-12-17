import { Stack, Text } from '@mantine/core'
import { coordenadaParaTexto } from '../../utils/operacoesBanco'

export default ({ capacitor, coordenadas }) => {
  const { capacitanciaMedida } = capacitor

  return (
    <Stack h='100%' gap='0' justify='center'>
      <Text>{`${capacitanciaMedida.toFixed(2)} µF`}</Text>
      <Text>{coordenadaParaTexto(coordenadas)}</Text>
    </Stack>
  )
}
