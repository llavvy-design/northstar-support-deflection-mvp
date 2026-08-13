/* ==================================================
    NORTHSTAR SUPPORT
    Main JavaScript
================================================== */


/* ==================================================
    CONTACT SUPPORT
================================================== */

function contactSupport() {

    alert(
        "Northstar Support\n\n" +
        "Thank you for contacting us.\n" +
        "Our support team will assist you."
    );

}


/* ==================================================
    ORDER STATUS
    Reads orders from data/orders.json
================================================== */

const orderForm =
    document.getElementById("orderForm");

const orderValidation =
    document.getElementById("orderValidation");

const orderResult =
    document.getElementById("orderResult");


if (orderForm) {

    orderForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Get order number */

        const orderNumber =
            document
                .getElementById("orderNumber")
                .value
                .trim();


        /* Clear previous messages */

        orderValidation.innerHTML = "";
        orderResult.innerHTML = "";


        /* =========================
            VALIDATION
        ========================== */

        if (orderNumber === "") {

            orderValidation.innerHTML = `

                <div class="validation-error">

                    <strong>
                        Order number required
                    </strong>

                    <p>
                        Please enter your order number
                        before checking the status.
                    </p>

                </div>

            `;

            return;
        }


        /* =========================
            LOAD ORDERS.JSON
        ========================== */

        try {

            const response =
                await fetch("data/orders.json");


            /* Check if file loaded */

            if (!response.ok) {

                throw new Error(
                    "Unable to load order data."
                );

            }


            const orders =
                await response.json();


            /* =========================
                CHECK FOR EMPTY DATA
            ========================== */

            if (
                !Array.isArray(orders) ||
                orders.length === 0
            ) {

                orderResult.innerHTML = `

                    <div class="result">

                        <div class="result-icon">
                            📦
                        </div>

                        <h2>
                            No Order Data Available
                        </h2>

                        <p>
                            There are currently no orders
                            available in the system.
                        </p>

                        <p>
                            Please contact Northstar Support
                            if you need help with your order.
                        </p>

                        <a
                            href="#contact"
                            class="card-button">

                            Contact Support

                        </a>

                    </div>

                `;

                return;
            }


            /* =========================
                FIND ORDER
            ========================== */

            const order =
                orders.find(function (item) {

                    return String(
                        item.orderNumber
                    ).toUpperCase() ===
                        orderNumber.toUpperCase();

                });


            /* =========================
                ORDER FOUND
            ========================== */

            if (order) {

                orderResult.innerHTML = `

                    <div class="order-status-result">

                        <div class="result-icon">
                            📦
                        </div>

                        <h2>
                            ${escapeHTML(
                    order.status ||
                    "Status unavailable"
                )}
                        </h2>

                        <p>

                            <strong>
                                Order:
                            </strong>

                            ${escapeHTML(
                    order.orderNumber
                )}

                        </p>

                        <p>

                            <strong>
                                Item:
                            </strong>

                            ${escapeHTML(
                    order.item ||
                    "Item information unavailable"
                )}

                        </p>

                    </div>

                `;

            }


            /* =========================
                ORDER NOT FOUND
            ========================== */

            else {

                orderResult.innerHTML = `

                    <div class="result">

                        <div class="result-icon">
                            !
                        </div>

                        <h2>
                            Order Not Found
                        </h2>

                        <p>

                            We couldn't find an order with
                            the number

                            <strong>
                                ${escapeHTML(
                    orderNumber.toUpperCase()
                )}
                            </strong>.

                        </p>

                        <p>
                            Please check the order number
                            and try again.
                        </p>

                        <a
                            href="#contact"
                            class="card-button">

                            Contact Support

                        </a>

                    </div>

                `;

            }

        }


        /* =========================
            ERROR HANDLING
        ========================== */

        catch (error) {

            console.error(
                "Order data error:",
                error
            );


            orderResult.innerHTML = `

                <div class="result">

                    <div class="result-icon">
                        !
                    </div>

                    <h2>
                        Order Information Unavailable
                    </h2>

                    <p>
                        We are currently unable to access
                        order information.
                    </p>

                    <p>
                        Please try again later or contact
                        Northstar Support.
                    </p>

                    <a
                        href="#contact"
                        class="card-button">

                        Contact Support

                    </a>

                </div>

            `;

        }

    });

}


/* ==================================================
    RETURNS & REFUNDS
================================================== */

const returnForm =
    document.getElementById("returnForm");

const validationArea =
    document.getElementById("validationArea");

const resultArea =
    document.getElementById("resultArea");


if (returnForm) {

    returnForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* Get return information */

        const returnOrderNumber =
            document
                .getElementById("returnOrderNumber")
                .value
                .trim();


        const item =
            document
                .getElementById("item")
                .value
                .trim();


        const returnReason =
            document
                .getElementById("returnReason")
                .value;


        /* Clear previous messages */

        validationArea.innerHTML = "";

        resultArea.innerHTML = "";


        /* =========================
            VALIDATION
        ========================== */

        if (
            returnOrderNumber === "" ||
            item === "" ||
            returnReason === ""
        ) {

            validationArea.innerHTML = `

                <div class="validation-error">

                    <strong>
                        Incomplete request
                    </strong>

                    <p>
                        Please provide your order number,
                        item, and return reason before
                        checking eligibility.
                    </p>

                </div>

            `;

            return;
        }


        /* =========================
            ELIGIBILITY RULES
        ========================== */

        /*
            Eligible:
            - Item arrived damaged
            - Wrong item received
            - Item was not as described

            Ineligible:
            - No longer needed
        */

        if (
            returnReason === "damaged" ||
            returnReason === "wrong_item" ||
            returnReason === "incorrect"
        ) {

            resultArea.innerHTML = `

                <div class="result">

                    <div class="result-icon">
                        ✓
                    </div>

                    <h2>
                        Return Eligible
                    </h2>

                    <p>

                        Your return request for

                        <strong>
                            ${escapeHTML(item)}
                        </strong>

                        appears to be eligible for
                        automatic handling.

                    </p>

                    <p>

                        Order:

                        <strong>
                            ${escapeHTML(
                returnOrderNumber
            )}
                        </strong>

                    </p>

                    <button
                        type="button"
                        onclick="startReturn()">

                        Continue Return

                    </button>

                </div>

            `;

        }


        /* =========================
            RETURN NOT ELIGIBLE
        ========================== */

        else {

            resultArea.innerHTML = `

                <div class="result">

                    <div class="result-icon">
                        !
                    </div>

                    <h2>
                        Return Not Eligible
                    </h2>

                    <p>
                        Based on the selected return reason,
                        this request cannot currently be
                        handled automatically.
                    </p>

                    <p>
                        You can contact our support team
                        for further assistance.
                    </p>

                    <a
                        href="#contact"
                        class="card-button">

                        Contact Support

                    </a>

                </div>

            `;

        }

    });

}


/* ==================================================
    CONTINUE RETURN
================================================== */

function startReturn() {

    resultArea.innerHTML += `

        <div class="next-step">

            <strong>
                Next step:
            </strong>

            Your return request can proceed to
            the next stage.

        </div>

    `;

}


/* ==================================================
    HTML SAFETY
================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}