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

        const response = await fetch(
            `http://localhost:5001/api/orders/${encodeURIComponent(orderId)}`
        );

        const result = await response.json();

        if (!response.ok) {

            if (response.status === 404) {

                showOrderError(
                    "We couldn't find an order with that number. " +
                    "Please check the order number and try again."
                );

                return;
            }

            throw new Error(
                result.message || "Unable to load order data."
            );
        }

        displayOrder(result.data);

    } catch (error) {

        console.error("Order lookup error:", error);

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

// =======================================
// CUSTOMER SUPPORT FUNCTIONALITY
// =======================================

// ---------------------------------------
// DOM Elements
// ---------------------------------------

const supportForm = document.getElementById("support-form");
const supportNameInput = document.getElementById("support-name");
const supportEmailInput = document.getElementById("support-email");
const supportOrderInput = document.getElementById("support-order-id");
const supportCategoryInput = document.getElementById("support-category");
const supportDescriptionInput = document.getElementById("support-description");

const supportError = document.getElementById("support-error");
const supportResult = document.getElementById("support-result");


// ---------------------------------------
// Handle Support Form
// ---------------------------------------

if (supportForm) {

    supportForm.addEventListener("submit", function (event) {

        // Stop the browser from refreshing the page
        event.preventDefault();

        console.log("Support form submitted");


        // Hide previous messages
        hideSupportError();
        hideSupportResult();


        // Get form values
        const name = supportNameInput.value.trim();
        const email = supportEmailInput.value.trim();
        const orderId = supportOrderInput.value.trim().toUpperCase();
        const category = supportCategoryInput.value;
        const description = supportDescriptionInput.value.trim();


        console.log("Support form values:", {
            name,
            email,
            orderId,
            category,
            description
        });


        // -----------------------------------
        // Validation
        // -----------------------------------

        if (!name) {
            showSupportError("Please enter your full name.");
            return;
        }

        if (!email) {
            showSupportError("Please enter your email address.");
            return;
        }

        if (!category) {
            showSupportError("Please select an issue category.");
            return;
        }

        if (!description) {
            showSupportError("Please describe your issue.");
            return;
        }


        // -----------------------------------
        // Create Support Ticket
        // -----------------------------------

        createSupportTicket(
            name,
            email,
            orderId,
            category,
            description
        );

    });

}


// ---------------------------------------
// Create Support Ticket
// ---------------------------------------

function createSupportTicket(
    name,
    email,
    orderId,
    category,
    description
) {

    console.log("Creating support ticket...");


    // Generate demo ticket number
    const ticketNumber = generateTicketNumber();


    // Display success result FIRST
    displaySupportResult(
        ticketNumber,
        category,
        orderId
    );


    // Store ticket information for demo purposes
    const ticket = {
        ticketNumber: ticketNumber,
        customerName: name,
        email: email,
        orderId: orderId || "Not provided",
        category: category,
        description: description,
        createdAt: new Date().toISOString()
    };


    console.log("Support Ticket Created:", ticket);


    // Save ticket in browser storage
    localStorage.setItem(
        ticketNumber,
        JSON.stringify(ticket)
    );


    // Clear the form AFTER successful submission
    supportForm.reset();

}


// ---------------------------------------
// Generate Ticket Number
// ---------------------------------------

function generateTicketNumber() {

    const randomNumber = Math.floor(
        100 + Math.random() * 900
    );

    return `NST-2026-${randomNumber}`;

}


// ---------------------------------------
// Display Support Result
// ---------------------------------------

function displaySupportResult(
    ticketNumber,
    category,
    orderId
) {

    console.log("Displaying support result:", {
        ticketNumber,
        category,
        orderId
    });


    // Ticket Number
    document.getElementById(
        "support-ticket-number"
    ).textContent = ticketNumber;


    // Issue Category
    document.getElementById(
        "support-ticket-category"
    ).textContent = category;


    // Order Number
    document.getElementById(
        "support-ticket-order"
    ).textContent = orderId || "Not provided";


    // Show success message
    supportResult.hidden = false;


    // Scroll to success message
    setTimeout(function () {

        supportResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


// ---------------------------------------
// Support Error Handling
// ---------------------------------------

function showSupportError(message) {

    supportError.textContent = message;

    supportError.hidden = false;

}


function hideSupportError() {

    supportError.textContent = "";

    supportError.hidden = true;

}


function hideSupportResult() {

    supportResult.hidden = true;

}


