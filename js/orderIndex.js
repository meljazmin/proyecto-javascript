window.Mercadopago.setPublishableKey("TEST-cedd6960-03b4-4df3-abc4-614d4095058c");

const generatePayment = (data) => {
    return fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': 'Bearer TEST-7396004152047852-031405-b030620d81f01db2826e4cfd523493af-110784326'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(error => {
            console.error(error);
            throw error;
        });
}

let doSubmit = false;
function getCardToken(event) {
    event.preventDefault();

    let $form = document.getElementById('paymentForm');

    if (!doSubmit) {
        window.Mercadopago.createToken($form, setCardTokenAndPay);
        return false;
    }

    const data = {
        "transaction_amount": parseFloat($form.querySelector('#transactionAmount').value),
        "token": $form.querySelector('#token').value,
        "description": $form.querySelector('#description').value,
        "installments": parseInt($form.querySelector('#installments').selectedOptions[0].value),
        "payment_method_id": $form.querySelector('#paymentMethodId').value,
        "issuer_id": $form.querySelector('#issuer').selectedOptions[0].value,
        "payer": {
            "email": $form.querySelector('#email').value
        }
    };

    generatePayment(data).then(data => {
        if (data.status === 'approved') {
            Swal.fire({
                title: 'Pago',
                text: `¡Ha realizado con exito su compra! Su id de transaccion es ${data.id}`,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonColor: "#bd819c",
                background: '#e9c3da'
            });
        } else {
            let msg = `Ocurrio un error con el pago`;
            if (data.cause) {
                msg += `<p>Causas</p>`
                let causesList = '<ul>';
                data.cause.forEach(cause => {
                    causesList += `<li>${cause.code} - ${cause.description}</li>`;
                });
                causesList += '</ul>';
                msg += causesList;
            }
            Swal.fire({
                titleText: 'Pago',
                html: msg,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor: "#bd819c",
                background: '#e9c3da'
            });
            // return;
        }
    }).catch(error => {
        Swal.fire({
            title: 'Error tecnico',
            text: `Ocurrio un error con la integración con Mercado Pago: ${error.name} - ${error.message}`,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
    });

    return;
};

function setCardTokenAndPay(status, response) {
    if (status == 200 || status == 201) {
        let form = document.getElementById('paymentForm');
        let card = document.createElement('input');
        card.setAttribute('id', 'token');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);
        doSubmit = true;
        // form.submit();
        form.querySelector('#submitButton').click();
    } else {
        Swal.fire({
            title: 'Error',
            text: "Verify filled data!\n" + JSON.stringify(response, null, 4),
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
    }
};

function getInstallments(paymentMethodId, transactionAmount, issuerId) {
    window.Mercadopago.getInstallments({
        "payment_method_id": paymentMethodId,
        "amount": parseFloat(transactionAmount),
        "issuer_id": parseInt(issuerId)
    }, setInstallments);
}

function setInstallments(status, response) {
    if (status == 200) {
        document.getElementById('installments').options.length = 0;
        response[0].payer_costs.forEach(payerCost => {
            let opt = document.createElement('option');
            opt.text = payerCost.recommended_message;
            opt.value = payerCost.installments;
            document.getElementById('installments').appendChild(opt);
        });
        $("#installments").prop('disabled', false);
    } else {
        Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
        $("#installments").prop('disabled', 'disabled');
    }
}

function getIssuers(paymentMethodId) {
    window.Mercadopago.getIssuers(
        paymentMethodId,
        setIssuers
    );
}

function setIssuers(status, response) {
    if (status == 200) {
        let issuerSelect = document.getElementById('issuer');
        $(issuerSelect).empty();
        response.forEach(issuer => {
            let opt = document.createElement('option');
            opt.text = issuer.name;
            opt.value = issuer.id;
            issuerSelect.appendChild(opt);
        });

        getInstallments(
            document.getElementById('paymentMethodId').value,
            document.getElementById('transactionAmount').value,
            issuerSelect.value
        );

        $("#issuer").prop('disabled', false);
    } else {
        Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
        $("#issuer").prop('disabled', 'disabled');
    }
}

function guessPaymentMethod(event) {
    let cardnumber = document.getElementById("cardNumber").value;
    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0, 6);
        window.Mercadopago.getPaymentMethod({
            "bin": bin
        }, setPaymentMethod);
    }
};

function setPaymentMethod(status, response) {
    if (status == 200) {
        let paymentMethod = response[0];
        document.getElementById('paymentMethodId').value = paymentMethod.id;

        getIssuers(paymentMethod.id);
    } else {
        Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: "#bd819c",
            background: '#e9c3da'
        });
    }
}

$(document).ready(() => {
    const total = carritoManager.obtenerTotal();
    $('#order-total-price').empty().append(total);
    $('#transactionAmount').val(total);
    $('#description').val('Jasmine Accesorios');

    window.Mercadopago.getIdentificationTypes();
    document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);
    document.getElementById('paymentForm').addEventListener('submit', getCardToken);

    $("#issuer").prop('disabled', 'disabled');
    $("#installments").prop('disabled', 'disabled');
});