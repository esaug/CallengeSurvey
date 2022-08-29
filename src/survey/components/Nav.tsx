import React, { useEffect, useState } from "react";
import { Button, PageHeader} from 'antd';
import {useBlockchain, useData} from "../hooks/useSurvey";

const Nav = () => {

  const {connectMetamask, blockchain}= useBlockchain()
  const {tokensAvailables} = useData()
  const [connectButton, setConnectButton] = useState("Connect Wallet")

  

  const buttonState = ()=>{
    if(blockchain.userAddress){

      let subStringAddress = blockchain.userAddress.substr(0, 10)
      setConnectButton(
          `${subStringAddress}...`
        )
    } 
  }


  const handleConection = ()=>{
    connectMetamask()
  }

  useEffect(()=>{
    buttonState()
    tokensAvailables(blockchain.Contract)
  }, [blockchain.userAddress])

  return (
    <div>
      <PageHeader
        ghost={false}
        title="Cripto Survey"
        extra={[
          <Button
            key="1"
            type="primary"
            className="btn-connect"
            onClick={()=>handleConection()}
          >
            {connectButton}
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Nav;
