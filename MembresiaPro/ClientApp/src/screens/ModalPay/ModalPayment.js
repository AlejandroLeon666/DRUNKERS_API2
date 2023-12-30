import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as CryptoJS from "crypto-js";
import toast from "react-hot-toast";

export const ModalPayment = ({ arrayPedido, setModal, modal }) => {
  const [description, setDescription] = useState("");
  const [precioTarjeta, setPrecioTarjeta] = useState(0);
  const [orderNumberState, setOrderNumberState] = useState("");

  //==========================================================================================================
  const utcDate = new Date().toISOString();

  const dataCripto = `a9b494c7-f74e-49e4-8bdb-22ba4245bdf7,cc8d80e6-226e-4a11-9f45-a5ec911e5767,${utcDate}`;

  const hash = CryptoJS.SHA256(dataCripto).toString();

  const cadenaPeticion = `apiKey=a9b494c7-f74e-49e4-8bdb-22ba4245bdf7&utcTimeStamp=${utcDate}&signature=${hash}`;
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
        `https://intcomex-test.apigee.net/v1/placeorder?${cadenaPeticion}&customerordernumber=${codigo}`,
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
      });
  };

  const toggle = () => setModal(!modal);

  const pagoPaypal = () => {
    axios
      .post(
        `https://localhost:44470/weatherforecast/paypal?Nombre=${description}&precio=${precioTarjeta}&cantidad=1&sku=${arrayPedido.Sku}&orderNumberState=${orderNumberState}`
      )
      .then((res) => {
        console.log(res.data.approvalUrl)
        window.location.href = res.data.approvalUrl;
      })
      .catch((res) => {
        console.log(res)
      });
  };

  const productoEncargado = () => {};

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
  }, []);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{description}</ModalHeader>
      <ModalBody>
        <h1 className="text-center text-xl font-bold">
          Elige como quieres pagar
        </h1>
      </ModalBody>
      <div className="grid grid-cols-2 w-full">
        <button
          className={`p-3 rounded-xl m-3 ${description? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
          onClick={pagoPaypal}
          disabled={description? false : true}
        >
          Pagar con PayPal
        </button>
        <br />
        <button className="bg-white text-blue-600 p-3 rounded-xl border-2 border-blue-500 m-3">
          Pagar con Stipe
        </button>
      </div>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Aceptar
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};