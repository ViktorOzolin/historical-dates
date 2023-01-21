import React from 'react';
import {Layout} from './components/Layout/Layout';
import {Container} from './components/Container/Container';
import {HistoricalDates} from './components/HistoricalDates/HistoricalDates';
import {data} from './mocks/mocks';


function App() {
  return (
    <Layout>
        <Container>
            <HistoricalDates data={data}/>
        </Container>
    </Layout>
  );
}

export default App;
