import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './pages/Layout';
import useFetchCSVData from './hooks/useFetchCSVData';
import LoadingSpinner from './component/common/loading/LoadingSpinner.component';
import apis from './@constants/apis/api';
import { useEffect } from 'react';
import NavigateMainPage from './pages/NavigateMainPage';

function App() {
  // const {isLoading, isError, csvData: population} = useFetchCSVData(apis.population);

  // if(isLoading) return <LoadingSpinner isLoading={isLoading} />

  // if(isError) return <>Error</>; // TODO: skeleton UI 형태나 에러가 났음을 알리는 무언가가 필요 (버튼으로 특정 영역 데이터만 fetch하도록 하는 것도 괜찮을 듯)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/*' element={<NavigateMainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
