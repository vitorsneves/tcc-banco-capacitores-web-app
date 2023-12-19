import { useState } from 'react'
import DisplayDeCoordenadas from './DisplayDeCoordenadas'
import DisplayDeCorrentes from '../../DisplayDeCorrentes'
import {
  ScrollArea,
  Stepper,
  Stack,
  Group,
  Button,
  Text
} from '@mantine/core'

const obterSteps = trocas => {
  const { tipoDeBalanceamento, faseDeBalanceamento, valores } = trocas

  return valores.map(({ coordenadas, correntes }, trocaIndex) => {
    return (
      <Stepper.Step
        key={trocaIndex}
        label={
          <DisplayDeCoordenadas
            coordenadas={coordenadas}
            size={'md'}
          />
        }
        description={
          <DisplayDeCorrentes
            tipoDeBalanceamento={tipoDeBalanceamento}
            faseDeBalanceamento={faseDeBalanceamento}
            correntes={correntes}
            size={'sm'}
          />
        }
      />
    )
  })
}

export default ({
  trocas,
  marcarCapacitoresQueTrocaram,
  fecharSeletor
}) => {
  const [trocaFinal, setTrocaFinal] = useState(0)

  const confirmar = () => {
    marcarCapacitoresQueTrocaram(trocas, trocaFinal + 1)
    fecharSeletor()
  }

  if (trocas.valores.length === 0) {
    return (
      <Stack>
        <Text size='sm' ta='justify'>
          A partir das condições especificadas anteriormente, não foi
          possível encontrar uma troca que permitisse diminuir a
          corrente de desbalanço.
        </Text>
        <Text size='sm' ta='justify'>
          Em virtude disso, a disposição de capacitores será mantida.
        </Text>
        <Group justify='flex-end'>
          <Button
            variant='outline'
            onClick={fecharSeletor}
            color='red'
          >
            Confirmar
          </Button>
        </Group>
      </Stack>
    )
  }

  return (
    <Stack>
      <Text ta='justify' size='sm'>
        {trocas.valores.length === 1
          ? 'Foi possível encontrar uma troca.\
           Ela é exibida abaixo. Confirme para aplicá-la.'
          : 'Abaixo são exibidas todas as possíveis trocas.\
           Por favor, selecione até onde deseja ir.\
            As demais trocas serão desconsideradas.'}
      </Text>
      <ScrollArea h={300} type='always'>
        <Stepper
          active={trocaFinal}
          onStepClick={setTrocaFinal}
          orientation='vertical'
          color='#2b8a3e'
        >
          {obterSteps(trocas)}
        </Stepper>
      </ScrollArea>
      <Text size='sm'>
        {trocaFinal === 0
          ? `Será feita 1 troca no total.`
          : `Serão feitas ${trocaFinal + 1} trocas no total`}
      </Text>
      <Group justify='flex-end'>
        <Button variant='outline' onClick={confirmar} color='red'>
          Confirmar
        </Button>
      </Group>
    </Stack>
  )
}
