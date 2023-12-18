import React, { useState } from "react";
import { ethers } from "ethers";
import { Card, Button, Form, Image } from "react-bootstrap";
import "./App.css";

function App() {
  const [storedPrice, setStoredPrice] = useState("");
  const [item, setItem] = useState({ pairs: "" });
  const { pairs } = item;
  const contractAddress = "0x42D99042382360e65c97A72aF763Db6e7B7B99B6";
  const ABI =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "get_BTC_ETH",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_BTC_USD",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_ETH_USD",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_LINK_USD",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const provider = new ethers.BrowserProvider(window.ethereum);
  const smartContract = new ethers.Contract(contractAddress, ABI, provider);

  const getPair = async (pair) => {
    let contractPrice = 0;
    if (pair == "BTC/USD") {
      contractPrice =
        await smartContract?.get_BTC_USD();
      setStoredPrice("$" + parseInt(contractPrice) / 100000000);
    } else if (pair === "ETH/USD") {
      contractPrice =
        await smartContract.get_ETH_USD();
      setStoredPrice("$" + parseInt(contractPrice) / 100000000);
    } else if (pair === "LINK/USD") {
      contractPrice =
        await smartContract.get_LINK_USD();
      setStoredPrice("$" + parseInt(contractPrice) / 100000000);
    } else if (pair === "BTC/ETH") {
      contractPrice =
        await smartContract.get_BTC_ETH();
      setStoredPrice("eth \n" + parseInt(contractPrice) / 1000000000000000000);
    } else {
      return;
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setStoredPrice("");
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container'>
      <h2>Chain Link Data Feed</h2>
      <div> <Card
          style={{ width: "32rem" }}
          className='mt-5 shadow bg-body rounded'>
          <Card.Header a5='h5'>Conversion Pair</Card.Header>
          <Card.Body>
            <div className='col'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='pairs'>
                  <Form.Check
                    value='BTC/USD'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-1'
                    label='BTC/USD'
                    checked={pairs === "BTC/USD"}
                  />
                  <Form.Check
                    value='ETH/USD'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-2'
                    label='ETH/USD'
                    checked={pairs === "ETH/USD"}
                  />
                  <Form.Check
                    value='LINK/USD'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-3'
                    label='LINK/USD'
                    checked={pairs === "LINK/USD"}
                  />
                  <Form.Check
                    value='BTC/ETH'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-4'
                    label='BTC/ETH'
                    checked={pairs === "BTC/ETH"}
                  />
                </Form.Group>
              </Form>
              <div className='mt-5'>
                <Button
                  type='submit'
                  onClick={() => getPair(pairs)}
                  size='sm'
                  variant='outline-primary'
                >
                  Get Answer from Chainlink Oracle
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div>
          <Card
            style={{ width: "32rem" }}
            className='mt-5 shadow bg-body rounded'
          >
            <Card.Header a5='h5'>Result</Card.Header>
            <Card.Body>
              <div className='col'>
                <h5>
                  {pairs ? `${pairs+'\n' + "=>" + storedPrice}` : "No data"}
                 
                </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
