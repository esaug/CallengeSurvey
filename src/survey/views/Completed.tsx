import { Button, Row, Col, Image, Typography, Divider } from "antd";
import { useEffect } from "react";
import { useBlockchain, useData, useTask } from "../hooks/useSurvey";
const { Title } = Typography;

const Completed = () => {

    const { response, survey } = useTask();
    const{blockchain} = useBlockchain()
    const {submitSurvey, tokensAvailables, DataState } = useData()
    
    const tokens = (_Contract:any)=>{
        tokensAvailables(_Contract)
    }

    useEffect(()=>{
        tokens(blockchain.Contract)
    },[])

    return (
        <div>
            <Row>
                <Col span={12} offset={6}>
                    <div>
                        <Image 
                            src={survey.image}
                            className="rounded-gz inline-block"/>
                        <div>You Quiz Tokens Balance</div>
                        <div>{DataState.tokens}</div>
                        <br></br>
                        <Title level={3}>Responses:</Title>
                        <Divider />
                        <div className="text-left">
                            {response.map((res: any, key: number) => (
                                <div key={key}>
                                    <Title level={5}> {res.question} </Title>
                                    <div> {res.response} </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="primary"
                            className="float-right"
                            onClick={() => {
                                submitSurvey(blockchain.userAddress, DataState, blockchain.Contract)
                                .then(()=>{
                                    tokensAvailables(blockchain.userAddress)
                                })
                                
                            }}
                            >
                            Validate Survey
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Completed;