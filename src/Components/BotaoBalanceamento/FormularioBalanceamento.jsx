import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import {
  Group,
  Stack,
  Select,
  SegmentedControl,
  Fieldset,
  NumberInput,
  Button,
  Checkbox,
  Transition
} from '@mantine/core'

export default ({ realizarBalanceamento }) => {
  const form = useForm({
    initialValues: {
      tipoDeBalanceamento: 'Trifásico com pior fase',
      faseDeBalanceamento: 'C',
      rebalancoRapido: false
    }
  })

  const arrumarBugSegmentedControl = form => {
    setTimeout(() => {
      form.setFieldValue('faseDeBalanceamento', 'A')
    }, 250)
  }
  useEffect(() => arrumarBugSegmentedControl(form), [])

  const confirmar = values => {
    realizarBalanceamento(values)
  }

  return (
    <form onSubmit={form.onSubmit(confirmar)}>
      <Stack>
        <Fieldset legend='Tipo'>
          <Select
            {...form.getInputProps('tipoDeBalanceamento')}
            data={[
              'Monofásico',
              'Trifásico com pior fase',
              'Trifásico completo'
            ]}
          />
        </Fieldset>

        <Fieldset legend='Configuração'>
          <Stack>
            <Transition
              mounted={
                form.values.tipoDeBalanceamento === 'Monofásico'
              }
              transition='slide-right'
              duration={400}
              timingFunction='ease'
            >
              {styles => {
                return (
                  <SegmentedControl
                    {...form.getInputProps('faseDeBalanceamento')}
                    style={styles}
                    data={[
                      { label: 'Fase A', value: 'A' },
                      { label: 'Fase B', value: 'B' },
                      { label: 'Fase C', value: 'C' }
                    ]}
                    color='gray'
                  />
                )
              }}
            </Transition>
            <NumberInput
              {...form.getInputProps('maximoDePermutacoes')}
              label='Quantidade máxima de permutações'
              required
              allowDecimal={false}
              allowNegative={false}
            />
            <Checkbox
              {...form.getInputProps('rebalancoRapido', {
                type: 'checkbox'
              })}
              label='Rebalanço rápido'
              description='Considerar somente capacitores próximos ao solo'
              color='red'
              variant='outline'
            />
          </Stack>
        </Fieldset>

        <Group justify='flex-end'>
          <Button variant='outline' type='submit' color='red'>
            Confirmar
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
