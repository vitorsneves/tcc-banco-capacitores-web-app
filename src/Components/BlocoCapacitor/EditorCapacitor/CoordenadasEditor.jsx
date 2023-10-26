import { Text, Grid, Card } from '@mantine/core'
import { obterLetraFase } from '../../../utils/operacoesBanco'

const CoordenadasEditor = ({ coordenadas }) => {
  const [fase, ramo, grupo, numero] = coordenadas

  return (
    <Card withBorder>
      <Card.Section withBorder inheritPadding py='xs'>
        <Text>Coordenadas</Text>
      </Card.Section>
      <Card.Section inheritPadding mt='sm' pb='md'>
        <Grid>
          <Grid.Col span={6}>
            <Text size='sm'>Fase: {obterLetraFase(fase)}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size='sm'>Ramo: {ramo + 1}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size='sm'>Grupo: {grupo + 1}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size='sm'>Capacitor: {numero + 1}</Text>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  )
}

export default CoordenadasEditor
