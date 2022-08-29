import { Link } from "react-router-dom";
import { Row, Col, Image, Button } from "antd";
import { useBlockchain, useData, useTask } from "../hooks/useSurvey";
import { useEffect, useState } from "react";

const Hero = () => {

  const { survey } = useTask();
  const {blockchain}= useBlockchain()
  const [buttonSurvey, setButtonSurvey] = useState(true)
  const {DataState, tokensAvailables}=useData()


  const changeStateButton = ()=>{
      if(blockchain.userAddress){
          setButtonSurvey(false)
      }
  }

  useEffect(()=>{
    changeStateButton()
  },[blockchain.userAddress])


  return (
    <div className="text-center">
      <Row>
        <Col span={12} offset={6} >
          <div className="inline-block">
            <Image
              
              src={survey.image}
              className="rounded-gz inline-block"
            />
            <div className="text-left text-1">{survey.title}</div>
            <div>You Quiz Tokens Balance</div>
            <div>{DataState.tokens}</div>
            <br></br>
            <Link to={'Survey'}>
              <Button key="1" type="primary" block className="mt-x1 btn-connect" disabled={buttonSurvey}>
                Start now
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

    </div>
  );
};

export default Hero;
