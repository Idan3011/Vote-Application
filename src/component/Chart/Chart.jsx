import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';

const VoteChart = ({ votes }) => {
    const chartContainer = useRef(null);
    const chartRef = useRef(null);
  
    useEffect(() => {

      chartRef.current = new Chart(chartContainer.current, {
        type: "bar",
        data: {
          labels: Object.keys(votes),
          datasets: [
            {
              label: "Votes",
              data: Object.values(votes),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",

              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",

              ],
              borderWidth: 0.5,
            },
          ],
        },
        options: {
        },
      });
  
      return () => {
        if (chartRef && chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, [votes]);
  
    return <canvas ref={chartContainer} />;
  };
  
  export default VoteChart;