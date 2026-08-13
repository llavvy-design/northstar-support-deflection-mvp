// Northstar Support MVP
// ========================================
// NORTHSTAR SUPPORT
// Order Status Functionality
// ========================================


// ----------------------------------------
// DOM Elements
// ----------------------------------------

const orderSearchForm = document.getElementById("order-search-form");

const orderInput = document.getElementById("order-id");

const orderError = document.getElementById("order-error");

const orderResult = document.getElementById("order-result");


// ----------------------------------------
// Search for an Order
// ----------------------------------------

orderSearchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const orderId = orderInput.value.trim().toUpperCase();

    // Clear previous results
    hideOrderError();
    hideOrderResult();

    // Check if input is empty
    if (!orderId) {

        showOrderError(
            "Please enter your order number."
        );

        return;
    }

    findOrder(orderId);
});


// ----------------------------------------
// Load Order Data
// ----------------------------------------

async function findOrder(orderId) {

    try {

        const response = await fetch("data/orders.json");

        if (!response.ok) {

            throw new Error(
                "Unable to load order data."
            );
        }

        const orders = await response.json();

        const order = orders.find(
            item => item.orderId.toUpperCase() === orderId
        );

        if (!order) {

            showOrderError(
                "We couldn't find an order with that number. " +
                "Please check the order number and try again."
            );

            return;
        }

        displayOrder(order);

    } catch (error) {

        console.error(error);

        showOrderError(
            "We're having trouble loading your order information. " +
            "Please try again later."
        );
    }
}


// ----------------------------------------
// Display Order
// ----------------------------------------

function displayOrder(order) {

    document.getElementById("result-order-id").textContent =
        `#${order.orderId}`;

    document.getElementById("result-status").textContent =
        order.status;

    document.getElementById("result-customer").textContent =
        order.customerName;

    document.getElementById("result-order-date").textContent =
        formatDate(order.orderDate);

    document.getElementById("result-delivery").textContent =
        formatDate(order.estimatedDelivery);

    document.getElementById("result-tracking").textContent =
        order.trackingNumber || "Not available";


    // Display order items
    displayOrderItems(order.items);


    // Display timeline
    displayTimeline(order.timeline, order.status);


    // Show result
    orderResult.hidden = false;

    // Scroll to result
    setTimeout(() => {

        orderResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);
}


// ----------------------------------------
// Display Order Items
// ----------------------------------------

function displayOrderItems(items) {

    const itemsContainer =
        document.getElementById("result-items");

    itemsContainer.innerHTML = "";

    items.forEach(item => {

        const itemElement =
            document.createElement("div");

        itemElement.className = "order-item";

        itemElement.innerHTML = `
            <span>${item.name}</span>
            <strong>× ${item.quantity}</strong>
        `;

        itemsContainer.appendChild(itemElement);

    });
}


// ----------------------------------------
// Display Order Timeline
// ----------------------------------------

function displayTimeline(timeline, currentStatus) {

    const timelineContainer =
        document.getElementById("timeline");

    timelineContainer.innerHTML = "";

    const currentIndex =
        timeline.findIndex(
            step => step.status === currentStatus
        );


    timeline.forEach((step, index) => {

        const timelineItem =
            document.createElement("div");

        timelineItem.className =
            "timeline-item";


        // Determine whether this step is complete
        const isComplete =
            index <= currentIndex;

        if (isComplete) {

            timelineItem.classList.add(
                "completed"
            );

        }


        const dateText =
            step.date
                ? formatDate(step.date)
                : "Pending";


        timelineItem.innerHTML = `

            <div class="timeline-marker">

                ${isComplete ? "✓" : ""}

            </div>

            <div class="timeline-content">

                <h5>
                    ${step.status}
                </h5>

                <span class="timeline-date">
                    ${dateText}
                </span>

                <p>
                    ${step.description}
                </p>

            </div>

        `;

        timelineContainer.appendChild(
            timelineItem
        );

    });
}


// ----------------------------------------
// Format Dates
// ----------------------------------------

function formatDate(dateString) {

    if (!dateString) {
        return "Not available";
    }

    const date =
        new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


// ----------------------------------------
// Error Handling
// ----------------------------------------

function showOrderError(message) {

    orderError.textContent = message;

    orderError.hidden = false;

}


function hideOrderError() {

    orderError.hidden = true;

    orderError.textContent = "";

}


function hideOrderResult() {

    orderResult.hidden = true;

}


// =======================================
// RETURNS & REFUNDS FUNCTIONALITY
// =======================================


// ---------------------------------------
// DOM Elements
// ---------------------------------------

const returnsForm =
    document.getElementById("returns-form");

const returnOrderInput =
    document.getElementById("return-order-id");

const returnItemInput =
    document.getElementById("return-item");

const returnReasonInput =
    document.getElementById("return-reason");

const returnError =
    document.getElementById("return-error");

const returnResult =
    document.getElementById("return-result");


// ---------------------------------------
// Handle Returns Form
// ---------------------------------------

returnsForm.addEventListener("submit", function (event) {

    event.preventDefault();

    hideReturnError();
    hideReturnResult();

    const orderId =
        returnOrderInput.value.trim().toUpperCase();

    const itemName =
        returnItemInput.value.trim().toLowerCase();

    const reason =
        returnReasonInput.value;

    // Check required information
    if (!orderId) {

        showReturnError(
            "Please enter your order number."
        );

        return;
    }

    if (!itemName) {

        showReturnError(
            "Please enter the item you want to return."
        );

        return;
    }

    if (!reason) {

        showReturnError(
            "Please select a reason for the return."
        );

        return;
    }

    checkReturnEligibility(
        orderId,
        itemName
    );

});


// ---------------------------------------
// Load Returns Data
// ---------------------------------------

async function checkReturnEligibility(
    orderId,
    itemName
) {

    try {

        const response =
            await fetch("data/returns.json");

        if (!response.ok) {

            throw new Error(
                "Unable to load returns data."
            );

        }

        const returns =
            await response.json();


        // Find matching order and item
        const returnRecord =
            returns.find(function (item) {

                return (
                    item.orderId.toUpperCase() === orderId &&
                    item.itemName.toLowerCase() === itemName
                );

            });


        // No matching return record
        if (!returnRecord) {

            showReturnError(
                "We couldn't find that order and item. " +
                "Please check your information and try again."
            );

            return;
        }


        // Display the result
        displayReturnResult(returnRecord);


    } catch (error) {

        console.error(error);

        showReturnError(
            "We're having trouble checking your return information. " +
            "Please try again later."
        );

    }

}


// ---------------------------------------
// Display Return Result
// ---------------------------------------

function displayReturnResult(returnRecord) {

    const title =
        document.getElementById(
            "return-result-title"
        );

    const message =
        document.getElementById(
            "return-result-message"
        );

    const instructions =
        document.getElementById(
            "return-instructions"
        );


    if (returnRecord.returnEligible) {

        title.textContent =
            "Your item is eligible for return.";

        message.textContent =
            `Your ${returnRecord.itemName} can be returned. ` +
            `The expected return window is ${returnRecord.returnWindow}. ` +
            `Refunds are processed using the ${returnRecord.refundMethod}.`;


        instructions.innerHTML = `
            <h4>What to do next</h4>

            <ul>
                ${returnRecord.returnInstructions
                    .map(
                        instruction =>
                            `<li>${instruction}</li>`
                    )
                    .join("")}
            </ul>
        `;

    } else {

        title.textContent =
            "This item is not currently eligible for return.";

        message.textContent =
            `The ${returnRecord.itemName} associated with order ` +
            `${returnRecord.orderId} is not eligible for return ` +
            `under the current return rules.`;

        instructions.innerHTML = `
            <p>
                If you believe this result is incorrect,
                please contact Northstar Support for assistance.
            </p>
        `;

    }


    returnResult.hidden = false;


    setTimeout(function () {

        returnResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


// ---------------------------------------
// Return Error Handling
// ---------------------------------------

function showReturnError(message) {

    returnError.textContent = message;

    returnError.hidden = false;

}


function hideReturnError() {

    returnError.textContent = "";

    returnError.hidden = true;

}


function hideReturnResult() {

    returnResult.hidden = true;

}


// ----------------------------------------
// Contact Support
// ----------------------------------------

function contactSupport() {

    alert(
        "Northstar Support\n\n" +
        "Thank you for contacting us. " +
        "Our support team will assist you."
    );

}