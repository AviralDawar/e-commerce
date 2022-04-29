import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default ({total}) => {
    console.log("render", total);

    if (!total) return <></>;

    return (
        <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    console.log("Creating order", total);
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: parseInt(total) ||10,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
        </PayPalScriptProvider>
    );
}
