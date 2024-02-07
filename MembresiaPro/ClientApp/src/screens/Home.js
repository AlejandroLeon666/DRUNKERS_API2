import axios from "axios";
import React, { useEffect, useState } from "react";
import * as CryptoJS from "crypto-js";
import AOS from "aos";
import "aos/dist/aos.css";
import { ModalPayment } from "./ModalPay/ModalPayment";
import toast, { Toaster } from "react-hot-toast";
import xboxLogo from "../assets/logoXbox.png";
import imgPortada from "../assets/fondoJuegos.png";
import TrustpilotWidget from "../components/Trustoilot";
import { SiAdguard } from "react-icons/si";
import { IoLogoWechat } from "react-icons/io5";
import { IoCloudDownloadSharp } from "react-icons/io5";
import ApiConfig from "../components/ApiConfig";
import NavMenu from "../components/NavMenu";

export const Home = () => {
  const [meses, setMeses] = useState(false);
  const [pc, setPc] = useState(false);
  const [dataSignature, setdataSignature] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [tarjetasRegalo, setTarjetasRegalo] = useState("SE001MSE60");
  const [gamePass, setgamePass] = useState("SE026MSE45");
  const [arrayPedido, setArrayPedido] = useState({});

  const [modal, setModal] = useState(false);

  const utcDate = new Date().toISOString();

  const dataCripto = `5c3a65b0-b617-423f-8940-0356ede39f47,60546ce5-a23a-4bbb-bd0a-caaf1dc47b54,${utcDate}`;

  const peticionFunction = async () => {
    const hash = CryptoJS.SHA256(dataCripto).toString();

    const cadenaPeticion = `apiKey=5c3a65b0-b617-423f-8940-0356ede39f47&utcTimeStamp=${utcDate}&signature=${hash}`;

    setdataSignature(cadenaPeticion);

    axios
      .get(`${ApiConfig.general}/getcatalog`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cadenaPeticion}`,
        },
      })
      .then((res) => {
        setFilteredData(
          res.data.filter((item) => item?.Brand?.Description === "XBOX")
        );

        console.log("data productos", res.data);

        // Imprimir el nuevo arreglo con los datos filtrados
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  let precioTarjeta = 0;

  function paymentPost(tarjetas) {
    console.log("el sku", tarjetas);
    if (tarjetas == "SE001MSE60") {
      precioTarjeta = 1000;
    }
    if (tarjetas == "SE001MSE61") {
      precioTarjeta = 600;
    }
    if (tarjetas == "SE001MSE62") {
      precioTarjeta = 300;
    }
    if (tarjetas == "SE001MSE63") {
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
    <div className="w-full overflow-x-hidden">
      <Toaster
        position="top-center"
        className="max-w-[50%]"
        reverseOrder={false}
      />
      <NavMenu />
      {modal ? (
        <ModalPayment
          arrayPedido={arrayPedido}
          setModal={setModal}
          modal={modal}
        />
      ) : (
        <></>
      )}
      <div
        className="bg-green-300 sm:h-[200vh] md:h-[120vh] bg-image  md:grid sm:hidden grid-cols-2 justify-center items-center"
        id="inicio"
      >
        <div
          className="flex flex-col items-center h-[70vh] "
          data-aos="fade-right"
        >
          <img src={xboxLogo} className="w-[40vh] md:ml-32" alt="" />
          <br />
          <p
            className="w-[70%] md:ml-28 text-white font-semibold text-2xl"
            data-aos="fade-down"
          >
            Tú preguntaste y Drunkers ha respondido. Ahora tenemos algunos de
            los mejores productos para disfrutar en tu XBOX, como Live Gold,
            Gift Card, Game Pass y mucho más.
          </p>
          <br />
          <br />
          <a
            href="/#game-pass"
            className="bg-white hover:text-green-700 text-center text-black shadow-md p-3 sm:w-[45%] md:w-[20%] rounded-md  font-bold animate-bounce"
          >
            Ver Mas...
          </a>
          <ul className="sm:ml-3 md:ml-28 mt-12">
            <li className="mt-3 flex">
              <p className="font-bold md:text-lg sm:text-base bg-green-400 p-2 text-white rounded-2xl">
                1
              </p>
              <p className="pl-4 font-bold text-white sm:text-xl md:text-2xl">
                Compra el producto que desees
              </p>
            </li>
            <li className="mt-3 flex">
              <p className="font-bold md:text-lg sm:text-base bg-green-400 p-2 text-white rounded-2xl">
                2
              </p>
              <p className="pl-4 font-bold text-white sm:text-xl md:text-2xl">
                Recibe la clave en tu cuenta Drunkers
              </p>
            </li>
            <li className="mt-3 flex">
              <p className="font-bold md:text-lg sm:text-base bg-green-400 p-2 text-white rounded-2xl">
                3
              </p>
              <p className="pl-4 font-bold text-white sm:text-xl md:text-2xl">
                Activa en tu cuenta Microsoft
              </p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-end">
          <img
            src={imgPortada}
            className="sm:w-[90%] md:w-[100vh] sm:pt-20 md:pt-32"
            data-aos="fade-left"
            alt=""
          />
        </div>
      </div>

      <div
        className="bg-green-300 sm:h-[130vh] bg-image  md:hidden sm:flex flex-col justify-start items-center"
        id="inicio"
      >
        <div
          className="flex flex-col items-center mt-[15vh] h-[70vh] "
          data-aos="fade-right"
        >
          <img src={xboxLogo} className="w-[40vh]" alt="" />
          <br />
          <p
            className="w-[80%] md:ml-28 text-white text-center font-semibold text-xl"
            data-aos="fade-down"
          >
            Tú preguntaste y Drunkers ha respondido. Ahora tenemos algunos de
            los mejores productos para disfrutar en tu XBOX, como Live Gold,
            Gift Card, Game Pass y mucho más.
          </p>
          <br />
          <br />
          <a
            href="/#game-pass"
            className="bg-white hover:text-green-700 text-center text-black shadow-md p-3 sm:w-[45%] md:w-[20%] rounded-md  font-bold animate-bounce"
          >
            Ver Mas...
          </a>
          <div className="flex justify-center items-end">
            <img
              src={imgPortada}
              className="w-[70%]"
              data-aos="fade-left"
              alt=""
            />
          </div>
          <ul className="sm:ml-3 md:ml-28 mt-12">
            <li className="mt-3 flex">
              <p className="font-bold md:text-lg sm:text-base bg-green-400 p-2 text-white rounded-2xl">
                1
              </p>
              <p className="pl-4 font-bold text-white sm:text-lg md:text-2xl">
                Compra el producto que desees
              </p>
            </li>
            <li className="mt-3 flex">
              <p className="font-bold md:text-lg sm:text-base bg-green-400 p-2 text-white rounded-2xl">
                2
              </p>
              <p className="pl-4 font-bold text-white sm:text-lg md:text-2xl">
                Recibe la clave en tu cuenta Drunkers
              </p>
            </li>
            <li className="mt-3 flex">
              <p className="font-bold md:text-lg sm:text-base bg-green-400 p-2 text-white rounded-2xl">
                3
              </p>
              <p className="pl-4 font-bold text-white sm:text-lg md:text-2xl">
                Activa en tu cuenta Microsoft
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="sm:min-h-[120vh] md:min-h-[110vh] w-full justify-center flex flex-col items-center sm:pb-5 md:pb-0"
        id="game-pass"
      >
        <div className="flex flex-col justify-center items-center w-full sm:pt-10 md:pt-24">
          <h1 className="text-center font-bold md:text-[50px] sm:text-[30px] ">
            XBOX Game Pass
          </h1>
          <br />
          <p
            className="text-center md:w-[50%] sm:w-[80%] font-bold md:text-[25px] sm:text-[18px]"
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
            src="https://cdn5.mtcgame.com/Images/Category/3ac77ff3-3da9-44ce-ace9-7dfc3744e189.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[95%] sm:h-[27vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://store-images.s-microsoft.com/image/apps.21536.13727851868390641.c9cc5f66-aff8-406c-af6b-440838730be0.68796bde-cbf5-4eaa-a299-011417041da6"
            className="md:w-[25vh] md:h-[35vh] sm:w-[95%] sm:h-[27vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://uvejuegos.com/img/caratulas/61284/fortnite.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[95%] sm:h-[27vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://m.media-amazon.com/images/I/71NUdBp8okL._AC_UF894,1000_QL80_.jpg"
            className="md:w-[25vh] md:h-[35vh] sm:w-[95%] sm:h-[27vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://i.pinimg.com/originals/1b/9f/77/1b9f772d10ae2cfce18fab1b05705810.png"
            className="md:w-[25vh] md:h-[35vh] sm:w-[95%] sm:h-[27vh]  m-2 rounded-lg"
            alt=""
          />
          <img
            src="https://cdn1.epicgames.com/offer/b7773a08a6fa41e3a0fbc4c1e51c95a4/EGS_F123_Codemasters_S2_1200x1600-9ee0158a6d9f052deb753af836f9bd8d"
            className="md:w-[25vh] md:h-[35vh] sm:w-[95%] sm:h-[27vh]  m-2 rounded-lg"
            alt=""
          />
          <a
            href="#subcripcion"
            className="md:col-span-6 sm:col-span-3 justify-center text-center items-center"
          >
            <button className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold p-3 mt-3 animate-bounce">
              Garantiza tu suscripción
            </button>
          </a>
        </div>
      </div>

      <div className=" bg-xbox-green md:min-h-[170vh] w-full md:flex sm:hidden flex-col items-center">
        <div
          className="flex flex-col justify-center items-center w-full sm:p-5 sm:pt-[15vh] md:pt-20"
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
          <div className="bg-gray-600 p-5 box-div text-white m-3 rounded-2xl">
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
              <button
                onClick={() => paymentPost(meses ? "SE014MSE38" : "SE014MSE37")}
                className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3"
              >
                Unete por MEX ${meses ? "689" : "229"}
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
                  className="max-h-[25px] m-2"
                />{" "}
                Disfruta de cientos de juegos de alta calidad en consola, PC y
                la nube
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Nuevos juegos agregados constantemente
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Títulos de Xbox Game Studios el mismo día de su lanzamiento
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Descuentos y ofertas exclusivas para miembros
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Recompensas gratuitas, como contenido en el juego y ofertas de
                socios
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
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
          <div className="bg-green-700  p-5 m-3 text-white rounded-2xl box-div">
            <h1 className="text-center font-bold text-3xl">Consola</h1>
            <br />
            <p className="text-center font-bold text-lg"> Plan disponible:</p>
            <br />
            <div className="flex justify-center">
              <button
                disabled={true}
                className="bg-green-800 text-white py-3 px-[40%] rounded-lg font-bold m-2"
              >
                3 meses
              </button>
            </div>
            <br />
            <div className="flex justify-center">
              <button
                onClick={() => paymentPost("SE017MSE63")}
                className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3"
              >
                Unete por MEX $450
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
                  className="max-h-[25px] m-2"
                />{" "}
                Juega en consola a cientos de títulos de alta calidad
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Nuevos juegos agregados constantemente
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Títulos de Xbox Game Studios el mismo día de su lanzamiento
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Descuentos y ofertas exclusivas para miembros
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Desbloquea ventajas de Riot Games
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-xbox-green md:min-h-[170vh] w-full md:hidden sm:flex flex-col items-center">
        <div
          className="flex flex-col justify-center items-center w-full sm:p-5 sm:pt-[15vh] md:pt-20"
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
          <br />
        </div>
        <div className="flex flex-col justify-center w-[90%]">
          <button
            onClick={() => {
              setPc(false);
            }}
            className={`${
              pc? "text-white" : "bg-green-600 text-white"
            } w-[95%] py-2 px-4 rounded-lg font-normal my-2`}
          >
            Ultimate
          </button>
          <button
            onClick={() => {
              setPc(true);
            }}
            className={`${
              pc? "bg-green-600 text-white" : "text-white"
            } w-[95%] py-2 px-4 rounded-lg font-normal my-2`}
          >
            Consola
          </button>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 md:max-w-[70%] sm:max-w-[95%] w-full pt-10">
          <div
            className={`bg-gray-600 p-5 box-div text-white m-3 rounded-2xl ${
              pc ? "hidden" : ""
            }`}
          >
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
              <button
                onClick={() => paymentPost(meses ? "SE014MSE38" : "SE014MSE37")}
                className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3"
              >
                Unete por MEX ${meses ? "689" : "229"}
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
                  className="max-h-[25px] m-2"
                />{" "}
                Disfruta de cientos de juegos de alta calidad en consola, PC y
                la nube
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Nuevos juegos agregados constantemente
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Títulos de Xbox Game Studios el mismo día de su lanzamiento
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Descuentos y ofertas exclusivas para miembros
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Recompensas gratuitas, como contenido en el juego y ofertas de
                socios
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
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
          <div
            className={`bg-green-700  p-5 m-3 text-white rounded-2xl box-div ${
              pc ? "" : "hidden"
            }`}
          >
            <h1 className="text-center font-bold text-3xl">Consola</h1>
            <br />
            <p className="text-center font-bold text-lg"> Plan disponible:</p>
            <br />
            <div className="flex justify-center">
              <button
                disabled={true}
                className="bg-green-800 text-white py-3 px-[40%] rounded-lg font-bold m-2"
              >
                3 meses
              </button>
            </div>
            <br />
            <div className="flex justify-center">
              <button
                onClick={() => paymentPost("SE017MSE63")}
                className="box-div bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3"
              >
                Unete por MEX $450
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
                  className="max-h-[25px] m-2"
                />{" "}
                Juega en consola a cientos de títulos de alta calidad
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Nuevos juegos agregados constantemente
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Títulos de Xbox Game Studios el mismo día de su lanzamiento
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Descuentos y ofertas exclusivas para miembros
              </li>
              <li className="font-semibold flex sm:text-base md:text-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1200px-Light_green_check.svg.png"
                  alt=""
                  data-aos="flip-up"
                  className="max-h-[25px] m-2"
                />
                Desbloquea ventajas de Riot Games
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="sm:min-h-[130vh] md:min-h-[120vh] w-full sm:mt-[4vh] md:mt-0 justify-center flex flex-col items-center"
        id="xbox-live"
      >
        <div className="flex flex-col justify-center items-center w-full sm:pt-0 md:pt-24">
          <h1 className="text-center w-[90%] font-bold md:text-[50px] sm:text-[30px] ">
            ¡El nuevo Game Pass Core!
          </h1>
          <br />
          <p
            className="text-center md:w-[50%] sm:w-[80%] font-bold md:text-[25px] sm:text-[18px]"
            data-aos="fade-down"
          >
            Xbox Live Gold ahora es Xbox Game Pass Core, con multijugador en
            línea para consola, un catálogo de más de 25 juegos de alta calidad,
            ofertas exclusivas para los miembros ¡y mucho más!
          </p>
        </div>
        <div className="sm:flex flex-col items-center md:hidden">
          <button
            onClick={() => {
              setgamePass("SE026MSE45");
            }}
            className={`${
              gamePass == "SE026MSE45" ? "bg-green-600 text-white" : ""
            } w-[95%] py-2 px-4 rounded-lg font-normal my-2`}
          >
            1 mes
          </button>
          <button
            onClick={() => {
              setgamePass("SE026MSE46");
            }}
            className={`${
              gamePass == "SE026MSE46" ? "bg-green-600 text-white" : ""
            } w-[95%] py-2 px-4 rounded-lg font-normal my-2`}
          >
            3 meses
          </button>
          <button
            onClick={() => {
              setgamePass("SE026MSE47");
            }}
            className={`${
              gamePass == "SE026MSE47" ? "bg-green-600 text-white" : ""
            } w-[95%] py-2 px-4 rounded-lg font-normal my-2`}
          >
            6 meses
          </button>
          <button
            onClick={() => {
              setgamePass("SE026MSE48");
            }}
            className={`${
              gamePass == "SE026MSE48" ? "bg-green-600 text-white" : ""
            } w-[95%] py-2 px-4 rounded-lg font-normal my-2`}
          >
            12 meses
          </button>
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[58vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              {gamePass == "SE026MSE45"
                ? "1 mes"
                : gamePass == "SE026MSE46"
                ? "3 meses"
                : gamePass == "SE026MSE47"
                ? "6 meses"
                : gamePass == "SE026MSE48"
                ? "12 meses"
                : ""}
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/game-pass-core.png"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              {gamePass == "SE026MSE45"
                ? "MEX $169"
                : gamePass == "SE026MSE46"
                ? "MEX $419"
                : gamePass == "SE026MSE47"
                ? "MEX $839"
                : gamePass == "SE026MSE48"
                ? "MEX $1,159"
                : ""}
            </h1>
            <button
              onClick={() => paymentPost(gamePass)}
              className="shadow-2xl text-green-600 md:mt-7 sm:mt-4 hover:text-green-700 bg-white font-bold md:text-lg sm:text-base py-2 px-4 rounded-lg"
            >
              Quiero{" "}
              {gamePass == "SE026MSE45"
                ? "1 mes"
                : gamePass == "SE026MSE46"
                ? "3 meses"
                : gamePass == "SE026MSE47"
                ? "6 meses"
                : gamePass == "SE026MSE48"
                ? "12 meses"
                : ""}
            </button>
          </div>
        </div>
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="md:grid sm:hidden grid-cols-4 w-[80%] max-w-[90%] pt-10"
        >
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              1 mes
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/game-pass-core.png"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX $169
            </h1>
            <button
              onClick={() => paymentPost("SE026MSE45")}
              className="shadow-2xl text-green-600 md:mt-7 sm:mt-4 hover:text-green-700 bg-white font-bold md:text-lg sm:text-base py-2 px-4 rounded-lg"
            >
              Quiero 1 mes
            </button>
          </div>
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              3 meses
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/game-pass-core.png"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX $419
            </h1>
            <button
              onClick={() => paymentPost("SE026MSE46")}
              className="shadow-2xl text-green-600 md:mt-7 hover:text-green-700 sm:mt-4 bg-white font-bold md:text-lg sm:text-base py-2 px-4 rounded-lg"
            >
              Quiero 3 mes
            </button>
          </div>
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              6 meses
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/game-pass-core.png"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX $839
            </h1>
            <button
              onClick={() => paymentPost("SE026MSE47")}
              className="shadow-2xl text-green-600 md:mt-7 hover:text-green-700 sm:mt-4 bg-white font-bold md:text-lg sm:text-base py-2 px-4 rounded-lg"
            >
              Quiero 6 mes
            </button>
          </div>
          <div className="md:w-[90%] md:h-[55vh] sm:w-[90%] sm:h-[50vh] bg-green-600 flex flex-col items-center  m-2 rounded-lg p-4">
            <button className="bg-green-800 text-white sm:py-2 md:py-3 sm:px-[40%] md:px-[30%] rounded-lg font-normal m-2">
              12 meses
            </button>
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/game-pass-core.png"
              className="w-[80%] md:mt-7 sm:mt-4"
              alt=""
            />
            <h1 className="text-center font-bold text-white md:text-3xl sm:text-xl md:mt-7 sm:mt-4">
              MEX $1,159
            </h1>
            <button
              onClick={() => paymentPost("SE026MSE48")}
              className="shadow-2xl text-green-600 md:mt-7 sm:mt-2 hover:text-green-700 bg-white font-bold md:text-base sm:text-base py-2 px-4 rounded-lg"
            >
              Quiero 12 meses
            </button>
          </div>
        </div>
      </div>
      <div className="sm:min-h-[175vh] bg-xbox-green md:min-h-[160vh] w-full flex flex-col items-center pb-9">
        <div
          className="flex flex-col justify-center items-center w-full  sm:pt-[15vh] md:pt-20"
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
        <br />
        <br />
        <div className="grid md:grid-cols-2 sm:flex flex-col md:max-w-[80%] sm:max-w-[95%] w-full pt-10">
          <div className="h-full flex justify-center items-center text-white mx-3 rounded-2xl">
            <img
              src="https://www.nuuvem.com/lp/es/xbox/images/XBOX-GIFT-MX.png"
              className="md:h-[80%] sm:h-[70%] sm:w-full md:w-[50%]"
              data-aos="fade-right"
              alt=""
            />
          </div>
          {/* ==================================================================================================================================================================================== */}
          <div className=" text-white rounded-2xl md:box-div mb-0">
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
              <button
                onClick={() => {
                  setTarjetasRegalo("SE001MSE60");
                }}
                className={` p-3 rounded-lg font-bold m-2 ${
                  tarjetasRegalo == "SE001MSE60"
                    ? "text-black border-2 bg-white"
                    : "text-white border-2 border-white"
                }`}
              >
                $1,000
              </button>
              <button
                onClick={() => {
                  setTarjetasRegalo("SE001MSE61");
                }}
                className={` p-3 rounded-lg font-bold m-2 ${
                  tarjetasRegalo == "SE001MSE61"
                    ? "text-black border-2 bg-white"
                    : "text-white border-2 border-white"
                } `}
              >
                $600
              </button>
              <button
                onClick={() => {
                  setTarjetasRegalo("SE001MSE62");
                }}
                className={` p-3 rounded-lg font-bold m-2 ${
                  tarjetasRegalo == "SE001MSE62"
                    ? "text-black border-2 bg-white"
                    : "text-white border-2 border-white"
                }`}
              >
                $300
              </button>
              <button
                onClick={() => {
                  setTarjetasRegalo("SE001MSE63");
                }}
                className={` p-3 rounded-lg font-bold m-2 ${
                  tarjetasRegalo == "SE001MSE63"
                    ? "text-black border-2 bg-white"
                    : "text-white border-2 border-white"
                }`}
              >
                $200
              </button>
            </div>

            <div className="flex justify-center sm:pt-4">
              <button
                className="box-div bg-green-600 animate-bounce hover:bg-green-500 rounded-lg text-white font-bold py-3 px-14 mt-3"
                onClick={() => paymentPost(tarjetasRegalo)}
              >
                Unete por MEX $
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
      <div className="bg-black md:h-[15vh] sm:h-[35vh] grid md:grid-cols-4 sm:grid-cols-2 items-center">
        <div className="pl-10 text-white flex justify-center items-center">
          <IoCloudDownloadSharp className="text-white text-3xl m-3" />
          <div>
            <p>Super fast</p>
            <p className="text-gray-400">Instant digital dowload</p>
          </div>
        </div>
        <div className="pl-10 text-white flex justify-center items-center">
          <SiAdguard className="text-white text-3xl m-3" />
          <div>
            <p>Reliable & safe</p>
            <p className="text-gray-400"> Over 10 000 games</p>
          </div>
        </div>
        <div className="pl-10 text-white flex justify-center items-center">
          <IoLogoWechat className="text-white text-3xl m-3" />
          <div>
            <p>Customer support</p>
            <p className="text-gray-400"> Human support 24/7</p>
          </div>
        </div>
        <div className="pl-10 text-white text-center flex justify-center items-center">
          <TrustpilotWidget />
        </div>
      </div>
    </div>
  );
};
