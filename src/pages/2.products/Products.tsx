import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import productService from "../../services/product.service";
import { formatMoneyValue } from "../../utils/formatMoneyValue";
import { GetProductInterface } from "../../interfaces/Product/get-product.interface";
import { useDispatch } from "react-redux";
import { changeSpinner } from "../../store/slices/app.slice";
import { CiFilter } from "react-icons/ci";

const Products = () => {
  const location = useLocation();
  const { data, filteredData, categoriesNames, selectedCategory, priceRange, availability } = location.state || {};

  const [results, setResults] = useState<GetProductInterface[]>([]);
  const [filteredResults, setFilteredResults] = useState<GetProductInterface[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let numCols = 4;
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    numCols = 1;
  } else if (screenWidth < 768) {
    numCols = 2;
  }

  const itemsPerPage = numCols * 4;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setFilteredResults(
      (filteredData ? filteredData : results).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );
  }, [results, currentPage, filteredData, itemsPerPage]);

  const getData = async (page: number): Promise<void> => {
    dispatch(changeSpinner(true));
    if (data) {
      setTotalItems((filteredData ? filteredData : results).length);
      setResults(data);
      setFilteredResults((filteredData ? filteredData : results).slice((page - 1) * itemsPerPage, page * itemsPerPage));
      setCurrentPage(page);
    } else {
      const response: GetProductInterface[] = await productService.listAll();
      setTotalItems(response.length);
      setResults(response);
      setFilteredResults(response.slice((page - 1) * itemsPerPage, page * itemsPerPage));
      setCurrentPage(page);
    }
    dispatch(changeSpinner(false));
  };

  const filterResults = (): void => {
    const filtered = searchValue
      ? (filteredData ? filteredData : results).filter((e: GetProductInterface) =>
        e.productName.toLowerCase().includes(searchValue.toLowerCase())
      )
      : (filteredData ? filteredData : results);
    setFilteredResults(filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  };

  useEffect(() => {
    getData(1);
  }, []);

  useEffect(() => {
    filterResults();
  }, [searchValue, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilteredResults((filteredData ? filteredData : results).slice((page - 1) * itemsPerPage, page * itemsPerPage));
  };

  const renderPagination = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    return (
      <nav className="flex justify-center space-x-2" aria-label="Pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'hidden' : 'block'}`}
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 ${pageNumber === currentPage ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100" : ""}`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'hidden' : 'block'}`}
        >
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    );
  };

  const isFilterActive = (): boolean => {
    return (
      (selectedCategory && selectedCategory.length > 0) ||
      (priceRange && (priceRange.min !== "" || priceRange.max !== "")) ||
      (availability && (availability.min !== "" || availability.max !== ""))
    );
  };

  return (
    <div className="bg-gray-200" style={{ marginBottom: 80 }}>
      <h1 className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full" style={{ fontSize: 18, zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>PRODUTOS</h1>
      <form className="max-w-md mx-auto w-full p-4 mt-16">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
          <div onClick={() => navigate('/filter', { state: { data: data ? data : results, categoriesNamesLocation: categoriesNames, selectedCategoryLocation: selectedCategory, priceRangeLocation: priceRange, availabilityLocation: availability } })} className="absolute inset-y-0 right-3 flex items-center">
            {isFilterActive() && (
              <div className="absolute top-4 right-0 w-2 h-2 bg-red-500 rounded-full z-10"></div>
            )}
            <CiFilter
              size={24}
              color='#6B7280'
              onClick={() => navigate('/filter', { state: { data: data ? data : results, categoriesNamesLocation: categoriesNames, selectedCategoryLocation: selectedCategory, priceRangeLocation: priceRange, availabilityLocation: availability } })}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <p className="text-base text-gray-600">{itemsPerPage} itens por página</p>
          <p className="text-base text-gray-600">Página {currentPage} - {totalPages}</p>
        </div>
      </form>

      <div className="grid grid-cols-1 place-items-center">
        <div className="grid grid-cols-2 p-3 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredResults.map((item) => (
            <a key={item.productID} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                <img
                  src={item.productImage}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  alt={item.productName}
                />
                <div className="bg-gray-600" style={{ position: "absolute", width: 21, height: 21, zIndex: 2, borderRadius: 21, right: 5, top: 5 }}>
                  <p className="text-white text-center text-sm">{item.productQuantity}</p>
                </div>
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{item.productName}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{formatMoneyValue(item.productPrice)}</p>

            </a>
          ))}
        </div>
      </div>
      {renderPagination()}
    </div>
  );
};

export default Products;
