import { Stack, Text } from '@mantine/core'
import { obterNumeroFase } from '../../utils/operacoesBanco'
import {
  obterCorFase,
  obterLetraFase
} from '../../utils/operacoesBanco'

const obterLinhaDoDisplay = (corrente, size, fase) => (
  <Text fw={600} key={fase} c={obterCorFase(fase)} size={size}>
    {`I${obterLetraFase(
      fase
    ).toLocaleLowerCase()} = ${corrente.toFixed(2)} mA`}
  </Text>
)

export default ({
  correntes,
  size,
  tipoDeBalanceamento,
  faseDeBalanceamento
}) => {
  if (tipoDeBalanceamento === 'Monofásico') {
    const numeroFase = obterNumeroFase(faseDeBalanceamento)
    return obterLinhaDoDisplay(
      correntes[numeroFase],
      size,
      numeroFase
    )
  }

  return (
    <Stack gap={1}>
      {correntes.map((corrente, fase) =>
        obterLinhaDoDisplay(corrente, size, fase)
      )}
    </Stack>
  )
}
