import React, { useEffect } from "react";


export const ConektaPay = () => {
  
  const procesarPago = async () => {
    try {
        const response = await fetch('http://localhost:5000/procesar-pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 1000,  // Monto en centavos
                reference_id: "12312",  // Debe ser único por cada transacción
                token: "tok_test_visa_4242",  // Token de tarjeta generado por Conekta.js
            }),
        });

        const data = await response.json();
        console.log(data);
        // Aquí puedes manejar la respuesta del backend
    } catch (error) {
        console.error('Error al procesar pago:', error);
    }}

    useEffect(() => {
      // Configura Conekta.js con tu clave pública
    }, []);
  

  return <div>
    <h1>ConektaPay</h1>
    <button onClick={procesarPago}>AAAAAAAAAAAA</button>
  </div>;
};
