import {
  Text,
  TextInput,
  NumberInput,
  Button,
  Stack,
  Group
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

const calcularDesvio = (placa, medida) =>
  ((medida - placa) / placa) * 100

export default ({
  capacitor,
  atualizarCoordenadasFixas,
  fecharEditor
}) => {
  const form = useForm({
    initialValues: {
      ...capacitor
    }
  })

  const [desvio, setDesvio] = useState(
    calcularDesvio(
      capacitor.capacitanciaPlaca,
      capacitor.capacitanciaMedida
    )
  )

  const atualizarDesvio = () => {
    const { capacitanciaPlaca, capacitanciaMedida } =
      form.getTransformedValues()

    setDesvio(calcularDesvio(capacitanciaPlaca, capacitanciaMedida))
  }

  const salvar = values => {
    atualizarCoordenadasFixas(values)
    fecharEditor()
  }

  return (
    <form onChange={atualizarDesvio} onSubmit={form.onSubmit(salvar)}>
      <Stack>
        <TextInput
          {...form.getInputProps('numeroSerie')}
          label='Número de série'
        />
        <NumberInput
          hideControls
          decimalScale={3}
          decimalSeparator=','
          {...form.getInputProps('capacitanciaPlaca')}
          label='Capacitância de placa'
          description='em μA'
        />
        <NumberInput
          hideControls
          decimalScale={3}
          decimalSeparator=','
          {...form.getInputProps('capacitanciaMedida')}
          label='Capacitância medida'
          description='em μA'
          required
        />
        <Text> Desvio = {Math.round(desvio)}%</Text>
        <Group justify='flex-end'>
          <Button variant='outline' type='submit' color='red'>
            Salvar alterações
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
