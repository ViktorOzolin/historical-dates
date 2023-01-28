import React, {FC} from 'react';
import {Layout} from './components/Layout/Layout';
import {Container} from './components/Container/Container';
import {HistoricalDates} from './components/HistoricalDates/HistoricalDates';
import {data} from './mocks/mocks';


export const App: FC = () => {
  return (
    <Layout>
        <Container>
            <HistoricalDates data={data} />
        </Container>
    </Layout>
  );
}
