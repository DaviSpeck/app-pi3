import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetProductInterface } from "../../interfaces/Product/get-product.interface";
import productService from "../../services/product.service";
import { formatMoneyValue } from "../../utils/formatMoneyValue";
import { useLocation } from 'react-router-dom';
import FilterDropdown from "../../components/tableComponents/FilterDropdown";
import categoryService from "../../services/category.service";
import { CategoryInterface } from "../../interfaces/Category/category.interface";

const Products: React.FC = () => {
  const [results, setResults] = useState<GetProductInterface[]>([]);
  const [filteredResults, setFilteredResults] = useState<GetProductInterface[]>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>();
  const controller = new AbortController();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const [optionsDropdownStates, setOptionsDropdownStates] = useState<boolean[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: boolean }>({});
  const [actionsDropdown, setActionsDropdown] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<GetProductInterface[]>([]);
  const [products, setProducts] = useState<GetProductInterface[]>([]);
  const [searchResults, setSearchResults] = useState<GetProductInterface[]>([]);


  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCategoryFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const getCategoryName = async (categoryID: number) => {
    const response = await categoryService.findById(categoryID)
    return response.categoryName
  }

  const syncDropdowns = (id: number, index?: number) => {
    switch (id) {
      case 1:
        setActionsDropdown((prev) => !prev);
        setFilterDropdown(false);
        setOptionsDropdownStates(Array(filteredProducts.length).fill(false));
        break;
      case 2:
        setFilterDropdown((prev) => !prev);
        setActionsDropdown(false);
        setOptionsDropdownStates(Array(filteredProducts.length).fill(false));
        break;
      case 3:
        setActionsDropdown(false);
        setFilterDropdown(false);
        setOptionsDropdownStates((prevStates) =>
          prevStates.map((state, idx) => idx === index ? !state : false)
        );
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const filterProducts = async () => {
      let filtered: GetProductInterface[] = searchResults.length > 0 ? searchResults : products;
      if (!Object.keys(categoryFilters).some(key => categoryFilters[key])) {
        setFilteredProducts(filtered);
        return;
      }

      filtered = await Promise.all(filtered.map(async product => {
        const categoryName = await getCategoryName(product.category.categoryID);
        return { ...product, categoryName };
      }));

      filtered = filtered.filter(product => categoryFilters[product.category.categoryName]);
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchResults, products, categoryFilters]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response: CategoryInterface[] = await categoryService.listAll();
        const initialFilters: { [key: string]: boolean } = {};
        response.forEach(category => {
          initialFilters[category.categoryName] = true;
        });
        setCategoryFilters(initialFilters);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, [])

  useEffect(() => {
    setOptionsDropdownStates(Array(filteredProducts.length).fill(false))
  }, [filteredProducts])

  const itemsPerPage = 14;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  const location = useLocation();
  const isBuying = new URLSearchParams(location.search).get('buy') === 'true';

  const getData = async (page: number) => {
    const response = await productService.listAll();
    setTotalItems(response.length);
    results.length === 0 && setResults(response);
    setFilteredResults(
      response.slice((page - 1) * itemsPerPage, page * itemsPerPage)
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

  return (
    <div className="bg-gray-200">
      <h1 className="flex h-16 items-center justify-center bg-gray-600 text-white">
        Produtos
      </h1>
      
      <form className="max-w-md mx-auto w-full p-4">
      
        <div className="relative" style={{justifyContent: 'space-between'}}>
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
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          
        </div>
        <div className="mt-3">
          <FilterDropdown
            categoryFilters={categoryFilters}
            handleCheckboxChange={handleCheckboxChange}
            products={products}
            syncDropdowns={syncDropdowns}
            filterDropdown={filterDropdown}
          />
        </div>
      </form>

      <div className="grid grid-cols-1 place-items-center mt-4" style={{ marginBottom: "2.5rem" }}>
        <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
          {/*}
          <p className="text-sm mb-2 text-gray-700 mr-8">
          Mostrando <span className="font-medium">1</span> até{" "}
          <span className="font-medium">8</span> de{" "}
          <span className="font-medium">97</span> resultados
          </p>
          {*/}

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
                  className={`relative inline-flex items-center ${
                    pageNumber === currentPage
                      ? "bg-indigo-600"
                      : "text-gray-900"
                  } px-4 py-2 text-sm font-semibold ${
                    pageNumber === currentPage ? "text-white" : "text-gray-900"
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
              <h3 className="mt-4 text-sm text-gray-700">{item.productName}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {formatMoneyValue(item.productPrice)}
              </p>
              {isBuying && (
                <div className="relative flex items-center mt-1">
                  <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                      </svg>
                  </button>
                  <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                  <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                      </svg>
                  </button>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
      
      {isBuying && (
        <div className="flex justify-center">
          <button
            className="mt-3 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-60 h-12 place-content-center"
            style={{ marginBottom: "5rem" }}
          >
            <span>Confirmar</span>
          </button>
        </div>
      )}

    </div>
  );
};

export default Products;
