import { Button, Row, Col, Image, Divider } from "antd";
import RadioGroup from "../components/RadioGroup";
import { useData, useTask } from "../hooks/useSurvey";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Timer } from "../components/Timer";

const arr: any[] = [];

const Task = () => {
  
  /**
   * Hooks
   */
  const { questions, setResponse } = useTask();
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();
  const {validSurvey} = useData()
  /**
   * Next index of array.
   */
  const nextIndex = () => {
    //If actual index is less than questions length => Next index.
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
    //If actual index is equal or more than questions length => Survey Complete.
    else {
      validSurvey(arr)
      navigate("/Completed");
    }
  };

  /**
   * Push actual response and question to store.
   */
  const pushResponse = () => {
    //Reset Chronometer
    setReset(true);

    //Saving the actual question into a variable.
    let actualQuestion = questions[index].text;

    let min = 1000;
    let max = 9000;
    let num = Math.floor(Math.random() * min) + max;
    //Pushing question and response into array.
    arr.push({ id:num, question: actualQuestion, response: value });

    //Saving array in store.
    setResponse(arr);

    //Next Question
    nextIndex();

    //Set Default Value of Options.
    setValue("");
  };

  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <Col span={24}>
            <Image
              src={questions[index].image}
              className="rounded-gz inline-block"
            />
          </Col>

          <Col span={24}>
            <br />
            <div className="text-left text-0">{questions[index].text}</div>
            <br />
          </Col>

          <Col span={24}>
            <RadioGroup
              options={questions[index].options}
              onChangeValue={setValue}
            />
          </Col>

          <Divider />

          <Col span={24}>
            <Button
              type="primary"
              className="float-right"
              onClick={() => pushResponse()}
            >
              Next
            </Button>
            <Timer
              seconds={questions[index].lifetimeSeconds}
              reset={reset}
              action={pushResponse}
              actionReset={setReset}
            />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Task;
