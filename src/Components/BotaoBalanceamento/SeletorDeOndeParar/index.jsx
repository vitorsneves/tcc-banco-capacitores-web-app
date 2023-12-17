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
  return trocas.map(({ coordenadas, correntes }, trocaIndex) => {
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
          <DisplayDeCorrentes correntes={correntes} size={'sm'} />
        }
      />
    )
  })
}

export default ({ trocas }) => {
  const [trocaFinal, setTrocaFinal] = useState(0)

  return (
    <Stack>
      <Text size='sm'>
        Por favor, selecione até onde deseja ir. As demais trocas
        serão desconsideradas.
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
        <Button variant='outline' type='submit' color='red'>
          Confirmar
        </Button>
      </Group>
    </Stack>
  )
}