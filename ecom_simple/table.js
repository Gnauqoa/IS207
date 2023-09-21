function formatVND(price) {
  // Check if the input is a valid number
  if (isNaN(price)) {
    return "Invalid Price";
  }

  // Round the price and convert it to an integer
  price = Math.round(price);

  // Add commas as thousands separators
  price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Add the currency symbol ₫
  return price + " ₫";
}
const setProduct = ({ id, key, value }) => {
  const index = data.findIndex((item) => item.id === parseInt(id));

  data[index][key] = value;
};
let data = [
  {
    id: 1,
    img: "./assets/phone1.jpeg",
    productName: "Điện thoại Oppo A54 (4GB/128GB) - Đen - Hàng Chính Hãng",
    price: 10000,
    discount_price: 5000,
    quantity: 2,
  },
  {
    id: 2,
    img: "./assets/phone1.jpeg",
    productName: "Điện thoại Oppo A54 (4GB/128GB) - Đen - Hàng Chính Hãng",
    price: 15000,
    discount_price: 10000,
    quantity: 3,
  },
  {
    id: 3,
    img: "./assets/phone1.jpeg",
    productName: "Điện thoại Oppo A54 (4GB/128GB) - Đen - Hàng Chính Hãng",
    price: 12000,
    discount_price: 8000,
    quantity: 4,
  },
];

// Function to render the table with updated data
function renderTable() {
  const tableTotalItems = document.getElementById("tableTotalItems");
  if (data.length)
    tableTotalItems.innerHTML = `Tất cả <span>(${data.length} sản phẩm)</span> `;
  else tableTotalItems.innerHTML = "Tất cả";
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  let total = 0;
  data.forEach((item) => {
    const row = createTableRow(item);
    total += item.discount_price * item.quantity;
    tableBody.appendChild(row);
  });
  total = formatVND(total);
  document.getElementById("total").innerHTML = total;
  document.getElementById("total-full").innerHTML = total;
}

// Function to create a table row with the specified structure and delete action
function createTableRow({
  id,
  productName,
  img,
  price,
  discount_price,
  quantity,
}) {
  const row = document.createElement("tr");

  const checkboxCell = document.createElement("td");
  checkboxCell.className = "pl-2 py-4";
  checkboxCell.innerHTML = `
      <div class="flex flex-row items-center gap-2">
      <input type="checkbox" class="productCheckbox" />
      <img src="${img}" class="max-w-[200px] max-h-[100px] object-cover"/>
      <div class="flex flex-col gap-1">
        ${productName}
        <div class="flex flex-row gap-2 items-center">
          <img src="./assets/deliver.png" class="w-[24px] h-auto"/>
          <p>Giao thứ 5, 21/09</p>
        </div>
      </div>

      </div>
  `;

  const priceCell = document.createElement("td");
  priceCell.align = "center";
  priceCell.innerHTML = `${formatVND(
    discount_price
  )} <s class="text-[#aaaaaa]">${formatVND(price)}</s>`;

  const quantityCell = document.createElement("td");
  quantityCell.align = "center";
  const quantityBlock = document.createElement("div");
  quantityBlock.className = "flex flex-row justify-center items-center";

  const subButton = document.createElement("button");
  subButton.className =
    "border-[1px] border-[#dadada] px-3 border-r-0 rounded-l-[4px]";
  subButton.innerHTML = "-";
  subButton.addEventListener("click", function () {
    const parentRow = this.closest("tr");
    if (parentRow) {
      const productId = parentRow.dataset.productId;
      const quantity = parseInt(parentRow.dataset.quantity);
      if (!quantity) return;
      setProduct({ id: productId, key: "quantity", value: quantity - 1 });
      renderTable();
    }
  });
  const quantityText = document.createElement("p");
  quantityText.className = "border-[1px] border-[#dadada] px-4";
  quantityText.innerHTML = quantity;
  const plusButton = document.createElement("button");
  plusButton.className =
    "border-[1px] border-[#dadada] px-3 border-l-0 rounded-r-[4px]";
  plusButton.innerHTML = "+";
  plusButton.addEventListener("click", function () {
    const parentRow = this.closest("tr");
    if (parentRow) {
      const productId = parentRow.dataset.productId;
      const quantity = parseInt(parentRow.dataset.quantity);
      setProduct({ id: productId, key: "quantity", value: quantity + 1 });
      renderTable();
    }
  });
  quantityBlock.appendChild(subButton);
  quantityBlock.appendChild(quantityText);
  quantityBlock.appendChild(plusButton);
  quantityCell.appendChild(quantityBlock);
  const totalCell = document.createElement("td");
  totalCell.align = "center";
  totalCell.textContent = formatVND(
    parseFloat(discount_price) * parseInt(quantity)
  );
  totalCell.className = "text-[#ff424e]";
  const deleteCell = document.createElement("td");
  deleteCell.align = "right";
  deleteCell.className = "pr-2";

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<img class="w-[16px] h-[16px]" src="./assets/trash.png" />`;

  // Add a click event listener to the Delete button
  deleteButton.addEventListener("click", function () {
    // Find the parent row and remove it
    const parentRow = this.closest("tr");
    if (parentRow) {
      const productId = parentRow.dataset.productId;
      data = data.filter((item) => item.id !== parseInt(productId));
      console.log(data);
      renderTable();
    }
  });

  deleteCell.appendChild(deleteButton);

  // Set a data attribute on the row to store the product ID
  row.dataset.productId = id;
  row.dataset.quantity = quantity;

  // Append cells to the row
  row.appendChild(checkboxCell);
  row.appendChild(priceCell);
  row.appendChild(quantityCell);
  row.appendChild(totalCell);
  row.appendChild(deleteCell);

  return row;
}

// Get a reference to the table body
const tableBody = document.getElementById("tableBody");

// Render the initial table
renderTable();
const deleteHeaderButton = document.getElementById("deleteHead");

deleteHeaderButton.addEventListener("click", function () {
  // Find all rows with product checkboxes checked and remove them
  const selectedRows = document.querySelectorAll(".productCheckbox:checked");
  selectedRows.forEach((row) => {
    const parentRow = row.closest("tr");
    if (parentRow) {
      const productId = parentRow.dataset.productId;
      data = data.filter((item) => item.id !== parseInt(productId));
      console.log(data);
      renderTable();
    }
  });
});

const selectAllCheckbox = document.querySelectorAll(".selectAllCheckbox");
selectAllCheckbox.forEach((ele) =>
  ele.addEventListener("change", function () {
    const productCheckboxes = document.querySelectorAll(".productCheckbox");

    productCheckboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
    selectAllCheckbox.forEach((button) => {
      button.checked = this.checked;
    });
  })
);
