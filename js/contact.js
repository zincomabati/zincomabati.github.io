
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enquiryForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const product = document.getElementById("productChoice").value;
        const message = document.getElementById("customerMessage").value.trim();

        if (!name || !phone || !product || !message) {
            alert("Please complete all fields.");
            return;
        }

        const whatsappMessage =
            "Hello ZINCO Mabati Rolling Mills Factory.\n\n" +
            "I would like to make an enquiry.\n\n" +
            "Name: " + name + "\n" +
            "Phone: " + phone + "\n" +
            "Product: " + product + "\n" +
            "Message: " + message;

        const whatsappURL =
            "https://wa.me/254752682855?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

    });

});
