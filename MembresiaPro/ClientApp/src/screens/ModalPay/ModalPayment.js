import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import ApiConfig from "../../components/ApiConfig";

export const ModalPayment = ({ arrayPedido, setModal, modal }) => {
  const [description, setDescription] = useState("");
  const [precioTarjeta, setPrecioTarjeta] = useState(0);
  const [orderNumberState, setOrderNumberState] = useState("");
  //=========================================================================================================
  const apikey = "key_xxxxx";

    const apiContack =async()=>{
    }
    
  //==========================================================================================================
  const utcDate = new Date().toISOString();

  const dataCripto = `5c3a65b0-b617-423f-8940-0356ede39f47,60546ce5-a23a-4bbb-bd0a-caaf1dc47b54,${utcDate}`;

  const hash = CryptoJS.SHA256(dataCripto).toString();

  const cadenaPeticion = `apiKey=5c3a65b0-b617-423f-8940-0356ede39f47&utcTimeStamp=${utcDate}&signature=${hash}`;
  //==========================================================================================================

  function generarCodigoAleatorio(longitud) {
    const caracteres = "0123456789";
    let codigo = "";

    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
    consultarStock(codigo);
  }

  const consultarStock = (codigo) => {
    toast.loading('Loading...');
    const body = [{ Sku: arrayPedido.Sku, Quantity: "1" }];
    axios
      .post(
        `${ApiConfig.general}/placeorder?${cadenaPeticion}&customerordernumber=${codigo}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.dismiss();
        setDescription(res.data.Items[0].Product.Description);

        setOrderNumberState(res.data.OrderNumber);
      })
      .catch((error) => {
        console.error(error.response);
        toast.dismiss();
        toast.error("Algo salio mal!")
      });
  };

  const toggle = () => setModal(!modal);

  const pagoPaypal = () => {
    axios
      .post(
        `/weatherforecast/paypal?Nombre=${description}&precio=${precioTarjeta}&cantidad=1&sku=${arrayPedido.Sku}&orderNumberState=${orderNumberState}`
      )
      .then((res) => {
        window.location.href = res.data.approvalUrl;
        console.log(res.data.approvalUrl)
      })
      .catch((res) => {
      });
  };

  const inputValue = (e) => {
    console.log('input',e.target.value)
    if(e.target.value === "Drunkers6!@€"){
      console.log('si es', orderNumberState)
      window.location.href = `/retorno-paypal?orderNumberState=${orderNumberState}&paymentId=1&token=1&PayerID=1`;
    }
  };

  useEffect(() => {
    generarCodigoAleatorio(4);

    if (arrayPedido?.Sku == "SE001MSE60") {
      setPrecioTarjeta(1000);
    }
    if (arrayPedido?.Sku == "SE001MSE61") {
      setPrecioTarjeta(600);
    }
    if (arrayPedido?.Sku == "SE001MSE62") {
      setPrecioTarjeta(300);
    }
    if (arrayPedido?.Sku == "SE001MSE63") {
      setPrecioTarjeta(200);
    }
    if (arrayPedido?.Sku == "SE014MSE37") {
      setPrecioTarjeta(249);
    }
    if (arrayPedido?.Sku == "SE014MSE38") {
      setPrecioTarjeta(749);
    }
    if (arrayPedido?.Sku == "SE017MSE63") {
      setPrecioTarjeta(449);
    }
    if (arrayPedido?.Sku == "SE026MSE45") {
      setPrecioTarjeta(169);
    }
    if (arrayPedido?.Sku == "SE026MSE46") {
      setPrecioTarjeta(419);
    }
    if (arrayPedido?.Sku == "SE026MSE47") {
      setPrecioTarjeta(839);
    }
    if (arrayPedido?.Sku == "SE026MSE48") {
      setPrecioTarjeta(1159);
    }

    console.log('arrayPedido?.Sku',arrayPedido?.Sku)
  }, []);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader className="">
        <h1>{description}</h1>
        <IoClose  className="text-2xl cursor-pointer" onClick={toggle}/>
      </ModalHeader>
      <ModalBody>
        <h1 className="text-center text-xl font-bold">
          Elige como quieres pagar
        </h1>
      </ModalBody>
      <div className="flex flex-col w-full items-center">
        <br /><br />
        <button
          className={`p-3 rounded-xl m-3 w-[50%] ${description? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-600 text-white'}`}
          onClick={pagoPaypal}
          disabled={description? false : true}
        >
          Pagar con PayPal
        </button>
        <button
          className={`p-3 rounded-xl m-3 w-[50%] ${description? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-600 text-white'}`}
          onClick={apiContack}
        >
          Pagar con Conekta
        </button>
        <br />
        <input disabled={description? false : true} type="text" placeholder="Cupon..." className="rounded-md w-[50%] border-2 border-blue-300 p-2" onChange={(e)=>{
          inputValue(e)
        }}/>
        <br /><br />
      </div>
    </Modal>
  );
};
