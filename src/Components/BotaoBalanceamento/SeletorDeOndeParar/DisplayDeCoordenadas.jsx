import { Group, Text } from '@mantine/core'
import { coordenadaParaTexto } from '../../../utils/operacoesBanco'
import { IconArrowsExchange } from '@tabler/icons-react'

export default ({ coordenadas, size }) => {
  const [primeiraCoord, segundaCoord] = coordenadas.map(
    coordenadaParaTexto
  )

  return (
    <Group>
      <Text fw={600} size={size}>
        {primeiraCoord}
      </Text>
      <IconArrowsExchange size={24.8} />
      <Text fw={600} size={size}>
        {segundaCoord}
      </Text>
    </Group>
  )
}
