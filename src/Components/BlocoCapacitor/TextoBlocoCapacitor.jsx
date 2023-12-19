import { Stack, Text } from '@mantine/core'
import { coordenadaParaTexto } from '../../utils/operacoesBanco'
import { obterCorCoordenadaTrocada } from '../../utils/operacoesBanco'

const obterTextoCoordenadas = (capacitor, coordenadas) => {
  const { mudouDeLugar, coordenadasAntigas } = capacitor

  if (mudouDeLugar)
    return (
      <>
        <Text c={obterCorCoordenadaTrocada(false)} opacity='0.5'>
          {coordenadaParaTexto(coordenadasAntigas)}
        </Text>
        <Text fw={600} c={obterCorCoordenadaTrocada(true)}>
          {coordenadaParaTexto(coordenadas)}
        </Text>
      </>
    )

  return <Text>{coordenadaParaTexto(coordenadas)}</Text>
}

export default ({ capacitor, coordenadas }) => {
  const { capacitanciaMedida } = capacitor

  return (
    <Stack h='100%' gap='0' justify='center'>
      <Text>{`${capacitanciaMedida.toFixed(2)} µF`}</Text>
      {obterTextoCoordenadas(capacitor, coordenadas)}
    </Stack>
  )
}
