import Nav from "./components/Nav";
import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./views/Task";
import { SurveyProvider } from "./context/task/TaskProvider";
import {BlockchainProvider} from "./context/blockchain/blockchainProvider"
import {DataProvider} from './context/data/dataProvider'
import Completed from "./views/Completed";

const Survey = () => {
  return (
    <div>
      <SurveyProvider>
        <BlockchainProvider>
          <DataProvider>
            <BrowserRouter>
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Survey" element={<Task />} />
                <Route path="/Completed" element={<Completed />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>  
        </BlockchainProvider>
      </SurveyProvider>
    </div>
  );
};

export default Survey;
