import React, { useEffect, useState } from "react";
import { GetProductInterface } from "../../interfaces/Product/get-product.interface";
import productService from "../../services/product.service";
import categoryService from "../../services/category.service";
import { CategoryEnum } from "../../interfaces/Category/category.interface";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsByCategory from "./components/ProductsByCategory";
import Modal from "./components/Modal";
import { useDispatch } from "react-redux";
import { changeSpinner } from "../../store/slices/app.slice";
import productListService from "../../services/productList.service";

interface CategoryCards {
  categoryName: string;
  wasBought: boolean;
  imageSrc: string;
  subtitle: string;
}

const Buy: React.FC = () => {
  const [results, setResults] = useState<GetProductInterface[]>([]);
  const [buyList, setBuyList] = useState<ProductListArr[]>([]);
  const [cardsData, setCardsData] = useState<CategoryCards[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] = useState<GetProductInterface[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { productList } = location.state || {};

  const controller = new AbortController();

  const categoryDetails: Record<CategoryEnum, { imageSrc: string; subtitle: string }> = {
    [CategoryEnum.cleaningProducts]: {
      imageSrc: './img/CategoryCards/cleaningProducts.jpg',
      subtitle: 'Produtos de limpeza para sua casa'
    },
    [CategoryEnum.alcoholicDrinks]: {
      imageSrc: './img/CategoryCards/alcoholicDrinks.jpg',
      subtitle: 'Bebidas alcoólicas de diversas marcas'
    },
    [CategoryEnum.nonAlcoholicDrinks]: {
      imageSrc: './img/CategoryCards/nonAlcoholicDrinks.jpg',
      subtitle: 'Bebidas não alcoólicas para todos os gostos'
    },
    [CategoryEnum.personalCare]: {
      imageSrc: './img/CategoryCards/personalCare.webp',
      subtitle: 'Produtos de higiene pessoal'
    },
    [CategoryEnum.hortifruti]: {
      imageSrc: './img/CategoryCards/hortifruti.jpg',
      subtitle: 'Frutas, verduras e legumes frescos'
    },
    [CategoryEnum.frozen]: {
      imageSrc: './img/CategoryCards/frozen.webp',
      subtitle: 'Congelados e resfriados'
    },
    [CategoryEnum.meats]: {
      imageSrc: './img/CategoryCards/meats.jpg',
      subtitle: 'Carnes frescas e de qualidade'
    },
    [CategoryEnum.cold]: {
      imageSrc: './img/CategoryCards/cold.jpg',
      subtitle: 'Frios e laticínios variados'
    },
    [CategoryEnum.candy]: {
      imageSrc: './img/CategoryCards/candy.jpg',
      subtitle: 'Doces e sobremesas deliciosas'
    },
    [CategoryEnum.petShop]: {
      imageSrc: './img/CategoryCards/petShop.webp',
      subtitle: 'Produtos para seu pet'
    },
    [CategoryEnum.eletronics]: {
      imageSrc: './img/CategoryCards/eletronics.jpg',
      subtitle: 'Eletrodomésticos e eletrônicos'
    },
    [CategoryEnum.easterEggs]: {
      imageSrc: './img/CategoryCards/easterEggs.jpg',
      subtitle: 'Ovos de páscoa e chocolates'
    },
    [CategoryEnum.candy2]: {
      imageSrc: './img/CategoryCards/candy2.jpg',
      subtitle: 'Guloseimas variadas'
    }
  };

  const getData = async () => {
    dispatch(changeSpinner(true));
    const categories = await categoryService.listAll();
    let cardsData: CategoryCards[] = [];
    categories.forEach((e: any) => {
      if (Object.values(CategoryEnum).includes(e.categoryName)) {
        const details = categoryDetails[e.categoryName as CategoryEnum];
        cardsData.push({
          categoryName: e.categoryName,
          wasBought: false,
          imageSrc: details.imageSrc,
          subtitle: details.subtitle
        });
      }
    });
    setCardsData(cardsData);
    const response = await productService.listAll();
    results.length === 0 && setResults(response);
    dispatch(changeSpinner(false));
  };

  const filterProducts = async (categoryName: string) => {
    setFilteredResults(
      results.filter((e) => e.category.categoryName === categoryName)
    );
    setShowProducts(true);

    setCardsData((prevCardsData) =>
      prevCardsData.map((card) =>
        card.categoryName === categoryName
          ? { ...card, wasBought: true }
          : card
      )
    );
  };

  const existentProductList = async () => {
    setBuyList(productList.products);
  }

  useEffect(() => {
    getData();
    productList && existentProductList();
    return () => {
      controller.abort();
    };
  }, [productList]);

  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        Comprar
      </header>
      {showProducts && (
        <ProductsByCategory
          productsFilteredByCategory={filteredResults}
          setShowProducts={setShowProducts}
          setBuyList={setBuyList}
          buyList={buyList}
        />
      )}
      <div className="container-buy">

        {!showProducts && (
          <div className="cards-container">
            {cardsData.map((e, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => filterProducts(e.categoryName)}
              >
                <img src={e.imageSrc} alt={e.categoryName} />
                <div className="category-card-content">
                  <div className="category-card-title">{e.categoryName}</div>
                  <div className="category-card-subtitle">
                    {e.subtitle}
                  </div>
                </div>
                <div className="category-card-checkbox">
                  <input className="custom-checkbox" type="checkbox" checked={e.wasBought} readOnly />
                </div>
              </div>
            ))}
          </div>
        )}
        {!showProducts && <div className="footer">
          <button onClick={async () => {
            if (productList) {
              dispatch(changeSpinner(true));
              await productListService.addMultipleProducts(productList.productListID, buyList);
              dispatch(changeSpinner(false));
              navigate('/lists')
            } else {
              setShowModal(true);
            }
          }}>
            Finalizar Compra
          </button>
        </div>}
        <Modal buyList={buyList} showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Buy;
