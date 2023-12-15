import {
  Group,
  Stack,
  Select,
  SegmentedControl,
  Fieldset,
  NumberInput,
  Button
} from '@mantine/core'
import { useState, useEffect } from 'react'

export default () => {
  const [tipoBalanceamento, setTipoBalanceamento] = useState(
    'Trifásico com pior fase'
  )

  const [fase, setFase] = useState('Fase C')

  useEffect(() => {
    setTimeout(() => {
      setFase('Fase A')
    }, 150)
  }, [])

  return (
    <Stack>
      <Fieldset legend='Tipo'>
        <Select
          value={tipoBalanceamento}
          onChange={setTipoBalanceamento}
          data={[
            'Monofásico',
            'Trifásico com pior fase',
            'Trifásico completo'
          ]}
        />
      </Fieldset>

      <Fieldset legend='Configuração'>
        <Stack>
          {tipoBalanceamento === 'Monofásico' && (
            <SegmentedControl
              data={['Fase A', 'Fase B', 'Fase C']}
              value={fase}
              onChange={setFase}
              color='gray'
            />
          )}
          <NumberInput
            label='Quantidade máxima de permutações'
            allowDecimal={false}
            allowNegative={false}
          />
        </Stack>
      </Fieldset>

      <Group justify='flex-end'>
        <Button
          variant='outline'
          type='submit'
          color='red'
          disabled={true}
        >
          Confirmar
        </Button>
      </Group>
    </Stack>
  )
}
