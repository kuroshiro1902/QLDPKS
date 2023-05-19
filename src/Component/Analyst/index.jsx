import React, { useContext } from 'react';
import ChartComponent from '../Chart';
import {GlobalData} from "../GlobalContext"
const Analyst = () => {
    const {revenues} = useContext(GlobalData);
  const data = {
    labels: revenues.map((r,i)=>`Tháng ${i+1}`),
    revenues
  };
  return (
    <div>
      <h1>Biểu đồ doanh thu</h1>
      <ChartComponent data={data} />
    </div>
  );
};

export default Analyst;
