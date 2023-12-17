import { Stack, Text } from '@mantine/core'
import {
  obterCorFase,
  obterLetraFase
} from '../../utils/operacoesBanco'

export default ({ correntes, size }) => {
  return (
    <Stack gap={1}>
      {correntes.map((corrente, fase) => (
        <Text fw={600} key={fase} c={obterCorFase(fase)} size={size}>
          {`I${obterLetraFase(
            fase
          ).toLocaleLowerCase()} = ${corrente.toFixed(2)} μA`}
        </Text>
      ))}
    </Stack>
  )
}
