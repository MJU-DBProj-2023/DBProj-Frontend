import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const EvalModalComponent = ({ isOpen, onRequestClose, projectId }) => {
  const [evalDetails, setEvalDetails] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/eval/detail?project_id=${projectId}`
        );
        setEvalDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen && projectId) {
      fetchProjectDetails();
    }
  }, [isOpen, projectId]);

  const calculateAverageScore = (result) => {
    const sum = result.avg_cus_score + result.avg_pm_score + result.avg_co_score;
    return sum / 3;
  };

  const BarGraph = ({ averageScore }) => {
    const [barWidth, setBarWidth] = useState(0);
  
    useEffect(() => {
      let intervalId;
      let width = 0;
  
      const animateBar = () => {
        intervalId = setInterval(() => {
          if (width >= averageScore * 10) {
            clearInterval(intervalId);
          } else {
            width += 1;
            setBarWidth(width);
          }
        }, 2);
      };
  
      animateBar();
  
      return () => {
        clearInterval(intervalId);
      };
    }, [averageScore]);
  
    const barStyles = {
      width: `${barWidth}%`,
      backgroundColor: 'red',
      height: '2rem',
      transition: 'width 1s ease-in-out'
    };
  
    return (
      <div className="bar-graph">
        <div className="bar" style={barStyles}></div>
        <p className="bar-value">{averageScore.toFixed(2)}</p>
      </div>
    );
  };
  
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "30%",
          top: "10%",
          left: "35%",
        },
      }}
    >
      {evalDetails ? (
        <div className="EvalDetail">
          <p className="EvalDetailName">{evalDetails.project_name}</p>
          <p className="EvalDetailCount">투입 직원 {evalDetails.employees.length}</p>
          {evalDetails.employees.map((result, employee_id) => {
            const averageScore = calculateAverageScore(result);

            return (
              <div key={employee_id} className="EvalWrap">
                <div>{result.employee_name}</div>
                <div className="EvalDetailWrap">
                  <div>
                    <p>고객 평가</p>
                    <p>{result.avg_cus_score}</p>
                  </div>
                  <div>
                    <p>PM 평가</p>
                    <p>{result.avg_pm_score}</p>
                  </div>
                  <div>
                    <p>동료 평가</p>
                    <p>{result.avg_co_score}</p>
                  </div>
                </div>
                <BarGraph averageScore={averageScore} />
              </div>
            );
          })}
          <button onClick={onRequestClose}>닫기</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
 

  );
};

export default EvalModalComponent;
