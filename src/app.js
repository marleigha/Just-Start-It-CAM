/** 
 * @fileOverview Corresponding to Project 1 Subtask 2b of the Fall 2023 CS317 
 * Mobile App Development Course at Wellesley College, this file provides 
 * functionality for a user to customize and interact with a square matrix of 
 * checkboxes.
 * 
 * @author Marleigh Ausbrooks and Amy Fung
 */

// ==============================================================================
// Global variables
// ==============================================================================

/** Maximum valid size for the array. */
const MAX_SIZE = 20;

/** Minimum valid size for the array. */
const MIN_SIZE = 0;

/** Element for the total count of checked checkboxes. */
let totalCountTd;

/** Array of the td elements that hold row counts. */
let rowCountTds;

/** Array of the td elements that hold column counts. */
let colCountTds;

/** 2D array of checkbox input elements. */
let checkboxes;

/** Current mode, "inclusive" or "exclusive". Default mode is "inclusive." */
let mode;

// ==============================================================================
// Helper functions
// ==============================================================================

/**
 * Determines if the given value is numeric.
 * @param {any} value - The value to be checked.
 * @returns {Boolean} True if the value is numeric, otherwise false.
 */
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

/**
 * Displays an error message to the user.
 * @param {string} message - The error message to display.
 */
function displayError(message) {
    document.getElementById("validityError").textContent = message;
}

/**
 * Checks or unchecks a checkbox based on check value and handles the related 
 * counters.
 * @param {HTMLElement} cb - The checkbox element.
 * @param {boolean} check - Whether to check the checkbox.
 */
function checkOrUncheck(cb, check) {
    if (!(cb.checked === check)) {
        cb.checked = check;
        handleCounts(cb);
    }
}

/**
 * Gets counts associated with a checkbox.
 * @param {HTMLInputElement} cb - The checkbox element.
 * @returns {Array} An array containing row and column counts.
 */
function getCounts(cb) {
    return [
        rowCountTds[cb.getAttribute("row")],
        colCountTds[cb.getAttribute("col")]
    ];
}

/**
 * Handles the counters related to a checkbox click.
 * @param {HTMLElement} cb - The checkbox.
 */
function handleCounts(cb) {
    cb.checked ? increment(cb) : decrement(cb);
}

/**
 * Sets the color theme for the different modes of the game.
 * @param {string[]} colors - An array containing colors for column counts, 
 *  row counts, and total count.
 */
function setColorForMode(colors) {
    colCountTds.forEach(col => col.style.backgroundColor = colors[0]);
    rowCountTds.forEach(row => row.style.backgroundColor = colors[1]);
    totalCountTd.style.backgroundColor = colors[2];
}

/**
 * Enables interaction buttons and checkboxes and attaches their respective 
 * event listeners.
 */
function enableButtons() {
    const inclusive = document.getElementById("inclusiveRadioButton");
    const exclusive = document.getElementById("exclusiveRadioButton");
    const checkAllBtn = document.getElementById("checkAllButton");
    const uncheckAllBtn = document.getElementById("uncheckAllButton");
    const table = document.querySelector("table");

    inclusive.disabled = exclusive.disabled = checkAllBtn.disabled =
        uncheckAllBtn.disabled = false;

    inclusive.addEventListener("click", () => {
        enterInclusiveMode(inclusive, exclusive)
    });
    exclusive.addEventListener("click", enterExclusiveMode);
    checkAllBtn.addEventListener("click", () => { toggleCheckAll(true); });
    uncheckAllBtn.addEventListener("click", () => { toggleCheckAll(false); });
    table.addEventListener("click", clickCheckbox);

    // enableButtons() is only called when a new matrix is created, in which 
    // case, we want to be in the default inclusive mode
    enterInclusiveMode(inclusive, exclusive);
}

// ==============================================================================
// Matrix and button initialization and rendering
// ==============================================================================

/* Entry point: Initiates the matrix setup on page load. */
window.addEventListener("DOMContentLoaded", () => { getMatrixSize(); });

/**
 * Attaches an event listener to the matrix size textbox to retrieve user's size
 * input.
 */
function getMatrixSize() {
    let textbox = document.getElementById("matrixSizeTextbox");
    textbox.addEventListener("keypress", (event) => {		
		displayError("");
        if (event.key === "Enter") {
            checkSizeValidity(textbox);
        }
    });
}

/**
 * Validates matrix size and initializes the matrix if the size is valid.
 * @param {HTMLInputElement} input - Input element with matrix size.
 */
function checkSizeValidity(input) {
	displayError("");
    const numString = input.value.trim();

    if (!isNumeric(numString)) {
        displayError(`${numString} is not a valid integer string`);
        input.value = "";
        return;
    }

    const num = parseInt(numString);
    if (num > MAX_SIZE || num < MIN_SIZE) {
        displayError(`${numString} is outside the allowable range [${MIN_SIZE}, 
            ${MAX_SIZE}]`);
        input.value = "";
        return;
    }

    initializeMatrix(num);
}

/**
 * Creates the header and checkbox rows for the matrix and replaces the 
 * children of the HTML table element with these matrix rows.
 * @param {Array} sizeArr - Array indicating size.
 */
function initializeMatrix(size) {
    let sizeArr = [...Array(size).keys()]
    checkboxes = Array(size).fill().map(() => []);
    rowCountTds = Array(size).fill().map(() => createCountElement("rowCount"));
    colCountTds = Array(size).fill().map(() => createCountElement("colCount"));
    let trs = [createHeader(sizeArr)];
    sizeArr.forEach((row) => {
        trs.push(createRow(sizeArr, row));
    })
    document.querySelector("table").replaceChildren(...trs);
    enableButtons();
}

/**
 * Creates a new count element (td) for rows, columns, or the whole matrix.
 * @param {string} type - Either "rowCount," "colCount," or "totalCount". 
 * @returns {HTMLTableCellElement} - The created td element.
 */
function createCountElement(type) {
    let td = document.createElement("td");
    td.classList.add(type)
    td.textContent = "0";
    return td;
}

/**
 * Creates the header for the matrix: namely, the total count td element and 
 * the checked checkbox count td element for each column.
 * @param {Array} sizeArr - Array indicating size.
 * @returns 
 */
function createHeader(sizeArr) {
    totalCountTd = createCountElement("totalCount");
    let header = document.createElement("tr");
    header.appendChild(totalCountTd);
    sizeArr.forEach((col) => {
        header.appendChild(colCountTds[col]);
    });
    return header;
}


/**
 * Creates a row for the matrix, including checkboxes, which are also added to 
 * the checkboxes variable.
 * @param {Array} sizeArr - Array indicating size.
 * @param {Number} rowNum - The row number.
 * @returns {HTMLTableRowElement} The row element.
 */
function createRow(sizeArr, rowNum) {
    const row = document.createElement("tr");
    row.appendChild(rowCountTds[rowNum]);
    sizeArr.forEach((colNum) => {
        let td = document.createElement("td");
        let cb = createCheckbox(rowNum, colNum);
        checkboxes[rowNum].push(cb);
        td.appendChild(cb);
        row.appendChild(td);
    });
    return row;
}

/**
 * Given row and column numbers, creates an HTML input element of type checkbox
 * and attributes "row" and "col," mapped to its respective parameters, before
 * adding an event listener that calls clickCheckbox() whenever clicked.
 * @param {number} rowNum  - The row number.
 * @param {number} colNum - The column number.
 * @returns 
 */
function createCheckbox(rowNum, colNum) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("row", rowNum);
    checkbox.setAttribute("col", colNum);
    return checkbox;
}

// ==============================================================================
// Functions to react to user interaction with checkboxes and buttons
// ==============================================================================

/**
 * Reacts to a checkbox click, updating game state.
 * @param {HTMLInputElement} cb - The checkbox.
 */
function clickCheckbox(event) {
    const cb = event.target;
    if (cb.type !== "checkbox") {
        return;
    }
    if (mode === "exclusive") {
        makeExclusive(cb);
    }

    handleCounts(cb);
}

/**
 * For exclusive mode, unchecks boxes in the same row or column.
 * @param {HTMLInputElement} cb - The checkbox that was checked.
 */
function makeExclusive(cb) {
    let rowNum = parseInt(cb.getAttribute("row"));
    let colNum = parseInt(cb.getAttribute("col"));

    checkboxes.forEach((row) => {
        if (row[colNum] !== cb) {
            checkOrUncheck(row[colNum], false);
        }
    });
    checkboxes[rowNum].forEach((cbInRow) => {
        if (cbInRow !== cb) {
            checkOrUncheck(cbInRow, false);
        }
    });
}


/**
 * Checks or unchecks the checkboxes in the array, based on the value of check.
 * Only checks if check and if the checkboxes are not all already checked. Only
 * unchecks if not check and if the checkboxes are not all already unchecked.
 * 
 * @param {Boolean} check - Whether to check the checkboxes. True if they are to
 *  be checked and false if they are to be unchecked.
 */
function toggleCheckAll(check) {
    const totalCount = parseInt(totalCountTd.textContent);

    if (check && totalCount === checkboxes.length * checkboxes.length) {
        return;
    } else if (!check && totalCount === 0) {
        return;
    }

    checkboxes.forEach((row) => row.forEach((cb) => checkOrUncheck(cb, check)));
}


/**
 * Increments the row, column, and total checked count for a given checkbox. If
 * in exclusive mode, updates colors accordingly.
 * 
 * @param {HTMLInputElement} cb - The input checkbox element that was checked.
 */
function increment(cb) {
    let counts = getCounts(cb);
    counts.forEach((count) => {
        count.innerHTML = (parseInt(count.textContent) + 1).toString();
    })
    totalCountTd.textContent = (parseInt(totalCountTd.textContent) + 1).toString();
    if (mode === "exclusive") {
        counts.forEach((count) => count.style.backgroundColor = "lime");
        if (parseInt(totalCountTd.textContent) === checkboxes.length) {
            totalCountTd.style.backgroundColor = "lime";
        }
    }
}

/**
 * Decrements the row, column, and total checked count for a given checkbox. If
 * in exclusive mode, updates colors accordingly.
 * 
 * @param {HTMLInputElement} cb - The input checkbox element that was unchecked.
 */
function decrement(cb) {
    let counts = getCounts(cb);
    counts.forEach((count) => {
        count.innerHTML = (parseInt(count.textContent) - 1).toString();
    })
   totalCountTd.textContent = (parseInt(totalCountTd.textContent) - 1).toString();
    if (mode === "exclusive") {
        counts.forEach((count) => count.style.backgroundColor = "red");
        if (parseInt(totalCountTd.textContent) !== checkboxes.length) {
            totalCountTd.style.backgroundColor = "red";
        }
    }
}

/**
 * Sets the mode to be inclusive and updates UI elements accordingly.
 * @param {HTMLInputElement} inclusiveBtn - Inclusive mode radio button.
 * @param {HTMLInputElement} exclusiveBtn - Exclusive mode radio button.
 */
function enterInclusiveMode(inclusiveBtn, exclusiveBtn) {
    // When the user enters a new size while in exclusive mode for 
    // the previous matrix, uncheck the exclusive button  
    if (exclusiveBtn.checked) {
        exclusiveBtn.checked = false;
        inclusiveBtn.checked = true;
    }

    mode = "inclusive";
    document.getElementById("checkAllButton").disabled = false;
    setColorForMode(["yellow", "orange", "magenta"]);
}

/**
 * Sets game to exclusive mode, including setting the mode value, disabling the 
 * check all button, unchecking all buttons, and adjusting matrix colors.
 */
function enterExclusiveMode() {
    mode = "exclusive";
    document.getElementById("checkAllButton").disabled = true;
    toggleCheckAll(false);
    setColorForMode(["red", "red", "red"]);
}
