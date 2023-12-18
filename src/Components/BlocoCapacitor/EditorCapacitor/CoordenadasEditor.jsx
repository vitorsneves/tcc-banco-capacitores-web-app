import { Text, Grid, Card } from '@mantine/core'
import { obterLetraFase } from '../../../utils/operacoesBanco'
import { coordProgramaParaCoordTCC } from '../../../utils/operacoesBanco'

const CoordenadasEditor = ({ coordenadas }) => {
  const [fase, ramo, grupo, numero] =
    coordProgramaParaCoordTCC(coordenadas)

  return (
    <Card withBorder>
      <Card.Section withBorder inheritPadding py='xs'>
        <Text>Coordenadas</Text>
      </Card.Section>
      <Card.Section inheritPadding mt='sm' pb='md'>
        <Grid>
          <Grid.Col span={6}>
            <Text size='sm'>Fase: {fase}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size='sm'>Ramo: {ramo}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size='sm'>Grupo: {grupo}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size='sm'>Capacitor: {numero}</Text>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  )
}

export default CoordenadasEditor
