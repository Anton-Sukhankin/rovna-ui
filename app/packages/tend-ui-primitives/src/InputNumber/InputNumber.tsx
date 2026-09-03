import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '../Input';
import { InputNumberProps } from './types';

const UNSTABLE_InputNumber = ({
  disabled,
  placeholder,
  value,
  defaultValue,
  onChange,
  allowClear,
  before,
  after,
  ...props
}: InputNumberProps) => {
  // Локальный стейт для отображаемой строки
  const [inputValue, setInputValue] = useState(
    defaultValue !== null && defaultValue !== undefined ? String(defaultValue) : '',
  );

  // Храним «последнюю введённую строку» в рефе,
  // чтобы не потерять, например, "0.00", когда извне прилетает value = 0
  const lastTypedRef = useRef(inputValue);

  // Слежение за внешним value
  useEffect(() => {
    // Парсим, что хранится у нас в рефе
    const typedNumber = parseFloat(lastTypedRef.current.replace(',', '.'));

    if (value === null || value === undefined) {
      if (lastTypedRef.current === '-') {
        setInputValue('-');
      } else {
        // Если извне сбросили в null, просто очищаем
        setInputValue('');
      }
    } else if (!Number.isNaN(typedNumber) && typedNumber === value) {
      // Если числовое значение совпадает с последней введённой строкой,
      // восстанавливаем эту строку (сохраняем формат "0.00" и т.п.)
      setInputValue(lastTypedRef.current);
    } else {
      // Иначе используем то, что пришло снаружи, как строку
      setInputValue(String(value));
    }
  }, [value]);

  // Основной обработчик (при вводе в поле)
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      // Разрешаем показывать пустую строку и одиночный '-'
      if (val === '' || val === '-') {
        setInputValue(val);
        lastTypedRef.current = val;
        onChange?.(null);

        return;
      }

      // Проверяем, что строка похоже на число (с учётом десятичной точки/запятой)
      if (!isDecimalNumber(val)) {
        // Просто игнорируем не-числовой ввод (не обновляем state)
        return;
      }

      // Ограничим возможное переполнение
      const parsed = parseFloat(val.replace(',', '.'));
      const MAX_SAFE = Math.floor(Number.MAX_SAFE_INTEGER / 10000);
      const MIN_SAFE = Math.floor(Number.MIN_SAFE_INTEGER / 10000);
      if (parsed > MAX_SAFE || parsed < MIN_SAFE) {
        // Тоже игнорируем
        return;
      }

      // Всё корректно: сохраняем строку и вызываем родительский onChange
      setInputValue(val);
      lastTypedRef.current = val;
      onChange?.(parsed);
    },
    [onChange],
  );

  return (
    <Input
      data-testid='rovna-ui-input-number'
      {...props}
      value={inputValue}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      allowClear={allowClear}
      prefix={before}
      suffix={after}
    />
  );
};
UNSTABLE_InputNumber.displayName = 'UNSTABLE_InputNumber';

/**
 * isDecimalNumber("");        // true
 * isDecimalNumber("7.");      // true
 * isDecimalNumber("7,");      // true
 * isDecimalNumber("7");       // true
 * isDecimalNumber("7.1");     // true
 * isDecimalNumber("7,1234");  // true
 * isDecimalNumber("7.12345"); // false, так как 5 цифр после запятой
 * isDecimalNumber("abc");     // false
 * isDecimalNumber("07");      // false, ведущий ноль с другими цифрами невалиден
 * isDecimalNumber("0");       // true
 * isDecimalNumber("0.1");     // true
 * isDecimalNumber("0,12");    // true
 * isDecimalNumber("10.123");  // true
 * isDecimalNumber("01.1");    // false, ведущий ноль с другими цифрами невалиден
 * @param value строка для проверки
 * @param num количество символов после точки
 */
function isDecimalNumber(value: string, num = 4) {
  const regex = new RegExp(
    `^$|^-?(?:[1-9]\\d*(?:[.,]\\d{0,${num}})?|0(?:[.,]\\d{0,${num}})?)$`,
  );

  return regex.test(value);
}

export { UNSTABLE_InputNumber };
