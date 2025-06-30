import React, { useEffect, useMemo, useState } from "react";
import ListProduct from "./ListProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchProducts, setSearchProducts] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const finalRes = await res.json();
      console.log(finalRes);
      setIsLoading(false);
      setProducts(finalRes);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let itd;
    itd = setTimeout(() => {
      setSearchProducts(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(itd);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const updatedProducts = useMemo(() => {
    const serachValue = products.filter((ele) =>
      ele.title.toLowerCase().includes(searchProducts.toLowerCase())
    );
    return serachValue;
  }, [products, searchProducts]);

  const productLen = updatedProducts.length;
  const items = itemsPerPage === "" ? productLen : parseInt(itemsPerPage);
  const totalPages = itemsPerPage === "" ? 1 : Math.ceil(productLen / items);

  const paginatedAndUpdatedProducts = useMemo(() => {
    if (itemsPerPage === "") {
      return updatedProducts;
    }

    const startIndex = (currentPage - 1) * items;
    const endIndex = startIndex + items;
    return updatedProducts.slice(startIndex, endIndex);
  }, [updatedProducts, currentPage, items, itemsPerPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePerPage = (e) => {
    setItemsPerPage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h2 className="font-bold text-center py-4 border bg-slate-300">
        List Of Products
      </h2>

      {!isError && !isLoading && (
        <>
          <div className="max-w-md mx-auto mb-8 flex justify-between">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Products:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none transition-colors"
                type="search"
                placeholder="Search Products Here..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Items per page
                </label>
                <select
                  value={itemsPerPage}
                  onChange={handlePerPage}
                  className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                >
                  <option value={""}>All items</option>
                  <option value={5}>5 items</option>
                  <option value={10}>10 items</option>
                  <option value={20}>20 items</option>
                </select>
              </div>
            </div>
          </div>

          <>
            {totalPages > 1 && (
              <div className="h-10 flex justify-start gap-10">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-300 rounded cursor-pointer"
                >
                  Previous
                </button>
                <button>{currentPage}</button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-green-300 rounded cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>

          <div className="max-w-7xl mx-auto pt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedAndUpdatedProducts.map((ele) => (
                <ListProduct key={ele.id} {...ele} />
              ))}
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <div className="flex items-center justify-center">
          <p className="text-lg font-bold text-green-600">Loading...</p>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center">
          <p className="text-lg font-bold text-red-600 px-4 py-2 rounded-lg">
            Something went wrong
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
