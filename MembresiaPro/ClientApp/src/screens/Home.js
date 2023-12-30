import axios from "axios";
import React, { useEffect, useState } from "react";
import * as CryptoJS from "crypto-js";
import AOS from "aos";
import "aos/dist/aos.css";
import { ModalPayment } from "./ModalPay/ModalPayment";
import toast from "react-hot-toast";

export const Home = () => {
  const [meses, setMeses] = useState(false);
  const [dataSignature, setdataSignature] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [tarjetasRegalo, setTarjetasRegalo] = useState(0);
  const [arrayPedido, setArrayPedido] = useState({});

  const [modal, setModal] = useState(false);

  const utcDate = new Date().toISOString();

  const dataCripto = `a9b494c7-f74e-49e4-8bdb-22ba4245bdf7,cc8d80e6-226e-4a11-9f45-a5ec911e5767,${utcDate}`;

  const peticionFunction = async () => {
    const hash = CryptoJS.SHA256(dataCripto).toString();

    const cadenaPeticion = `apiKey=a9b494c7-f74e-49e4-8bdb-22ba4245bdf7&utcTimeStamp=${utcDate}&signature=${hash}`;

    setdataSignature(cadenaPeticion);

    axios
      .get("https://intcomex-test.apigee.net/v1/getcatalog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cadenaPeticion}`,
        },
      })
      .then((res) => {
        setFilteredData(
          res.data.filter((item) => item?.Brand?.Description === "XBOX")
        );

        // Imprimir el nuevo arreglo con los datos filtrados
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  let precioTarjeta = 0;

  function paymentPost(tarjetas) {
    if (tarjetas == "SE001MSE60") {
      precioTarjeta = 1000;
    }
    if (tarjetas == "SE001MSE61") {
      precioTarjeta = 600;
    }
    if (tarjetas == "SE001MSE62") {
      precioTarjeta = 300;
    }
    if(tarjetas == "SE001MSE63"){
      precioTarjeta = 200;
    }

    const pedido = {
      Sku: tarjetas,
    };
    setArrayPedido(pedido);

    setModal(!modal);
  }

  useEffect(() => {
    peticionFunction();
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="w-full">
      {modal ? (
        <ModalPayment
          arrayPedido={arrayPedido}
          setModal={setModal}
          modal={modal}
        />
      ) : (
        <></>
      )}
      <div className="bg-green-300 sm:min-h-[250vh] md:min-h-[140vh] bg-image grid md:grid-cols-2 sm:grid-cols-1 justify-center items-center" id="inicio">
        <div className="flex flex-col h-[70vh] " data-aos="fade-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Xbox_logo_%282019%29.svg/1280px-Xbox_logo_%282019%29.svg.png"
            className="w-[30vh] sm:ml-24 md:ml-32"
            alt=""
          />
          <br />
          <br />
          <p
            className="w-[70%] sm:ml-20 md:ml-28 text-white font-semibold text-2xl"
            data-aos="fade-down"
          >
            Tú preguntaste y Drunkers ha respondido. Ahora tenemos algunos de
            los mejores productos para disfrutar en tu XBOX, como Live Gold,
            Gift Card, Game Pass y mucho más.
          </p>
          <br />
          <br />
          <button onClick={()=> toast.error("This didn't work.")} className="bg-white hover:text-green-700 box-div p-2 sm:w-[45%] md:w-[20%] rounded-md ml-32 font-bold">
            Ver Mas...
          </button>
          <ul className="sm:ml-20 md:ml-28 mt-12">
            <li className="mt-3 flex">
              <p className="font-bold text-lg  bg-green-900 p-3 text-white rounded-2xl">
                1
              </p>
              <p className="pl-4 font-bold text-white text-2xl">
                Compra el producto que desees
              </p>
            </li>
            <li className="mt-3 flex">
              <p className="font-bold text-lg  bg-green-900 p-3 text-white rounded-2xl">
                2
              </p>
              <p className="pl-4 font-bold text-white text-2xl">
                Recibe la clave en tu cuenta Drunkers
              </p>
            </li>
            <li className="mt-3 flex">
              <p className="font-bold text-lg  bg-green-900 p-3 text-white rounded-2xl">
                3
              </p>
              <p className="pl-4 font-bold text-white text-2xl">
                Activa en tu cuenta Microsoft
              </p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-end">
          <img
            src="https://www.nuuvem.com/lp/es/xbox/images/xbox-render-v2-p-800.png"
            className="sm:w-[60vh] md:w-[80vh] pt-32"
            data-aos="fade-left"
            alt=""
          />
        </div>
      </div>
      <div
        className="sm:min-h-[150vh] md:min-h-[110vh] w-full justify-center flex flex-col items-center"
        id="game-pass"
      >
        <div className="flex flex-col justify-center items-center w-full sm:pt-0 md:pt-24">
          <h1 className="text-center font-bold md:text-[50px] sm:text-[30px] ">
            XBOX Game Pass
          </h1>
          <br />
          <p
            className="text-center md:w-[50%] sm:w-[70%] font-bold md:text-[25px] sm:text-[18px]"
            data-aos="fade-down"
          >
            FIFA 23 ya está disponible, ¡juega ahora! Accede también a cientos
            de juegos de alta calidad en consola, PC o en la nube. El catálogo
            de Game Pass siempre está añadiendo nuevos contenidos para ti.
            ¡Disfrútalo!
          </p>
        </div>
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="grid md:grid-cols-6 sm:grid-cols-3 max-w-[90%] pt-10"
        >
          <img
            src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-todo-sabemos-sucesor-fifa-24-3084248.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[17vh] sm:h-[30vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-todo-sabemos-sucesor-fifa-24-3084248.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[17vh] sm:h-[30vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-todo-sabemos-sucesor-fifa-24-3084248.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[17vh] sm:h-[30vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-todo-sabemos-sucesor-fifa-24-3084248.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[17vh] sm:h-[30vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-todo-sabemos-sucesor-fifa-24-3084248.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[17vh] sm:h-[30vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-todo-sabemos-sucesor-fifa-24-3084248.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[17vh] sm:h-[30vh]  m-2 rounded-lg"
            alt=""
          />
          <div className="md:col-span-6 sm:col-span-3 justify-center text-center items-center">
            <button className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold p-3 mt-3">
              Garantiza tu suscripción
            </button>
          </div>
        </div>
      </div>
      <div className="sm:min-h-[180vh] bg-xbox-green md:min-h-[170vh] w-full flex flex-col items-center">
        <div
          className="flex flex-col justify-center items-center w-full sm:pt-0 md:pt-20"
          data-aos="fade-down"
          id="subcripcion"
        >
          <h1 className="text-center text-white font-bold md:text-[50px] sm:text-[30px] ">
            Elige el plan adecuado para ti
          </h1>
          <br />
          <p className="text-center md:w-[60%] sm:w-[80%] text-white font-bold md:text-[25px] sm:text-[18px]">
            ¿Leal a los juegos de PC? ¿Comprometido con tu consola? Hay un plan
            para ti. O, con Ultimate, consíguelo todo, incluidos juegos desde la
            nube, Xbox Live Gold y mucho más.
          </p>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 md:max-w-[70%] sm:max-w-[95%] w-full pt-10">
          <div className="bg-gray-600 h-full p-5 box-div text-white m-3 rounded-2xl">
            <h1 className="text-center  font-bold text-3xl">Ultimate</h1>
            <br />
            <p className="text-center font-bold text-lg"> Elige tu plan:</p>
            <br />
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setMeses(false);
                }}
                className={`${
                  meses
                    ? "text-white border-2 border-white "
                    : "text-green-800 bg-white"
                } p-3 rounded-lg font-bold m-2`}
              >
                1 mes
              </button>
              <button
                onClick={() => {
                  setMeses(true);
                }}
                className={`${
                  meses
                    ? "text-green-800 bg-white"
                    : "text-white border-2 border-white"
                } p-3 rounded-lg font-bold m-2`}
              >
                3 meses
              </button>
            </div>
            <br />
            <div className="flex justify-center sm:pt-4">
              <button className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3">
                Unete por MEX$ {meses ? "689" : "229"}
              </button>
            </div>
            <br />
            <br />
            <ul className="">
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />{" "}
                Disfruta de cientos de juegos de alta calidad en consola, PC y
                la nube
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Nuevos juegos agregados constantemente
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Títulos de Xbox Game Studios el mismo día de su lanzamiento
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Descuentos y ofertas exclusivas para miembros
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Recompensas gratuitas, como contenido en el juego y ofertas de
                socios
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Desbloquea ventajas de Riot Games
              </li>
            </ul>
            <br />
            <br />
            <p className="font-bold text-lg">También incluye:</p>

            <div className="flex justify-center items-center">
              <img
                src="https://www.nuuvem.com/lp/es/xbox/images/gold-text.svg"
                className="m-2"
                alt=""
              />
              <img
                src="https://www.nuuvem.com/lp/es/xbox/images/ea-play_logo.svg"
                alt=""
              />
            </div>
          </div>
          {/* ==================================================================================================================================================================================== */}
          <div className="bg-green-700  h-full p-5 m-3 text-white rounded-2xl box-div">
            <h1 className="text-center font-bold text-3xl">Consola</h1>
            <br />
            <p className="text-center font-bold text-lg"> Plan disponible:</p>
            <br />
            <div className="flex justify-center">
              <button className="bg-green-800 text-white py-3 px-[40%] rounded-lg font-bold m-2">
                3 meses
              </button>
            </div>
            <br />
            <div className="flex justify-center">
              <button className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3">
                Unete por MEX$ 450
              </button>
            </div>
            <br />
            <br />
            <ul>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />{" "}
                Juega en consola a cientos de títulos de alta calidad
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Nuevos juegos agregados constantemente
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Títulos de Xbox Game Studios el mismo día de su lanzamiento
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Descuentos y ofertas exclusivas para miembros
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px]"
                />
                Desbloquea ventajas de Riot Games
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="sm:min-h-[150vh] md:min-h-[110vh] w-full sm:mt-[15vh] md:mt-0 justify-center flex flex-col items-center"
        id="xbox-live"
      >
        <div className="flex flex-col justify-center items-center w-full sm:pt-0 md:pt-24">
          <h1 className="text-center font-bold md:text-[50px] sm:text-[30px] ">
            XBOX Live Gold
          </h1>
          <br />
          <p
            className="text-center md:w-[50%] sm:w-[70%] font-bold md:text-[25px] sm:text-[18px]"
            data-aos="fade-down"
          >
            Juega ahora con tus amigos con XBOX Live Gold y consigue juegos
            gratis además de descuentos exclusivos en XBOX One y XBOX 360.
          </p>
        </div>
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="grid md:grid-cols-4 sm:grid-cols-2 w-[80%] max-w-[90%] pt-10"
        >
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              1 mes
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/xbox-live_logo.svg"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/gold-logo.svg"
              className="w-[70%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX$ 169
            </h1>
            <button className="box-img md:mt-7 sm:mt-4 hover:text-green-700 bg-white font-bold md:text-lg sm:text-base py-2 px-4 rounded-lg">
              Quiero 1 mes
            </button>
          </div>
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              3 meses
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/xbox-live_logo.svg"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/gold-logo.svg"
              className="w-[70%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX$ 419
            </h1>
            <button className="box-img md:mt-7 hover:text-green-700 sm:mt-4 bg-white font-bold md:text-lg sm:text-base py-2 px-4 rounded-lg">
              Quiero 3 mes
            </button>
          </div>
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              6 meses
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/xbox-live_logo.svg"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/gold-logo.svg"
              className="w-[70%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX$ 839
            </h1>
            <button className="box-img md:mt-7 hover:text-green-700 sm:mt-4 bg-white font-bold md:text-lg sm:text-base py-2 px-4 rounded-lg">
              Quiero 6 mes
            </button>
          </div>
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              12 meses
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/xbox-live_logo.svg"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/gold-logo.svg"
              className="w-[70%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX$ 1,159
            </h1>
            <button className="box-img md:mt-7 sm:mt-2 hover:text-green-700 bg-white font-bold md:text-base sm:text-base py-2 px-4 rounded-lg">
              Quiero 12 meses
            </button>
          </div>
        </div>
      </div>
      <div className="sm:min-h-[185vh] bg-xbox-green md:min-h-[160vh] w-full flex flex-col items-center">
        <div
          className="flex flex-col justify-center items-center w-full sm:pt-0 md:pt-20"
          data-aos="fade-down"
          id="tarjeta-regalo"
        >
          <h1 className="text-center font-bold md:text-[50px] text-white sm:text-[30px] ">
            Elige el plan adecuado para ti
          </h1>
          <br />
          <p className="text-center md:w-[60%] sm:w-[80%] font-bold md:text-[25px] text-white sm:text-[18px]">
            ¿Leal a los juegos de PC? ¿Comprometido con tu consola? Hay un plan
            para ti. O, con Ultimate, consíguelo todo, incluidos juegos desde la
            nube, Xbox Live Gold y mucho más.
          </p>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 md:max-w-[80%] sm:max-w-[95%] w-full pt-10">
          <div className="h-full p-5 text-white m-3 rounded-2xl">
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/XBOX-GIFT-MX.png"
              className="h-[90%] w-full"
              data-aos="fade-right"
              alt=""
            />
          </div>
          {/* ==================================================================================================================================================================================== */}
          <div className=" h-full p-5 m-3 text-white rounded-2xl box-div mb-0">
            <h1 className="text-center font-bold text-3xl">
              Tarjeta de regalo XBOX
            </h1>
            <br />
            <p className="text-center text-white font-bold text-lg">
              {" "}
              Asegúrate las mejores y más nuevas descargas de juegos completos
              para XBOX, aplicaciones y mucho más. El código de regalo digital
              es válido para compras en Microsoft Store online, Windows y XBOX.:
            </p>
            <br />
            <br />
            <h1 className="text-center font-bold text-3xl">Elige el tuyo</h1>
            <br />
            <div data-aos="fade-down-left" className="grid grid-cols-2 w-full">
              {filteredData && filteredData.map((item) => (
                  <button
                    onClick={() => {
                      setTarjetasRegalo(item.Sku);
                    }}
                    className={` p-3 rounded-lg font-bold m-2 text-white border-2 border-white`}
                  >
                    {item.Sku == "SE001MSE63"
                  ? "200"
                  : item.Sku == "SE001MSE62"
                  ? "300"
                  : item.Sku == "SE001MSE61"
                  ? "600"
                  : "1000"}
                  </button>
                ))}
              
            </div>

            <div className="flex justify-center sm:pt-4">
              <button
                className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3"
                onClick={() => paymentPost(tarjetasRegalo)}
              >
                Unete por MEX${" "}
                {tarjetasRegalo == "SE001MSE63"
                  ? "200"
                  : tarjetasRegalo == "SE001MSE62"
                  ? "300"
                  : tarjetasRegalo == "SE001MSE61"
                  ? "600"
                  : "1000"}
              </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
