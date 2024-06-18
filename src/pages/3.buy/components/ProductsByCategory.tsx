import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { GetProductInterface } from "../../../interfaces/Product/get-product.interface";
import { formatMoneyValue } from "../../../utils/formatMoneyValue";
import { useNavigate } from "react-router-dom";

const ProductsByCategory = ({
  productsFilteredByCategory,
  setShowProducts,
  setBuyList,
  buyList,
}: any) => {
  const [results, setResults] = useState<GetProductInterface[]>(
    productsFilteredByCategory
  );
  const [filteredResults, setFilteredResults] = useState<GetProductInterface[]>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>();
  const [selectedProducts, setSelectedProducts] = useState<ProductListArr[]>([]);

  const controller = new AbortController();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const navigate = useNavigate();

  const itemsPerPage = 14;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  const getData = async (page: number) => {
    setTotalItems(productsFilteredByCategory.length);
    results.length === 0 && setResults(productsFilteredByCategory);
    setFilteredResults(
      productsFilteredByCategory.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      )
    );
    setCurrentPage(page);
  };

  const filterResults = async () => {
    if (!searchValue || searchValue === "") {
      setFilteredResults(results);
    } else {
      setFilteredResults(
        results.filter((e) =>
          e.productName
            .toLowerCase()
            .includes(String(searchValue).toLowerCase())
        )
      );
    }
  };

  const handleIncrement = (productID: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productID]: prevQuantities[productID] + 1,
    }));
  };

  const handleDecrement = (productID: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productID]: Math.max(prevQuantities[productID] - 1, 0),
    }));
  };

  const addItems = (newItems: ProductListArr[]) => {
    setBuyList((prevItems: ProductListArr[]) => {
      let updatedItems = [...prevItems];

      newItems.forEach((newItem) => {
        const existingItemIndex = updatedItems.findIndex(
          (item) => item.productID === newItem.productID
        );

        if (newItem.productQuantity === 0) {
          if (existingItemIndex !== -1) {
            // Remove product if productQuantity is 0
            updatedItems.splice(existingItemIndex, 1);
          }
        } else {
          if (existingItemIndex !== -1) {
            // Replace productQuantity if product already exists in the buyList
            updatedItems[existingItemIndex].productQuantity = newItem.productQuantity;
          } else {
            // Add new product if it does not exist in the buyList
            updatedItems.push(newItem);
          }
        }
      });

      return updatedItems;
    });
  };

  const handleConfirm = () => {
    const selectedProductsArray: ProductListArr[] = Object.entries(quantities)
      .filter(([productID, productQuantity]) => productQuantity >= 0) // Ensure it includes 0 quantities for removal
      .map(([productID, productQuantity]) => ({
        productID: Number(productID),
        productQuantity: productQuantity,
      }));

    setSelectedProducts(selectedProductsArray);
    addItems(selectedProductsArray);
    setShowProducts(false);
  };

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getData(1);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    filterResults();
  }, [searchValue]);

  useEffect(() => {
    const initialQuantities = productsFilteredByCategory.reduce(
      (acc: any, product: any) => {
        const existingItem = buyList.find((item: any) => item.productID === product.productID);
        acc[product.productID] = existingItem ? existingItem.productQuantity : 0;
        return acc;
      },
      {} as { [key: number]: number }
    );
    setQuantities(initialQuantities);
  }, [productsFilteredByCategory, buyList]);

  return (
    <div className="bg-gray-200" style={{ marginTop: '5rem' }}>

      <form className="max-w-md mx-auto w-full p-4">
        <div className="relative" style={{ justifyContent: "space-between" }}>
          <div className="absolute inset-y-0 flex items-center ps-3">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full pl-10 pr-12 py-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
        </div>
      </form>

      <div className="grid grid-cols-1 place-items-center mt-4">
        <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                onClick={() => {
                  if (currentPage > 1) {
                    getData(currentPage - 1);
                  }
                }}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Anterior</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>

              {pageNumbers.map((pageNumber) => (
                <a
                  key={pageNumber}
                  href="#"
                  onClick={() => {
                    getData(pageNumber);
                  }}
                  className={`relative inline-flex items-center ${pageNumber === currentPage
                      ? "bg-indigo-600"
                      : "text-gray-900"
                    } px-4 py-2 text-sm font-semibold ${pageNumber === currentPage ? "text-white" : "text-gray-900"
                    } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                >
                  {pageNumber}
                </a>
              ))}

              <a
                href="#"
                onClick={() => {
                  if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
                    getData(currentPage + 1);
                  }
                }}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Próxima</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>

        {/* Listagem de produtos */}

        <div className="my-6 grid grid-cols-2 p-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredResults.map((item) => (
            <a key={item.productID} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                <img
                  src={item.productImage}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  alt={item.productName}
                />
                <div
                  className="bg-gray-600"
                  style={{
                    position: "absolute",
                    width: 21,
                    height: 21,
                    zIndex: 2,
                    borderRadius: 21,
                    right: 5,
                    top: 5,
                  }}
                >
                  <p className="text-white text-center text-sm">
                    {item.productQuantity}
                  </p>
                </div>
              </div>
              <h3 className="mt-4 text-sm text-center text-gray-700">{item.productName}</h3>
              <p className="mt-1 text-lg text-center font-medium text-gray-900">
                {formatMoneyValue(item.productPrice)}
              </p>
              <div className="relative flex items-center mt-1">
                <button
                  type="button"
                  id="decrement-button"
                  onClick={() => handleDecrement(item.productID)}
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100"
                >
                  <svg
                    className="w-3 h-3 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="productQuantity-input"
                  value={quantities[item.productID]}
                  readOnly
                  className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 w-full placeholder-gray-400"
                  placeholder="0"
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  onClick={() => handleIncrement(item.productID)}
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-3 bg-black border-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-60 h-12 place-content-center"
          style={{ marginBottom: "5rem" }}
          onClick={() => {
            handleConfirm();
            setShowProducts(false);
          }}
        >
          <span>Confirmar</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsByCategory;