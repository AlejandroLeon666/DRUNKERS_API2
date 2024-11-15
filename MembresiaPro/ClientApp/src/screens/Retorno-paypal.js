import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import ApiConfig from "../components/ApiConfig";

export const RetornoPaypal = () => {
  const [dataToken, setDataToken] = useState([]);
  const [dataOrder, setDataOrder] = useState({});
  const [nameDescription, setNameDescription] = useState("")
  const [productKey, setProductKey] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [getError, setGetError] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const payerId = searchParams.get("PayerID");
  const order = searchParams.get("orderNumberState");

  //==========================================================================================================
  const utcDate = new Date().toISOString();

  const dataCripto = `5c3a65b0-b617-423f-8940-0356ede39f47,60546ce5-a23a-4bbb-bd0a-caaf1dc47b54,${utcDate}`;

  const hash = CryptoJS.SHA256(dataCripto).toString();

  const cadenaPeticion = `apiKey=5c3a65b0-b617-423f-8940-0356ede39f47&utcTimeStamp=${utcDate}&signature=${hash}`;
  //==========================================================================================================

  const generateToken = (orderNumber) => {
    const body = {
      orderNumber,
    };

    axios
      .post(`${ApiConfig.general}/generatetokens`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cadenaPeticion}`,
        },
      })
      .then((res) => {
        setDataToken(res.data[0])
        setProductKey(res.data[0].Tokens[0].ProductKey)
        setLinkUrl(res.data[0].Tokens[0].LinkUrl)
        getOrder();
      })
      .catch((error) => {
        setLoading(true)  
        setGetError(true)
      });
  };

  const getOrder = () => {
    axios
      .get(
        `${ApiConfig.general}/getorder?${cadenaPeticion}&ordernumber=${order}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setNameDescription(res.data.Items[0].Product.Description)
        setLoading(true)  
      })
      .catch((error) => {
        console.error(error.response);
        setLoading(true)
      });
  };

  useEffect(() => {
    if (payerId == null || token == null || paymentId == null) {
      window.location.href = "/";
    }
    toast.success("Gracias por tu compra!");
    generateToken(order);
    setLoading(false)
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 max-w-[100vh] mt-10 rounded-md box-div">
        <h1 className="text-3xl font-bold mb-4">
          Detalles de Compra
        </h1>
        {
          getError ? (
            // Renderizar un mensaje de error específico cuando getError es true
            <div>
              <p>Lo sentimos, se ha producido un error.</p>
              <p>Por favor, inténtalo de nuevo más tarde y favor de contactarnos. <br /> 
              <span className="text-blue-400">soporte@drunkers.com.mx</span> </p>
            </div>
          ) :loading ? (
            <>
              <div className="flex items-center border-b pb-4 mb-4">
                <img
                  src="imagen_del_juego.jpg"
                  alt="Nombre del Juego"
                  className="w-32 h-32 mr-4 rounded-md"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">
                    {nameDescription}
                  </h2>
                  <p className="text-gray-600">Licencia MPN: {dataToken?.Mpn}</p>
                  <p className="text-gray-600">Cantidad: 1</p>
                  <p className="text-gray-600">
                    {productKey}
                  </p>
                </div>
              </div>
  
              <div className="mt-4">
                <p className="text-gray-600">
                  *Al descargar esta licencia acepta términos y condiciones de
                  Microsoft
                </p>
              </div>
  
              <div className="mt-6">
                <a
                   href={linkUrl? linkUrl : '#'}
                  className="bg-green-600 text-white px-4 py-2 rounded-md inline-block"
                >
                  Iniciar Descarga
                </a>
              </div>
  
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Pasos de activación:</h2>
                <ol className="list-decimal pl-6">
                  <li>Ingresa en el botón para iniciar la descarga</li>
                  <li>Ingresa el código de 25 dígitos</li>
                  <li>
                    Si no tienes una cuenta Microsoft, visita{" "}
                    <a
                      href="https://www.xbox.com/live"
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.xbox.com/live
                    </a>{" "}
                    y sigue los pasos para crear una cuenta nueva. Luego ingresa
                    el código de 25 dígitos. Para más información acerca de cómo
                    canjear códigos, visita{" "}
                    <a
                      href="https://www.xbox.com/howtoredeem-console"
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.xbox.com/howtoredeem-console
                    </a>
                  </li>
                </ol>
              </div>
            </>
          ) : (
            <h1>Cargando...</h1>
          )
        }
      </div>
    </div>
  );
};
