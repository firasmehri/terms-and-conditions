document.addEventListener('DOMContentLoaded', function () {
    const signaturePad = new SignaturePad(document.getElementById('signature-pad'));

    document.getElementById('clear').addEventListener('click', function () {
        signaturePad.clear();
    });

    document.getElementById('submit').addEventListener('click', function () {
        if (signaturePad.isEmpty()) {
            alert('Please provide a signature.');
            return;
        }

        if (!document.getElementById('terms').checked) {
            alert('You must agree to the terms and conditions.');
            return;
        }

        const signatureData = signaturePad.toDataURL();
        console.log('Signature Data:', signatureData);

        // Here you would typically send the data to the server
        // For example:
        // fetch('/submit-invoice', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ signature: signatureData, agreed: true }),
        // })
        // .then(response => response.json())
        // .then(data => console.log('Success:', data))
        // .catch(error => console.error('Error:', error));

        alert('Invoice submitted successfully!');
    });
});