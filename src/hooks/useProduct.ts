import { useEffect, useRef, useState } from 'react';
import { InitialValues, onChangeArgs, Product } from '../interfaces/interfaces';

interface useProductArgs {
  product: Product;
  value?: number;
  onChange?: (args: onChangeArgs) => void;
  initialValues?: InitialValues;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
  initialValues,
}: useProductArgs) => {
  const [counter, setCounter] = useState<number>(
    initialValues && initialValues.count ? initialValues.count : value
  );

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) return;
    setCounter(value);
  }, [value]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const increaseBy = (value: number) => {
    let newValue = Math.max(counter + value, 0);
    if (initialValues && initialValues.maxCount) {
      newValue = Math.min(newValue, initialValues.maxCount);
    }

    setCounter(newValue);
    onChange && onChange({ count: newValue, product });
  };

  const reset = () => {
    setCounter(
      initialValues && initialValues.count ? initialValues.count : value
    );
  };

  return {
    counter,
    isMaxCountReached:
      initialValues &&
      !!initialValues.count &&
      initialValues.maxCount === counter,
    maxCount: initialValues ? initialValues.maxCount : undefined,
    increaseBy,
    reset,
  };
};
