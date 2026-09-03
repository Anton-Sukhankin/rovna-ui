import { Any } from '@rovna-ui/types';
import { extract, isNumber } from '@rovna-ui/utils';

import { build, mutate } from '@rovna-internal/form/core/utils';

import { ValidationResult, ValidationRule } from '../interfaces';
import { Observer } from './Observer';
import { AsyncValidator } from './AsyncValidator';

/* eslint-disable @typescript-eslint/no-empty-function */
function noop() {}
/* eslint-enable @typescript-eslint/no-empty-function */

export interface FormInstance<State extends object = object> {
  /**
   * Сброс поля по ключу
   */
  resetField(name: string | string[]): void;
  /**
   * Сброс всех полей
   */
  resetFields(): void;
  /**
   * Установка поля по ключу
   */
  setField(name: string | string[], payload: Any): void;
  /**
   * Установка всех полей
   */
  setFields(payload: State | ((previous: State) => State)): void;
  /**
   * Получить поле по ключу
   */
  getField(name: string | string[]): Any;
  /**
   * Получить все поля
   */
  getFields(): State;
  /**
   * Запустить валидацию поля по ключу
   */
  validateField(name: string | string[]): Promise<void>;
  /**
   * Запустить валидацию всей формы
   */
  validateFields(): Promise<State>;
  /**
   * Получить ошибки поля по ключу
   */
  getFieldErrors(name: string | string[]): ValidationResult[] | null;
  /**
   * Получить все ошибки по всем полям
   */
  getFieldsErrors(): ValidationResult[];
  /**
   * Submit формы
   */
  submit(): Promise<State>;
}

export interface FormInstanceParameters<S extends object> {
  /**
   * Значения формы
   */
  values?: S;
  /**
   * Значения по умолчанию
   */
  defaultValues?: S;
  /**
   * `Callback` функция, вызываемая при вводе значений
   * @param changed Частичный слепок стейта формы с затронутыми полями
   * @param state Новое состояние стейта формы
   */
  onChange?: (changed: Partial<S>, state: S) => void;
  /**
   * `Callback` функция, вызываемая при срабатывании `submit` события формы
   */
  onSubmit?: (state: S) => void;
}

type Subscriber = () => void;

export class FormModel<State extends object = object> implements FormInstance<State> {
  /**
   * Уникальный ключ для Observer всех полей
   */
  private __WATCHDOG_KEY__ = '__WATCHDOG_KEY__';

  /**
   * Внутренний стейт
   */
  private __state: State;

  /**
   * Внешний контролируемый стейт
   */
  private __controlled: State | undefined;

  /**
   * Функция обратного вызова, вызываемая при изменении полей
   */
  private onChange: ((changed: Partial<State>, state: State) => void) | undefined;

  /**
   * Функция обратного вызова, вызываемая при submit формы
   */
  private onSubmit: ((state: State) => void) | undefined;

  /**
   * Сущность валидатора
   */
  private validator: AsyncValidator = new AsyncValidator();

  /**
   * Слушатели изменений конкретных полей
   */
  private subscribers: Observer = new Observer();

  /**
   * Слушатель на изменение всех полей
   */
  private watchdog: Observer = new Observer();

  /**
   * Состояние для контроля полей, которые должны быть disabled
   * при отсутствии значений в зависимых полях
   */
  private requires: Map<string, Subscriber[]> = new Map();

  private errors: Map<string, ((error: ValidationResult) => void)[]> = new Map();

  constructor(parameters?: FormInstanceParameters<State>) {
    this.__controlled = parameters?.values;
    this.__state = parameters?.defaultValues ?? ({} as State);

    this.onChange = parameters?.onChange;
    this.onSubmit = parameters?.onSubmit;

    this.setField = this.setField.bind(this);
    this.setFields = this.setFields.bind(this);
    this.getField = this.getField.bind(this);
    this.getFields = this.getFields.bind(this);
    this.notify = this.notify.bind(this);
    this.submit = this.submit.bind(this);
    this.key = this.key.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateField = this.validateField.bind(this);
    this.resetField = this.resetField.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.getFieldErrors = this.getFieldErrors.bind(this);
    this.getFieldsErrors = this.getFieldsErrors.bind(this);

    this.__onFieldChange = this.__onFieldChange.bind(this);
    this.__setField = this.__setField.bind(this);
    this.__setFields = this.__setFields.bind(this);
    this.__onValidation = this.__onValidation.bind(this);
    this.__proxy = this.__proxy.bind(this);
    this.__setRules = this.__setRules.bind(this);
    this.__onFieldsChange = this.__onFieldsChange.bind(this);
    this.__onRequireChange = this.__onRequireChange.bind(this);
    this.__hasRequired = this.__hasRequired.bind(this);
  }

  private key(name: string | string[]) {
    return Array.isArray(name) ? name.join('.') : name;
  }

  private notify(name: string | string[]) {
    const key = this.key(name);
    this.subscribers.notify(key);
    this.watchdog.notify(this.__WATCHDOG_KEY__);

    const subscribers = this.requires.get(key);
    subscribers?.forEach(fn => fn());
  }

  __proxy(payload: State) {
    this.__controlled = payload;
  }

  __setRules(name: string | string[], rules: ValidationRule[]) {
    this.validator.register(name, rules);
  }

  __onFieldChange(name: string | string[], fn: Subscriber) {
    return this.subscribers.on(name, fn);
  }

  __onRequireChange(name?: string[] | string[][], fn?: Subscriber) {
    if (!name || !fn) return noop;

    name.forEach(path => {
      const key = this.key(path);
      const subscribers = this.requires.get(key);
      if (subscribers) {
        subscribers.push(fn);
      } else {
        this.requires.set(key, [fn]);
      }
    });

    return () => {
      name.forEach(path => {
        const key = this.key(path);
        const subscribers = this.requires.get(key);
        subscribers?.filter(cb => cb !== fn);
      });
    };
  }

  __hasRequired(name?: string[] | string[][]) {
    if (!name) return false;

    const collected = name
      .reduce<unknown[]>((result, current) => {
        if (Array.isArray(current)) {
          const v = extract(this.getFields(), current);
          result.push(v);
        } else {
          const v = this.getField(current);
          result.push(v);
        }

        return result;
      }, [])
      .filter(value => {
        if (isNumber(value)) return false;
        if (Array.isArray(value)) {
          if (value.some(v => Boolean(v) || isNumber(v))) return false;

          return true;
        }
        if (value) return false;

        return true;
      });

    if (collected.length === 0) return false;

    return true;
  }

  __onFieldsChange(fn: Subscriber) {
    return this.watchdog.on(this.__WATCHDOG_KEY__, fn);
  }

  __onValidation(name: string | string[], fn: (error: ValidationResult) => void) {
    const key = this.key(name);
    const subscribers = this.errors.get(key);
    if (Array.isArray(subscribers)) {
      subscribers.push(fn);
    } else {
      this.errors.set(key, [fn]);
    }

    return () => {
      this.errors.get(key)?.filter(cb => cb !== fn);
    };
  }

  __setField(name: string | string[], payload: Any) {
    const path = Array.isArray(name) ? name : [name];
    const copy = { ...this.__state };
    mutate(copy, path, payload);
    this.__state = copy;
    this.notify(path);
    const touched = build(path, payload) as Partial<State>;
    const next = this.__controlled ? { ...this.__controlled, ...touched } : copy;
    this.onChange?.(touched, next);
    this.validateField(name);
  }

  __setFields(payload: State | ((state: State) => State)) {
    const next = typeof payload === 'function' ? payload(this.__state) : payload;
    this.__state = next;
    this.onChange?.(next, next);
    this.validateFields();
    this.subscribers.broadcast();
  }

  public resetField(name: string | string[]) {
    const path = Array.isArray(name) ? name : [name];
    mutate(this.__state, path, undefined);
    this.notify(path);
  }

  public resetFields() {
    this.__state = {} as State;
    this.subscribers.broadcast();
  }

  public setField(name: string | string[], payload: Any) {
    const path = Array.isArray(name) ? name : [name];
    mutate(this.__state, path, payload);
    this.notify(path);
  }

  public setFields(payload: State | ((previous: State) => State)) {
    const next = typeof payload === 'function' ? payload(this.__state) : payload;
    this.__state = next;
    this.subscribers.broadcast();
  }

  public getField(name: string | string[]) {
    const path = Array.isArray(name) ? name : [name];

    if (this.__controlled) return extract(this.__controlled, path);

    return extract(this.__state, path);
  }

  public getFields(): State {
    if (this.__controlled) return this.__controlled;

    return this.__state;
  }

  public async validateField(name: string | string[]): Promise<void> {
    try {
      const path = Array.isArray(name) ? name : [name];
      const payload = extract(this.__state, path);
      const data = await this.validator.validateField(name, payload);
      const subscribers = this.errors.get(this.key(name));
      if (!subscribers) return;
      Array.from(subscribers).forEach(fn => fn(data));

      return;
    } catch (error) {
      const data = error as ValidationResult;
      const subscribers = this.errors.get(this.key(name));
      if (!subscribers) throw data;
      Array.from(subscribers).forEach(fn => fn(data));
      throw data;
    }
  }

  public async validateFields(): Promise<State> {
    try {
      await this.validator.validateFields(this.__state);

      return this.__state;
    } catch (errors) {
      const rejected = errors as {
        status: PromiseRejectedResult['status'];
        reason: ValidationResult;
      }[];

      rejected.forEach(error => {
        const subscribers = this.errors.get(this.key(error.reason.name));

        if (subscribers) {
          subscribers.forEach(fn => fn(error.reason));
        }
      });

      throw rejected;
    }
  }

  public getFieldErrors(name: string | string[]) {
    return this.validator.getFieldErrors(name);
  }

  public getFieldsErrors() {
    return this.validator.getFieldsErrors();
  }

  /**
   * Submit формы
   */
  public async submit(): Promise<State> {
    return this.validateFields().then(values => {
      this.onSubmit?.(values);

      return values;
    });
  }
}
