import { useState } from "react";

export const DataApi =()=>{
    const [dataSignature, setdataSignature] = useState('')
  var dt = new Date(
    new Date().toString().split("GMT")[0] + " UTC"
  ).toISOString();
  
  const utcDate = new Date().toISOString();

  const dataCripto = `a9b494c7-f74e-49e4-8bdb-22ba4245bdf7,cc8d80e6-226e-4a11-9f45-a5ec911e5767,${utcDate}`;

  const peticionFunction = () => {
    console.log("FECHAS", dt);

    const hash = CryptoJS.SHA256(dataCripto).toString();

    const cadenaPeticion = `apiKey=a9b494c7-f74e-49e4-8bdb-22ba4245bdf7&utcTimeStamp=${utcDate}&signature=${hash}`;

    setdataSignature(cadenaPeticion)

    console.log(hash, cadenaPeticion);
    console.log(hash, cadenaPeticion);

    axios
      .get("https://intcomex-test.apigee.net/v1/downloadextendedcatalog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cadenaPeticion}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

}