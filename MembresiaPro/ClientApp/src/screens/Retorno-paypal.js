import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as CryptoJS from "crypto-js";
import toast from "react-hot-toast";

export const RetornoPaypal = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const payerId = searchParams.get("PayerID");
  const order = searchParams.get("orderNumberState");
  
//==========================================================================================================
const utcDate = new Date().toISOString();

const dataCripto = `a9b494c7-f74e-49e4-8bdb-22ba4245bdf7,cc8d80e6-226e-4a11-9f45-a5ec911e5767,${utcDate}`;

const hash = CryptoJS.SHA256(dataCripto).toString();

const cadenaPeticion = `apiKey=a9b494c7-f74e-49e4-8bdb-22ba4245bdf7&utcTimeStamp=${utcDate}&signature=${hash}`;
//==========================================================================================================

  const obtenerDetallesCompra = async () => {
    try {
      const response = await axios.get(`https://tu-api.com/detalles-compra/${paymentId}`);
    } catch (error) {
      console.error('Error al obtener detalles de la compra:', error);
    }
  };

  const generateToken = (orderNumber) => {
    const body = {
      orderNumber,
    };

    axios
      .post(`https://intcomex-test.apigee.net/v1/generatetokens`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cadenaPeticion}`,
        },
      })
      .then((res) => {
        console.log("token", res.data);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  useEffect(() => {
   if(payerId == null || token == null || paymentId == null){
    window.location.href = "/"
   }
   toast.success('Gracias por tu compra!')
   generateToken(order)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h1 className="text-3xl font-bold mb-4">Retorno de PayPal</h1>
        <div className="mb-4">
          <p className="font-semibold">Payment ID:</p>
          <p>{paymentId}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Token:</p>
          <p>{token}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Payer ID:</p>
          <p>{payerId}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Order:</p>
          <p>{order}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Link de descarga:</p>
          {/* Agrega tu lógica o componente de descarga aquí */}
        </div>
        <div className="mb-4">
          <p className="font-semibold">Clave del producto:</p>
          {/* Agrega tu lógica o componente de clave de producto aquí */}
        </div>
      </div>
    </div>
  );
};
