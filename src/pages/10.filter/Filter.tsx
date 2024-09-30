import React, { useEffect, useState } from 'react';
import { Select } from '../../components/Select';
import { CategoryInterface } from '../../interfaces/Category/category.interface';
import categoryService from '../../services/category.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetProductInterface } from '../../interfaces/Product/get-product.interface';
import { useDispatch } from 'react-redux';
import { changeSpinner } from '../../store/slices/app.slice';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';

const Filter: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data, categoriesNamesLocation, selectedCategoryLocation, priceRangeLocation, availabilityLocation } = location.state || {};
    const dispatch = useDispatch();

    const [categoriesNames, setCategoryNames] = useState<string[]>(categoriesNamesLocation || []);
    const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryLocation || '');
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>(priceRangeLocation || { min: '', max: '' });
    const [availability, setAvailability] = useState<{ min: string; max: string }>(availabilityLocation || { min: '', max: '' });

    useEffect(() => {
        const getCategories = async () => {
            dispatch(changeSpinner(true));
            try {
                const response: CategoryInterface[] = await categoryService.listAll();
                const categoriesNames: string[] = response.map(category => category.categoryName);
                setCategoryNames(categoriesNames);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            dispatch(changeSpinner(false));
        };
        if (!categoriesNamesLocation) {
            getCategories();
        }
    }, [categoriesNamesLocation, dispatch]);

    const handlePriceChange = (values: any, type: 'min' | 'max') => {
        const value = values.floatValue || ''; // Se não houver valor, define como string vazia
        setPriceRange(prevState => ({
            ...prevState,
            [type]: value
        }));
    };

    const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        setAvailability(prevState => ({
            ...prevState,
            [type]: value
        }));
    };

    const onFilter = () => {

        const isFilterApplie = selectedCategory !== '' || priceRange.min !== '' || priceRange.max !== '' || availability.min !== '' || availability.max !== '';

        const filteredData = data.filter((product: GetProductInterface) => {
            const isCategoryMatch = !selectedCategory || product.category.categoryName === selectedCategory;
            const isPriceMatch = (!priceRange.min || product.productPrice >= Number(priceRange.min)) &&
                (!priceRange.max || product.productPrice <= Number(priceRange.max));
            const isAvailabilityMatch = (!availability.min || product.productQuantity >= Number(availability.min)) &&
                (!availability.max || product.productQuantity <= Number(availability.max));
            return isCategoryMatch && isPriceMatch && isAvailabilityMatch;
        });

        if (isFilterApplie && filteredData.length < data.length) {
            toast.success("Filtro aplicado com sucesso!");
        } else {
            toast.info("Nenhum filtro foi aplicado.");
        }

        navigate('/products', { state: { data, filteredData, categoriesNames, selectedCategory, priceRange, availability } });
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                Filtros
            </header>

            <div className='bg-gray-200 px-8 py-6 mt-20'>
                <div className='flex flex-col items-center mb-8'>
                    <div className='card-categories'>
                        <h1 className="title-card-filter">Categorias</h1>
                        <Select options={categoriesNames} selectedCategory={selectedCategory} setSelectedCategory={(e: string) => setSelectedCategory(e)} />
                    </div>
                </div>

                <div className='flex flex-col items-center mb-8'>
                    <div className='card-categories'>
                        <h1 className="title-card-filter">Faixa de preço (em R$)</h1>
                        <div className="flex gap-8">
                            <div className="input-group">
                                <label htmlFor="minPrice">Valor mínimo</label>
                                <div className="input-wrapper">
                                    <NumericFormat
                                        id="minPrice"
                                        placeholder="Mínimo"
                                        value={priceRange.min}
                                        onValueChange={(values: any) => handlePriceChange(values, 'min')}
                                        className="input-filter price-input"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix=""
                                        allowNegative={false}
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label htmlFor="maxPrice">Valor máximo</label>
                                <div className="input-wrapper">
                                    <NumericFormat
                                        id="maxPrice"
                                        placeholder="Máximo"
                                        value={priceRange.max}
                                        onValueChange={(values: any) => handlePriceChange(values, 'max')}
                                        className="input-filter price-input"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix=""
                                        allowNegative={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='card-categories'>
                        <h1 className="title-card-filter">Disponibilidade</h1>
                        <div className="flex gap-8">
                            <div className="input-group">
                                <label htmlFor="minQuantity">Quantidade mínima</label>
                                <input
                                    pattern="[0-9]*"
                                    type="text"
                                    id="minQuantity"
                                    placeholder="Mínimo"
                                    value={availability.min}
                                    onChange={(e) => handleAvailabilityChange(e, 'min')}
                                    className="input-filter availability-input"
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="maxQuantity">Quantidade máxima</label>
                                <input
                                    pattern="[0-9]*"
                                    type="text"
                                    id="maxQuantity"
                                    placeholder="Máximo"
                                    value={availability.max}
                                    onChange={(e) => handleAvailabilityChange(e, 'max')}
                                    className="input-filter availability-input"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={() => onFilter()} className="mt-5 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-60 h-12 place-content-center" style={{ marginBottom: "5rem" }}>
                        <span>Confirmar</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Filter;
